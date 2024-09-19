"use client";

import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";
import { useSearchParams } from "next/navigation";
type Props = {
  params: {
    id: string;
  };
};

const ChatPage = ({ params: { id } }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q");
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />
      <ChatInput chatId={id} query={query!}/>
    </div>
  );
};

export default ChatPage;
