const NotFound = () => {
  return (
    <div className='flex flex-row min-h-screen justify-center items-center'>
      <p className='font-semibold text-4xl'>404</p>
      <div className='h-[50px] w-[1px] bg-primary mx-5 opacity-75'></div>
      <p className='opacity-75'>This page could not be found.</p>
    </div>
  );
};

export default NotFound;
