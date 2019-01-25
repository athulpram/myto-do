class User {
  constructor(userDetails) {
    this.username = userDetails.username;
    this.password = userDetails.password;
    this.firstName = userDetails.firstName;
    this.lastName = userDetails.lastName;
  }
  getFirstName() {
    return this.firstName;
  }
  isValidPassword(password) {
    return this.password == password;
  }
}

module.exports = User;
