import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import mobileMenu from '../images/Bars3.svg';
import closeIcon from '../images/Close-Icon.svg';

import logo from '../images/logo.svg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { setIsLoggedIn } from '../utils/auth';
function Header({ onCerrarSession }) {
	const { loggedIn, userData, isMobileOpen, setIsMobileOpen } =
		useContext(CurrentUserContext);
	const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleWindowResize = () => setViewportWidth(window.innerWidth);
		window.addEventListener('resize', handleWindowResize);
		return () => window.removeEventListener('resize', handleWindowResize);
	}, []);

	const handleMenu = () => {
		setIsMobileOpen(!isMobileOpen);
	};

	const email = userData && userData.data ? userData.data.email : null;
	const myStyle = {
		marginTop: 5,
		color: '#a9a9a9',
	};

	return (
		<>
			<header className="header">
				{viewportWidth < 768 && isMobileOpen ? (
					<div className="header__user-info">
						{!loggedIn ? (
							<a className="header__link" href="*">
								Iniciar sesión
							</a>
						) : (
							email
						)}
						<p>
							{loggedIn ? (
								<Link style={myStyle} to="/" onClick={onCerrarSession}>
									Cerrar sesión
								</Link>
							) : null}
						</p>
					</div>
				) : null}
				<div className="header__container-manu">
					{viewportWidth > 768 ? (
						<>
							<div className="header__image-container">
								<img className="logo" src={logo} alt="Logo around the US" />
							</div>
							<div className="header__userInfo">
								{email}
								<span className="header__sesion" onClick={onCerrarSession}>
									{loggedIn ? 'Cerrar sesión' : ''}
								</span>
							</div>
						</>
					) : (
						<div className="header__image-container">
							<img className="logo" src={logo} alt="Logo around the US" />
						</div>
					)}
					{loggedIn || viewportWidth > 768 ? (
						<img
							className="header__menu"
							src={!isMobileOpen ? mobileMenu : closeIcon}
							alt="menu"
							onClick={handleMenu}
						/>
					) : (
						'Iniciar sesión'
					)}
				</div>
			</header>
			<div className="error"></div>
		</>
	);
}

export default Header;
