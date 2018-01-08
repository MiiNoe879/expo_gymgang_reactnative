export default class Utility {
  static setCurrentUser(user) {
    this.currentUser = user;
  }

  static getCurrentUser() {
    return this.currentUser;
  }

  static getUserEmailWithComma() {
    return this.currentUser.replace('.',',');
  }
}

module.exports = Utility;
