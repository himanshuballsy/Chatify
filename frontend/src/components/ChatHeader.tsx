import React from 'react'
import { X } from "lucide-react";
import avatar from '../assets/207-2074624_white-gray-circle-avatar-png-transparent-png.png'
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";


const ChatHeader: React.FC = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
  
    return (
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={selectedUser.profilePic || avatar} alt={selectedUser.fullName} />
              </div>
            </div>
  
            {/* User info */}
            <div>
              <h3 className="font-medium">{selectedUser.fullName}</h3>
              <p className="text-sm text-base-content/70">
                {onlineUsers.includes(selectedUser._id) ? selectedUser.fullname : "Offline"}
              </p>
            </div>
          </div>
  
          {/* Close button */}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    );
  };

export default ChatHeader