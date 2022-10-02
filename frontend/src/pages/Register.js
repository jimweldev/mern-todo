import React, { useState } from 'react'

import HomeTemplate from '../components/templates/HomeTemplate'

import { useRegister } from '../hooks/useRegister'

const Register = () => {
	const { register, isLoading, error } = useRegister()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const handleRegister = async (e) => {
		e.preventDefault()

		await register(email, password, confirmPassword)
	}

	return (
		<HomeTemplate>
			<div className="mx-auto">
				<form className="form" onSubmit={handleRegister}>
					<h3>Register</h3>
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
					<input
						type="password"
						placeholder="confirm password"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value)
						}}
					/>
					<button className="btn" type="submit" disabled={isLoading}>
						Submit
					</button>
					{error && error}
				</form>
			</div>
		</HomeTemplate>
	)
}

export default Register
