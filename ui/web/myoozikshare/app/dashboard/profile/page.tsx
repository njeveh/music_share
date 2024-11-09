"use client"
import ApiFeedbackAlertDialog from "@/app/ui/components/api-feedback-alert-dialog";
import DeleteUserForm from "@/app/ui/dashboard/profile/delete-user-form";
import UpdateUserPasswordForm from "@/app/ui/dashboard/profile/update-user-password-form";
import UpdateUserProfileInformationForm from "@/app/ui/dashboard/profile/update-user-profile-information-form";
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
import { useRef, useState } from "react";

const Page = () => {
  const [apiFeedback, setApiFeedback] = useState<{messages: string[], status: string}>(
    {
        messages: [],
        status: ''
    }
  );
  const alertDialogTrigger = useRef<HTMLButtonElement>(null);
  return (
    <>
    <ApiFeedbackAlertDialog apiFeedback={apiFeedback} alertDialogTrigger={alertDialogTrigger} />
      <div>
        <h2 className="font-semibold text-xl leading-tight">
            Profile
        </h2>

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 shadow sm:rounded-lg">
                <div className="max-w-xl">
                    <UpdateUserProfileInformationForm setApiFeedback={setApiFeedback} alertDialogTrigger={alertDialogTrigger} />
                </div>
            </div>

            <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 shadow sm:rounded-lg">
                <div className="max-w-xl">
                    <UpdateUserPasswordForm setApiFeedback={setApiFeedback} alertDialogTrigger={alertDialogTrigger} />
                </div>
            </div>

            <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 shadow sm:rounded-lg">
                <div className="max-w-xl">
                    <DeleteUserForm setApiFeedback={setApiFeedback} alertDialogTrigger={alertDialogTrigger} />
                </div>
            </div>
        </div>
    </div>

      </div>
    </>
  );
}

export default Page;