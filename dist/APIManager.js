class APIManager {
  getTeam(teamName) {
    $.get(`/teams/${teamName}`, function(data) {
      renderer.render(data)
    })
  }

  getStats(playerName) {
    let name = playerName.split("-")
    $.get(`/playerStats/${name[0]}/${name[1]}`, function(data) {
      renderer.renderPlayerStats(data)
    })
  }

  getDreamTeam() {
    $.get('/dreamTeam', function(data){
      renderer.render(data)
    })
  }

  addSuperPlayer(playerName) {
    $.post('/roster', {"playerName": playerName}, function () {
      console.log("POST complete")
    })
  }
}

