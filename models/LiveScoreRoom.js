const roomCreatorCollection = require("../db").db().collection("roomCreator")
const liveRoomCollection = require("../db").db().collection("LiveRoom")

const MatchId = require("./MatchId")

let LiveScoreRoom = function (data) {
  this.data = data
  this.errors = []
}
LiveScoreRoom.prototype.cleanUp = async function (username) {
  try {
    console.log("in clean up....")

    this.matchId = await MatchId.getMatchId(username)
    console.log("match id:", this.matchId)
    this.matchNumber = Number(this.matchId.slice(7))
    console.log("Match serial number:", this.matchNumber)
    if (typeof this.data.password != "string") {
      this.data.password = ""
    }
    this.data = {
      matchId: this.matchId,
      
      strikerIndex:null,
      nonStrikerIndex:null,
      bowlerIndex:null,

      perOverRuns:0,
      ballNumber:0,

      wideBall:false,
      noBallRunBy:false,
      noBallRunBat:false,
      noBallRunLegBy:false,
      byRuns:false,
      legByRuns:false,
      RunOut:false,
      changeStrike:false,
      retireHeard:false,
      
      totalWideBalls:0,
      totalNoBalls:0,
      totalExtraRuns:0,
      totalByRuns:0,
      totalLegByRuns:0,

      matchDetails:{
      overs: null,
      inningsStatus: null,
      tossWonBy: null,
      decidedTo: null,
      },
      liveScore: {
        totalRuns: null,
        totalWickets: null,
        totalOvers: null,
        strickerName: null,
        strickerRuns: null,
        strickerBalls: null,
        nonStrickerName: null,
        nonStrickerRuns: null,
        nonStrickerBalls: null,
        lastWicketDetails: null
      },
      firstInningsBatting:{
        allBatsman:[{
          name:"sohag",
          runs:23,
          balls:23,
          fours:1,
          sixes:1,
        }],

      },
      firstInningsBowling:{
        allBowlers:[
          { 
            name:"akash",
            givenRuns:12,
            overs:3,
            wickets:2,
            wideBalls:1,
            noBalls:1,
            madenOvers:1
          }
        ]
      },
      firstInningsFallOfWickets:[
        {
          runs:"Present Total runs",
          overs:"present overs",
          player:"batsman name"
        }
      ],
     
      secondInningsBatting:{
        allBatsman:[]
      },
      secondInningsFallOfWickets:[
        {
          runs:"Present Total runs",
          overs:"present overs",
          player:"batsman name"
        }
      ],
      
      secondInningsBowling:{
        allBowlers:[]
      },
      target: null,
      isFinished: false,
      manOfTheMatch: null,
      winningStatus: null,
      scorerName: null,
      commentry: [],
      password: this.data.password
    }
  } catch {
    res.render("404")
  }
}
LiveScoreRoom.prototype.validate = function () {
  if (this.data.password == "") {
    this.errors.push("You must provide a password.")
  }
}
LiveScoreRoom.prototype.createRoom = function (username) {
  return new Promise(async (resolve, reject) => {
    try {
      await this.cleanUp(username)
      this.validate()
     if (!this.errors.length) {
        await liveRoomCollection.insertOne(this.data)
        await roomCreatorCollection.findOneAndUpdate({ username:username}, { $set: { matchNumber: this.matchNumber } })
        resolve(this.matchId)
      } else {
        reject(this.errors)
      }
    } catch {
      this.errors.push("There is some problem!")
      reject(this.errors)
    }
  })
}
LiveScoreRoom.prototype.LiveScoreRoomControllerLogin = function () {
  return new Promise((resolve, reject) => {
    try {
      if (typeof this.data.matchId != "string") {
        this.data.matchId = ""
      }
      if (typeof this.data.password != "string") {
        this.data.password = ""
      }
      liveRoomCollection
        .findOne({ matchId: this.data.matchId })
        .then(roomData => {
          if (roomData.password == this.data.password) {
            this.data = roomData
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
module.exports =LiveScoreRoom