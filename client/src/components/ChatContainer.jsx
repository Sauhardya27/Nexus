import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatSkeleton from './skeletons/ChatSkeleton';

const ChatContainer = () => {
  const { chats, getChats, isChatsLoading, selectedUser } = useChatStore();

  useEffect(() => {
    getChats(selectedUser._id);
  }, [selectedUser._id, getChats]);

  if (isChatsLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <ChatSkeleton />
        <ChatInput />
      </div>
    )
  }
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />

      <p>chats...</p>

      <ChatInput />
    </div>
  )
}

export default ChatContainer