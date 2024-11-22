import { MusicGroup, Inputs } from "@/app/lib/definitions";
import { getFormatMyMusic } from "@/app/lib/actions/music";
import { getMyMusicGroups } from "@/app/lib/actions/music-groups";
import MusicReviewForm from "@/app/ui/dashboard/music/music-review-form";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const music: Inputs = (await getFormatMyMusic(slug));
  // music groups where user can share music
  const musicGroups: MusicGroup[] | null = await getMyMusicGroups().then((groups) => {
    if (groups == null) return null;
    // super admins are allowed to share music to their groups
    return groups?.filter(group => group.is_super_admin == true);
  });  

return (
<>
  <MusicReviewForm music={music} musicGroups={musicGroups} />  
</>
);
}