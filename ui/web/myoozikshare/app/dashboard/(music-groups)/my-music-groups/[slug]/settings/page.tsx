
import { getMyMusicGroup } from '@/app/lib/actions/music-groups';
import { MusicGroup } from '@/app/lib/definitions';
import DeleteMusicGroupForm from '@/app/ui/dashboard/music-groups/delete-music-group';
import GroupActionsMenu from '@/app/ui/dashboard/music-groups/group-actions-menu';
import UpdateGroupInfo from '@/app/ui/dashboard/music-groups/update-group-info';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';

const Page = async (props: {
    params: Promise < {
      slug: string
    } >
  }) => {
  const slug = (await props.params).slug;
  const musicGroup: MusicGroup = (await getMyMusicGroup(slug));    

  return (
    <>    
      <div className="">
        <div className='w-full fixed top-auto z-10 bg-gray-50 dark:bg-darkmenubg'>
          <div className='relative w-full flex justify-center items-center'>
            <div className={`${lusitana.className} p-2 font-bold`}>{musicGroup.group_name}</div>
            <div className='w-fit absolute end-1 '>
              <GroupActionsMenu slug={slug} musicGroup={musicGroup} />
            </div>
          </div>
        </div>
        <div className="mt-10 mb-2">
          <Link href={`/dashboard/my-music-groups/${musicGroup.id}`}
            className="w-fit flex justify-center items-center text-blue-500 hover:text-blue-400">
          <MdArrowBack />
          <span>Back</span>
          </Link>
        </div>        
        <UpdateGroupInfo slug={slug} musicGroup={musicGroup} />
      </div>
    </>
  );
}

export default Page;