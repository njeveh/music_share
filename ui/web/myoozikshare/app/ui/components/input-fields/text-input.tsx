
const TextInput = ({label = '', customClasses = '', onChange = (event: any) => {}, value = '', ...props}) => {
  return (
    <>
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id ? props.id : ''}
            className="mb-3 mt-5 block text-sm font-medium"
          >
            {label}:
          </label>
        )}
        <input
          className={`${customClasses} peer block w-full rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 dark:bg-slate-600 dark:placeholder:text-gray-100`}
          {...props}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
};

export default TextInput;
