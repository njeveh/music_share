'use client'

import React, { useState } from 'react';
import { Button } from '@/app/ui/button';
import TextInput from "@/app/ui/components/input-fields/text-input";
import { lusitana } from "@/app/ui/fonts";
import Link from 'next/link';
import TextArea from '@/app/ui/components/input-fields/text-area';

const Page = () => {

      const [apiErrorMessage, setApiErrorMessage] = useState('');
        const [inputs, setInputs] = useState({
            groupName: '',
            groupDescription: ''
        });

        const HandleChange = (event: any) => {
            const name = event.target.name;
            const value = event.target.value;
            setInputs((values) => ({
                ...values,
                [name]: value
            }));
        };
  return (
    <>
      <div className="">
        <form onSubmit={() => ({})} className="space-y-3">
          <div
            className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
              Create New Group
            </h1>
            <div className='w-full md:w-3/4 lg:w-1/2'>
              <div className="w-full mb-4">
                <TextInput label="Group Name" type="text" id="groupName" name="groupName"
                  placeholder="Enter group name here." required value={inputs.groupName || '' }
                  onChange={HandleChange} autoFocus />
              </div>
              <div className="mb-4">
                <TextArea rows={6} label="Group Description" id="groupDescription" name="groupDescription"
                description='Type a brief group description below.'
                  placeholder="Enter your password here." required value={inputs.groupDescription || '' }
                  onChange={HandleChange} />
              </div>
              {apiErrorMessage !== '' && (
              <div className="m-2 p-2 bg-red-100 text-red-600 rounded-lg">{apiErrorMessage}</div>
              )}

              <div className="mt-4">
                <Button type="submit" className="w-full flex justify-center items-center" >Create</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Page;