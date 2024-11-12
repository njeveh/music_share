import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { getFilteredMusicGroups } from "@/app/lib/actions/music-groups";
import { MusicGroup, PaginatedGroupsReturnData } from "@/app/lib/definitions";
import Pagination from "./pagination";
import MembershipStatus from "./membership-status";

const MusicGroupsTableBody = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const musicGroups: PaginatedGroupsReturnData | null = (await getFilteredMusicGroups(query, currentPage));
  return (
    <>
      <TableBody>
        { (musicGroups == null) && (
        <TableRow>
          <TableCell colSpan={2}>There are no music groups available currently.</TableCell>
        </TableRow>
        )}

        { ( musicGroups.data !== null) && (
          <>
            {musicGroups.data.map((musicGroup: MusicGroup, key: any) => (
            <TableRow key={musicGroup.id}>
              <TableCell className="px-2 w-fit whitespace-normal">{musicGroup.group_name}</TableCell>
              <TableCell className="px-2 text-right">
                {musicGroup.is_a_member? <span className="text-green-500">Member</span> :
                  musicGroup.membership_request_status == 'denied'? <span className="text-red-500">Requested; Denied</span> :
                  musicGroup.membership_request_status == 'pending'? <span className="text-gray-400 dark:text-gray-300">Requested; Pending</span> : <MembershipStatus musicGroupId={musicGroup.id} />
                }
                </TableCell>
            </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}>
                <div className="mt-5 flex w-full justify-center">
                  <Pagination totalPages={musicGroups.totalPages} currentPage={currentPage} />
                </div>
              </TableCell>
            </TableRow>
          </>
        )}
      </TableBody>
    </>
  );
}

export default MusicGroupsTableBody;