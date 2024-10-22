"use client"

import { useState } from "react";
import TextInput from "../../components/input-fields/text-input";
import { Button } from "@/components/ui/button";


const UpdateUserPasswordForm = () => {
    const [inputs, setInputs] = useState({
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    });
    const [inputErrors, setInputErrors] = useState({
      currentPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }); 
  return (
    <>
<section>
    <div>
        <h2 className="text-lg font-medium">
            Update Password
        </h2>

        <p className="mt-1 text-sm">
            Ensure your account is using a long, random password to stay secure.
        </p>
    </div>

    <form className="mt-6 space-y-6">
          <div className="w-full mb-4">
            <TextInput label="Current Password" type="password" id="currentPassword" name="currentPassword"
              placeholder="Enter your first password here." required value={inputs.currentPassword || '' }
              onChange={(e)=> setInputs((prevValues) => ({...prevValues, currentPassword: e.target.value}))} />
            <div className={ inputErrors.currentPassword ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputErrors.currentPassword}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextInput label="New Password" type="password" id="newPassword" name="newPassword"
              placeholder="Enter your first password here." required value={inputs.newPassword || '' }
              onChange={(e)=> setInputs((prevValues) => ({...prevValues, newPassword: e.target.value}))} />
            <div className={ inputErrors.newPassword ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputErrors.newPassword}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextInput label="New Password Confirmation" type="password" id="newPasswordConfirmation" name="newPasswordConfirmation"
              placeholder="Enter your first password here." required value={inputs.newPasswordConfirmation || '' }
              onChange={(e)=> setInputs((prevValues) => ({...prevValues, newPasswordConfirmation: e.target.value}))} />
            <div className={ inputErrors.newPasswordConfirmation ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputErrors.newPasswordConfirmation}
            </div>
          </div>

        <div className="flex items-center gap-4">
            <Button>Save</Button>

           {true &&
               <p className="mt-2 font-medium text-sm text-green-600">Saved</p>
           }
        </div>
    </form>
</section>

    </>
  );
}

export default UpdateUserPasswordForm;