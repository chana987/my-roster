const express = require('express')
const request = require('request')
const path = require('path')
const app = express()
const port = process.env.SERVER_PORT || 3000

app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, '../node_modules')))

const teamToIDs = {
  "lakers": "1610612747",
  "warriors": "1610612744",
  "heat": "1610612748",
  "suns": "1610612756"
}

app.get('/', function(req, res) {
  res.send("Server is up and running smoothly")
})
app.get('/teams/:teamName', function(req, res) {
  request.get(`http://data.nba.net/10s/prod/v1/2018/players.json`, function(err, response, body) {
    let teamID = teamToIDs[req.params.teamName]
    let data = JSON.parse(body)
    data = data.league.standard
    data = data.filter(p => p.isActive === true).filter(p => p.teamId === teamID)
    let teamData = []
    data.forEach(function(d) {
      let player = {
        firstName: d.firstName,
        lastName: d.lastName,
        jersey: d.jersey,
        pos: d.pos
      }
      teamData.push(player)
    })
    res.send(teamData)
  })
})

app.get('/playerStats/:player', function(req, res) {
  request.get('https://nba-players.herokuapp.com/players-stats/:${req.params.player}', function(err, response, body) {
    let data = JSON.parse(data)
    console.log(data)
    res.send(data)
  })
})

app.listen(port, () => console.log(`Running server on port ${ port }`))