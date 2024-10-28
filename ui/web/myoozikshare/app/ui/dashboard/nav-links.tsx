import {
  UserGroupIcon,
  HomeIcon,
  HandRaisedIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { BsMusicNoteBeamed } from 'react-icons/bs';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'My music',
    href: '/dashboard/my-music',
    icon: BsMusicNoteBeamed,
  },
  {
    name: 'My music groups',
    href: '/dashboard/my-music-groups',
    icon: UserGroupIcon,
  },
  {
        name: 'Requests',
        icon: HandRaisedIcon,
        href: '/requests'
  }
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
            <p className="">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
