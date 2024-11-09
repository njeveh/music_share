import { BsSearch } from "react-icons/bs";

const SearchForm = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center py-2">
        <form className="max-w-2xl flex flex-1 flex-row search-form">
          <input type="text" id="search-input" className="h-10 w-full rounded-tl-lg rounded-bl-lg dark:bg-slate-600"
            name="searchValue" placeholder="Search for group ..." />
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