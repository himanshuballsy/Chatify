import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const HomePage: React.FC = () => {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className="flex justify-center items-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          {!selectedUser ? <NoChatSelected /> : <Chat />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage