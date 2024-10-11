import {
    HomeIcon,
    ArrowRightEndOnRectangleIcon,
    ArrowRightStartOnRectangleIcon,
    UserPlusIcon,
    HandRaisedIcon,
    PhoneArrowUpRightIcon,
    InformationCircleIcon,
  } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
  import { MdOutlineContactPhone } from "react-icons/md";
  
  // Map of links to display in the side navigation.
  // Depending on the size of the application, this would be stored in a database.
  const links = [
    {
        name: 'Home',
        icon: HomeIcon,
        href: '/'
    },
    {
        name: 'Requests',
        icon: HandRaisedIcon,
        href: '/requests'
    },
    {
        name: 'About',
        icon: InformationCircleIcon,
        href: '/about'
    },
    {
        name: 'Contact Us',
        icon: MdOutlineContactPhone,
        href: '/contact-us'
    },
    {
        name: 'Sign up',
        icon: UserPlusIcon,
        href: '/auth/sign-up'
    },
    {
        name: 'Sign in',
        icon: ArrowRightEndOnRectangleIcon,
        href: '/auth/sign-in'
    },
    {
        name: 'Sign out',
        icon: ArrowRightStartOnRectangleIcon,
        href: '/'
    },
  ];
  
  export default function NavLinks() {
    const pathName = usePathname();
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <a
              key={link.name}
              href={link.href}
              className={clsx('m-2 flex h-[48px] grow items-center justify-start gap-2 rounded-md bg-gray-50 dark:bg-inherit p-2 text-sm font-medium hover:bg-sky-100 dark:hover:bg-[#717171] hover:text-blue-600 dark:hover:text-white md:flex-none md:justify-start',
                {
                    'bg-sky-100 dark:bg-[#7e7d7d] text-blue-600 dark:text-white': pathName === link.href,
                  })
                }
            >
              <LinkIcon className="w-6" />
              {/* <p className="hidden md:block">{link.name}</p> */}
              <p className="">{link.name}</p>
            </a>
          );
        })}
      </>
    );
  }
  