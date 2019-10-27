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
      renderer.renderDream(data)
    })
  }

  saveDreamTeam() {
    $.get('/dreamTeam', function(data){
      localStorage.dreamTeam = data
    })
  }

  addSuperPlayer(playerName) {
    $.post('/roster', {"playerName": playerName}, function () {
      console.log("POST complete")
    })
  }

  removeSuperPlayer(playerName) {
    $.ajax({
      method: 'DELETE',
      url: '/roster/${playerName}',
      success: function (response) {
        console.log("DELETE complete")
        renderer.render(response)
      }
    })
  }
}
