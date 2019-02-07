import { environment } from '../environments/environment';

export const AppConstant = Object.freeze({
  IMG_BASE_URL: environment.host + ':' + environment.port,
  API_END_POINT: environment.host + ':' + environment.port + environment.baseurl,
  LOCALSTORAGE: {
    STR_PREFIX: 'bd20190404-',
    TOKEN: 'token',
    USER: 'user',
    ISAUTHENTICATED: 'isAuthenticated',
    SCREENS: 'scrcodes-'
  },
  PERMISSION: ['Create', 'View', 'Edit', 'Delete'],
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
    },
    GIG: {
      ADD: 'Add Gig Detail',
      UPDATE: 'Update Gig Detail'
    },
    COUPON: {
      ADD: 'Add Coupon',
      UPDATE: 'Update Coupon'
    }
  },
  // Status
  STATUS_ACTIVE: 'Active',
  STATUS_INACTIVE: 'Inactive',
  STATUS_AVAILABLE: 'Available',
  STATUS_UNAVAILABLE: 'Notavailable',
  STATUS_DELETED: 'Deleted',
  STATUS_INVALID: 'INVALID',
  STATUS_BLOCKED: 'BLOCKED',
  STATUS_SUCCESS: 'Success',
  // Datatypes array
  DATATYPES: [
    { label: 'String', value: 'String' },
    { label: 'Integer', value: 'Integer' },
    { label: 'Object', value: 'Object' },
    { label: 'Float', value: 'Float' }],
  // LOOKUP Reference Default Data
  LOOKUP: [
    { label: 'State', value: 'biz_states' },
    { label: 'Delivery Method', value: 'biz_deliverymethods' },
    { label: 'Member Type', value: 'biz_membertype' },
    { label: 'Payment Method', value: 'biz_paymentmethods' },
    { label: 'Business Type', value: 'biz_businesstype' }
  ],
  PAYMENT_TENURES: [
    { label: 'Monthly', value: '1' },
    { label: 'Quarterly', value: '3' },
    { label: 'Half Yearly', value: '6' },
    { label: 'Yearly', value: '12' }
  ],
  PAYMENT_STATUS: [
    { label: 'Paid', value: 'Paid' },
    { label: 'Due', value: 'Due' }
  ],
  // Workdays Data
  WORKDAYS: [
    { value: 'Monday', label: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday' },
    { value: 'Friday', label: 'Friday' },
    { value: 'Saturday', label: 'Saturday' },
    { value: 'Sunday', label: 'Sunday' },
  ],
  // POST_TYPES
  POST_TYPES: [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' }
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
          EDIT: 'fancyno/edit',
          BLOCK: 'fancyno/block',
          ALLOCATE: 'fancyno/allocate'
        }
      },
      COMMON: {
        REPORT: {
          AREA_COUNT: 'report/area',
          CATEGORY_COUNT: 'report/category'
        },
        DOCUMENT: {
          CREATE: 'document/create',
          UPDATE: 'document/edit/'
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
        SETTINGS: {
          CREATE: 'settings/create',
          LIST: 'settings',
          GETBYID: 'settings/',
          UPDATE: 'settings/edit/',
          BULKUPDATE: 'settings/bulkupdate'
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
