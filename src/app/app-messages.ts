
export const AppMessages = Object.freeze({
  // Validation Messages
  VALIDATION: {
    LOGIN: {
      mobileno: { required: 'Please enter mobile number' },
      password: { required: 'Please enter password' }
    },
    FORGOTPASSWORD: {
      mobileno: {
        required: 'Mobile number is required',
        minlength: 'Mobile number is not valid',
        maxlength: 'Mobile number is not valid'
      }
    }
  },
});
