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
  }
  // Status
  STATUS_ACTIVE: 'Active',
  STATUS_INACTIVE: 'Inactive',
  STATUS_AVAILABLE: 'Available',

  API_CONFIG: {
    ANG_DATE: {
      displaydtime: 'dd-MMM-yyyy HH:mm',
      displaydate: 'dd-MMM-yyyy',
    },
    API_URL: {
      AUTH: {
        LOGIN: 'auth/sigin'
      },
      MASTERS: {
        CATEGORY: {
          CREATE: 'masters/category/create',
          LIST: 'masters/category',
          GETBYID: 'masters/category/',
          UPDATE: 'masters/category/edit/'
        },
        LOCATION: {
          CREATE: 'masters/location/create',
          LIST: 'masters/location',
          GETBYID: 'masters/location/',
          UPDATE: 'masters/location/edit/'
        },
        LOOKUP: {
          CREATE: 'masters/lookup/create',
          LIST: 'masters/lookup',
          GETBYID: 'masters/lookup/',
          UPDATE: 'masters/lookup/edit/'
        }
      }
    }
  }
});
