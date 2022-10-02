import React from 'react'
import { Link } from 'react-router-dom'

const HomeTemplate = ({ children }) => {
	return (
		<>
			<header className="header">
				<div className="container">
					<Link className="header__logo" to="/">
						MERN Todo
					</Link>

					<div className="flex">
						<Link className="btn__outlined" to="/login">
							Login
						</Link>
						<Link className="btn" to="/register">
							Register
						</Link>
					</div>
				</div>
			</header>

			{children}
		</>
	)
}

export default HomeTemplate
