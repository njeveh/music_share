import { Music } from "@/app/lib/definitions";
import { getMyMusic } from "@/app/lib/actions/music";
import UpdateMusicForm from "@/app/ui/dashboard/music/update-music-form";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const music: Music = (await getMyMusic(slug));

return (
<>
  <UpdateMusicForm music={music} />  
</>
);
}