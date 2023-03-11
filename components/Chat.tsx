'use client';

import { collection, orderBy, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { BsArrowDownCircle } from 'react-icons/bs';
import { db } from '../firebase';
import Message from './Message';

const Chat = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          chatId,
          'messages'
        ),
        orderBy('createdAt', 'asc')
      )
  );

  // console.log(messages?.docs[1]);

  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden'>
      {messages?.empty && (
        <>
          <p className='mt-10 text-center text-white'>
            Type a question to get your answers!
          </p>
          <BsArrowDownCircle className='h-10 w-10 mx-auto mt-5 text-white animate-bounce' />
        </>
      )}
      {messages?.docs.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </div>
  );
};

export default Chat;
