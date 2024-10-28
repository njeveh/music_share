
const TextInput = (
  {label = '', customClasses = '', description = '', onChange = (event: any) => {}, value = '', required = false, ...props}
) => {
  return (
    <>
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id ? props.id : ''}
            className="mb-1 mt-4 block text-sm font-medium"
          >
            {label}:{required && <span className="text-red-600">*</span>}
          </label>
        )}
        <div className="text-amber-500">{description}</div>
        <input required={required}
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
