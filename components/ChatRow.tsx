"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RiChat1Line, RiDeleteBin6Line } from "react-icons/ri";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const ChatRow = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats", id, "messages"),
        orderBy("createdAt", "asc")
      )
  );
  const responseMessageFields = (
    messages?.docs[messages?.docs.length - 1] as any
  )?._document.data.value.mapValue.fields;
  useEffect(() => {
    // checks if pathname is there, else return
    if (!pathname) return;

    // sets active state of the chat depending on the current chat
    setActive(pathname.includes(id));
  }, [pathname, responseMessageFields]);

  const removeChat = async () => {
    try {
      await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    } catch (error) {
      console.log(error);
    }
    router.replace("/");
  };



console.log(responseMessageFields?.text.stringValue)

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center ${active && "bg-gray-700/50"}`}
    >
      <RiChat1Line className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">
        {(responseMessageFields?.user.mapValue.fields._id.stringValue ===
        "g-gem"
          ? responseMessageFields?.text.arrayValue?.values[0].stringValue.slice(
              0,
              31
            ) + "..."
          : responseMessageFields?.text.stringValue.slice(0, 31)) ||
          `New Chat`}
      </p>
      <RiDeleteBin6Line
        onClick={removeChat}
        className={`h-5 w-5 text-gray-300 hover:text-red-600 ${
          !active && "hidden"
        }`}
      />
    </Link>
  );
};

export default ChatRow;
