"use client"

import {
  useState
} from "react";
import TextInput from "../../components/input-fields/text-input";
import { Button } from "@/components/ui/button";

const UpdateUserProfileInformationForm = () => {
    const [inputs, setInputs] = useState({
      firstName: '',
      lastName: '',
      email: '',
    });
    const [inputErrors, setInputErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
    });    
    return (
      <>
        <section>
          <header>
            <h2 className="text-lg font-medium">
              Profile Information
            </h2>

            <p className="mt-1 text-sm">
              Update your account's profile information and email address.
            </p>
          </header>

          <form id="send-verification" method="post" action="{{ route('verification.send') }}">
          </form>

          <form method="post" action="{{ route('profile.update') }}" className="mt-6 space-y-6">

            <div>
              <div className="w-full mb-4">
                <TextInput label="First Name" type="text" id="firstName" name="firstName"
                  placeholder="Enter your first name here." required autoComplete="on" value={inputs.firstName || '' }
                  onChange={(e)=> setInputs((prevValues) => ({...prevValues, firstName: e.target.value}))} />
                  <div className={ true ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                    Input Errors
                  </div>
              </div>
            </div>

            <div>
              <div className="w-full mb-4">
                <TextInput label="Last Name" type="text" id="lastName" name="lastName"
                  placeholder="Enter your last name here." required autoComplete="on" value={inputs.lastName || '' }
                  onChange={(e)=> setInputs((prevValues) => ({...prevValues, lastName: e.target.value}))} />
                  <div className={ true ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                    Input Errors
                  </div>
              </div>
            </div>

            <div>
              <div className="w-full mb-4">
                <TextInput label="Email Address" type="email" id="email" name="email"
                  placeholder="Enter your email here." required autoComplete="on" value={inputs.email || '' }
                  onChange={(e)=> setInputs((prevValues) => ({...prevValues, email: e.target.value}))} />
                  <div className={ inputErrors.email ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                    {inputErrors.email}
                  </div>
              </div>
              {true &&
              <div>
                <p className="text-sm mt-2 text-amber-600">
                  Your email address is unverified.&nbsp;

                  <button form="send-verification"
                    className="underline text-sm text-blue-700 hover:text-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Click here to re-send the verification email.
                  </button>
                </p>

                {true &&
                <p className="mt-2 font-medium text-sm text-green-600">
                  A new verification link has been sent to your email address.
                </p>
                }
              </div>
              }
            </div>

            <div className="flex items-center gap-4">
              <Button>Save</Button>
              {true &&
              <p x-data="{ show: true }" x-show="show" x-transition x-init="setTimeout(() => show = false, 2000)"
                className="text-sm text-green-600">Saved</p>
              }
            </div>
          </form>
        </section>

      </>
    );
}

export default UpdateUserProfileInformationForm;