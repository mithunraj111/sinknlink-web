
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
      },
      categoryimg: 'Please upload a photo'
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
        required: 'Event start date is requried',
        max: 'Start Date should be smaller than End Date'
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
        required: 'Start date is required',
        max: 'Start Date should be smaller than End Date'
      },
      enddate: {
        required: 'End date is required'
      },
      causeremarks: {
        minlength: 'Cause atleast more than 1 characters',
        maxlength: 'Cause should be within 500 characters'
      },

    },
    AREACATEGORIES: {
      fromdate: {
        max: 'Fromdate should be smaller than todate'
      }
    },
    PROFILE: {
      newpassword: {
        required: 'Please enter new password',
        minlength: 'Please enter password atleast 8 characters',
        maxlength: 'Please enter password within 30 characters',
        equal: 'New password and confirm password should be equal '
      },
      confirmpassword: {
        required: 'Please enter confirm password',
        minlength: 'Please enter password atleast 8 characters',
        maxlength: 'Please enter password within 30 characters',
      },
      fullname: {
        required: 'Please enter full name',
        minlength: 'please enter full name atleast 3 characters',
        maxlength: 'Please enter full name between 50 characters',
        pattern: 'Please enter valid name',

      },
      emailid: {
        pattern: 'Please enter a valid email',
        maxlength: 'Please enter emailid within 100 characters',
      },
      address: {
        minlength: 'please enter address atleast 1 characters',
        maxlength: 'Please enter address should be within 100 characters',
      }
    },
    LOCATION: {
      pincode: {
        required: 'Please enter pincode',
        maxlength: 'Pincode should be lesser than 10 characters',
        pattern: 'Pincode should contain only numbers'
      },
      area: {
        required: 'Please enter area name',
        maxlength: 'Area should be lesser than 50 characters'
      },
      state: {
        required: 'Please select state',
      },
      city: {
        required: 'Please enter city',
        maxlength: 'City should be lesser than 50 characters'
      }
    },
    LOOKUP: {
      refname: {
        required: 'Please enter key name'
      },
      refvalue: {
        required: 'Please enter key value',
        minlength: 'Lookup value atleast 1 character',
        maxlength: 'Lookup value not more than 100 characters'
      },
      keydesc: {
        maxlength: 'Description not more than 100 characters',
      },
      datatype: {
        required: 'Please select datatype',
      },
      defaultvalue: {
        required: 'Please select default flag',
      }
    },
    ROLES: {
      rolename: {
        required: 'Please enter role name',
        maxlength: 'Role name should be within should be within 50 characters'
      },
      dataaccess: 'Please select dataaccess',
      permissions: 'Please assign permission'
    },
    DEALER: {
      PROFILE: {
        dealername: { 
          required: 'Please enter dealer name',
          maxlength: 'Dealer name should be less than 50 characters'
        },
        contactperson: { 
          required: 'Please enter contact person name',
          maxlength: 'Contact name should be less than 50 characters'
        },
        mobileno: { 
          required: 'Please enter mobile number',
          minlength: 'Mobile number should be atleast 10 digits',
          maxlength: 'Mobile number should be less than 15 digits',
          pattern: 'Please enter a valid mobile number'
        },
        phoneno: { 
          maxlength: 'Phone number should be less than 15 digits',
          minlength: 'Phone number should be atleast 10 digits',
          pattern: 'Please enter a valid phone number'
        },
        locationid: { 
          required: 'Please select location' 
        },
        address: { 
          required: 'Address should be less than 100 characters' 
        },
        commissionpercent: { 
          required: 'Please enter commission percent',
          max: 'Commision percent should be less than 100 %'
        },
      }
    },
    GIG: {
      postname: { 
        required: 'Please enter post name', 
        maxlength: 'Post name should be less than 50 characters' 
      },
      posttype: { 
        required: 'Please select post type',
      },
      salary: { 
        required: 'Please enter salary range',
        pattern: 'Please enter valid salary range'
      },
      contactperson: { 
        required: 'Please enter contact mobile',
        maxlength: 'Contact person name should be less than 50 characters'
      },
      contactmobile: { 
        required: 'Please enter contact mobile',
        pattern: 'Please enter valid mobile number' 
      },
      description: { 
        required: 'Please select status',
        maxlength: 'Description should be less than 500 characters'
      }
    },
    COUPON: {
      couponcode: { 
        required: 'Please enter coupon code', 
        maxlength: 'Coupon code should be less than 50 characters' 
      },
      shortdesc: { 
        required: 'Please enter coupon title', 
        maxlength: 'Title should be less than 50 characters',
        minlength: 'Title should be atleast 3 characters'
      },
      noofcoupons: { 
        required: 'Please enter number of coupons',
        maxlength: 'Coupon count should be less than 11 digits',
        pattern: 'Coupon count should contain numbers only'
      },
      expirydt: { 
        required: 'Please select expiry date' 
      },
      description: { 
        required: 'Please enter description', 
        maxlength: 'Description should be less than 500 characters', 
        minlength: 'Description should contain atleast 3 characters'
      },
      status: { 
        required: 'Please select status' 
      }
    },
    BUSINESS: {
      bizname: {
        required: 'Please enter business name',
        minlength: 'Business name should be atleast 1 characters',
        maxlength: 'Business name should be within 50 characters'
      },
      biztype: { required: 'Please select business type' },
      contactperson: {
        required: 'Please enter contact person name',
        minlength: 'Contact person should be atleast 1 characters',
        maxlength: 'Contact person should be within 50 characters'
      },
      contactmobile: { required: 'Please enter mobile number' },
      contactemail: {
        required: 'Please enter email address',
        pattern: 'Please enter valid email address',
        maxlength: 'email address should be within 100 characters'

      },
      phoneno: { required: 'Please enter phone number' },
      categoryid: { required: 'Please select category' },
      tags: { required: 'Please enter sub categories' },
      postaladdress: {
        required: 'Please enter address',
        minlength: 'postal address should be atleast 1 characters',
        maxlength: 'postal address should be within 100 characters'
      },
      lat: {
        required: 'Please enter latitude '
      },
      lng: {
        required: 'Please enter longitude'
      },
      locationid: { required: 'Please select location' },
      workdays: { required: 'Please select work days' },
      starttime: { required: 'Please enter work hours' },
      endtime: { required: 'Please select work hours' },
      acceptedpayments: { required: 'Please select payment methods' },
      deliveryoptions: { required: 'Please select delivery methods' },
      socialids: { required: 'Please enter socialid' },
      taxno: {
        required: 'Please enter tax number',
        maxlength: 'Tax number should be within 30 characters'

      },
      website: {
        required: 'Please enter website',
        pattern: 'Please enter valid website'
      },
      regdate: { required: 'Please select registration date' },
      paymentstatus: { required: 'Please select payment status' },
      membershiptype: { required: 'Please select member type' },
      paymenttenure: { required: 'Please select payment tenture' },
      status: { required: 'Please select status' },
      tncagreed: { required: 'Please select terms and conditions' }
    }
  },
});
