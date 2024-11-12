"use client"

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
import clsx from "clsx";
import { useRef } from "react";

const ApiFeedbackAlertDialog = (
    {apiFeedback, alertDialogTrigger} :
  {apiFeedback: {messages: string[], status: string}, alertDialogTrigger: React.RefObject<HTMLButtonElement | null>}
) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger ref={alertDialogTrigger}></AlertDialogTrigger>
        <AlertDialogContent className='bg-gray-50 dark:bg-gray-900'>
          <AlertDialogHeader>
            <AlertDialogTitle>{apiFeedback.status == 'fail' ? 'Error!' : 'Success!'}</AlertDialogTitle>
          </AlertDialogHeader>
            <AlertDialogDescription>
            </AlertDialogDescription>
              <div className={clsx('p-2  rounded-lg',
                {'bg-red-100 text-red-600': apiFeedback.status == 'fail'},
                {'bg-green-100 text-green-600': apiFeedback.status == 'success'}
              )}>

                {apiFeedback.messages.map((message, index) => {
                return (
                <div className="m-2" key={index}>
                  {message}
                </div>
                );
                })}
              </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default ApiFeedbackAlertDialog;