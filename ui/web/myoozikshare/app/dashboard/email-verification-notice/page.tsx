"use client"


import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/app/ui/button';
import { useEffect, useState } from 'react';
import { getSession, ResendEmailVerificationCode, VerifyEmailAddress } from "@/app/lib/actions";
import { CheckBadgeIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { MdWarning } from "react-icons/md";
import ActionButton from "@/app/ui/components/action-button";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
  
const Page = () => {
  const [input, setInput] = useState('');  
  const [feedback, setFeedback] = useState({
    status: '',
    message: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const pathName = usePathname();
  const [session, setSession] = useState<Session | null>();

  useEffect(()=>{
    getSession().then((res) => {
      //console.log(res);
      setSession(res);
    });
  },[pathName]);

  function HandleSubmit(event: any) {
    event.preventDefault();
    if (input ) {
      setButtonDisabled(true);
      VerifyEmailAddress(input).catch(err => {
          setFeedback({
            status: 'fail',
            message: "Sorry, we couldn't process your request. Something went wrong, please try again."
          });
        }).then((res) => {
        //console.log(res);
        setFeedback(res);
      });
      setButtonDisabled(false);
    }
  }

  function HandleResendEmailVerificationCodeRequest(event: any) {
    setButtonDisabled(true);
    ResendEmailVerificationCode().then((res) => {
      //console.log(res);
      setFeedback(res);
    });
    setButtonDisabled(false);
  }

    return (
      <>
      <div className='flex w-full justify-center items-center'>
        <Card className='max-w-[800px]'>
          <CardHeader>
            <CardTitle className="flex justify-center">Verify your email address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full flex flex-col justify-center items-center">
              <p className='w-full lg:w-3/4'>
                Hello {`${session?.user.firstName}, ` } welcome to MyoozikShare and thank you for joining us.
                Please check your email inbox for a verification code we just sent you, enter it below and submit to
                verify your address. If you did not receive the code don't worry, just click on the resend button
                below and we shall mail you one.
              </p>
              <p className="py-2 flex text-amber-500 justify-center items-start"><MdWarning className="h-5 w-5 " /> <span>The code has a validity period of 6 hours.</span></p>
              <form onSubmit={HandleSubmit} className="" id="verificationCodeForm">
                <div className="flex gap-2 p-2">
                  <input className="w-[150px] text-gray-950" type="text" name='emailVerificationCode' id='emailVerificationCode' value={input} onChange={(e) => {setInput(e.target.value)}} placeholder="Enter code here." required />
                  <ActionButton type="submit" className="bg-green-700 hover:bg-green-500" aria-disabled={buttonDisabled}>
                    Submit
                  </ActionButton>
                </div>
              </form>
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
                {feedback?.status == 'no-action' && (
                <>
                  <MdWarning className="h-5 w-5 text-amber-500" />
                  <p className="text-sm text-amber-500">{feedback?.message}</p>
                </>
                )}                    
              </div>                
            </div>
          </CardContent>
          <CardFooter>
            <div className='w-full flex justify-center items-center'>
              <Button type="button" className='w-52 md:w-80 flex justify-center items-center' aris-disabled={buttonDisabled} onClick={(e)=>HandleResendEmailVerificationCodeRequest(e)}>
                Resend
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      </>
    );
  };
  
  export default Page;