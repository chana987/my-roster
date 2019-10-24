const apiManager = new APIManager
const renderer = new Renderer

$("#submit").on("click", function() {
  let teamName = $("#input").val()
  $("#input").val("")
  apiManager.getTeam(teamName)
})

$(".results").on("click", ".player_photo", function() {
  let playerName = $(this).closest(".player").data("name").toLowerCase()
  apiManager.getStats(playerName)
})

$("#dream-team").on("click", function() {
  apiManager.getDreamTeam()
})

$(".results").on("click", "#super-player", function() {
  let playerName = $(this).closest(".player").data("name")
  apiManager.addSuperPlayer(playerName)
})