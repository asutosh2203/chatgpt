import { DocumentData } from 'firebase/firestore';

const Message = ({ message }: { message: DocumentData }) => {
  const isChatGPT =
    message._document.data.value.mapValue.fields.user.mapValue.fields._id
      .stringValue === 'chat-gpt';
  return isChatGPT ? (
    <div className='py-5 text-white bg-[#434654]'>
      <div className='flex space-x-5 px-6 md:px-10 max-w-3xl mx-auto justify-between'>
        <p className='pt-1 text-right flex-1 text-sm md:text-base'>
          {message._document.data.value.mapValue.fields.text.stringValue}
        </p>
        <img
          src={
            message._document.data.value.mapValue.fields.user.mapValue.fields
              .avatar.stringValue
          }
          alt='avatar'
          className='h-8 w-8 rounded-full'
        />
      </div>
    </div>
  ) : (
    <div className='py-5 text-white'>
      <div className='flex space-x-5 px-10 max-w-3xl mx-auto'>
        <img
          src={
            message._document.data.value.mapValue.fields.user.mapValue.fields
              .avatar.stringValue
          }
          alt='avatar'
          className='h-8 w-8 rounded-full'
        />
        <p className='pt-1 text-sm md:text-base'>
          {message._document.data.value.mapValue.fields.text.stringValue}
        </p>
      </div>
    </div>
  );
};

export default Message;
