import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const PasswordInput = ({label = '', customClasses = '', description = '', placeholder="Enter password", onChange = (event: any) => {}, value = '', required = false, ...props}) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div className="w-full">
        {label && (
        <label htmlFor={props.id ? props.id : '' } className="mb-1 mt-4 block text-sm font-medium">
          {label}:{required && <span className="text-red-600">*</span>}
        </label>
        )}
        <div className="text-amber-500">{description}</div>
        <div className="relative">
          <input className={`${customClasses} peer block w-full rounded-md border border-gray-200 py-[9px] pl-7 text-sm
            outline-2 placeholder:text-gray-500 dark:bg-slate-600 dark:placeholder:text-gray-100`}
            type={isVisible? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} required
            minLength={6} {...props} />
          <KeyIcon
            className="pointer-events-none absolute left-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        { !isVisible?
          <button type="button" onClick={(e) => {setIsVisible(true)}}
            className="absolute right-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          >
            <EyeIcon />
          </button>
          :
          <button type="button" onClick={(e) => {setIsVisible(false)}}
            className="absolute right-2 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
          >
            <EyeSlashIcon />
          </button>
        }
         </div>
      </div>
    </>
  );
};

export default PasswordInput;
