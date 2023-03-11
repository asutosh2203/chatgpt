'use client';

import { FaRegPaperPlane } from 'react-icons/fa';
import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ChatInput = ({ chatId }: { chatId: string }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { data: session } = useSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;

    const input = inputValue.trim();
    setInputValue('');

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        chatId,
        'messages'
      ),
      message
    );
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  return (
    <div className='bg-gray-700/50 text-white rounded-lg text-sm'>
      <form className='px-5 py-2 space-x-5 flex' onSubmit={sendMessage}>
        <input
          className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
          disabled={!session}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Let's get chummy!"
        />
        <button
          disabled={!inputValue || !session}
          className='hover:bg-gray-800 p-3 rounded-full transition-all duration-200 disabled:hover:bg-transparent disabled:cursor-not-allowed'
          type='submit'
        >
          <FaRegPaperPlane className='h-4 w-4' />
        </button>
      </form>

      <div>{/* ModelSelection */}</div>
    </div>
  );
};

export default ChatInput;
