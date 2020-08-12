const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: String,
	googleid: String,
});

// compile model from Schema
module.exports = mongoose.model("user", UserSchema);
