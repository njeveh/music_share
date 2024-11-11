import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { getFilteredMusicGroupMembershipRequests } from "@/app/lib/actions/music-groups";
import { MusicGroup, MusicGroupMembershipRequest, PaginatedGroupMembershipRequest } from "@/app/lib/definitions";
import Pagination from "../pagination";
import GroupMembershipRequestActions from "./group-membership-request-actions";

const MembershipRequestsTableBody = async ({
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
  const musicGroupMembershipRequests: PaginatedGroupMembershipRequest | null = (await getFilteredMusicGroupMembershipRequests(slug, query, currentPage));
  return (
    <>
      <TableBody>
        { (musicGroupMembershipRequests == null) && (
        <TableRow>
          <TableCell colSpan={3}>There are no music groups available currently.</TableCell>
        </TableRow>
        )}

        { ( musicGroupMembershipRequests.data !== null) && (
        <>
          {musicGroupMembershipRequests.data.map((musicGroupMembershipRequest: MusicGroupMembershipRequest, key: any) =>
          (
          <TableRow key={musicGroupMembershipRequest.id}>
            <TableCell className="px-2 w-fit whitespace-normal">{musicGroupMembershipRequest.name}</TableCell>
            <TableCell className="px-2 w-fit whitespace-normal">
              {musicGroupMembershipRequest.status == 'rejected'? <span className="text-red-500">Rejected</span> :
              musicGroupMembershipRequest.status == 'pending'? <span className="text-amber-500">pending</span>:
              musicGroupMembershipRequest.status == 'accepted'? <span className="text-green-500">accepted</span>:
              <span className="text-gray-400 dark:text-gray-300">---------</span>
              }
            </TableCell>
            <TableCell className="px-2 text-right">
              <GroupMembershipRequestActions slug={slug} musicGroup={musicGroup}
                musicGroupMembershipRequest={musicGroupMembershipRequest} />
            </TableCell>
          </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>
              <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={musicGroupMembershipRequests.totalPages} currentPage={currentPage} />
              </div>
            </TableCell>
          </TableRow>
        </>
        )}
      </TableBody>
    </>
  );
}

export default MembershipRequestsTableBody;