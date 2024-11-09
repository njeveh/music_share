'use client'

import React, {
  FormEvent,
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
import { InitiatePasswordRecovery } from '@/app/lib/actions/auth';
import { CheckBadgeIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Page = () => {
    const [email, setEmail] = useState('');
    // const [emailSent, setEmailSent] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [feedback, setFeedback] = useState<any>({
      status: '',
      message: ''
    });

    const HandleChange = (event: any) => {
      setEmail(event.target.value);
    };
    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPending) return;
      setIsPending(true);
      setFeedback({
        status: '',
        message: ''
      });
      if (email) {
        const data = {
          email: email,
          attempt: 'first'
        };
        InitiatePasswordRecovery(data).catch(err => {
            setFeedback({
              status: 'fail',
              message: "Sorry, we couldn't process your request. Something went wrong, please try again."
            });
            setIsPending(false);
          }).then((res) => {
          //console.log(res);
          setFeedback(res);
          setIsPending(false);
        });
      }
    };
    return (
    <>
      <div className="">
        <form onSubmit={(e) => {HandleSubmit(e)}} className="space-y-3">
          <div className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Recover Password
            </h1>
            {
            feedback.status == 'success'?
            <p>
              We just emailed you a password recovery code. Please check your email inbox for
              the code and enter it below to reset your password. If you didn't receive the
              mail don't worry at all, just resubmit your email address below and we shall
              mail you a password recovery code immediately.
            </p>:
            <p>
              Forgot you password? don't worry at all, just submit your email address below and we shall
              mail you a password recovery code immediately.
            </p>
            }
            <div className='w-full md:w-3/4 lg:w-1/2'>
              <div className="w-full mb-4">
                <TextInput label="Email Address" type="email" id="email" name="email" placeholder="Enter your email here."
                  required autoComplete="on" value={email || '' } onChange={HandleChange} autoFocus />
              </div>
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
              <div className="mt-4">
                <ActionButton type="submit"
                className="w-full flex justify-center items-center"
                disabled={isPending} >{isPending? 'processing...': 'Submit'}</ActionButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
    );
};

export default Page;