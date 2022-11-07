export function validatePhoneNumber(str) {
  const regExp = /[a-zA-Z]/g;
  return regExp.test(str);
}

export function validateEmail(str) {
  var regExp = /\S+@\S+\.\S+/;
  return regExp.test(str);
}

export function validatePassword(str) {
  return (
    str.length > 7 &&
    str.length < 16
  );
}
