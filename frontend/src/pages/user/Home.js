import React, { useState, useEffect, useRef } from 'react'

import UserTemplate from '../../components/templates/UserTemplate'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useTodoContext } from '../../hooks/useTodoContext'

const Home = () => {
	const { auth } = useAuthContext()
	const { todos, dispatch } = useTodoContext()

	const createTodoSubmitRef = useRef()
	const [error, setError] = useState('')
	const [title, setTitle] = useState('')

	useEffect(() => {
		const fetchTodos = async () => {
			const res = await fetch('/api/todos', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
			})
			const data = await res.json()

			if (res.ok) {
				dispatch({ type: 'SET_TODOS', payload: data })
			}
		}

		fetchTodos()
	}, [auth.accessToken, dispatch])

	const handleCreateTodo = async (e) => {
		e.preventDefault()

		createTodoSubmitRef.current.disabled = true

		const todo = { title }

		const res = await fetch('/api/todos', {
			method: 'POST',
			body: JSON.stringify(todo),
			headers: {
				Authorization: `Bearer ${auth.accessToken}`,
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

		createTodoSubmitRef.current.disabled = false
	}

	const handleUpdateTodo = async (id, isCompleted) => {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ isCompleted: !isCompleted }),
			headers: {
				Authorization: `Bearer ${auth.accessToken}`,
				'Content-Type': 'application/json',
			},
		})

		const data = await res.json()

		dispatch({
			type: 'UPDATE_TODO',
			payload: data,
		})
	}

	const handleDeleteTodo = async (e, id) => {
		e.target.disabled = true

		const res = await fetch(`/api/todos/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${auth.accessToken}`,
			},
		})

		const data = await res.json()

		if (res.ok) {
			dispatch({ type: 'DELETE_TODO', payload: data })
		}

		e.target.disabled = false
	}

	return (
		<UserTemplate>
			<main className="main">
				<div className="container">
					{/* TODOS  */}
					<div className="todos">
						{todos ? (
							todos.length > 0 ? (
								todos.map((todo) => {
									return (
										<div
											className={`todo ${todo.isCompleted && 'completed'}`}
											key={todo._id}
											onDoubleClick={() => {
												handleUpdateTodo(todo._id, todo.isCompleted)
											}}
										>
											<h5>{todo.title}</h5>
											<button
												className="btn__danger"
												onClick={(e) => {
													handleDeleteTodo(e, todo._id)
												}}
											>
												Delete
											</button>
										</div>
									)
								})
							) : (
								<p>No items available</p>
							)
						) : (
							<p>Loading...</p>
						)}
					</div>

					{/* TODO CREATE */}
					<form className="todo__form" onSubmit={handleCreateTodo}>
						<h4>Create Todo</h4>

						<input
							type="text"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value)
							}}
						/>

						<button className="btn" type="submit" ref={createTodoSubmitRef}>
							Submit
						</button>
						{error && error}
					</form>
				</div>
			</main>
		</UserTemplate>
	)
}

export default Home
