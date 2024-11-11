'use client';

import { BsSearch } from "react-icons/bs";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from "react";
import { MdClose } from "react-icons/md";


const SearchForm = () => {
  const [searchValue, setSearchValue] =  useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlechange(e: any) {
    setSearchValue(e.target.value)
  }

  function clearSearch() {
    const params = new URLSearchParams(searchParams);
    setSearchValue('');
    params.set('page', '1');
    params.delete('query');
    replace(`${pathname}?${params.toString()}`);  
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (searchValue) {
      params.set('query', searchValue);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);   
  }

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <form onSubmit={e => {handleSearch(e)}} className="max-w-2xl flex flex-1 flex-row search-form">
          <div className="w-full relative">
            <input type="text" id="search-input" className="h-10 w-full rounded-tl-lg rounded-bl-lg dark:bg-slate-600 dark:placeholder:text-gray-300"
              name="searchValue" placeholder="Search ..." value={searchValue} onChange={e => {handlechange(e)}} />
        { searchValue &&
          <button type="button" onClick={clearSearch}
            className="absolute right-2 top-1/2 h-[28px] w-[28px] -translate-y-1/2 text-gray-500 dark:text-gray-100 peer-focus:text-gray-900"
          >
            <MdClose className="text-3xl" />
          </button>
        }
          </div>
          <button type="submit"
            className="h-10 flex justify-center items-center w-16 bg-slate-600 p-2 rounded-tr-lg rounded-br-lg ">
            <BsSearch />
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchForm;