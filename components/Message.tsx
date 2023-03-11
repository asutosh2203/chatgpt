import { DocumentData } from 'firebase/firestore';

const Message = ({ message }: { message: DocumentData }) => {
  const isChatGPT =
    message._document.data.value.mapValue.fields.user.mapValue.fields._id
      .stringValue === 'chat-gpt';
  return (
    <div className={`py-5 text-white ${isChatGPT && 'bg-[#434654]'}`}>
      <div className='flex space-x-5 px-10 max-w-2xl mx-auto'>
        <img
          src={
            message._document.data.value.mapValue.fields.user.mapValue.fields
              .avatar.stringValue
          }
          alt='avatar'
          className='h-8 w-8'
        />
        <p className='pt-1 text-sm'>
          {message._document.data.value.mapValue.fields.text.stringValue}
        </p>
      </div>
    </div>
  );
};

export default Message;
