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
    },
    LOCATION: {
      ADD: 'Add Location',
      UPDATE: 'Update Location'
    }
  },
  // Status
  STATUS_ACTIVE: 'Active',
  STATUS_INACTIVE: 'Inactive',
  STATUS_AVAILABLE: 'Available',
  STATUS_DELETED: 'Deleted',
  STATUS_INVALID: 'INVALID',

  // Default Data
  DEFAULT_DATA_ACCESS: 'All',
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
      ADMIN: {
        DONATION: {
          CREATE: 'donation/create',
          LIST: 'donation',
          GETBYID: 'donation/',
          UPDATE: 'donation/edit/'
        },
        LOOKUP: {
          CREATE: 'lookup/create',
          LIST: 'lookup',
          GETBYID: 'lookup/',
          UPDATE: 'lookup/edit/'
        },
        EVENT: {
          CREATE: 'event/create',
          LIST: 'event',
          GETBYID: 'event/',
          UPDATE: 'event/edit/'
        },
        FANCYNO: {
          CREATE: 'fancyno/create',
          LIST: 'fancyno',
          EDIT: 'fancyno/edit'
        }
      },
      COMMON: {
        DOCUMENT: {
          CREATE: 'document/create',
          UPDATE: 'document/edit'
        }
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
        USER: {
          CREATE: 'user/create',
          LIST: 'user',
          GETBYID: 'user/',
          UPDATE: 'user/edit/'
        },
        ROLE: {
          CREATE: 'role/create',
          LIST: 'role',
          GETBYID: 'role/',
          UPDATE: 'role/edit/'
        }
      },
      BUSINESS: {
        DEALER: {
          CREATE: 'dealer/create',
          LIST: 'dealer',
          GETBYID: 'dealer/',
          UPDATE: 'dealer/edit/'
        },
        CONSUMER: {
          GETBYID: 'consumer/',
          CREATE: 'consumer/create',
          LIST: 'consumer',
          UPDATE: 'consumer/edit/'
        },
        CONSUMERCOUPON:{
          GETBYID: 'consumercoupon/',
          CREATE: 'consumercoupon/create',
          LIST: 'consumercoupon',
          UPDATE: 'consumercoupon/edit/'
        },
        CONSUMERFAVORITES:{
          GETBYID: 'consumerfavorites/',
          CREATE: 'consumerfavorites/create',
          LIST: 'consumerfavorites',
          UPDATE: 'consumerfavorites/edit/'
        }
      }
    }
  }
});
