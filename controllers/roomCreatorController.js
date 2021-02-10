const RoomCreator = require("../models/RoomCreator")
const LiveScoreRoom = require("../models/LiveScoreRoom")
exports.roomCreatorMustBeLoggedIn = function (req, res, next) {
  if (req.session.user.userType == "roomCreator") {
    next()
  } else {
    req.flash("errors", "You must be logged in to perform that action.")
    req.session.save(function () {
      res.redirect("/")
    })
  }
}

exports.roomCreatorLogin = function (req, res) {
  let roomCreator = new RoomCreator(req.body)
  roomCreator
    .roomCreatorLogin()
    .then(function (result) {
      req.session.user = { username: roomCreator.data.username, userType: "roomCreator" }
      req.session.save(function () {
        res.redirect("/roomCreator-home")
      })
    })
    .catch(function (e) {
      req.flash("errors", e)
      req.session.save(function () {
        res.redirect("/")
      })
    })
}
exports.createRoom =function (req, res) {
  try {
    let liveScoreRoom = new LiveScoreRoom(req.body)
    console.log("body", req.body)
    liveScoreRoom
      .createRoom(req.username)
      .then(function (matchId) {
        let message="Live Score Room Successfully created.Room id is : "+matchId+" and Room password is : "+req.body.password
        req.flash("success", message)
        req.session.save(() => res.redirect("/roomCreator-home"))
      })
      .catch(function (errors) {
        errors.forEach(error => req.flash("errors", error))
        req.session.save(() => res.redirect("/roomCreator-home"))
      })
  } catch {
    res.render("404")
  }
}