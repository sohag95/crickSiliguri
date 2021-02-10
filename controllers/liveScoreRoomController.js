const LiveScoreRoom = require("../models/LiveScoreRoom")

exports.liveScorerMustBeLoggedIn = function (req, res, next) {
  if (req.session.user.userType == "liveScorer") {
    next()
  } else {
    req.flash("errors", "You must be logged in to perform that action.")
    req.session.save(function () {
      res.redirect("/")
    })
  }
}

exports.liveScorerLogin = function (req, res) {
  let scoreRoom = new LiveScoreRoom(req.body)
  scoreRoom
    .LiveScoreRoomControllerLogin()
    .then(function (result) {
      req.session.user = { matchId: scoreRoom.data.matchId, userType: "liveScorer" }
      req.session.save(function () {
        res.redirect("/liveScoreRoom-home")
      })
    })
    .catch(function (e) {
      req.flash("errors", e)
      req.session.save(function () {
        res.redirect("/")
      })
    })
}