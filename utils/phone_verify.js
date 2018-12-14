function isPhoneAvailable (phone) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  return myreg.test(phone)
}
module.exports = isPhoneAvailable