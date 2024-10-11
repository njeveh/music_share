type ReturnData ={
  status: string;
  data: any;
  error_messages: Array<string>
}
export async function register(_currentState: unknown, data: object) {
  const API_BASE_URL = 'http://localhost:8000/api';
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    //console.log(response)
    const result = await response.json();

    if (response.status == 403) {
      //return validation errors
      const data: ReturnData = {
        status: 'fail',
        data: [],
        error_messages: result.error_messages
      }
      return data;
    }else if (response.status == 201) {
      const data: ReturnData = {
        status: 'success',
        data: response.body,
        error_messages: []
      }
      return data;
    }
    else {
      const data: ReturnData = {
        status: 'fail',
        data: [],
        error_messages: ["Sorry, we couldn't process your request. Something went wrong, please try again."]
      }
      return data;
    }
  } catch (error) {
    throw new Error("");
  }
  
}