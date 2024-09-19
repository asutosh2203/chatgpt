"use client";

import { BsLightningCharge, BsArrowRightShort, BsSun } from "react-icons/bs";
import { RxExclamationTriangle } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createNewChat } from "../utils/commonFunctions";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-2 text-white">
      <h1 className="text-5xl font-bold mb-20">ChatGPT Messenger</h1>
      <div className="flex space-x-4 text-center">
        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BsSun className="h-6 w-6 m-2" />
            <h2>Examples</h2>
          </div>
          <div className="space-y-4">
            <p
              className="infoText cursor-pointer hover:bg-[#202123]"
              onClick={() => {
                createNewChat(
                  session,
                  router,
                  "Explain quantum computing in simple terms"
                );
              }}
            >
              "Explain quantum computing in simple terms" →
            </p>
            <p
              className="infoText cursor-pointer hover:bg-[#202123]"
              onClick={() => {
                createNewChat(
                  session,
                  router,
                  "Got any creative ideas for a 10 year old's birthday?"
                );
              }}
            >
              "Got any creative ideas for a 10 year old's birthday?" →
            </p>
            <p
              className="infoText cursor-pointer hover:bg-[#202123]"
              onClick={() => {
                createNewChat(
                  session,
                  router,
                  "How do I make an HTTP request in Javascript?"
                );
              }}
            >
              "How do I make an HTTP request in Javascript?" →
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <BsLightningCharge className="h-6 w-6 m-2" />
            <h2>Capabilities</h2>
          </div>
          <div className="space-y-4">
            <p className="infoText">
              Remembers what user said earlier in the conversation
            </p>
            <p className="infoText">
              Allows user to provide follow-up corrections
            </p>
            <p className="infoText">
              Trained to decline inappropriate requests
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col items-center justify-center mb-5">
            <RxExclamationTriangle className="h-6 w-6 m-2" />
            <h2>Limitations</h2>
          </div>
          <div className="space-y-4">
            <p className="infoText">
              May occasionally generate incorrect information
            </p>
            <p className="infoText">
              May occasionally produce harmful instructions or biased content
            </p>
            <p className="infoText">
              Limited knowledge of world and events after 2021
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
