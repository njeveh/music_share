'use client'

import React, { useRef, useState } from 'react';
import { Button } from '@/app/ui/button';
import TextInput from "@/app/ui/components/input-fields/text-input";
import { lusitana } from "@/app/ui/fonts";
import TextArea from '@/app/ui/components/input-fields/text-area';
import { UpdateMusicGroup } from '@/app/lib/actions/music-groups';
import { ValidateGroupName } from '@/app/lib/actions/input-validation/create-music-group';
import { useRouter } from 'next/navigation';
import { MusicGroup } from '@/app/lib/definitions';
import DeleteMusicGroupForm from './delete-music-group';
import ApiFeedbackAlertDialog from '../../components/api-feedback-alert-dialog';

const UpdateGroupInfo = ({
    musicGroup,
    slug
  }: {
    musicGroup: MusicGroup,
    slug: string
  }) => {
    const router = useRouter();
    const alertDialogTrigger = useRef < HTMLButtonElement | null > (null);
    const [apiFeedback, setApiFeedback] = useState < {
      messages: string[],
      status: string
    }> ({
      messages: [],
      status: ''
    });
    const [isPending, setIsPending] = useState(false);
    const [inputs, setInputs] = useState({
      groupName: musicGroup.group_name,
      groupDescription: musicGroup.group_description,
      groupContact: musicGroup.group_contact
    });
    const [inputErrors, setInputErrors] = useState({
      groupName: '',
      groupDescription: '',
      groupContact: ''
    });

    const HandleChange = (event: any) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs((values) => ({
        ...values,
        [name]: value
      }));
      if (event.target.name == 'groupName') {
        const error = ValidateGroupName(event.target.value);
        setInputErrors((errors) => ({
          ...errors,
          groupName: error
        }));
      }
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
        inputErrors.groupName == '' &&
        inputErrors.groupDescription == ''
      ) {
        UpdateMusicGroup(slug, inputs).catch(err => {
          setApiFeedback({
            messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."],
            status: 'fail'
          });
          alertDialogTrigger.current?.click();
          setIsPending(false);
        }).then((res) => {
          if (res !== void({})) {
            // console.log(res.data);
            if (res.status === 'fail') {
              setApiFeedback({
                messages: res.error_messages,
                status: 'fail'
              });
              alertDialogTrigger.current?.click();
            } else if (res.status === 'success') {
              setApiFeedback({
                messages: ['group info updated successfully'],
                status: 'success'
              });
              alertDialogTrigger.current?.click();
              // rerender the route to reflect new info
              router.replace(`/dashboard/my-music-groups/${slug}/settings`);

            }
          }
          setIsPending(false);
        });
      }
    }

  return (
    <>
    <ApiFeedbackAlertDialog apiFeedback={apiFeedback} alertDialogTrigger={alertDialogTrigger} />
      <div className="">
        <form onSubmit={(e) => {HandleSubmit(e)}} className="space-y-3">
          <div
            className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Group Information
            </h1>
            <div className='w-full md:w-3/4 lg:w-1/2'>
              <div className="w-full mb-4">
                <TextInput label="Group Name" type="text" id="groupName" name="groupName" minLength={2}
                  placeholder="Enter group name here." required value={inputs.groupName || '' }
                  onChange={HandleChange} />
                  <div className={ inputErrors.groupName ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                    {inputErrors.groupName}
                  </div>
              </div>
              <div className="mb-4">
                <TextArea rows={6} label="Group Description" id="groupDescription" name="groupDescription"
                description='A brief group description below.'
                  placeholder="Enter group description here." value={inputs.groupDescription || '' }
                  onChange={HandleChange} />
              </div>
              <div className="w-full mb-4">
                <TextInput label="Group Contact" type="text" id="groupContact" name="groupContact"
                  description='could be phone number, email etc.'
                  placeholder="Enter group contact here." value={inputs.groupContact || '' }
                  onChange={HandleChange} />
                  <div className={ inputErrors.groupContact ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                    {inputErrors.groupContact}
                  </div>
              </div>

              <div className="mt-4">
                <Button type="submit" className="w-full flex justify-center items-center" >
                  {isPending? 'Updating...': 'Update'}
                  </Button>
              </div>
            </div>
          </div>
        </form>
        {musicGroup.is_super_admin &&
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
              <div className="p-4 sm:p-8 bg-gray-50 dark:bg-gray-900 shadow sm:rounded-lg">
                <DeleteMusicGroupForm alertDialogTrigger={alertDialogTrigger} setApiFeedback={setApiFeedback} slug={slug} />
              </div>
            </div>
          </div>
        }       
      </div>
        
    </>
  );
}

export default UpdateGroupInfo;