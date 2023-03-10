import NewChat from './NewChat';

const SideBar = () => {
  return (
    <div className='p-4 flex flex-col h-screen'>
      <div className='flex-1'>
        <div>
          <NewChat />
          <div>{/* ModelSelection */}</div>

          {/* Map through the ChatRows */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
