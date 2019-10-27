class Renderer {
 
  render(data) {
    console.log("reached renderer")
    const source = $("#player-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({data})
    $(".results").empty().append(newHTML)
  }
 
  renderDream(data) {
    console.log("reached renderer")
    const source = $("#dream-team-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template({data})
    $(".results").empty().append(newHTML)
  }

  renderPlayerStats(data) {
    console.log(data)
    const source = $("#player-stats-template").html()
    const template = Handlebars.compile(source)
    const newHTML = template(data)
    $(".player-detail").empty().append(newHTML)
  }
}