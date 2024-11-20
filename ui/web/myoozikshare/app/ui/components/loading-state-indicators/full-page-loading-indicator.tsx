import { Spinner } from "../animators";

const FullPageLoadingIndicator = () => {
  return (
    <>
    <div className="z-10 fixed inset-0 transition-opacity">
      <div
        className="absolute inset-0 bg-black opacity-50 flex justify-center items-center"
        tabIndex={0}
        >
          <Spinner customClasses="w-24 h-24 lg:w-64 lg:h-64" />
        </div>
    </div>
    </>
  );
}
export default  FullPageLoadingIndicator;