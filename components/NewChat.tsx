'use client';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/Fi';
import { db } from '../firebase';
import { createNewChat } from '../utils/commonFunctions';

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      onClick={() => createNewChat(session, router)}
      className='border border-gray-700 chatRow'
    >
      <FiPlus />
      <p>New Chat</p>
    </div>
  );
};

export default NewChat;
