function calcAge(birthDate) {
  var today = new Date();
  var birthDate = new Date(birthDate);
  var age = today.getFullYear() - birthDate.getFullYear();

  return age;
}

module.exports = calcAge;
