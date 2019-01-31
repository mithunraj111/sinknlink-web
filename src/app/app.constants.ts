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
    },
    LOOKUP: {
      ADD: 'Add Lookup',
      UPDATE: 'Update Lookup'
    }
  },
  // Status
  STATUS_ACTIVE: 'Active',
  STATUS_INACTIVE: 'Inactive',
  STATUS_AVAILABLE: 'Available',
  STATUS_DELETED: 'Deleted',
  STATUS_INVALID: 'INVALID',
  // Datatypes array
  DATATYPES: [
    { label: 'String', value: 'String' },
    { label: 'Integer', value: 'Integer' },
    { label: 'Object', value: 'Object' },
    { label: 'Float', value: 'Float' }],
  // Default Data
  LOOKUP: [
    { label: 'Business Delivery Methods', value: 'biz_deliverymethods' },
    { label: 'Business Member Type', value: 'biz_membertype' },
    { label: 'States', value: 'biz_states' },
    { label: 'Payment Methods', value: 'biz_paymentmethods' },
    { label: 'Business Type', value: 'biz_businesstype' },
    { label: 'Testing', value: 'app_test' }
  ],
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
        },
        PAYMENTS: {
          CREATE: 'payment/create',
          LIST: 'payment',
          GETBYID: 'payment/',
          UPDATE: 'payment/edit/'
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
        CONSUMERCOUPON: {
          GETBYID: 'consumercoupon/',
          CREATE: 'consumercoupon/create',
          LIST: 'consumercoupon',
          UPDATE: 'consumercoupon/edit/'
        },
        CONSUMERFAVORITES: {
          GETBYID: 'consumerfavorites/',
          CREATE: 'consumerfavorites/create',
          LIST: 'consumerfavorites',
          UPDATE: 'consumerfavorites/edit/'
        },
        REVIEWS: {
          GETBYID: 'review/',
          CREATE: 'review/create',
          LIST: 'review',
          UPDATE: 'review/edit/'
        },
        CUSTOMER: {
          GETBYID: 'business/',
          CREATE: 'business/create',
          LIST: 'business',
          UPDATE: 'business/edit/'
        },
        GIGS: {
          GETBYID: 'gigs/',
          CREATE: 'gigs/create',
          LIST: 'gigs',
          UPDATE: 'gigs/edit/'
        },
        COUPONS: {
          GETBYID: 'coupon/',
          CREATE: 'coupon/create',
          LIST: 'coupon',
          UPDATE: 'coupon/edit/'
        }
      }
    }
  }
});
