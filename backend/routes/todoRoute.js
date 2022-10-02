const express = require('express')

const {
	getTodos,
	getTodo,
	createTodo,
	deleteTodo,
	updateTodo,
} = require('../controllers/todoController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.use(authMiddleware)

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
