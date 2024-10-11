import Image from 'next/image';
import VerifyEmail from '@/public/assets/svg/confirm-email.svg'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/app/ui/button';
  
const Page = () => {

    return (
      <>
      <div className='flex w-full justify-center items-center'>
        <Card className='max-w-[800px]'>
          <CardHeader>
            <CardTitle>Verify your email address</CardTitle>
            <CardDescription>Go to your email inbox to verify your email address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full flex flex-col justify-center items-center">
              <div className=''>
                <Image src={VerifyEmail} className="w-[200px] md:w-[250px] mb-[40px]" alt='' />
              </div>
              <div className='w-full lg:w-3/4'>
                Your account was successfully created. Please go to your email inbox and click on the link
                you received from us to verify your email address and complete sign up. If you did not
                receive the email don't worry, just click on the button below to request a resend.
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className='w-full flex justify-center items-center'>
              <Button>Resend email verification</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      </>
    );
  };
  
  export default Page;