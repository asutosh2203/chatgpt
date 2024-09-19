"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { BsPlus } from "react-icons/bs";
import { createNewChat } from "../utils/commonFunctions";
import { useState } from "react";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);

  return (
    <div
      onClick={() => createNewChat(session, router, "", setLoading)}
      className="border border-gray-700 chatRow"
    >
      <BsPlus />
      {loading ? (
        <p className="animate-pulse text-center text-white">
          Opening new chat...
        </p>
      ) : (
        <p>New Chat</p>
      )}
    </div>
  );
};

export default NewChat;
