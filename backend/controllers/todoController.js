const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Todo = require('../models/todoModel')

// get all
const getTodos = async (req, res) => {
	const todos = await Todo.find({}).sort({ createdAt: -1 })

	res.status(200).json(todos)
}

// get one
const getTodo = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	const todo = await Todo.findById(id)

	if (!todo) {
		return res.status(400).json({ error: 'No item found' })
	}

	res.status(200).json(todo)
}

// create one
const createTodo = async (req, res) => {
	const { title, isCompleted } = req.body

	try {
		const todo = await Todo.create({ title, isCompleted })

		res.status(201).json(todo)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getTodos,
	getTodo,
	createTodo,
}
