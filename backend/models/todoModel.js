const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema(
	{
		title: {
			type: String,
			require: true,
			trim: true,
		},
		isCompleted: {
			type: Boolean,
			require: true,
			trim: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)
