import { useEffect, useRef} from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import avatar from "../assets/207-2074624_white-gray-circle-avatar-png-transparent-png.png"
import MessageInputs from "./MessageInputs";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
const {getMessages, messages, isChatsLoading, selectedUser, subscribeToMessages, unsubscribeMessages} = useChatStore();
const {authUser} = useAuthStore();
const chatRef = useRef<HTMLDivElement>(null);

useEffect (()=> {
  getMessages(selectedUser._id)
  subscribeToMessages();

  return ()=> {
    unsubscribeMessages();
  }
}, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeMessages])

useEffect(()=> {
  if(chatRef.current && messages){
  chatRef.current?.scrollIntoView({behavior: 'smooth'});
  }
}, [messages])

if(isChatsLoading) {
  return <div className="flex flex-col flex-1 overflow-auto">
    <ChatHeader />
    <MessageSkeleton />
    <MessageInputs />
  </div>
}
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p- space-y-4">
        {messages.map((message)=> {
          return(
            <div key={message._id} 
            className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
            ref={chatRef}>
              <div className="chat-headed mb-1">
                <time className="text-xs ml-1 opacity-50">{formatMessageTime(message.createdAt)}</time>
              </div>
              <div className="chat-image avatar">
                <div className="rounded-full size-10 border mx-1">
                <img src={message.senderId === authUser._id ? authUser.profilePic || avatar : selectedUser.profilePic || avatar} alt="prifile" />
                </div>
              </div>
                <div className="chat-bubble flex flex-col">
                {
                  message.image && <img src= {message.image} alt="img" className="sm:max-w-[200px] rounded-md mb-2" />
                }
                {
                  message.text && <p>{message.text}</p>
                }
              </div>
            </div>
          )
        } )}
      </div>

      <MessageInputs />
      
    </div>
  );
};
export default ChatContainer;