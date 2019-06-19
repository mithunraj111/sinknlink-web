
export const AppMessages = Object.freeze({
  // Validation Messages
  VALIDATION: {
    COMMON: {
      DELETE_SUCCESS: 'Deleted Successfully'
    },
    LOGIN: {
      mobileno: {
        required: 'Please enter mobile number',
        pattern: 'Please enter valid mobile number'
      },
      password: { required: 'Please enter password' }
    },
    FORGOTPASSWORD: {
      mobileno: {
        required: 'Please enter mobile number',
        minlength: 'Mobile number is not valid',
        maxlength: 'Mobile number is not valid',
        pattern: 'Please enter valid mobile number'
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
      statecode: {
        required: 'Please select state'
      },
      prefix: {
        maxlength: 'Please enter prefix within 5 characters',
        pattern: 'Please enter a valid prefix'
      },
      startnumber: {
        required: 'Please enter a start number'
      },
      price: {
        required: 'Cost is required'
      }
    },
    EVENT: {
      eventname: {
        required: 'Event name is required',
        maxlength: 'Please enter Event name within 50 characters'
      },
      city: { required: 'City is required' },
      locationid: {
        required: 'Location is required'
      },
      eventdate: {
        required: 'Event start date is requried',
        max: 'Start Date should be smaller than End Date',
        min: 'Start Date should be greater than or equal to Current Date'
      },
      eventexpirydt: {
        required: 'Event end date is requried'
      },
      address: {
        required: 'Address is requried',
        maxlength: 'Please enter address within 100 characters'
      },
      description: {
        required: 'Description is requried',
        maxlength: 'Please enter description within 500 characters'
      }
    },
    PLAN: {
      planname: {
        required: 'Plan name is required',
        maxLength: 'Please enter Event name within 50 characters'
      },
      planlevel: {
        required: 'Plan level is required',
        maxlength: 'Plan level should be within 11 characters',
        pattern: 'Plan level should contain only numbers'
      },
      cost: { 
        required: 'Cost is required',
        pattern: 'Cost should contain only numbers',
        min: 'Cost should not be less than zero'
      },
      taxpercent: {
        required: 'Tax percent is required',
        max: 'Tax percent should be less than 100%',
        pattern: 'Tax percent should contain only numbers'
      },
      noofdays: {
        required: 'Days is required',
        maxLength: 'Days should be within 11 characters',
        pattern: 'Days should contain only numbers'
      },
      trialperiod: {
        required: 'Trial period is required',
        maxLength: 'Trial period should be within 11 characters',
        pattern: 'Trial period should contain only numbers'
      },
      description: { maxLength: 'Description should be within 500 characters' }
    },
    ADVERTISEMENT: {
      adname: {
        required: 'Advertisement name is required'
      },
      city: { required: 'City is required' },
      locationid: {
        required: 'Location is required'
      },
      categoryid: {
        required: 'Category is required'
      },
      startdate: {
        required: ' Start date is requried',
        max: 'Start Date should be smaller than End Date'
      },
      expirydate: {
        required: 'Expiry date is requried'
      },
      description: {
        required: 'Notes is requried'
      },
      url: {
        required: 'url is requried'
      }
    },
    USER: {
      fullname: {
        required: 'Please enter name',
        minlength: 'please enter name atleast 3 characters',
        maxlength: 'Please enter name between 50 characters',
        pattern: 'Please enter a valid name',
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
        max: 'Start Date should be smaller than End Date',
        min: 'Start Date should be greater than or equal to the Current Date'
      },
      enddate: {
        required: 'End date is required'
      },
      amount: {
        required: 'Amount is required'
      },
      causeremarks: {
        minlength: 'Cause atleast more than 1 characters',
        maxlength: 'Cause should be within 500 characters'
      },

    },
    AREACATEGORIES: {
      fromdate: {
        max: 'From date should be smaller than to date'
      }
    },
    DEALERREPORT: {
      fromdate: {
        max: 'From date should be smaller than to date'
      }
    },
    PAYMENTREPORT: {
      fromdate: {
        max: 'From date should be smaller than to date'
      }
    },
    PROFILE: {
      newpassword: {
        required: 'Please enter new password',
        minlength: 'Please enter password atleast 8 characters',
        maxlength: 'Please enter password within 30 characters',
        equal: 'New password and confirm password should be same '
      },
      confirmpassword: {
        required: 'Please enter confirm password',
        minlength: 'Please enter password atleast 8 characters',
        maxlength: 'Please enter password within 30 characters',
        common: 'Password updated successfully'
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
        city: {
          required: 'Please select city'
        },
        locationid: {
          required: 'Please select location'
        },
        address: {
          required: 'Address should be less than 100 characters'
        },
        commissionpercent: {
          required: 'Please enter commission percent',
          max: 'Commision percent should be less than 100 %',
          invalid: 'Please enter valid percentage'
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
        required: 'Please enter contact person',
        maxlength: 'Contact person name should be less than 50 characters'
      },
      contactmobile: {
        required: 'Please enter contact mobile',
        pattern: 'Please enter valid mobile number'
      },
      description: {
        maxlength: 'Description should be less than 500 characters'
      },
      common: 'Please fill the gig details'
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
      startdate: {
        required: 'Please select start date'
      },
      expirydt: {
        required: 'Please select expiry date',
        invalid: 'Invalid date'
      },
      description: {
        required: 'Please enter description',
        maxlength: 'Description should be less than 500 characters',
        minlength: 'Description should contain atleast 3 characters'
      },
      status: {
        required: 'Please select status'
      },
      common: 'Please fill the coupon details'
    },
    BUSINESS: {
      common: 'Please enter business details',
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
      bizdescription: {
        minlength: 'Description should be atleast 5 characters',
        maxlength: 'Description should be within 500 characters'
      },
      contactmobile: {
        required: 'Please enter primary mobile number',
        pattern: 'Please enter valid mobile number'
      },
      contactemail: {
        required: 'Please enter email address',
        pattern: 'Please enter valid email address',
        maxlength: 'Email address should be within 100 characters'

      },
      phoneno: { required: 'Please enter phone number' },
      categoryid: { required: 'Please select category' },
      tags: { required: 'Please enter tags' },
      postaladdress: {
        required: 'Please enter address',
        minlength: 'Postal address should be atleast 1 characters',
        maxlength: 'Postal address should be within 100 characters'
      },
      latitude: {
        required: 'Please enter latitude ',
        invalid: 'Please enter valid latitude'
      },
      longitude: {
        required: 'Please enter longitude',
        invalid: 'Please enter valid longitude'
      },
      landmark: { maxlength: 'Landmark should be within 50 characters' },
      city: { required: 'Please select city' },
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
    },
    PAYMENTS: {
      paymentdt: { required: 'Please select paid date' },
      totalamount: { required: 'Please enter amount', pattern: 'Payment should only contain numbers' },
      paymentmode: { required: 'Please select mode of payment' },
      paymentref: { required: 'Please enter payment reference' },
      remarks: { maxlength: 'Remarks should be within 100 characters' },
      donationamount: { minimum: 'Donation amount should be atleast 1 INR' }
    },
    REPLY: {
      reply: { required: 'Please enter a reply', maxlength: 'Reply should be within 100 Characters' }
    },
    FILEUPLOAD: 'You are only allowed to upload a maximum of 5 images and 1 video'
  },
});
