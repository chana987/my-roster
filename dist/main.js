const apiManager = new APIManager
const renderer = new Renderer

$("#submit").on("click", function() {
  let teamName = $("#input").val()
  if (teamName === "") {
    $(".messages").append(`<p class="invalid-message">	&#8727; Please enter a valid team name</p>`)
    setTimeout(function () {
      $(".messages").empty()
    }, 2500)
  } else {
    $("#input").val("")
    apiManager.getTeam(teamName)
  }
})

// $(".results").on("click", ".player_photo", function() {
//   let playerName = $(this).closest(".player").data("name").toLowerCase()
//   apiManager.getStats(playerName)
// })

$("#dream-team").on("click", function() {
  apiManager.getDreamTeam()
})

$("#save-team").on("click", function() {
  apiManager.saveDreamTeam()
})

$(".results").on("click", ".super-player", function() {
  let playerName = $(this).closest(".player").data("name")
  apiManager.addSuperPlayer(playerName)
})

$(".results").on("click", ".delete-player", function() {
  let playerName = $(this).closest(".player").data("name")
  apiManager.removeSuperPlayer(playerName)
})