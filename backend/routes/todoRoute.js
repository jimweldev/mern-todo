const express = require('express')

const {
	getTodos,
	getTodo,
	createTodo,
	deleteTodo,
	updateTodo,
} = require('../controllers/todoController')

const router = express.Router()

// get all
router.get('/', getTodos)

// get one
router.get('/:id', getTodo)

// create one
router.post('/', createTodo)

// delete one
router.delete('/:id', deleteTodo)

// update one
router.patch('/:id', updateTodo)

module.exports = router
