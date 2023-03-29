'use client';

import { collection, orderBy, query } from 'firebase/firestore';
import { useSession, signOut } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import ChatRow from './ChatRow';
// import ModelSelection from './ModelSelection';
import NewChat from './NewChat';

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session.user?.email!, 'chats'),
        orderBy('createdAt', 'desc')
      )
  );

  return (
    <div className='p-4 flex flex-col h-screen'>
      <div className='flex-1'>
        <div className='space-y-2'>
          <NewChat />
          {/* <div className='hidden sm:inline'>
            <ModelSelection />
          </div> */}
          <div className='flex flex-col space-y-2 my-2'>
            {loading && (
              <div className='animate-pulse text-center text-white'>
                <p>Loading Chats...</p>
              </div>
            )}

            {/* Map through the ChatRows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <div
          className='flex items-center space-x-5 cursor-pointer hover:bg-[#2B2C2F] rounded-lg px-4 py-2 transition-all duration-200 ease-out'
          onClick={() => signOut()}
        >
          <img
            src={session.user?.image!}
            alt='prof-pic'
            className='h-10 w-10 rounded-full'
          />
          <p className='text-white font-semibold text'>Log Out</p>
        </div>
      )}
    </div>
  );
};

export default SideBar;
