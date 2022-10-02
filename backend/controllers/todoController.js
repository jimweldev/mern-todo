const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const Todo = require('../models/todoModel')

// get all
const getTodos = async (req, res) => {
	const { _id } = req.user

	const todos = await Todo.find({ userId: _id }).sort({ createdAt: -1 })

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
	const { _id } = req.user
	const { title } = req.body

	if (!title) {
		return res.status(400).json({ error: 'Title is required' })
	}

	try {
		const todo = await Todo.create({ userId: _id, title, isCompleted: false })

		res.status(201).json(todo)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// delete one
const deleteTodo = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	try {
		const todo = await Todo.findByIdAndDelete({ _id: id })

		res.status(200).json(todo)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

// update one
const updateTodo = async (req, res) => {
	const { id } = req.params

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: 'No item found' })
	}

	try {
		const todo = await Todo.findByIdAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{
				new: true,
			}
		)

		res.status(200).json(todo)
	} catch (error) {
		res.status(400).json({ error: error.message })
	}
}

module.exports = {
	getTodos,
	getTodo,
	createTodo,
	deleteTodo,
	updateTodo,
}
