const express = require('express')
const request = require('request')
const router = express.Router()
const teamToIDs = require('../teamToIDs')
const dreamTeam = require('../dreamTeam')

const json = {
  data: {}
}

request(`http://data.nba.net/10s/prod/v1/2018/players.json`, (err, res) => { 
  let data = JSON.parse(res.body).league.standard 
  data = data.filter(p => p.isActive === true)
  let teamData = []

  data.forEach(p => {
    const { firstName, lastName, jersey, pos, teamId } = p 
    teamData.push({ firstName, lastName, jersey, pos, teamId })
  })
  
  json.data = teamData
})

router.get('/', function(req, res) {
  res.send("Server is up and running smoothly")
})

router.get('/teams/:teamName', function(req, res) {
  let teamId = teamToIDs[req.params.teamName]
  let data = json.data.filter(p => p.teamId === teamId)
  
  res.send(data)
})

router.get('/playerStats/:lastName/:firstName', function(req, res) {
  request(`https://nba-players.herokuapp.com/players-stats/${req.params.lastName}/${req.params.firstName}`, 
  function(err, response) {
    if (data) {
      let data = JSON.parse(response.body)
    } else {
      let data = {name: "Sorry, this player has no available stats"}
    }
    res.send(data)
  })
})

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
  dreamTeam.push(superPlayer[0])
  res.end()
})

module.exports = router