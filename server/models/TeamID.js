const mongoose = require("mongoose")
const Schema = mongoose.Schema

const teamIDSchema = new Schema({
	name: String,
	teamID: Number
})

const TeamID = mongoose.model("TeamID", teamIDSchema)

module.exports = TeamID
