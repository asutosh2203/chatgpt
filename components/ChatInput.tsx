'use client';

import { FaRegPaperPlane, FaMicrophone } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-hot-toast';
import ModelSelection from './ModelSelection';
import useSWR from 'swr';

const ChatInput = ({ chatId }: { chatId: string }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const inputRef = useRef(
    document.getElementById('input_text') as HTMLInputElement
  );
  const { data: session } = useSession();

  // handles speech to text using the web speech API
  const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window;
  const recognition = new (window as any).webkitSpeechRecognition();
  const handleSpeechRecognition = () => {
    recognition.stop();
    recognition.interimResults = true;
    recognition.profanityFilter = false;
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };
    recognition.start();
    inputRef.current!.focus();
  };

  // const { data: model } = useSWR('model', {
  //   fallbackData: 'text-davinci-003',
  // });

  const model = 'gpt-3.5-turbo';
  // const model = 'text-davinci-003';

  const sendMessage = async () => {
    if (!inputValue) return;

    const input = inputValue.trim();
    setInputValue('');
    if (!input) return;

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

    // Toast notification for loading
    const notification = toast.loading('ChatGPT is thinking...');

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast notification to say successful
      toast.success('ChatGPT got you!', { id: notification });
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  return (
    <div
      className='bg-gray-700/50 text-white rounded-lg text-sm m-4'
      id='chat_input'
    >
      <div className='px-5 py-2 space-x-3 flex items-center'>
        <input
          className='bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
          id='input_text'
          disabled={!session}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Let's get chummy!"
          onKeyDown={(e) => {
            if (e.key == 'Enter') {
              sendMessage();
            }
          }}
          ref={inputRef}
        />
        {isSpeechRecognitionSupported && (
          <button
            disabled={!isSpeechRecognitionSupported}
            onClick={handleSpeechRecognition}
            className={`p-3 rounded-full transition-all duration-200 flex items-center justify-center ${
              isListening && 'bg-white'
            } ${!isListening && 'hover:bg-gray-800'}`}
          >
            <FaMicrophone
              className={`h-4 w-4 ${isListening && 'text-black'}`}
            />
          </button>
        )}
        <button
          disabled={!inputValue || !session}
          className='hover:bg-gray-800 p-3 rounded-full transition-all duration-200 disabled:hover:bg-transparent disabled:cursor-not-allowed'
          onClick={() => sendMessage()}
        >
          <FaRegPaperPlane className='h-4 w-4' />
        </button>
      </div>

      {/* <div className='md:hidden text-black'>
        <ModelSelection />
      </div> */}
    </div>
  );
};

export default ChatInput;
