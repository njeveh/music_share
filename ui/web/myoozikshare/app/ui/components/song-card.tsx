import {
    BanknotesIcon,
    ClockIcon,
    UserGroupIcon,
    InboxIcon,
    MusicalNoteIcon,
  } from '@heroicons/react/24/outline';
  import { lusitana } from '@/app/ui/fonts';
import { BsMusicNote, BsMusicNoteBeamed, BsMusicNoteList, BsMusicPlayer } from 'react-icons/bs';
import { GiMusicalKeyboard, GiMusicalScore } from 'react-icons/gi';
import { MdLibraryMusic } from 'react-icons/md';
  
  const iconMap = {
    collected: BanknotesIcon,
    customers: UserGroupIcon,
    pending: ClockIcon,
    invoices: InboxIcon,
  };
  
  export default async function CardWrapper() {
    return (
      <>
        {/* NOTE: Uncomment this code in Chapter 9 */}
  
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </>
    );
  }
  
  export function SongCard({
    title,
  }: {
    title: string;

  }) {
  
    return (
    //   <div className="rounded-xl bg-gray-400 p-2 shadow-sm">
    //     <div className='w-full flex justify-center items-center'>
    //         <MdLibraryMusic className='w-20 h-20 text-amber-500' />
    //     </div>
    //     <div className="flex p-4">
    //       <h3 className="ml-2 text-sm font-medium">{title}</h3>
    //     </div>
    //   </div>
    <>
      <button
        className="scale-100 p-4 flex flex-col justify-start items-center mb-5 col-span-1 bg-slate-200 dark:bg-gray-900 rounded-2xl shadow-lg shadow-slate-300 motion-safe:hover:scale-[1.01] transition-all duration-250">
        <div className='w-full flex justify-center items-center'>
          <MdLibraryMusic className='w-20 h-20 md:w-32 md:h-32 text-amber-500' />
        </div>
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
      </button>
    </>
    );
  }
  