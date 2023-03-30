import { DocumentData } from 'firebase/firestore';

const Message = ({ message }: { message: DocumentData }) => {
  const isChatGPT =
    message._document.data.value.mapValue.fields.user.mapValue.fields._id
      .stringValue === 'chat-gpt';

  type GptResponse = {
    stringValue: string;
  };

  const gptResponseArray: GptResponse[] =
    message._document.data.value.mapValue.fields.text.arrayValue?.values;

  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className='flex space-x-5 px-10 max-w-3xl mx-auto'>
        <img
          src={
            message._document.data.value.mapValue.fields.user.mapValue.fields
              .avatar.stringValue
          }
          alt='avatar'
          className='h-8 w-8 rounded-full select-none'
        />
        {isChatGPT ? (
          <div>
            {gptResponseArray &&
              gptResponseArray.map((responseMessage, index) => (
                <p key={index} className='pt-1'>
                  {responseMessage.stringValue}
                </p>

                //for DALL-E
                // <img src={responseMessage.stringValue} />
              ))}
          </div>
        ) : (
          <p>{message._document.data.value.mapValue.fields.text.stringValue}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
