import { KeyIcon } from "@heroicons/react/24/outline";

const PasswordInput = ({label = '', customClasses = '', description = '', onChange = (event: any) => {}, value = '', ...props}) => {
  return (
    <>
      <div className="w-full">
        {label && (
        <label htmlFor={props.id ? props.id : '' } className="mb-1 mt-4 block text-sm font-medium">
          {label}:
        </label>
        )}
        <div className="text-amber-500">{description}</div>
        <div className="relative">
          <input className={`${customClasses} peer block w-full rounded-md border border-gray-200 py-[9px] pl-7 text-sm
            outline-2 placeholder:text-gray-500 dark:bg-slate-600 dark:placeholder:text-gray-100`} id="password"
            type="password" name="password" value={value} onChange={onChange} placeholder="Enter password" required
            minLength={6} />
          <KeyIcon
            className="pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
