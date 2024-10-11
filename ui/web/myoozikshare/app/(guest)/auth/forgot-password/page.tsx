'use client'

import React, {
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

const Page = () => {
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const HandleChange = (event) => {
      setEmail(event.target.value);
    };
    const HandleSubmit = (e) => {
      e.preventDefault();
      setApiErrorMessage('');
      const data = {
        email: email,
      };
      setEmailSent(true);
    };
    return (
    <>
      <div className="">
        <form onSubmit={HandleSubmit} className="space-y-3">
          <div className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Recover Password
            </h1>
            {
            emailSent?
            <p>
              We just emailed you password recovery instructions. Please check your email inbox for
              the mail and follow the instructions to recover your password. If you didn't receive the
              mail don't worry at all, just resubmit your address below and we shall
              send you a password recovery email immediately.
            </p>:
            <p>
              Forgot you password? don't worry at all, just submit your email address below and we shall
              send you a password recovery email immediately.
            </p>
            }
            <div className='w-full md:w-3/4 lg:w-1/2'>
              <div className="w-full mb-4">
                <TextInput label="Email Address" type="email" id="email" name="email" placeholder="Enter your email here."
                  required autoComplete="on" value={email || '' } onChange={HandleChange} autoFocus />
              </div>
              {apiErrorMessage !== '' && (
              <div className="m-2 p-2 bg-red-100 text-red-600 rounded-lg">{apiErrorMessage}</div>
              )}

              <div className="mt-4">
                <ActionButton type="submit" className="w-full flex justify-center items-center" children="Submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
    );
};

export default Page;