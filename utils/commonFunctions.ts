import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Session } from 'next-auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { db } from '../firebase';

const createNewChat = async (
  session: Session | null,
  router: AppRouterInstance
) => {
  const doc = await addDoc(
    collection(db, 'users', session?.user?.email!, 'chats'),
    {
      userId: session?.user?.email!,
      createdAt: serverTimestamp(),
    }
  );

  router.push(`/chat/${doc.id}`);
};

export { createNewChat };
