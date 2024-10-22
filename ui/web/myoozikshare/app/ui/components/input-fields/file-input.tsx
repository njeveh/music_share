
const FileInput = ({label = '', description = '', customClasses = '', onChange = (event: any) => {}, ...props}) => {
  return (
    <>
      <div className={`w-full ${customClasses}`}>
        {label && (
          <label
            htmlFor={props.id ? props.id : ''}
            className="mb-1 mt-4 block text-sm font-medium"
          >
            {label}:
          </label>
        )}
        <div className="text-amber-500">{description}</div>
        <input type="file"
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-600 dark:placeholder:text-gray-100"
          {...props}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default FileInput;
