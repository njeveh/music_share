'use client'

import React, {
    useState
} from 'react';
import {
    Button
} from '@/app/ui/button';
// import { userLoaded } from '../../../Redux/Features/UserSlice';
import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import TextInput from '@/app/ui/components/input-fields/text-input';
import Link from 'next/link';
import {
    lusitana
} from '@/app/ui/fonts';

const Page = () => {
        // const dispatch = useDispatch();
        // const navigate = useNavigate();
        const API_BASE_URL = 'http://localhost:8000/api';
        const [apiErrorMessage, setApiErrorMessage] = useState('');
        const [inputs, setInputs] = useState({
            email: '',
            password: ''
        });

        const HandleChange = (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setInputs((values) => ({
                ...values,
                [name]: value
            }));
        };
        const HandleSubmit = (e) => {
            e.preventDefault();
            setApiErrorMessage('');
            const data = {
                email: inputs.email,
                password: inputs.password
            };
            // axios.post(`${API_BASE_URL}/login`, { ...data }).then((res) => {
            // if (res.status == 200) {
            // if (res.data.status !== 'success') {
            // setApiErrorMessage(res.data.error_messages);
            // } else if (res.data.status == 'success') {
            // dispatch(userLoaded(res.data.data));
            // localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime());
            // navigate('/dashboard', { replace: true });
            // }
            // }
            // });
        };
return (
    <>
        <div className="">
          <form onSubmit={HandleSubmit} className="space-y-3">
            <div
              className="flex justify-center items-center flex-col rounded-lg bg-gray-50 dark:bg-gray-900 px-6 pb-4 pt-8">
              <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                Sign In
              </h1>
              <div className='w-full md:w-3/4 lg:w-1/2'>
                <div className="w-full mb-4">
                  <TextInput label="Email Address" type="email" id="email" name="email"
                    placeholder="Enter your email here." required autoComplete="on" value={inputs.email || '' }
                    onChange={HandleChange} autoFocus />
                </div>
                <div className="mb-4">
                  <TextInput label="Password" type="password" id="password" name="password"
                    placeholder="Enter your password here." required value={inputs.password || '' }
                    onChange={HandleChange} />
                </div>
                {apiErrorMessage !== '' && (
                <div className="m-2 p-2 bg-red-100 text-red-600 rounded-lg">{apiErrorMessage}</div>
                )}

                <div className="mt-4">
                  <Button type="submit" className="w-full" children="Sign In" />
                </div>
                <div className="mt-4 flex flex-row flex-wrap gap-4 md:gap-8 justify-center items-center">
                  <div>
                    <Link href="/auth/forgot-password" className="text-blue-500 dark:text-gray-50 hover:text-blue-700 dark:hover:text-blue-500">
                    Forgot password?
                    </Link>
                  </div>
                  <div>
                    <Link href="/auth/sign-up" className="text-blue-500 dark:text-gray-50 hover:text-blue-700 dark:hover:text-blue-500">
                    Don't have an account? Sign Up.
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
    </>
);
};

export default Page;