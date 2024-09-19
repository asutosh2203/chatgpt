import { DocumentData } from "firebase/firestore";
import Markdown from "react-markdown";

const Message = ({ message }: { message: DocumentData }) => {
  const isChatGPT = message.user._id === "g-gem";

  let gptResponseArray: string[] = [];
  if (isChatGPT) {
    gptResponseArray = message.text;
  }

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-3xl mx-auto">
        <img
          src={message.user.avatar}
          alt="avatar"
          className="h-8 w-8 rounded-full select-none"
        />
        {isChatGPT ? (
          <div className="max-w-full">
            {gptResponseArray &&
              gptResponseArray.map((responseMessage, index) => (
                <p key={index} className="pt-1 max-w-full">
                  <Markdown className={"max-w-full"}>
                    {responseMessage}
                  </Markdown>
                </p>

                //for DALL-E
                // <img src={responseMessage.stringValue} />
              ))}
          </div>
        ) : (
          <p>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
