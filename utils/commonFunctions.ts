import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { Session } from "next-auth";
import { db } from "../firebase";

const createNewChat = async (
  session: Session | null,
  router: any,
  query: string = "", // used only from the home page
  setLoading?: any
) => {
  setLoading && setLoading(true);
  addDoc(collection(db, "users", session?.user?.email!, "chats"), {
    userId: session?.user?.email!,
    createdAt: serverTimestamp(),
  })
    .then((doc) => {
      if (query !== "") {
        query = `?q=${query}`;
      }
      router.push(`/chat/${doc.id}${query}`);
      setLoading && setLoading(false);
    })
    .catch((err) => {
      setLoading && setLoading(false);
    });
};

const getMessageFromChat = async (
  chatId: string,
  emailId: string,
  orderByParam: string,
  order: "desc" | "asc" = "asc"
) => {
  const messagesCollectionRef = collection(
    db,
    "users",
    emailId,
    "chats",
    chatId,
    "messages"
  );
  const messagesCollection = query(
    messagesCollectionRef,
    orderBy(orderByParam, order)
  );
  return getDocs(messagesCollection).then((res) => {
    return res;
  });
};

const toastArray = [
  {
    loading: "Activating brain power...",
    loaded: "Okay that's enough power",
  },
  { loading: "Filling up your cup...", loaded: "Here's your tea" },
  { loading: "Get ready to have your mind blown...", loaded: "BOOM!" },
  { loading: "Coffee break required...", loaded: "Okay, I am back" },
  { loading: "Hold your horses...", loaded: "Not so tightly" },
  { loading: "Heating up the engines...", loaded: "Toasted" },
  {
    loading: "Thinking... harder than usual",
    loaded: "Behold, the answer you seek!",
  },
  {
    loading: "Spinning the wheels of genius...",
    loaded: "And voilà, genius achieved!",
  },
  {
    loading: "Dialing up the smartness...",
    loaded: "Smartness level: Expert!",
  },
  {
    loading: "Consulting the crystal ball...",
    loaded: "The future looks bright and clear!",
  },
  {
    loading: "Warming up the brain cells...",
    loaded: "Brain cells fully caffeinated!",
  },
  {
    loading: "Engaging superpowers...",
    loaded: "Superpowers fully activated!",
  },
  {
    loading: "Hunting down the answers...",
    loaded: "Caught 'em all, answers secured!",
  },
  {
    loading: "Running the magic spell...",
    loaded: "Abracadabra, it's done!",
  },
  {
    loading: "Unleashing the inner nerd...",
    loaded: "Nerd level: Unstoppable!",
  },
  {
    loading: "Feeding the algorithm...",
    loaded: "Algorithm is now a genius!",
  },
  {
    loading: "Charging the brain battery...",
    loaded: "Battery at full brainpower!",
  },
  {
    loading: "Sifting through the chaos...",
    loaded: "Chaos organized and ready to go!",
  },
  {
    loading: "Tickling the data until it laughs...",
    loaded: "Data’s laughing and ready!",
  },
  {
    loading: "Plotting world domination...",
    loaded: "Just kidding, but the data is ready!",
  },
  {
    loading: "Tuning the sarcasm meter...",
    loaded: "Sarcasm meter set to 'high'!",
  },
  {
    loading: "Baking the answers...",
    loaded: "Freshly baked and served warm!",
  },
  {
    loading: "Consulting the oracle...",
    loaded: "The oracle says: All systems go!",
  },
  {
    loading: "Performing a digital rain dance...",
    loaded: "Rain dance successful, all set!",
  },
  {
    loading: "Unraveling the mysteries of the universe...",
    loaded: "Mysteries unraveled, universe still intact!",
  },
  {
    loading: "Squeezing the data for juicy bits...",
    loaded: "Juicy bits extracted and ready!",
  },
];

export { createNewChat, getMessageFromChat, toastArray };
