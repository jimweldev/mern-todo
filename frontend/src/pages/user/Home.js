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
			const res = await fetch('/api/todos')
			const data = await res.json()

			if (res.ok) {
				dispatch({ type: 'SET_TODOS', payload: data })
			}
		}

		fetchTodos()
	}, [dispatch])

	const handleCreateTodo = async (e) => {
		e.preventDefault()

		createTodoSubmitRef.current.disabled = true

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

		createTodoSubmitRef.current.disabled = false
	}

	const handleUpdateTodo = async (id, isCompleted) => {
		const res = await fetch(`/api/todos/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ isCompleted: !isCompleted }),
			headers: {
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
		})

		const data = await res.json()

		if (res.ok) {
			dispatch({ type: 'DELETE_TODO', payload: data })
		}

		e.target.disabled = false
	}

	return (
		<UserTemplate>
			<h4>{auth.email}</h4>

			{/* TODO CREATE */}
			<form onSubmit={handleCreateTodo}>
				<input
					type="text"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value)
					}}
				/>

				<button type="submit" ref={createTodoSubmitRef}>
					Submit
				</button>
				{error && error}
			</form>

			{/* TODOS  */}
			{todos.length > 0 ? (
				todos.map((todo) => {
					return (
						<div
							key={todo._id}
							onDoubleClick={() => {
								handleUpdateTodo(todo._id, todo.isCompleted)
							}}
						>
							<h5>{todo.title}</h5>
							<p>{todo.isCompleted ? 'completed' : 'not completed'}</p>
							<button
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
				<div>No items available</div>
			)}
		</UserTemplate>
	)
}

export default Home
