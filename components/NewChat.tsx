'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BsPlus } from 'react-icons/bs';
import { createNewChat } from '../utils/commonFunctions';

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      onClick={() => createNewChat(session, router)}
      className='border border-gray-700 chatRow'
    >
      <BsPlus />
      <p>New Chat</p>
    </div>
  );
};

export default NewChat;
