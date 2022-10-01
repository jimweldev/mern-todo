import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { auth: action.payload }
		case 'LOGOUT':
			return { auth: null }
		default:
			return state
	}
}

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		auth: JSON.parse(localStorage.getItem('auth')),
	})

	console.log('AuthContext state: ', state)

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
