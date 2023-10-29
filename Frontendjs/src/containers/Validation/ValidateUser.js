// check pasword
// exports.isPasswordValid = (password) => {
//   // Biểu thức chính quy kiểm tra xem có ít nhất một chữ cái và một số trong mật khẩu
//   let letterAndNumberPattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
//   return letterAndNumberPattern.test(password);
// };
exports.isEmailValid = (email) => {
  // Biểu thức chính quy kiểm tra địa chỉ email
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};
