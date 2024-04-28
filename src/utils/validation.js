const validation = {
  required: {
    value: true,
    message: (field) => `${field} is required`,
  },
  minLength: {
    value: 8,
    message: (field, length) => `Minimum ${field} length is ${length}`,
  },
  emailPattern: {
    value: /\S+@\S+\.\S+/,
    message: () => 'Email not valid',
  },
  passwordPattern: {
    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
    message: () =>
      'Password must contain at least one uppercase letter, one digit, and one special character (!@#$%^&*)',
  },
};

export default validation;
