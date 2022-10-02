const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		isCompleted: {
			type: Boolean,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Todo', todoSchema)
