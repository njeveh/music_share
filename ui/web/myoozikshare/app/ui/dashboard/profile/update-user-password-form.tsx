"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PasswordInput from "../../components/input-fields/password-input";
import { ValidateField } from "@/app/lib/form-validation/auth-forms-validation";
import { ChangePassword } from "@/app/lib/actions/auth";


const UpdateUserPasswordForm = (
  {setApiFeedback, alertDialogTrigger} :
  {setApiFeedback: React.Dispatch<React.SetStateAction<{messages: string[], status: string}>>, alertDialogTrigger: React.RefObject<HTMLButtonElement | null>}
) => {
  const [isPending, setIsPending] = useState(false);
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

  const HandleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value
    }));

      if (event.target.name === 'newPasswordConfirmation') {
        const error = ValidateField('passwordConfirmation', event.target.value, inputs.newPassword);
        setInputErrors((errors) => ({
          ...errors,
          ['newPasswordConfirmation']: error
        }));
      }
      if (event.target.name === 'newPassword' && inputs.newPasswordConfirmation !== '') {
        const error = ValidateField(
          'passwordConfirmation',
          inputs.newPasswordConfirmation,
          event.target.value
        );
        setInputErrors((errors) => ({
          ...errors,
          ['newPasswordConfirmation']: error
        }));
      }
      if (event.target.name == 'newPassword') {
        const error = ValidateField('password', event.target.value);
        setInputErrors((errors) => ({
          ...errors,
          [name]: error
        }));
      }
  }

  const HandleSubmit = (event: any) => {
    event.preventDefault();
    if (isPending) return;
    setIsPending(true);
    setApiFeedback({
      messages: [],
      status: ''
    });
    if (
      inputErrors.currentPassword == '' &&
      inputErrors.newPassword == '' &&
      inputErrors.newPasswordConfirmation == ''
    ) {
      ChangePassword(inputs).catch(err => {
      setApiFeedback({
        messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."],
        status: 'fail',
      });
      setIsPending(false);
      alertDialogTrigger.current?.click();
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
            setApiFeedback({
              messages: ["Password updated successfully."],
              status: 'success',
            });
            alertDialogTrigger.current?.click();
            //clear inputs
            setInputs({
              currentPassword: '',
              newPassword: '',
              newPasswordConfirmation: '',
            });
          }
        }
        setIsPending(false);
      });
    }
  }  
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

      <form onSubmit={(e)=> { HandleSubmit(e) }} className="mt-6 space-y-6">
        <div className="w-full mb-4">
          <PasswordInput label="Current Password" id="currentPassword" name="currentPassword"
            placeholder="Enter your current password here." required value={inputs.currentPassword || '' }
            onChange={HandleChange} />
          <div className={ inputErrors.currentPassword ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
            {inputErrors.currentPassword}
          </div>
        </div>
        <div className="w-full mb-4">
          <PasswordInput label="New Password" id="newPassword" name="newPassword"
            placeholder="Enter your new password here." required value={inputs.newPassword || '' }
            onChange={HandleChange} />
          <div className={ inputErrors.newPassword ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
            {inputErrors.newPassword}
          </div>
        </div>
        <div className="w-full mb-4">
          <PasswordInput label="New Password Confirmation" id="newPasswordConfirmation" name="newPasswordConfirmation"
            placeholder="Confirm your new password." required value={inputs.newPasswordConfirmation || '' }
            onChange={HandleChange} />
          <div className={ inputErrors.newPasswordConfirmation ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2'
            : 'hidden' }>
            {inputErrors.newPasswordConfirmation}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit">{isPending? 'Saving...': 'Save'}</Button>
        </div>
      </form>
    </section>

  </>
  );
}

export default UpdateUserPasswordForm;