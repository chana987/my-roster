const renderer = new Renderer

$("#submit").on("click", function() {
  let teamName = $("#input").val()
  $("#input").val("")
  $.ajax({
      method: "GET",
      url: `/teams/${teamName}`,
      success: function(data) {
        renderer.render(data)
      },
      error: function(xhr, text, error) {
        console.log(text)
      }
    })
})

$(".results").on("click", ".player_photo", function() {
  let playerName = $(this).closest(".player").data("name").replace("-", "/").toLowerCase()
  console.log(playerName)
  $.ajax({
    method: "GET",
    url: `/playerStats/${playerName}`,
    success: function(data) {
      renderer.renderPlayerStats(data)
    },
    error: function(xhr, text, error) {
      console.log(text)
    }
  })
})