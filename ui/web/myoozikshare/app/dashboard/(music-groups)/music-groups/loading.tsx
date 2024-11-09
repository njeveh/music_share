import { MusicGroupsPageSkeleton, MusicGroupsTableSkeleton, TableBodySkeleton } from '@/app/ui/dashboard/music-groups/skeletons';
import DashboardSkeleton from '@/app/ui/skeletons';
 
export default function Loading() {
  // return <TableBodySkeleton />;
  // return <MusicGroupsTableSkeleton />
  return <MusicGroupsPageSkeleton />
}