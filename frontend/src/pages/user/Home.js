import React, { useState, useEffect } from 'react'

import UserTemplate from '../../components/templates/UserTemplate'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useTodoContext } from '../../hooks/useTodoContext'

const Home = () => {
	const { auth } = useAuthContext()
	const { todos, dispatch } = useTodoContext()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [title, setTitle] = useState('')

	useEffect(() => {
		const fetchTodos = async () => {
			const res = await fetch('/api/todos')
			const data = await res.json()

			if (res.ok) {
				dispatch({ type: 'SET_TODOS', payload: data })
			}
		}

		fetchTodos()
	}, [])

	return (
		<UserTemplate>
			<h4>{auth.email}</h4>

			{/* TODO CREATE */}
			<form
				onSubmit={async (e) => {
					e.preventDefault()

					setIsLoading(true)

					const todo = { title }

					const res = await fetch('/api/todos', {
						method: 'POST',
						body: JSON.stringify(todo),
						headers: {
							'Content-Type': 'application/json',
						},
					})

					const data = await res.json()

					if (!res.ok) {
						setError(data.error)
					}

					if (res.ok) {
						setTitle('')
						setError('')
						dispatch({ type: 'CREATE_TODO', payload: data })
					}

					setIsLoading(false)
				}}
			>
				<input
					type="text"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value)
					}}
				/>

				<button type="submit" disabled={isLoading}>
					Submit
				</button>
				{error && error}
			</form>

			{/* TODOS  */}
			{todos &&
				todos.map((todo) => {
					return (
						<div key={todo._id}>
							<h5>{todo.title}</h5>
							<p>{todo.isCompleted ? 'completed' : 'not completed'}</p>
						</div>
					)
				})}
		</UserTemplate>
	)
}

export default Home
