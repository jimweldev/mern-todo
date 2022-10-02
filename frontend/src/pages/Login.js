import React, { useState } from 'react'

import HomeTemplate from '../components/templates/HomeTemplate'

import { useLogin } from '../hooks/useLogin'

const Login = () => {
	const { login, isLoading, error } = useLogin()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()

		await login(email, password)
	}

	return (
		<HomeTemplate>
			<div className="mx-auto">
				<form className="form" onSubmit={handleLogin}>
					<h3>Login</h3>
					<input
						type="text"
						placeholder="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value)
						}}
					/>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
						}}
					/>
					<button className="btn" type="submit" disabled={isLoading}>
						Submit
					</button>
					{error && <div className="error">{error}</div>}
				</form>
			</div>
		</HomeTemplate>
	)
}

export default Login
