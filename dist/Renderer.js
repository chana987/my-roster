class Renderer {
  render(data) {
    const source = $("#player-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({data})
    $(".results").empty().append(newHTML)
  }
  renderPlayerStats(data) {
    const source = $("#player-stats-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template(data)
    $(".player-detail").empty().append(newHTML)
  }
}