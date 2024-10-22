import DeleteUserForm from "@/app/ui/dashboard/profile/delete-user-form";
import UpdateUserPasswordForm from "@/app/ui/dashboard/profile/update-user-password-form";
import UpdateUserProfileInformationForm from "@/app/ui/dashboard/profile/update-user-profile-information-form";

const Page = () => {
  return (
    <>
      <div>
        <h2 className="font-semibold text-xl leading-tight">
            Profile
        </h2>

    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 shadow sm:rounded-lg">
                <div className="max-w-xl">
                    <UpdateUserProfileInformationForm />
                </div>
            </div>

            <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 shadow sm:rounded-lg">
                <div className="max-w-xl">
                    <UpdateUserPasswordForm />
                </div>
            </div>

            <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 shadow sm:rounded-lg">
                <div className="max-w-xl">
                    <DeleteUserForm />
                </div>
            </div>
        </div>
    </div>

      </div>
    </>
  );
}

export default Page;