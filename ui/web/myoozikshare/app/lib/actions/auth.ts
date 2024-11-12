'use server';
import { getSession as getServerSession } from 'next-auth/react';

import { auth, signIn, signOut } from '@/auth';
import { AuthError, User } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect';
import { redirect, RedirectType } from 'next/navigation';
import { SignUpData } from '../definitions';

type ReturnData = {
  status: string;
  data: any;
  error_messages: Array<string>
}

export async function register(data: SignUpData) {
  try {
    const postData = {
          first_name: data.firstName,
          last_name: data.lastName,
          user_name: data.userName,
          email: data.email,
          password: data.password,
          password_confirmation: data.passwordConfirmation
    }
    const response = await fetch(`${process.env.BACKEND_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 403) {
      //return validation errors
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: result.data.values
      }
      return returnData;
    }else if (response.status == 200) {
      //console.log(result);
      await signIn('credentials', ({email: result.data.user.email, password: data.password, useCase: 'signup', redirectTo: '/dashboard/email-verification-notice', redirect: true}));
      const returnData: ReturnData = {
        status: 'success',
        data: result,
        error_messages: []
      }
      return returnData;
    }
    else {
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
      }
      return returnData;
    }
  } catch (error) {
    //console.error(error);
    throw error;
  }
  
};

export async function authenticate(data: object) {
  try {
    await signIn('credentials', data)
  } catch (error: any) {
    if (isRedirectError(error)) {
      throw error
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return "Sorry, we couldn't process your request. Something went wrong, please try again.";
      }
    }
    throw error;
  }
}

export async function getSession() {
  // const { data: session, update } = await auth();
  const session = await auth();
  return session;
}

export async function logOut() {
  const session = await auth().then(res=>{return res});
  const token = session?.user.accessToken;
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/logout`, {
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
    const response = await fetch(`${process.env.BACKEND_API_URL}/verify-email`, {
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
    const response = await fetch(`${process.env.BACKEND_API_URL}/email/verification-code`, {
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

export async function InitiatePasswordRecovery(data: {email: string, attempt: string}) {
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let feedback = {
      status: '',
      message: '',
    };

    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    switch (response.status) {
      case 200:
        if(data.attempt == 'first') {
          const url = new URL('/auth/reset-password', `${process.env.BASE_URL}`);
          url.searchParams.set('email', data.email);
          //console.log(url);
          redirect(url.href, RedirectType.push);
        }
        else{
          feedback = {
            status: 'success',
            message: result.message
          }
          break;
        }
      case 400:
        feedback = {
          status: 'fail',
          message: result.message
        }
        break;
        
      case 403:
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
    throw error;
  } 
}

export async function ResetPassword(data: object) {
  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: []
    };

    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    switch (response.status) {
      case 200:
        returnData = {
          status: 'success',
          data: result,
          error_messages: []
        }
        break;

      case 400:
        returnData = {
          status: 'fail',
          data: {},
          error_messages: [result.message]
        }
        break;  
        
      case 403:
        returnData = {
          status: 'fail',
          data: {},
          error_messages: result.data.values
        }
        break;      
    
      default:
        returnData = {
          status: 'fail',
          data: {},
          error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
        }
        break;         
    }
    return returnData;
  } catch (error) {
    const returnData = {
      status: 'fail',
      data: {},
      error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
    }
    return returnData;
  } 
}

export async function UpdateProfile(data: object) {
  try {
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 403) {
      //return validation errors
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: result.data.values
      }
      return returnData;
      // return { status: 'fail', data: {}, error_messages: []}
    }else if (response.status == 200) {
      //console.log(result.data.user);
      // await signIn('credentials', ({...result.data.user, access_token: token, isSignup: false, redirect: false}));
      // const session = await getServerSession();
      // session.user = result.data.user as User
      const returnData: ReturnData = {
        status: 'success',
        data: result.data,
        error_messages: []
      }
      return returnData;
    }
    else {
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
      }
      return returnData;
    }
  } catch (error) {
    //console.error(error);
    throw error;
  }
  
};

export async function ChangePassword(
  data: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }
) {
  try {
    const postData = {
      current_password: data.currentPassword,
      password: data.newPassword,
      password_confirmation: data.newPasswordConfirmation
    }
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 403) {
      //return validation errors
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: result.data.values
      }
      return returnData;
      // return { status: 'fail', data: {}, error_messages: []}
    }else if (response.status == 200) {
      const returnData: ReturnData = {
        status: 'success',
        data: result.data,
        error_messages: []
      }
      return returnData;
    }
    else {
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
      }
      return returnData;
    }
  } catch (error) {
    //console.error(error);
    throw error;
  }
  
};

export async function DeleteAccount(
  password: string
) {
  try {
    const postData = {
      password: password
    }
    const session = await auth().then(res=>{return res});
    const token = session?.user.accessToken;
    const response = await fetch(`${process.env.BACKEND_API_URL}/delete-user-account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    //console.log(response.status);
    const result = await response.json();
    //console.log(result.data);

    if (response.status == 403) {
      //return validation errors
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Invalid Password."]
      }
      return returnData;
      // return { status: 'fail', data: {}, error_messages: []}
    }else if (response.status == 200) {
      await signOut({redirectTo: '/', redirect: true});
      const returnData: ReturnData = {
        status: 'success',
        data: result.data,
        error_messages: ["User account deleted successfully."]
      }
      return returnData;
    }
    else {
      const returnData: ReturnData = {
        status: 'fail',
        data: {},
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
      }
      return returnData;
    }
  } catch (error) {
    //console.error(error);
    throw error;
  }
  
};