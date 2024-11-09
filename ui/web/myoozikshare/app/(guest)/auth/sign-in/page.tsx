'use client'

import React, { FormEvent, useState } from 'react';
import { Button } from '@/app/ui/button';
import TextInput from '@/app/ui/components/input-fields/text-input';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import PasswordInput from '@/app/ui/components/input-fields/password-input';
import { authenticate } from '@/app/lib/actions/auth';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import ActionButton from '@/app/ui/components/action-button';

const Page = () => {
    const [isPending, setIspendning] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>('');
    const [inputs, setInputs] = useState({
      email: '',
      password: ''
    });

    const HandleChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({
        ...values,
        [name]: value
      }));
    };
    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isPending) return;
      setIspendning(true);
      setErrorMessage('');
      const data = {
        email: inputs.email,
        password: inputs.password,
        useCase: 'signin',
      };
      authenticate(data).catch(err => {
          setErrorMessage("Sorry, we couldn't process your request. Something went wrong, please try again.");
          setIspendning(false);
        }).then((res) => {
          setErrorMessage(res);
          setIspendning(false);
        });
    };
  return (
    <>
      <div className="">
        <form onSubmit={(e)=>{HandleSubmit(e)}} className="space-y-3">
          {/* <form onSubmit={HandleSubmit} className="space-y-3"> */}
            <div
              className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
              <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                Sign In
              </h1>
              <div className='w-full flex justify-center items-center' >
                {errorMessage && (
                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </div>
                )}
              </div>
              <div className='w-full md:w-3/4 lg:w-1/2'>
                <div className="w-full mb-4">
                  <TextInput label="Email Address" type="email" id="email" name="email"
                    placeholder="Enter your email here." required autoComplete="on" value={inputs.email || '' }
                    onChange={HandleChange} autoFocus />
                </div>
                <div className="mb-4">
                  <PasswordInput label="Password" id="password" name="password"
                    placeholder="Enter your password here." required value={inputs.password || '' }
                    onChange={HandleChange} />
                </div>
                {/* <div className="mt-4">
                  <Button type="submit" className="w-full" children="Sign In" />
                </div> */}
                <ActionButton type='submit' className="mt-4 w-full" disabled={isPending}>
                  {isPending? 'Signing you in...': 'Sign in'}
                  <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </ActionButton>
                <div className="mt-4 flex flex-row flex-wrap gap-4 md:gap-8 justify-center items-center">
                  <div>
                    <Link href="/auth/forgot-password"
                      className="text-blue-500 dark:text-gray-50 hover:text-blue-700 dark:hover:text-blue-500">
                    Forgot password?
                    </Link>
                  </div>
                  <div>
                    <Link href="/auth/sign-up"
                      className="text-blue-500 dark:text-gray-50 hover:text-blue-700 dark:hover:text-blue-500">
                    Don't have an account? Sign Up.
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
      </div>
    </>
  );
};

export default Page;