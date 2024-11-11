"use client";
import "./nav.css";
import React, {
  useEffect,
  useState
} from "react";
import NavLinks from "../nav-links";
import {
  GiHamburgerMenu
} from "react-icons/gi";
import {
  BsSearch,
} from "react-icons/bs";
import { ModeToggle } from "../../components/mode-toggler";
import { usePathname } from "next/navigation";
import { logo } from "../../fonts";
import { ArrowRightStartOnRectangleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import clsx from "clsx";
import { getSession, logOut } from "@/app/lib/actions/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [authSession, setAuthSession] = useState<Session | null>();
  const { data: session} = useSession();

  useEffect(()=>{
    getSession().then((res) => {
      setAuthSession(res);
    });
    setIsOpen(false);
  },[pathName, session]);


  useEffect(() => {
    const handleEscKeyPress = (e: {
      keyCode: number;
    }) => {
      if (e.keyCode === 27 && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isOpen]);

  const handleDrawer = () => {
      setIsOpen(!isOpen);
  };
return (
<nav className="sticky top-0 w-full px-4 border-b z-20 bg-gray-50 dark:bg-darkmenubg">
  <div className="flex w-full items-center justify-between py-2">
    <div className="flex items-center">
      <button className="mr-4" aria-label="Open Menu" onClick={handleDrawer}>
        <GiHamburgerMenu className="text-3xl" />
      </button>
      <div className={`${logo.className} font-bold text-xl`}>MyooZikshare</div>
    </div>
{
  pathName === '/dashboard/my-music' &&
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
}

    <div className="flex items-center">
      <ModeToggle />
    </div>
  </div>
  {
    pathName === '/dashboard/my-music' &&
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
  }

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
    <div className="px-4 py-2 flex items-center border-b">
      <button className="mr-4" aria-label="Close Menu" onClick={handleDrawer}>
        <GiHamburgerMenu className="text-3xl" />
      </button>
      <div className={`${logo.className} font-extrabold text-lg`}>MyooZikshare</div>
    </div>
    <NavLinks />
    <div className="fixed bottom-0 w-full">
      <Accordion type="single" collapsible className="p-4 border-none">
        <AccordionItem value="item-2" className='border-none'>
          <div className="w-fit flex justify-center items-center gap-2">
            <AccordionTrigger className='py-2'>
              <div className='flex gap-2 md:gap-4 justify-center items-center'>
                <UserCircleIcon className="w-10" />
                <span>{authSession?.user.userName || authSession?.user?.firstName}</span>
              </div>
            </AccordionTrigger>
          </div>
          <AccordionContent>
            <Link
                href={'/dashboard/profile'}
                className={clsx('m-2 flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-gray-50 dark:bg-inherit p-2 text-sm font-medium hover:bg-sky-100 dark:hover:bg-[#717171] hover:text-blue-600 dark:hover:text-white md:flex-none md:justify-start',
                  {
                      'bg-sky-100 dark:bg-[#7e7d7d] text-blue-600 dark:text-white': pathName === '',
                    })
                  }
              >
              <UserCircleIcon className="w-6" />
              <p className="">Profile</p>
            </Link>
            <form
              action={logOut}
              className=""
            >
              <button className="w-full m-2 flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-gray-50 dark:bg-inherit p-2 text-sm font-medium hover:bg-sky-100 dark:hover:bg-[#717171] hover:text-blue-600 dark:hover:text-white md:flex-none md:justify-start">
                <ArrowRightStartOnRectangleIcon className="w-6" />
                <p className="">Sign Out</p>
              </button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </aside>
</nav>
);
};

export default Nav;