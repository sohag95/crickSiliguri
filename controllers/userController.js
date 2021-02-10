exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/")
  })
}

exports.coaches = async function (req, res) {
  try {
    res.render("coaches")
  } catch {
    res.render("404")
  }
}

exports.students = function (req, res) {
  try {
    res.render("students")
  } catch {
    res.render("404")
  }
}

exports.matches = async function (req, res) {
  try {
    res.render("matches")
  } catch {
    res.render("404")
  }
}

exports.admition = function (req, res) {
  res.render("admition")
}

exports.aboutUs = async function (req, res) {
  try {
    res.render("about-us")
  } catch {
    res.render("404")
  }
}

exports.home = function (req, res) {
  try {
    res.render("home-guest")
  } catch {
    res.render("404")
  }
}

exports.roomCreatorHome = async function (req, res) {
  res.render("roomCreator-home")
}

exports.liveScoreRoomHome = async function (req, res) {
  res.render("liveRoom-home")
}