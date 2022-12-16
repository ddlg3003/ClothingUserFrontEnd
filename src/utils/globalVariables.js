export const BLACK_LOGO =
  'https://res.cloudinary.com/dgyqhnavx/image/upload/v1670131428/samples/ecommerce/Clothing%20assets/Black_qvloqn.png';

export const WHITE_LOGO =
  'https://res.cloudinary.com/dgyqhnavx/image/upload/v1670131428/samples/ecommerce/Clothing%20assets/White_bfey7r.png';

export const CATEGORY_IMG =
  'https://res.cloudinary.com/dgyqhnavx/image/upload/v1670131567/samples/ecommerce/Clothing%20assets/category_jqeubl.jpg';

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

export const PHONE_REGEX =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const USERNAME_REGEX = /^[0-9a-zA-Z]{6,}$/;

export const URL_REGEX = /\s/g;

export const OTP_REGEX = /^[0-9]{6,6}$/;

export const LIMIT = 8;

export const SIDEBAR_STATE = [
  'profile',
  'address',
  'password',
  'favorites',
  'orders',
];

export const BASE_API_URL = 'http://localhost:8099';

export const PRODUCT_QUERY_STRING = ['page', 'limit', 'cat', 'keyword'];

export const PROFILE_QUERY_STRING = ['tab'];

export const ORDER_STATUS = [
  {
    status: 'PENDING',
    color: 'warning',
    string: 'Chờ xác nhận',
  },
  {
    status: 'DELIVERING',
    color: 'primary',
    string: 'Đang giao',
  },
  {
    status: 'DONE',
    color: 'success',
    string: 'Đã giao',
  },
  {
    status: 'CANCELED',
    color: 'error',
    string: 'Đã hủy',
  },
];

export const axiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
};

export const PYTHON_URL = 'http://localhost:8081';

export const RECOVERY_QUERY_STRING = ['step'];

export const RECOVERY_FLOW = ['email', 'update_password'];

export const ACTIVE_STATUS = 'Active';

export const DISABLED_STATUS = 'Disable';

export const COLOR_LIST = [
  {
    color: 'f1f1f1',
    name: 'Trắng',
  },
  {
    color: '000',
    name: 'Đen',
  },
  {
    color: '8c8c8c',
    name: 'Xám',
  },
  {
    color: 'd9b99b',
    name: 'Be',
  },
  {
    color: '186287',
    name: 'Xanh nước nhạt',
  },
  {
    color: '114abd',
    name: 'Xanh nước đậm',
  },
  {
    color: '6e10a1',
    name: 'Tím',
  },
];
