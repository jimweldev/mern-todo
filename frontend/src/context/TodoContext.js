import { createContext, useReducer } from 'react'

export const TodoContext = createContext()

export const todoReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TODOS':
			return { todos: action.payload }
		case 'CREATE_TODO':
			return { todos: [action.payload, ...state.todos] }
		case 'DELETE_TODO':
			return {
				todos: state.todos.filter((todo) => {
					return todo._id !== action.payload._id
				}),
			}
		case 'UPDATE_TODO':
			return {
				todos: state.todos.map((todo) => {
					if (todo._id === action.payload._id) {
						return {
							...todo,
							title: action.payload.title,
							isCompleted: !action.payload.isCompleted,
						}
					}

					return todo
				}),
			}
		default:
			return state
	}
}

export const TodoContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(todoReducer, {
		todos: [],
	})

	console.log('TodoContext state: ', state)

	return (
		<TodoContext.Provider value={{ ...state, dispatch }}>
			{children}
		</TodoContext.Provider>
	)
}
