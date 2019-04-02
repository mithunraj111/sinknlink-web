import { environment } from '../environments/environment';

export const AppConstant = Object.freeze({
  IMG_BASE_URL: environment.host + ':' + environment.port,
  API_END_POINT: environment.host + ':' + environment.port + environment.baseurl,
  LOCALSTORAGE: {
    STR_PREFIX: 'bd20190404-',
    TOKEN: 'token',
    USER: 'user',
    ISAUTHENTICATED: 'isAuthenticated',
    SCREENS: 'scrcodes-',
    DEALER: 'dealer-',
    PERMISSIONS: 'permissions'
  },
  MAX_FILE_SIZE: 5000000,
  MAX_FILE_COUNT: [1, 5],
  AUTHENTICATION: 'Authentication',
  PERMISSION: ['Create', 'View', 'Edit', 'Delete', 'Download'],
  BUTTON_TXT: {
    SAVE: 'Save',
    UPDATE: 'Update'
  },
  MESSAGE: {
    GIGS: 'Gigs',
    COUPON: 'Coupon',
    BRANCHES: 'Branch'
  },
  // Form Titles
  FORM_TITLE: {
    USER: {
      ADD: 'Add System user',
      UPDATE: 'Update System user'
    },
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
  AD_PREMIUM: 'Y',
  AD_NOTPREMIUM: 'N',
  STATUS_ACTIVE: 'Active',
  STATUS_INACTIVE: 'Inactive',
  STATUS_AVAILABLE: 'Available',
  STATUS_UNAVAILABLE: 'Notavailable',
  STATUS_DELETED: 'Deleted',
  STATUS_INVALID: 'Invalid',
  STATUS_BLOCKED: 'Blocked',
  STATUS_SUCCESS: 'Success',
  STATUS_ALLOCATED: 'Allocated',
  MEM_TYPE: 'Free',
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
    { label: 'Business Type', value: 'biz_businesstype' },
    { label: 'Business City', value: 'biz_businesscity' },
    { label: 'Payment Tenure', value: 'biz_paymenttenure' },
    { label: 'Change Number Request', value: 'user_setting' },
    { label: 'Malls', value: 'biz_malls' }
  ],
  PAYMENT_STATUS: [
    { label: 'Paid', value: 'Paid' },
    { label: 'Due', value: 'Due' }
  ],
  // Workdays Data
  WORKDAYS: [
    { value: 'Monday', label: 'Monday', display: 'Monday' },
    { value: 'Tuesday', label: 'Tuesday', display: 'Tuesday' },
    { value: 'Wednesday', label: 'Wednesday', display: 'Wednesday' },
    { value: 'Thursday', label: 'Thursday', display: 'Thursday' },
    { value: 'Friday', label: 'Friday', display: 'Friday' },
    { value: 'Saturday', label: 'Saturday', display: 'Saturday' },
    { value: 'Sunday', label: 'Sunday', display: 'Sunday' },
  ],
  // POST_TYPES
  POST_TYPES: [
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' }
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
          UPDATE: 'donation/edit/',
          DELETE: 'donation/delete/'
        },
        LOOKUP: {
          CREATE: 'lookup/create',
          LIST: 'lookup',
          GETBYID: 'lookup/',
          UPDATE: 'lookup/edit/',
          DELETE: 'lookup/delete/'
        },
        EVENT: {
          CREATE: 'event/create',
          LIST: 'event',
          GETBYID: 'event/',
          UPDATE: 'event/edit/',
          DELETE: 'event/delete/'

        },
        FANCYNO: {
          CREATE: 'fancyno/create',
          LIST: 'fancyno',
          EDIT: 'fancyno/edit',
          BLOCK: 'fancyno/block',
          ALLOCATE: 'fancyno/allocate',
          UPDATEALLOCATED: 'fancyno/updateallocation',
          DELETE: 'fancyno/delete/'
        },
        ADVERTISEMENT: {
          CREATE: 'advertisement/create',
          LIST: 'advertisement',
          EDIT: 'advertisement/edit/',
          GETBYID: 'advertisement/',
          DELETE: 'advertisement/delete/'
        }
      },
      COMMON: {
        DASHBOARD: {
          ALL_COUNT: 'dashboard/employee',
          BIZ_COUNT: 'dashboard/topcategories',
          SEARCH_COUNT: 'dashboard/popularcategories',
          CUSTOMER: 'dashboard/customer',
          RATING: 'dashboard/customer/rating',
          DEALER: 'dashboard/dealer',
          DEALERBIZCOUNT: 'dashboard/dealerbizcount',
          DEALERREVIEW: 'dashboard/dealer/review'
        },
        REPORT: {
          AREA_COUNT: 'report/area',
          CATEGORY_COUNT: 'report/category',
          CONSUMER_COUNT: 'report/consumer',
          DEALER_COUNT: 'report/dealer',
          CUSTOMER_DETAIL: 'report/customerdetails',
          PAYMENT_STATUS: 'report/paymentstatus'
        },
        DOCUMENT: {
          CREATE: 'document/create',
          UPDATE: 'document/edit/',
          LIST: 'document'
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
          UPDATE: 'category/edit/',
          DELETE: 'category/delete/'
        },
        LOCATION: {
          CREATE: 'location/create',
          LIST: 'location',
          GETBYID: 'location/',
          UPDATE: 'location/edit/',
          DELETE: 'location/delete/'
        },
        USER: {
          CREATE: 'user/create',
          LIST: 'user',
          GETBYID: 'user/',
          UPDATE: 'user/edit/',
          DELETE: 'user/delete/'
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
          UPDATE: 'role/edit/',
          DELETE: 'role/delete/'

        }
      },
      BUSINESS: {
        DEALER: {
          CREATE: 'dealer/create',
          LIST: 'dealer',
          GETBYID: 'dealer/',
          UPDATE: 'dealer/edit/',
          DELETE: 'dealer/delete/'
        },
        CONSUMER: {
          GETBYID: 'consumer/',
          CREATE: 'consumer/create',
          LIST: 'consumer',
          UPDATE: 'consumer/edit/',
          DELETE: 'consumer/delete/'
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
          UPDATE: 'business/edit/',
          DELETE: 'business/delete/'
        },
        GIGS: {
          GETBYID: 'gigs/',
          CREATE: 'gigs/create',
          LIST: 'gigs',
          UPDATE: 'gigs/edit/',
          DELETE: 'gigs/delete/'
        },
        COUPONS: {
          GETBYID: 'coupon/',
          CREATE: 'coupon/create',
          LIST: 'coupon',
          UPDATE: 'coupon/edit/',
          DELETE: 'coupon/delete/'
        }
      }
    }
  },
  PAYMENT_TYPES: [
    'Online',
    'Offline'
  ],
  REGEX: {
    WEBSITE: '((?:https?\:\/\/|www\.)(?:[-a-z0-9]+\.)*[-a-z0-9]+.*)',
    EMAIL: '([a-z0-9&_\.-]*[@][a-z0-9]+((\.[a-z]{2,3})?\.[a-z]{2,3}))',
  },

  //Do not change this variables//

  EMPTY_MESSAGES: {
    USER: { emptyMessage: 'No user data to display', totalMessage: 'total' },
    ROLES: { emptyMessage: 'No role data to display', totalMessage: 'total' },
    ADDROLES: { emptyMessage: 'No screen permissions to display', totalMessage: 'total' },
    CATEGORIES: { emptyMessage: 'No category data to display', totalMessage: 'total' },
    LOCATION: { emptyMessage: 'No location data to display', totalMessage: 'total' },
    CUSTOMERS: { emptyMessage: 'No customer data to display', totalMessage: 'total' },
    PAYMENT: { emptyMessage: 'No payment data to display', totalMessage: 'total' },
    BRANCHES: { emptyMessage: 'No branch data to display', totalMessage: 'total' },
    GIGS: { emptyMessage: 'No gigs data to display', totalMessage: 'total' },
    COUPONS: { emptyMessage: 'No coupon data to display', totalMessage: 'total' },
    CONSUMERS: { emptyMessage: 'No consumer data to display', totalMessage: 'total' },
    CONSUMERCOUPONS: { emptyMessage: 'No coupon data to display', totalMessage: 'total' },
    FAVOURITES: { emptyMessage: 'No favourite data to display', totalMessage: 'total' },
    DEALER: { emptyMessage: 'No dealer data to display', totalMessage: 'total' },
    DEALER_CUSTOMER: { emptyMessage: 'No customer data to display', totalMessage: 'total' },
    EVENTS: { emptyMessage: 'No event data to display', totalMessage: 'total' },
    ADVERTISEMENT: { emptyMessage: 'No advertisement data to display', totalMessage: 'total' },
    DONATIONS: { emptyMessage: 'No donation data to display', totalMessage: 'total' },
    LOOKUP: { emptyMessage: 'No lookup data to display', totalMessage: 'total' },
    VIPNUMBER: { emptyMessage: 'No vip number registration data to display', totalMessage: 'total' },
    AREA: { emptyMessage: 'No area report data to display', totalMessage: 'total' },
    CATEGORY: { emptyMessage: 'No category report data to display', totalMessage: 'total' },
    CUSTOMERREPORT: { emptyMessage: 'No customer report data to display', totalMessage: 'total' },
    CONSUMER: { emptyMessage: 'No consumer report data to display', totalMessage: 'total' },
    DEALERREPORT: { emptyMessage: 'No dealer report data to display', totalMessage: 'total' },
    PAYMENTREPORT: { emptyMessage: 'No payment report data to display', totalMessage: 'total' },
    DEALER_PAYMENT: { emptyMessage: 'No payment data to display', totalMessage: 'total' }

  }

});
