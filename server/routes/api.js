const express = require('express')
const request = require('request')
const router = express.Router()
// const teamToIDs = require('../teamToIDs')
const dreamTeam = require('../dreamTeam')

const TeamID = require('../models/TeamID')
// teamToIDs.forEach(t => new TeamID({
//   name: t.simpleName,
//   teamID: t.teamId
// }).save())

const json = {
  data: []
}

const getData = function() {
  request(`http://data.nba.net/10s/prod/v1/2018/players.json`, ((err, res) => { 
    let data = JSON.parse(res.body).league.standard 
    data = data.filter(p => p.isActive === true)
    data.forEach(p => {
      const { firstName, lastName, jersey, pos, teamId } = p 
      json.data.push({ firstName, lastName, jersey, pos, teamId })
    })
  })  
)}
getData()

router.get('/', function(req, res) {
  res.send("Server is up and running smoothly")
})

router.get('/teams/:teamName', function(req, res) {
  let teamName = req.params.teamName.trim().replace(/^./, req.params.teamName[0].toUpperCase())
  TeamID.findOne({ name: teamName })
  .exec(
    (err, team) => {
      
      let data = json.data.filter(p => p.teamId == team.teamID)
      res.send(data)
    })
})

// router.get('/playerStats/:lastName/:firstName', function(req, res) {
//   request(`https://nba-players.herokuapp.com/players-stats/${req.params.lastName}/${req.params.firstName}`, 
//   function(err, data) {
//     if (data) {
//       let data = JSON.parse(data.body)
//       res.send(data)
//     } else {
//       let data = {name: "Sorry, this player has no available stats"}
//       res.send(data)
//     }
//   })
// })

router.put('/team', function(req, res) {
  let teamName = req.body.name
  let teamId = req.body.id
  teamToIDs[teamName] = teamId
  res.end()
})

router.get('/dreamTeam', function(req, res) {
  let data = dreamTeam
  res.send(data)
})

router.post('/roster', function(req, res) {
  let player = req.body.playerName.split("-")
  let superPlayer = json.data.filter(p => p.firstName === player[1]).filter(p => p.lastName === player[0])
  console.log(superPlayer)
  let exists = dreamTeam.indexOf(superPlayer[0])
  console.log(exists)
  if (exists === -1) {
    dreamTeam.push(superPlayer[0])
    console.log("Added player to your roster")
  } else {
    console.log("Player is already in your roster")
  }
  res.end()
})

router.delete('/roster/:playerName', function(req, res) {
  let player = req.params.playerName.split("-")
  let superPlayer = dreamTeam.filter(p => p.firstName === player[1]).filter(p => p.lastName === player[0])
  let playerIndex = dreamTeam.indexOf(superPlayer[0])
  dreamTeam.splice(playerIndex, 1)
  res.send(dreamTeam)
})

module.exports = router