'use client'

import React, {
  useRef,
  useState
} from 'react';
import { register } from '@/app/lib/actions';
import axios from 'axios';
import {
  ValidateField
} from '@/app/lib/form-validation/auth-forms-validation';
import TextInput from '@/app/ui/components/input-fields/text-input';

import {
  lusitana
} from '@/app/ui/fonts';
import {
  ArrowRightIcon
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import ActionButton from '@/app/ui/components/action-button';
import { useRouter } from 'next/navigation';

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


const Page = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const alertDialogTrigger = useRef(null);
    const router = useRouter();
    const [apiErrorMessages, setApiErrorMessages] = useState(['']);
    const [inputs, setInputs] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    });
    const [inputErrors, setInputErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    });

    const HandleChange = (event) => {
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

    const HandleSubmit = (event) => {
      event.preventDefault();
      setButtonDisabled(true);
      setApiErrorMessages([]);
      if (
        inputErrors.firstName == '' &&
        inputErrors.lastName == '' &&
        inputErrors.email == '' &&
        inputErrors.password == '' &&
        inputErrors.passwordConfirmation == ''
      ) {
        const data = {
          first_name: inputs.firstName,
          last_name: inputs.lastName,
          email: inputs.email,
          password: inputs.password,
          password_confirmation: inputs.passwordConfirmation
        };
        register(true, data).catch(err => {
          // console.log(err)
          setApiErrorMessages(["Sorry, we couldn't process your request. Something went wrong, please try again."]);
          alertDialogTrigger.current?.click();
        }).then((res) => {
          if (res !== void({})){
            if (res.status === 'fail') {
              setApiErrorMessages(res.error_messages);
              alertDialogTrigger.current?.click();
            }else if (res.status === 'success'){
              //console.log(res.data);
              router.push('/auth/email-verification-notice')

            }
          }
        });

      setButtonDisabled(false);
    }
  }
return (
<>
  <div>
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
    <form onSubmit={HandleSubmit} className="space-y-3">
      <div
        className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Sign Up
        </h1>
        <div className='w-full md:w-3/4 lg:w-1/2'>
          <div className="w-full mb-4">
            <TextInput label="First Name" type="text" id="firstName" name="firstName"
              placeholder="Enter your first name here." required autoComplete="on" value={inputs.firstName || '' }
              onChange={HandleChange} autoFocus />
            <div className={ inputErrors.firstName ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputErrors.firstName}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextInput label="Last Name" type="text" id="lastName" name="lastName"
              placeholder="Enter your last name here." required autoComplete="on" value={inputs.lastName || '' }
              onChange={HandleChange} />
            <div className={ inputErrors.lastName ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputErrors.lastName}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextInput label="Email Address" type="email" id="email" name="email" placeholder="Enter your email here."
              required autoComplete="on" value={inputs.email || '' } onChange={HandleChange} />
            <div className={ inputErrors.email ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputErrors.email}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextInput label="Choose a password" type="password" id="password" name="password"
              placeholder="Enter your first password here." required value={inputs.password || '' }
              onChange={HandleChange} />
            <div className={ inputErrors.password ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
              {inputErrors.password}
            </div>
          </div>
          <div className="w-full mb-4">
            <TextInput label="Type your password again" type="password" id="passwordConfirmation"
              name="passwordConfirmation" placeholder="Confirm your password." required
              value={inputs.passwordConfirmation || '' } onChange={HandleChange} />
            <div className={ inputErrors.passwordConfirmation ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2'
              : 'hidden' }>
              {inputErrors.passwordConfirmation}
            </div>
          </div>
          <ActionButton className='w-full' disabled={buttonDisabled}>
            Sign Up
            <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </ActionButton>
          <div className="flex justify-center items-center mt-4">
            <Link href="/auth/sign-in"
              className="text-blue-500 dark:text-gray-50 hover:text-blue-700 dark:hover:text-blue-500">
            Already have an account? Sign In.
            </Link>
          </div>
        </div>
      </div>
    </form>
  </div>
</>
);
}
export default Page;
