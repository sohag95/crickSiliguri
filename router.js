const express = require("express")
const router = express.Router()
const userController = require("./controllers/userController")
const roomCreatorController = require("./controllers/roomCreatorController")
const liveScoreRoomController = require("./controllers/liveScoreRoomController")

// user related routes
router.get("/", userController.home)
router.get("/matches", userController.matches)
router.get("/admition", userController.admition)
router.get("/about-us", userController.aboutUs)

//Match controller related routes
router.get("/roomCreator-home", roomCreatorController.roomCreatorMustBeLoggedIn, userController.roomCreatorHome)
router.post("/roomCreatorLogin", roomCreatorController.roomCreatorLogin)
router.post("/roomCreate", roomCreatorController.roomCreatorMustBeLoggedIn,roomCreatorController.createRoom)

//live scorer login
router.post("/liveMatchScorerLogin", liveScoreRoomController.liveScorerLogin)
router.get("/liveScoreRoom-home", liveScoreRoomController.liveScorerMustBeLoggedIn, userController.liveScoreRoomHome)

//Logging out router
router.post("/logout", userController.logout)

module.exports = router
