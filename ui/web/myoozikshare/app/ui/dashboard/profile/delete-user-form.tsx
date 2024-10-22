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
import TextInput from "../../components/input-fields/text-input"

const DeleteUserForm = () => {
  const dialogtriggerRef = useRef(null);
  const [inputs, setInputs] = useState({
      password: '',
    });
  const [inputErrors, setInputErrors] = useState({
    password: '',
  });    
  return (
    <>
      <section className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Delete Account
          </h2>

          <p className="mt-1 text-sm text-amber-600">
            Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
            your account, please download any data or information that you wish to retain.
          </p>
        </div>

        <Button className="bg-red-700 hover:bg-red-500" onClick={()=> {dialogtriggerRef.current?.click()}}>Delete Account</Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-0 h-0 hidden" ref={dialogtriggerRef}></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-amber-600">Are you absolutely sure you want to delete your account? This action is irreversible.
              </AlertDialogTitle>
              <AlertDialogDescription>
                <form method="post" action="{{ route('profile.destroy') }}" className="p-6">
                  {/* <h2 className="text-lg font-medium text-amber-600">
                    Are you sure you want to delete your account?
                  </h2> */}

                  <p className="mt-1 text-sm text-amber-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                  </p>

                  <div className="w-full mt-6">
                    <TextInput label="Password" type="password" id="password" name="password"
                      placeholder="Enter your password here to continue." required value={inputs.password || '' }
                      onChange={(e)=> setInputs((prevValues) => ({...prevValues, password: e.target.value}))} />
                      <div className={ inputErrors.password ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden'
                        }>
                        {inputErrors.password}
                      </div>
                  </div>
                </form>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-700 hover:bg-red-500">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

    </>
  );
}

export default DeleteUserForm;