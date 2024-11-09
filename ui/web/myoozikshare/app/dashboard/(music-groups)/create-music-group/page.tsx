'use client'

import React, { useState } from 'react';
import { Button } from '@/app/ui/button';
import TextInput from "@/app/ui/components/input-fields/text-input";
import { lusitana } from "@/app/ui/fonts";
import Link from 'next/link';
import TextArea from '@/app/ui/components/input-fields/text-area';
import { createMusicGroup } from '@/app/lib/actions/music-groups';
import { ValidateGroupName } from '@/app/lib/actions/input-validation/create-music-group';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [apiErrorMessages, setApiErrorMessages] = useState<string[] | null>(null);
  const [isPending, setIsPending] = useState(false);
    const [inputs, setInputs] = useState({
        groupName: '',
        groupDescription: '',
        groupContact: ''
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
      setApiErrorMessages(null);
      if (
        inputErrors.groupName == '' &&
        inputErrors.groupDescription == ''
      ) {
        createMusicGroup(inputs).catch(err => {
          setApiErrorMessages(["Sorry, we couldn't process your request. Something went wrong, please try again."]);
          setIsPending(false);
        }).then((res) => {
          if (res !== void({})){
            // console.log(res.data);
            if (res.status === 'fail') {
              setApiErrorMessages(res.error_messages);
            }else if (res.status === 'success'){
              //console.log(res.data);
              router.push('/dashboard/my-music-groups');

            }
          }
          setIsPending(false);
        });
    }
  }

  return (
    <>
      <div className="">
        <form onSubmit={(e) => {HandleSubmit(e)}} className="space-y-3">
          <div
            className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Create New Group
            </h1>
            <div className='w-full md:w-3/4 lg:w-1/2'>
              <div className="w-full mb-4">
                <TextInput label="Group Name" type="text" id="groupName" name="groupName" minLength={2}
                  placeholder="Enter group name here." required value={inputs.groupName || '' }
                  onChange={HandleChange} autoFocus />
                  <div className={ inputErrors.groupName ? 'mt-1 bg-red-100 text-red-600 rounded-lg p-2' : 'hidden' }>
                    {inputErrors.groupName}
                  </div>
              </div>
              <div className="mb-4">
                <TextArea rows={6} label="Group Description" id="groupDescription" name="groupDescription"
                description='Type a brief group description below.'
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
              {apiErrorMessages !== null && (
              <div className="m-2 p-2 bg-red-100 text-red-600 rounded-lg">{apiErrorMessages}</div>
              )}

              <div className="mt-4">
                <Button type="submit" className="w-full flex justify-center items-center" >
                  {isPending? 'Creating group...': 'Create Group'}
                  </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;