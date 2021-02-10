const bcrypt = require("bcryptjs")
const roomCreatorCollection = require("../db").db().collection("roomCreator")
const ObjectID = require("mongodb").ObjectID

let RoomCreator = function (data) {
  this.data = data
  this.errors = []
}
RoomCreator.prototype.cleanUp = async function () {
  try {
    if (typeof this.data.username != "string") {
      this.data.username = ""
    }
    if (typeof this.data.password != "string") {
      this.data.password = ""
    }
    this.data = {
      username: this.data.username.trim().toLowerCase(),
      password: this.data.password
    }
  } catch {
    res.render("404")
  }
}

RoomCreator.prototype.roomCreatorLogin = function () {
  return new Promise((resolve, reject) => {
    try {
      this.cleanUp()
      roomCreatorCollection
        .findOne({ username: this.data.username })
        .then(attemptedUser => {
          if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
            this.data = attemptedUser

            resolve("Congrats!")
          } else {
            reject("Invalid registration number / password.")
          }
        })
        .catch(function () {
          reject("Please try again later.")
        })
    } catch {
      reject()
    }
  })
}

module.exports = RoomCreator
