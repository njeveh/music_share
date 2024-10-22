'use client'
import './contact.css'
import { EnvelopeClosedIcon, MobileIcon, PaperPlaneIcon, ResetIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
const Page = () => {
const handleSubmit = (e) => {
e.preventDefault();
window.alert("Sorry, this functionality is yet to be implemented. Coming soon though!")
};
return (
    <>
        <div className="px-4 md:px-6">
            <h1>Contact support team via:</h1>
            <div className='my-4'>
                <ul className='flex flex-col gap-4 list-none'>
                    <li className='flex flex-row justify-start items-center'>
                        <MobileIcon className='block h-9 w-auto fill-current me-2' /> +2547xxxxxxxx
                    </li>
                    <li className='flex flex-row justify-start items-center'>
                        <EnvelopeClosedIcon className='block h-9 w-auto fill-current me-2' />myoozikshare@gmail.com
                    </li>
                </ul>
            </div>
            <h3>Or send us a message below:</h3>
            <div className=' bg-slate-200 dark:bg-gray-900 p-4 rounded-2xl my-4'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="name">Name <span className='text-red-600'> *</span> :</label>
                        <input id='name' className='input-field' type="text" name='name' required />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="email">Email <span className='text-red-600'> *</span> :</label>
                        <input id='email' className='input-field' type="text" name='email' required />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="phone">Phone <span className='text-red-600'> *</span> :</label>
                        <input id='phone' className='input-field' type="text" name='phone' required />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="message">Message <span className='text-red-600'> *</span> :</label>
                        <textarea id='message' className='input-field' name='mesmessage' required />
                    </div>
                    <div className='flex gap-8'>
                        <Button type='submit' className='btn' variant={'default'} >Send <PaperPlaneIcon className='ms-2' /></Button>
                        <Button type='reset' className='btn' variant={'destructive'} >Clear</Button>
                    </div>
                </form>
            </div>
        </div>
    </>
    )
}

export default Page;