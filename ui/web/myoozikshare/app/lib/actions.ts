'use server';

import { auth, signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';

type ReturnData = {
  status: string;
  data: any;
  error_messages: Array<string>
}

const API_BASE_URL = 'http://localhost:8000/api';

export async function register(_currentState: unknown, data: object) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 403) {
      //return validation errors
      const data: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: result.data.values
      }
      return data;
      // return { status: 'fail', data: {}, error_messages: []}
    }else if (response.status == 200) {
      //console.log(result);
      await signIn('credentials', ({...result.data.user, token: result.data.token, isSignup: true, redirectTo: '/dashboard/email-verification-notice', redirect: true}));
      // const data: ReturnData = {
      //   status: 'success',
      //   data: result,
      //   error_messages: []
      // }
      // return data;
    }
    else {
      const data: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
      }
      return data;
    }
  } catch (error) {
    //console.error(error);
    throw error;
  }
  
};

export async function authenticate(_currentState: unknown, data: object) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 400) {
      return 'Invalid credentials.';
    }else if (response.status == 200) {
      //console.log(result);
      await signIn('credentials', ({...result.data.user, token: result.data.token, isSignup: false}));
    }
    else {
      return "Sorry, we couldn't process your request. Something went wrong, please try again.";
    }
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function getSession() {
  const session = await auth();
  return session;
}

export async function logOut() {
  const session = await auth().then(res=>{return res});
  const token = session?.user.accessToken;
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const result = await response.json();
    await signOut({redirectTo: '/', redirect: true});

  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function VerifyEmailAddress(input: string) {
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${API_BASE_URL}/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(
        {
          email_verification_code: input
        }
      ),
    });
    //console.log(response);

    let feedback = {
      status: '',
      message: '',
    };

    if (response.status == 405){
      feedback = {
        status: 'fail',
        message: 'Invalid Authorization.'
      }
      return feedback; 
    }

    const result = await response.json();

    //console.log(result);
    switch (response.status) {
      case 200:
        redirect('/dashboard');
        // feedback = {
        //   status: 'success',
        //   message: result.message
        // }
        break;
      case 400:
        let status = '';
        if (result.message == 'verification code expired') {
          status = 'fail';
        }else if (result.message == 'email address is already verified') {
          status = 'no-action'
        }
        feedback = {
          status: status,
          message: result.message
        }
        break;
      case 404:
        feedback = {
          status: 'fail',
          message: result.message
        }
        break;                                                     
    
      default:
        feedback = {
        status: 'fail',
        message: "Sorry, we couldn't process your request. Something went wrong, please try again."
        }
        break;        
    }
    return feedback;
  } catch (error) {
    throw error
  }  
}

export async function ResendEmailVerificationCode() {
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${API_BASE_URL}/email/verification-code`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    //console.log(response);

    let feedback = {
      status: '',
      message: '',
    };

    if (response.status == 405){
      feedback = {
        status: 'fail',
        message: 'Invalid Authorization.'
      }
      return feedback;
    }

    const result = await response.json();

    //console.log(result);
    switch (response.status) {
      case 200:
        feedback = {
          status: 'success',
          message: result.message
        }
        break;
      case 400:
        feedback = {
          status: 'no-action',
          message: result.message
        }
        break;                                                  
    
      default:
        feedback = {
        status: 'fail',
        message: "Sorry, we couldn't process your request. Something went wrong, please try again."
        }
        break;         
    }
    return feedback;
  } catch (error) {
      const feedback = {
        status: 'fail',
        message: "Sorry, we couldn't process your request. Something went wrong, please try again."
      }
      return feedback;
  }  
}