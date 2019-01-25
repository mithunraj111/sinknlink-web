
export const AppMessages = Object.freeze({
  // Validation Messages
  VALIDATION: {
    COMMON: {
      DELETE_SUCCESS: 'Deleted Successfully'
    },
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
    CATEGORY: {
      categoryname: {
        required: 'Please enter category name',
        minlength: 'Please enter category name atleast 3 characters',
        maxlength: 'Please enter category name within 50 characters'
      }
    },
    FANCYNUMBER: {
      startnumber: {
        required: 'Please enter a start number'
      },
      endnumber: {
        min: 'End Number should be greater than start number'
      },
      cost: {
        required: 'Cost is required'
      }
    },
    EVENT: {
      eventname: {
        required: 'Event name is required'
      },
      locationid: {
        required: 'Location is required'
      },
      eventdate: {
        required: 'Event start date is requried'
      },
      eventexpirydt: {
        required: 'Event end date is requried'
      },
      address: {
        required: 'Address is requried'
      },
      description: {
        required: 'Description is requried'
      }
    },
    USER: {
      fullname: {
        required: 'Please enter full name',
        minlength: 'please enter full name atleast 3 characters',
        maxlength: 'Please enter full name between 50 characters',
        pattern: 'Please enter valid name',
      },
      mobileno: {
        required: 'Please enter mobile number',
        minlength: 'Please enter atleast 8 digits mobile number',
        maxlength: 'Please enter mobile number within 12 digits ',
        pattern: 'Please enter valid mobile number',
      },
      rolename: {
        required: 'Please select role',
        minlength: 'Please enter rolename atleast 3 characters',
        maxlength: 'Please enter rolename within 50 characters',
      },
      password: {
        required: 'Please enter password',
        minlength: 'Please enter password atleast 8 characters',
        maxlength: 'Please enter password within 30 characters',
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
        minlength: 'Cause atleast more than 1 characters',
        maxlength: 'Cause should be within 500 characters'
      },

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
