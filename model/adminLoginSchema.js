const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true }
	},
	{ collection: 'admin_login' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model