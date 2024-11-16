'use client';

import { useEffect } from 'react';
import Chat from '../../../components/Chat';
import ChatInput from '../../../components/ChatInput';
import { useSearchParams } from 'next/navigation';
type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');

  useEffect(() => {
    // Get the current URL
    const currentUrl = new URL(window.location as unknown as string);

    // Remove the `q` parameter
    currentUrl.searchParams.delete('q');

    // Update the address bar without reloading the page
    window.history.replaceState({}, '', currentUrl);
  }, []);

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Chat chatId={id} />
      <ChatInput chatId={id} query={query!} />
    </div>
  );
};

export default ChatPage;
