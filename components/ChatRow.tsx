'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { RiChat1Line, RiDeleteBin6Line } from 'react-icons/ri';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

const ChatRow = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
        orderBy('createdAt', 'asc')
      )
  );

  useEffect(() => {
    // checks if pathname is there, else return
    if (!pathname) return;

    // sets active state of the chat depending on the current chat
    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
    router.replace('/');
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && 'bg-gray-700/50'}`}
    >
      <RiChat1Line className='h-5 w-5' />
      <p className='flex-1 hidden md:inline-flex truncate'>
        {messages?.docs[messages?.docs.length - 1]?._document.data.value
          .mapValue.fields.text.stringValue || 'New Chat'}
      </p>
      <RiDeleteBin6Line
        onClick={removeChat}
        className={`h-5 w-5 text-gray-300 hover:text-red-600 ${
          !active && 'hidden'
        }`}
      />
    </Link>
  );
};

export default ChatRow;
