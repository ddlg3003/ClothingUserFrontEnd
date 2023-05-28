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

export const SIDEBAR_STATE = {
  profile: 'profile',
  address: 'address',
  password: 'password',
  favorites: 'favorites',
  orders: 'orders',
};

// export const BASE_API_URL = 'http://localhost:8099';
export const BASE_API_URL = 'https://nda-clothing-web.herokuapp.com';

export const PRODUCT_QUERY_STRING = {
  page: 'page',
  limit: 'limit',
  cat: 'cat',
  keyword: 'keyword',
  rating: 'rating',
  sortBy: 'sort_by',
};

export const PROFILE_QUERY_STRING = {
  tab: 'tab',
};

export const ORDER_STATUS = {
  pending: {
    status: 'PENDING',
    color: 'warning',
    string: 'Chờ xác nhận',
  },
  delivering: {
    status: 'DELIVERING',
    color: 'primary',
    string: 'Đang giao',
  },
  done: {
    status: 'DONE',
    color: 'success',
    string: 'Đã giao',
  },
  canceled: {
    status: 'CANCELED',
    color: 'error',
    string: 'Đã hủy',
  },
};

export const axiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
};

export const RECOMMEND_URL = 'http://localhost:8081';

export const AI_URL = 'http://localhost:8088';

export const SEARCH_BY_IMAGE_URL = 'http://localhost:8088';

export const RECOVERY_QUERY_STRING = {
  step: 'step',
};

export const RECOVERY_FLOW = {
  email: 'email',
  update_password: 'update_password',
};

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

export const SORT_CRITERIA = {
  priceAsc: 'price-asc',
  priceDesc: 'price-desc',
  soldDesc: 'sold-desc',
};
