"use client";
import "./navbar.css";
import React, {
  useEffect,
  useState
} from "react";
import NavLinks from "../nav-links";
import {
  AiOutlineHome
} from "react-icons/ai";
import {
  GiHamburgerMenu
} from "react-icons/gi";
import {
  BsSearch,
  BsShare
} from "react-icons/bs";
import {
  ModeToggle
} from "../mode-toggler";
import {
  Button
} from "@/components/ui/button";
import {
  Input
} from "@/components/ui/input"


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
      setIsOpen(!isOpen);
    };

    useEffect(() => {
      const handleEscKeyPress = (e: {
        keyCode: number;
      }) => {
        if (e.keyCode === 27 && isOpen) {
          setIsOpen(false);
        }
      };

      // if (isOpen) {
      // // document.body.style.setProperty("overflow", "hidden");
      // // document.body.classList.add('lock-scrollbar');
      // } else {
      // // document.body.style.removeProperty("overflow");
      // // document.body.classList.remove('lock-scrollbar');
      // }

      document.addEventListener("keydown", handleEscKeyPress);

      return () => {
        document.removeEventListener("keydown", handleEscKeyPress);
      };
    }, [isOpen]);

return (
<nav className="sticky top-0 w-full px-4 border-b z-10 bg-gray-50 dark:bg-darkmenubg">
  <div className="flex w-full items-center justify-between py-2">
    <div className="flex items-center">
      <button className="mr-4" aria-label="Open Menu" onClick={handleDrawer}>
        <GiHamburgerMenu className="text-3xl" />
      </button>

      <img src="https://i.imgur.com/520zDfd.png" alt="Logo" className="h-auto w-24" />
    </div>

    <div className="hidden md:flex items-center flex-1 px-6">
      <form className="flex flex-row search-form w-full justify-center items-center">
        <input type="text" id="search-input" className="h-10 w-full max-w-[750px] rounded-tl-lg rounded-bl-lg dark:bg-slate-600"
          name="searchValue" placeholder="Search ..." />
        <button type="submit"
          className="h-10 flex justify-center items-center w-16 bg-slate-600 p-2 rounded-tr-lg rounded-br-lg ">
          <BsSearch />
        </button>
      </form>
    </div>

    <div className="flex items-center">
      {/* <div className="hidden md:flex md:justify-between md:bg-transparent">
        {navList.map(({ icon, title }, index) => {
        return (
        <Button key={index} title="Wishlist" className="p-3 font-medium mr-2 rounded">
          <span>{icon}</span>
          <span>{title}</span>
        </Button>
        );
        })}
      </div> */}
      <ModeToggle />
    </div>
  </div>
  <div className="flex md:hidden justify-center items-center w-full py-2">
    <form className="flex flex-1 flex-row search-form">
      <input type="text" id="search-input" className="h-10 w-full rounded-tl-lg rounded-bl-lg dark:bg-slate-600"
        name="searchValue" placeholder="Search ..." />
      <button type="submit"
        className="h-10 flex justify-center items-center w-16 bg-slate-600 p-2 rounded-tr-lg rounded-br-lg ">
        <BsSearch />
      </button>
    </form>
  </div>

  {isOpen && (
  <div className="z-10 fixed inset-0 transition-opacity">
    <div onClick={()=> setIsOpen(false)}
      className="absolute inset-0 bg-black opacity-50"
      tabIndex={0}
      ></div>
  </div>
  )}

  <aside className={`transform top-0 left-0 w-64 fixed h-full bg-gray-50 dark:bg-darkmenubg overflow-auto ease-in-out transition-all duration-300 z-30
    ${ isOpen ? "translate-x-0" : "-translate-x-full" }`}>
    {/* <span className="flex w-full items-center p-4 border-b">
      <img src="https://i.imgur.com/520zDfd.png" alt="Logo" className="h-auto w-32 mx-auto" />
    </span> */}
    <div className="px-4 py-2 flex items-center border-b">
      <button className="mr-4" aria-label="Close Menu" onClick={handleDrawer}>
        <GiHamburgerMenu className="text-3xl" />
      </button>

      <img src="https://i.imgur.com/520zDfd.png" alt="Logo" className="h-auto w-24" />
    </div>
    <NavLinks />
    <div className="fixed bottom-0 w-full">
      <button className="flex items-center p-4 bg-blue-500 hover:bg-blue-600 w-full">
        <span className="mr-2">
          <BsShare className="text-2xl" />
        </span>

        <span>Share</span>
      </button>
    </div>
  </aside>
</nav>
);
};

export default Navbar;