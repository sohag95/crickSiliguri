const roomCreatorCollection = require("../db").db().collection("roomCreator")
const ObjectID = require("mongodb").ObjectID

let MatchId = function (from) {
 

  let dt = new Date()
  
  //here i have to take the serial number from the database table as serialNumber
}


MatchId.getMatchId = async function (username) {
  try {
    

    let dt = new Date()
    function sort_year(dt) {
      return ("" + dt.getFullYear()).substr(2)
    }
    let year = sort_year(dt)
    let match = "match"
    let firstPart = year.concat(match)

    let data = await roomCreatorCollection.findOne({ username: username })

    let matchSerialNumber = data.matchNumber + 1
    let number = matchSerialNumber.toString()
    let digit = number.length
    let matchId
    if (digit == 1) {
      let onedigit = "000".concat(number)
      matchId = firstPart.concat(onedigit)
    } else if (digit == 2) {
      let twodigit = "00".concat(number)
      matchId = firstPart.concat(twodigit)
    } else if (digit == 3) {
      let threedigit = "0".concat(number)
      matchId = firstPart.concat(threedigit)
    } else {
      matchId = firstPart.concat(number)
    }

    return matchId
  } catch {
    console.log("This line has executed.")
    res.render("404")
  }
}
module.exports = MatchId
