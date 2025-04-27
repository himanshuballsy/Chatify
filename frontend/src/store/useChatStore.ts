import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

interface chatState {
    messages: any[],
    users: any[],
    selectedUser: any,
    isChatsLoading: boolean,
    isUsersLoading: boolean,
    getUsers: ()=> void,
    getMessages: (userId: string) => void,
    subscribeToMessages: () => void,
    setSelectedUser: (selectedUser: any)=> void;
    sendMessage: (data: {text: string, image: string | ArrayBuffer |null})=> void,
    unsubscribeMessages: ()=> void
}

export const useChatStore = create<chatState>((set, get)=> ({
    messages: [],
    users: [],
    selectedUser: null,
    isChatsLoading: false,
    isUsersLoading: false,
    getUsers: async () => {
        try{
            set({isUsersLoading: true});
            const res = await axiosInstance.get('/message/users');
            set({users: res.data});
        }
        catch(err) {
            if(isAxiosError(err)){
            toast.error(err.response?.data.message);
            }
            else{
                toast.error("Unknown Error");
                console.log(err);
            }
        }
        finally{
            set({isUsersLoading: false});
        }
    }
,
    getMessages: async(userId) => {
        try{
            set({isChatsLoading: true});
            const res = await axiosInstance.get(`/message/${userId}`);
            set({messages: res.data});
        }
        catch(err) {
            if(isAxiosError(err)) {
                toast.error(err.response?.data.message);   
            }
        }
        finally{
            set({isChatsLoading: false});
        }
    },
    setSelectedUser: (selectedUser) => {set({selectedUser: selectedUser})} ,
    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try{
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
        }
        catch(err){
            if(isAxiosError(err))  {
                toast.error(err.response?.data.message);
                console.log(err);
            }
            else{
                toast.error('Unkown Error');
                console.log(err);
            }
        }
    },
    subscribeToMessages: ()=> {
        const {selectedUser} = get();

        if(!selectedUser) return

        const socket = useAuthStore.getState().socket;


        socket.on('newMessage', (newMessage: any)=> {
            if(!newMessage.senderId === selectedUser._id) return;

            set({messages: [...get().messages, newMessage]})
        })
    },
    unsubscribeMessages: ()=> {
        const socket = useAuthStore.getState().socket;

        socket.off('newMessage');
    }
}))