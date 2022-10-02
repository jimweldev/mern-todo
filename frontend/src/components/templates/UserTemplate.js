import React from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

const UserTemplate = ({ children }) => {
	const { auth } = useAuthContext()
	const { logout } = useLogout()

	return (
		<>
			<header className="header">
				<div className="container">
					<Link className="header__logo" to="/user">
						MERN Todo
					</Link>

					<div className="flex">
						<h5>{auth.email}</h5>
						<button className="btn" onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			</header>
			{children}
		</>
	)
}

export default UserTemplate
