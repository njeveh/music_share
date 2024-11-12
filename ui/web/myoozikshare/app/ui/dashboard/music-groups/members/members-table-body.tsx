import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { getFilteredMusicGroupMembers } from "@/app/lib/actions/music-groups";
import { MusicGroup, MusicGroupMember, PaginatedGroupMembers } from "@/app/lib/definitions";
import Pagination from "../pagination";
import { Button } from "@/components/ui/button";
import GroupMemberActions from "./group-member-actions";
import LeaveGroupButton from "../leave-group-button";

const MembersTableBody = async ({
  musicGroup,
  slug,
  query,
  currentPage,
}: {
  musicGroup: MusicGroup;
  slug: any;
  query: string;
  currentPage: number;
}) => {
  const musicGroupMembers: PaginatedGroupMembers | null = (await getFilteredMusicGroupMembers(slug, query, currentPage));
    // const musicGroups: MusicGroup[] | null = (await getMusicGroups()).data;

  return (
    <>
      <TableBody>
        { (musicGroupMembers == null) && (
        <TableRow>
          <TableCell colSpan={2}>There are no music groups available currently.</TableCell>
        </TableRow>
        )}
            <TableRow>
              <TableCell className="px-2 w-fit whitespace-normal font-bold">You</TableCell>
              <TableCell className="px-2 w-fit whitespace-normal">
                {musicGroup.is_creator? <span className="text-green-500">Creator/Admin/Super Admin</span> :
                  musicGroup.is_super_admin? <span className="text-amber-500">Super Admin</span> :
                  musicGroup.is_admin? <span className="text-blue-500">Admin</span> :
                  <span className="text-gray-400 dark:text-gray-300">Member</span>
                }
                </TableCell>
                <TableCell className="px-2 text-right">
                  <LeaveGroupButton slug={slug} musicGroup={musicGroup} />
                </TableCell>
            </TableRow>
        { ( musicGroupMembers.data !== null) && (
          <>
            {musicGroupMembers.data.map((musicGroupMember: MusicGroupMember, key: any) => (
            <TableRow key={musicGroupMember.id}>
              <TableCell className="px-2 w-fit whitespace-normal">{musicGroupMember.name}</TableCell>
              <TableCell className="px-2 w-fit whitespace-normal">
                {musicGroupMember.is_creator? <span className="text-green-500">Creator/Admin/Super Admin</span> :
                  musicGroupMember.is_super_admin? <span className="text-amber-500">Super Admin</span> :
                  musicGroupMember.is_admin? <span className="text-blue-500">Admin</span> :
                  <span className="text-gray-400 dark:text-gray-300">Member</span>
                }
                </TableCell>
                <TableCell className="px-2 text-right">
                  {musicGroup.is_admin &&
                  <GroupMemberActions slug={slug} musicGroup={musicGroup}
                    musicGroupMember={musicGroupMember} />
                  }
                </TableCell>
            </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}>
                <div className="mt-5 flex w-full justify-center">
                  <Pagination totalPages={musicGroupMembers.totalPages} currentPage={currentPage} />
                </div>
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </>
  );
}

export default MembersTableBody;