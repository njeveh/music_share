const Page = () => {
  return (
    <>
    <div className="flex justify-center items-center">
      <button style={{animation: 'spin 1s linear infinite', transitionDelay: '150ms', animationDelay: '150ms', transitionDuration: '150ms', animationDuration: '150ms'}}>
        Button A</button>
      <button className="animate-spin-slow delay-300 duration-300 ...">Button B</button>
      <button className="animate-bounce delay-700 duration-300 ...">Button C</button>
    </div>
    <div className="flex justify-center items-center">
      <div className="animate-spin-slow bg-blue-500 h-16 w-16"></div>
    </div>
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>    
    </>
  );
}
export default Page;