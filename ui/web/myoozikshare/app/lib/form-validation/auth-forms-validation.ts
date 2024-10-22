export const ValidateField = (field: string, value: string, value2: string|null = null): string => {
  var error = '';
  switch (field) {
    case 'firstName':
      error = ValidateName(value);
      return error;
    case 'lastName':
      error = ValidateName(value);
      return error;
    case 'email':
      error = ValidateEmail(value);
      return error;
    case 'password':
      error = ValidatePassword(value);
      return error;
    case 'passwordConfirmation':
      error = ValidatePasswordConfirmation(value, value2);
      return error;

    default:
      return '';
  }
};

const ValidateName = (name: string): string => {
  if (name.length == 0) {
    return 'Name field can not be empty!';
  }
  if (!name.match(/^[\w\d\-']+$/i)) {
    return 'Name must contain only word and number characters.';
  }
  if (name.length < 2) {
    return "Name can't be less than two character";
  }
  return '';
};

const ValidateEmail = (email: string): string => {
  if (email.length == 0) {
    return 'Email field can not be empty!';
  }
  if (email.length < 8) {
    return 'Email field can not be less than 8 characters!';
  }
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return 'Your email should resembles example@domain.extension';
  }
  return '';
};

const ValidatePassword = (password: string): string => {
  if (password.length == 0) {
    return 'Password field can not be empty!';
  }
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[^\w\d])(?=.*[A-Z]).{8,}$/.test(password)) {
    return "Passwords must be at least 8 characters long and contain at 3 of 4 of the following: upper case (A-Z), lower case (a-z), number (0-9) and special character (e.g. !@#$%^&*)";
  }
  return '';
};

const ValidatePasswordConfirmation = (value: string, value2: string|null): string => {
  if (value.length === 0) {
    return 'Password Confirmation field can not be empty!';
  }
  if (value2 && value !== value2) {
    return 'Passwords do not match!';
  }
  return '';
};
