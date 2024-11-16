import { DocumentData } from "firebase/firestore";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "./Message.css";

const Message = ({ message }: { message: DocumentData }) => {
  const isBot = message.user._id === "g-gem";

  let gptResponseArray
  if (isBot) {
    gptResponseArray = message.text;
    // gptResponseArray = gptResponseArray.filter((str) => str.trim() !== "");
  }

  // console.log(gptResponseArray);

  return (
    <div className={`py-5 text-white`}>
      <div
        className={`flex space-x-5  max-w-3xl mx-auto ${
          !isBot && "flex-row-reverse"
        }`}
      >
        {isBot && (
          <img
            src={message.user.avatar}
            alt="avatar"
            className="h-8 w-8 rounded-full select-none"
          />
        )}
        {isBot ? (
          <div className="max-w-full">
            {/* {gptResponseArray &&
              gptResponseArray.map((responseMessage, index) => (
                <p
                  key={index}
                  className="pt-1 bg-[#151617] px-5 py-2 rounded-3xl max-w-[80%] mb-1"
                >
                  <Markdown className={"max-w-full"}>
                    {gptResponseArray}
                  </Markdown>
                </p>

                //for DALL-E
                // <img src={responseMessage.stringValue} />
              ))} */}
               <div
                  className="bg-[#151617] p-5 rounded-3xl max-w-[90%] mb-1 "
                  id="bot-response"
                >
                  <Markdown  remarkPlugins={[remarkGfm]} className={""}>
                  {gptResponseArray}
                  </Markdown>
                </div>
          </div>
        ) : (
          <p className="bg-[#333538] px-5 py-2 rounded-3xl max-w-[80%]">
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
