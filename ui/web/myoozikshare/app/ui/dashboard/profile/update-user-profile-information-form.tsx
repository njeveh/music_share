"use client"

import {
  useEffect,
  useState
} from "react";
import TextInput from "../../components/input-fields/text-input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ValidateField } from "@/app/lib/form-validation/auth-forms-validation";
import { getSession, UpdateProfile } from "@/app/lib/actions/auth";
import { Session } from "next-auth";
import { User } from "@/app/lib/definitions";

type Inputs = {firstName: any; lastName: any; userName: any; email: any };


const UpdateUserProfileInformationForm = (
  {setApiFeedback, alertDialogTrigger} :
  {setApiFeedback: React.Dispatch<React.SetStateAction<{messages: string[], status: string}>>, alertDialogTrigger: React.RefObject<HTMLButtonElement>}
) => {
  const [isPending, setIsPending] = useState(false);
  const { data: session, update } = useSession();
  // const [session, setSession] = useState<Session | null>();
  const [inputs, setInputs] = useState<Inputs>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    // firstName: session?.user.firstName,
    // lastName: session?.user.lastName,
    // userName: session?.user.userName,
    // email: session?.user.email,
  });
  const [inputErrors, setInputErrors] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
  });

  useEffect(()=>{
    getSession().then((session) => {
      // setSession(session);
    setInputs({
      firstName: session?.user.firstName,
      lastName: session?.user.lastName,
      userName: session?.user.userName,
      email: session?.user.email,
    });
    });
  },[]);

  const HandleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value
    }));

    const error = ValidateField(event.target.name, event.target.value);
    setInputErrors((errors) => ({
      ...errors,
      [name]: error
    }));
  };
  
  const HandleSubmit = (event: any) => {
    event.preventDefault();
    if (isPending) return;
    setIsPending(true);
    setApiFeedback({
      messages: [],
      status: ''
    });
    if (
        inputErrors.firstName == '' &&
        inputErrors.lastName == '' &&
        inputErrors.userName == '' &&
        inputErrors.email == ''
    ) {
      const data = {
        first_name: inputs.firstName,
        last_name: inputs.lastName,
        user_name: inputs.userName,
        email: inputs.email,
      };
      UpdateProfile(data).catch(err => {
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
              messages: ["Profile information updated successfully."],
              status: 'success',
            });
            alertDialogTrigger.current?.click();
            const userName = res.data.user.user_name == null? undefined : res.data.user.user_name;
            const updatedUser = {
              id: res.data.user.id,
              firstName: res.data.user.first_name,
              lastName: res.data.user.last_name,
              userName: userName,
              email: res.data.user.email,
              emailVerified: res.data.user.email_verified_at,
              isActive: res.data.user.is_active,
              createdAt: res.data.user.created_at,
              updatedAt: res.data.user.updated_at,
              accessToken: session?.user.accessToken,
            } as User
            // update session data
            update(updatedUser);
          }
        }
        setIsPending(false);
      });
    }
  };  
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

          <form onSubmit={(e)=>{HandleSubmit(e)}} className="mt-6 space-y-6">

            <div>
              <div className="w-full mb-4">
                <TextInput label="First Name" type="text" id="firstName" name="firstName"
                  placeholder="Enter your first name here." required autoComplete="on" value={inputs.firstName || '' }
                  onChange={(e)=> {HandleChange(e)}} />
                <div className={ inputErrors.firstName ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                  {inputErrors.firstName}
                </div>
              </div>
            </div>

            <div>
              <div className="w-full mb-4">
                <TextInput label="Last Name" type="text" id="lastName" name="lastName"
                  placeholder="Enter your last name here." required autoComplete="on" value={inputs.lastName || '' }
                  onChange={(e)=> {HandleChange(e)}} />
                <div className={ inputErrors.lastName ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                  {inputErrors.lastName}
                </div>
              </div>
            </div>

            <div className="w-full mb-4">
              <TextInput label="Preferred User Name" type="text" id="userName" name="userName"
                placeholder="Enter your preferred user name here." autoComplete="on" value={inputs.userName || '' }
                onChange={(e)=> {HandleChange(e)}} />
              <div className={ inputErrors.userName ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                {inputErrors.userName}
              </div>
            </div>            

            <div className="w-full mb-4">
              <TextInput label="Email Address" type="email" id="email" name="email"
                placeholder="Enter your email here." required autoComplete="on" value={inputs.email || '' }
                onChange={(e)=> {HandleChange(e)}} />
                <div className={ inputErrors.email ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                  {inputErrors.email}
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

export default UpdateUserProfileInformationForm;