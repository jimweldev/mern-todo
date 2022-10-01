import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'

import { AuthContextProvider } from './context/AuthContext'
import { TodoContextProvider } from './context/TodoContext'

import './index.css'
import App from './App'

import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TodoContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</TodoContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)

reportWebVitals()
