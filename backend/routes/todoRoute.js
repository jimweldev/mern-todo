const express = require('express')

const {
	getTodos,
	getTodo,
	createTodo,
} = require('../controllers/todoController')

const router = express.Router()

// get all
router.get('/', getTodos)

// get one
router.get('/:id', getTodo)

// create one
router.post('/', createTodo)

module.exports = router
