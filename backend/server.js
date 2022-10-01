require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

// require routes
const authRoutes = require('./routes/authRoute.js')
const todoRoutes = require('./routes/todoRoute.js')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
	console.log(req.path, req.method)
	next()
})

// routes
app.use('/api/auth/', authRoutes)
app.use('/api/todos/', todoRoutes)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		)
	)
} else {
	app.get('/', (req, res) => res.send('Please set to production'))
}

// connect to db
const port = process.env.PORT || 4000

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// listening for requests
		app.listen(port, () => {
			console.log(`connecting to db & listening on port ${port}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})
