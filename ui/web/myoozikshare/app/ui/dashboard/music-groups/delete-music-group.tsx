"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import PasswordInput from "../../components/input-fields/password-input"
import { useRouter } from "next/navigation"
import { DeleteMusicGroup } from "@/app/lib/actions/music-groups"

const DeleteMusicGroupForm = (
  {setApiFeedback, slug, alertDialogTrigger} :
  {
    setApiFeedback: React.Dispatch<React.SetStateAction<{messages: string[], status: string}>>;
    slug: string;
    alertDialogTrigger: React.RefObject<HTMLButtonElement | null>
  }
) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const dialogtriggerRef = useRef<HTMLButtonElement>(null);
  const [terminationPassword, setTerminationPassword] = useState('');
  
  const HandleSubmit = (event: any) => {
    event.preventDefault();
    if (isPending) return;
    setIsPending(true);
    setApiFeedback({
      messages: [],
      status: ''
    });
    DeleteMusicGroup(slug, terminationPassword).catch(err => {
    setApiFeedback({
      messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."],
      status: 'fail',
    });
    setIsPending(false);
    }).then((res) => {
      if (res !== void({})){
        // console.log(res.data);
        if (res.status === 'fail') {
          setApiFeedback({
            messages: res.error_messages,
            status: 'fail',
          });
          alertDialogTrigger.current?.click();
        }else if (res.status === 'success'){
          // setApiFeedback({
          //   messages: ["Music group deleted successfully."],
          //   status: 'success',
          // });
          // alertDialogTrigger.current?.click();
          // redirect to user music groups
          router.replace(`/dashboard/my-music-groups/`);
        }
      }
      setIsPending(false);
    });
  } 
  
  return (
    <>
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Delete Group
          </h2>

          <p className="mt-1 text-sm text-amber-600">
            Once this group is deleted, all of its resources and data will be permanently deleted. Before deleting
            group, please download any data or information that you wish to retain.
          </p>
        </div>

        <Button className="bg-red-700 hover:bg-red-500" onClick={()=> {dialogtriggerRef.current?.click()}}>{isPending? 'Deleting group...': 'Delete Group'}</Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-0 h-0 hidden" ref={dialogtriggerRef}></Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-50 dark:bg-gray-900">
            <form onSubmit={(e)=> { HandleSubmit(e) }} className="mb-2">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-amber-600">Are you absolutely sure you want to delete this group? This action is irreversible.
                </AlertDialogTitle>
                <AlertDialogDescription>
                </AlertDialogDescription>
                <div>
                  <p className="mt-1 text-sm text-amber-600">
                    Once this group is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete this group.
                  </p>

                  <div className="w-full mt-6">
                    <PasswordInput label="Password" id="terminationPassword" name="terminationPassword"
                      placeholder="Enter your password to continue." required value={terminationPassword || '' }
                      onChange={(e)=> setTerminationPassword(e.target.value)} />
                  </div>
                </div>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="w-full p-4 flex justify-between items-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction type="submit" className="bg-red-700 hover:bg-red-500" onClick={HandleSubmit}>{isPending? 'Deleting account...': 'Continue'}</AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </form>
          </AlertDialogContent>
        </AlertDialog>
      </section>

    </>
  );
}

export default DeleteMusicGroupForm;