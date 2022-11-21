export const BLACK_LOGO = 'https://fontmeme.com/permalink/221015/466d5aeb7170191e34604da1b59fb9b2.png';

export const WHITE_LOGO = 'https://fontmeme.com/permalink/221016/0904f554131fbb26609e131d851031a4.png?fbclid=IwAR0arYmZn4xlsq0mSYQ2nGP5qIAm4aXMe_D1TZPw1HcnjrCczz3QX71si5o';

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

export const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const USERNAME_REGEX = /^[0-9a-zA-Z]{6,}$/;

export const URL_REGEX = /\s/g;

export const LIMIT = 1;

export const SIDEBAR_STATE = [
    'profile',
    'address',
    'password',
    'favorites',
    'orders',
];

export const BASE_API_URL = 'http://localhost:8099';

export const PRODUCT_QUERY_STRING = ['page', 'limit', 'cat'];

export const PROFILE_QUERY_STRING = ['tab'];

export const axiosConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    }
};