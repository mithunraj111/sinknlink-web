import { environment } from '../environments/environment';

export const AppConstant = Object.freeze({
  API_END_POINT: environment.baseURL,
  LOCALSTORAGE: {
    STR_PREFIX: 'bd20190404-',
    TOKEN: 'token',
    USER: 'user',
    ISAUTHENTICATED: 'isAuthenticated'
  },
  BUTTON_TXT: {
    SAVE: 'Save',
    UPDATE: 'Update'
  },
  // Form Titles
  FORM_TITLE: {
    CATEGORY: {
      ADD: 'Add Business Category',
      UPDATE: 'Update Business Category'
    }
  },
  // Status
  STATUS_ACTIVE: 'Active',
  STATUS_INACTIVE: 'Inactive',
  STATUS_AVAILABLE: 'Available',

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

  API_CONFIG: {
    ANG_DATE: {
      displaydtime: 'dd-MMM-yyyy HH:mm',
      displaydate: 'dd-MMM-yyyy',
    },
    API_URL: {
      AUTH: {
        LOGIN: 'auth/signin',
        FORGOTPWD: 'auth/forgotpassword'
      },
      MASTERS: {
        CATEGORY: {
          CREATE: 'category/create',
          LIST: 'category',
          GETBYID: 'category/',
          UPDATE: 'category/edit/'
        },
        LOCATION: {
          CREATE: 'location/create',
          LIST: 'location',
          GETBYID: 'location/',
          UPDATE: 'location/edit/'
        },
        LOOKUP: {
          CREATE: 'lookup/create',
          LIST: 'lookup',
          GETBYID: 'lookup/',
          UPDATE: 'lookup/edit/'
        },
        USER: {
          CREATE: 'user/create',
          LIST: 'user',
          GETBYID: 'user/',
          UPDATE: 'user/edit/'
        }
      }
    }
  }
});
