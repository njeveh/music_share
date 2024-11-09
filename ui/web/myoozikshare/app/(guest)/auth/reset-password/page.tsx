'use client'

import React, {
  FormEvent,
  useEffect,
  useRef,
useState
} from 'react';
import {
Button
} from '@/app/ui/button';
import TextInput from '@/app/ui/components/input-fields/text-input';
import Link from 'next/link';
import {
lusitana
} from '@/app/ui/fonts';
import ActionButton from '@/app/ui/components/action-button';
import { InitiatePasswordRecovery, ResetPassword } from '@/app/lib/actions/auth';
import clsx from 'clsx';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { MdWarning } from 'react-icons/md';
import PasswordInput from '@/app/ui/components/input-fields/password-input';
import { ValidateField } from '@/app/lib/form-validation/auth-forms-validation';
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
} from "@/components/ui/alert-dialog";

const Page = () => {
  const [apiErrorMessages, setApiErrorMessages] = useState(['']);
  const alertDialogTrigger = useRef < HTMLButtonElement > (null);
  const [email, setEmail] = useState < string | null > ('');
  const [inputs, setInputs] = useState({
    password: '',
    passwordConfirmation: '',
    recoveryCode: '',
  });
  const [inputErrors, setInputErrors] = useState({
    password: '',
    passwordConfirmation: '',
    recoveryCode: '',
  });
  const [requestType, setRequestType] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [feedback, setFeedback] = useState < any > ({
    status: '',
    message: '',
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setEmail(searchParams.get('email'));
  }, []);

  const HandleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value
    }));
    if (event.target.name === 'passwordConfirmation') {
      const error = ValidateField('passwordConfirmation', event.target.value, inputs.password);
      setInputErrors((errors) => ({
        ...errors,
        ['passwordConfirmation']: error
      }));
    }
    if (event.target.name === 'password' && inputs.passwordConfirmation !== '') {
      const error = ValidateField(
        'passwordConfirmation',
        inputs.passwordConfirmation,
        event.target.value
      );
      setInputErrors((errors) => ({
        ...errors,
        ['passwordConfirmation']: error
      }));
    }
    if (event.target.name !== 'passwordConfirmation') {
      const error = ValidateField(event.target.name, event.target.value);
      setInputErrors((errors) => ({
        ...errors,
        [name]: error
      }));
    }
  };

  const HandleSubmit = (event: any) => {
    event.preventDefault();
    setIsPending(true);
    setRequestType('password_reset')
    if (isPending) return;
    if (
      inputErrors.password == '' &&
      inputErrors.passwordConfirmation == ''
    ) {
      const data = {
        email: email,
        reset_code: inputs.recoveryCode,
        password: inputs.password,
        password_confirmation: inputs.passwordConfirmation
      };
      ResetPassword(data).catch(err => {
        setApiErrorMessages(["Sorry, we couldn't process your request. Something went wrong, please try again."]);
        setIsPending(false);
        setRequestType('');
        alertDialogTrigger.current?.click();
      }).then((res) => {
        if (res !== void({})) {
          // console.log(res.data);
          if (res.status === 'fail') {
            setApiErrorMessages(res.error_messages);
            alertDialogTrigger.current?.click();
          } else if (res.status === 'success') {
           setApiErrorMessages(['Password reset successfully']);
            alertDialogTrigger.current?.click();

          }
        }
        setIsPending(false);
        setRequestType('');
      });
    }
  }
  const HandleGetRecoveryCode = (e: FormEvent < HTMLFormElement > ) => {
    e.preventDefault();
    if (isPending) return;
    setIsPending(true);
    setRequestType('resend_recovery_code');
    setFeedback({
      status: '',
      message: ''
    });
    if (email) {
      const data = {
        email: email,
        attempt: 'resend',
      };
      InitiatePasswordRecovery(data).catch(err => {
        setFeedback({
          status: 'fail',
          message: "Sorry, we couldn't process your request. Something went wrong, please try again."
        });
        setIsPending(false);
        setRequestType('');
      }).then((res) => {
        //console.log(res);
        setFeedback(res);
        setIsPending(false);
        setRequestType('');
      });
    }
  };
    return (
    <>
        <AlertDialog>
      <AlertDialogTrigger ref={alertDialogTrigger}></AlertDialogTrigger>
      <AlertDialogContent className='bg-gray-50 dark:bg-gray-900'>
        <AlertDialogHeader>
          <AlertDialogTitle>Error!</AlertDialogTitle>
          <AlertDialogDescription>
            <div className='p-2 bg-red-100 text-red-600 rounded-lg'>

              {apiErrorMessages.map((error, index) => {
              return (
              <div className="m-2" key={index}>
                {error}
              </div>
              );
              })}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      <div className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
        <div className=''>

        <form onSubmit={(e) => {HandleGetRecoveryCode(e)}} className="space-y-3" id='recoveryCodeRequestForm'>
          <div className="flex justify-center items-center flex-col">
          <p>
            We just emailed you a password recovery code. Please check your email inbox for
            the code and use it below to reset your password. If you didn't receive the
            mail don't worry at all, just hit the Get recovery code button below and we shall
            mail you one immediately.
          </p>
            <div className='w-full md:w-3/4 lg:w-1/2'>
              <div className="w-full mb-4">
                <TextInput label="Email Address" type="email" id="email" name="email" placeholder="Enter your email here."
                  required autoComplete="on" value={email || '' } onChange={e=>{setEmail(e.target.value)}} />
              </div>
              {requestType === 'resend_recovery_code' && (
                <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
                  {feedback?.status == 'fail' && (
                  <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{feedback?.message}</p>
                  </>
                  )}
                  {feedback?.status == 'success' && (
                  <>
                    <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                    <p className="text-sm text-green-500">{feedback?.message}</p>
                  </>
                  )}
                </div>
              )
              }
              <div className="mt-2">
                <ActionButton type="submit"
                className="w-full flex justify-center items-center"
                disabled={isPending} >{requestType === 'resend_recovery_code' && isPending? 'Processing...': 'Get recovery code'}</ActionButton>
              </div>
            </div>
          </div>
        </form>
        </div>
        <form onSubmit={(e)=> {HandleSubmit(e)}} className="w-full mt-4 space-y-3" id='passwordResetForm'>
          <div className="w-full flex justify-center items-center flex-col">
            <h1 className={`${lusitana.className} mt-4 text-2xl`}>
              Reset Password
            </h1>
            <div className='w-full md:w-3/4 lg:w-1/2'>
              <div className="w-full mb-4">
                <TextInput label="Recovery Code" type="text" id="recoveryCode" name="recoveryCode"
                  placeholder="Enter code here." required value={inputs.recoveryCode || '' } onChange={HandleChange} />
                <div className={ inputErrors.recoveryCode ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                  {inputErrors.recoveryCode}
                </div>
              </div>
              <div className="w-full mb-4">
                <PasswordInput label="New Password" id="password" name="password"
                  placeholder="New password." required value={inputs.password || '' }
                  onChange={HandleChange} />
                <div className={ inputErrors.password ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                  {inputErrors.password}
                </div>
              </div>
              <div className="w-full mb-4">
                <PasswordInput label="Password Confirmation" id="passwordConfirmation"
                  name="passwordConfirmation" placeholder="Confirm new password." required
                  value={inputs.passwordConfirmation || '' } onChange={HandleChange} />
                <div className={ inputErrors.passwordConfirmation ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2'
                  : 'hidden' }>
                  {inputErrors.passwordConfirmation}
                </div>
              </div>
              {requestType === 'reset_password' && (
              <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
                {feedback?.status == 'fail' && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{feedback?.message}</p>
                </>
                )}
                {feedback?.status == 'success' && (
                <>
                  <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-green-500">{feedback?.message}</p>
                </>
                )}
              </div>
              )}
              <div className="mt-4">
                <ActionButton type="submit"
                  className="w-full flex justify-center items-center bg-green-700 hover:bg-green-500"
                  disabled={isPending}>{requestType === 'reset_password' && isPending? 'Processing...': 'Submit'}</ActionButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
    );
};

export default Page;