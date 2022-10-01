import React, { useState, useEffect } from 'react'

import UserTemplate from '../../components/templates/UserTemplate'

import { useAuthContext } from '../../hooks/useAuthContext'

const Home = () => {
	const { auth } = useAuthContext()

	const [todos, setTodos] = useState('')

	useEffect(() => {
		const fetchTodos = async () => {
			const res = await fetch('/api/todos')
			const data = await res.json()

			if (res.ok) {
				setTodos(data)
			}
		}

		fetchTodos()
	}, [])

	return (
		<UserTemplate>
			<h4>{auth.email}</h4>

			{todos &&
				todos.map((todo) => {
					return (
						<div key={todo.id}>
							<h5>{todo.title}</h5>
							<p>{todo.isCompleted ? 'completed' : 'not completed'}</p>
						</div>
					)
				})}
		</UserTemplate>
	)
}

export default Home
