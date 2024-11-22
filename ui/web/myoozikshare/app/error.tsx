'use client';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Optionally log the error to an error reporting service
  //   console.error(error);
  // }, [error]);
 
  return (
    <>
      <main className="px-2 pb-[100px]">
        <div className='flex h-[100vh] flex-col items-center justify-center'>
          <h2 className="text-center">{error.message}</h2>
          <button
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            onClick={
              // Attempt to recover by trying to re-render the route
              () => {location.reload();}
            }
          >
            Try again
          </button>         
        </div>
      </main>
    </>
  );
}