
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
    },
    DONATION: {
      charityname: {
        required: 'Charity name is required',
        minlength: 'Charity name atleast more than 1 characters',
        maxlength: 'Charity name should be within 50 characters'
      },
      startdate: {
        required: 'Start date is required'
      },
      enddate: {
        required: 'End date is required'
      },
      causeremarks: {
        required: 'Cause is required',
        minlength: 'Cause atleast more than 1 characters',
        maxlength: 'Cause should be within 500 characters'
      },
      amount: {
        required: 'Preferred amount is required',
      }
    },
    LOCATION: {
      pincode: {
        required: 'Pincode is required',
        maxlength: 'Pincode should be lesser than 10 characters',
        pattern: 'Should contain only numbers'
      },
      area: {
        required: 'Area is required',
        maxlength: 'Area should be lesser than 50 characters'
      },
      state: {
        required: 'State is required',
      },
      city: {
        required: 'City is required',
        maxlength: 'City should be lesser than 50 characters'
      }
    }
  },
});
