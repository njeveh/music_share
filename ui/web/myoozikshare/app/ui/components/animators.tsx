export function Spinner({customClasses}: {customClasses: string}) {
  return (
      <div className={`${customClasses} border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin`}></div>
  );
}

export function BouncingDotsAnnimator({customClasses}: {customClasses: string}) {
  return (
    <>
      <div className="flex justify-center space-x-1">
        <div className="w-4 h-4 bg-red-500
                        rounded-full animate-bounce">
        </div>
        <div className="w-4 h-4 bg-green-500
                        rounded-full animate-bounce
                        delay-100">
        </div>
        <div className="w-4 h-4 bg-blue-500
                        rounded-full animate-bounce
                        delay-200">
        </div>
      </div>
    </>
  );
}

export function PingAnimator({customClasses}: {customClasses: string}) {
  return (
    <>
      <div className="flex justify-center">
        <div className={`${customClasses}bg-blue-500
                    rounded-full animate-ping`}>
        </div>
      </div>
    </>
  );
}