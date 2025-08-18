import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header>
			<img
				src="https://img.pikbest.com/png-images/pizza-logo-vector-graphic-element_1800556.png!sw800"
				alt="Logo"
			/>

			{/* Bouton Burger (visible seulement en mobile) */}
			<button
				type="button"
				className={`burger ${menuOpen ? "open" : ""}`}
				onClick={() => setMenuOpen(!menuOpen)}
			>
				<div className="line1" />
				<div className="line2" />
				<div className="line3" />
			</button>

			<button
				type="button"
				className={`menu-overlay ${menuOpen ? "active" : ""}`}
				onClick={() => setMenuOpen(false)}
				onKeyUp={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setMenuOpen(false);
					}
				}}
			/>

			{/* Navigation */}
			<nav className={`${menuOpen ? "active" : ""}`}>
				<Link to="/" onClick={() => setMenuOpen(false)}>
					Home
				</Link>
				<Link to="/about" onClick={() => setMenuOpen(false)}>
					About
				</Link>
				<Link to="/commandes" onClick={() => setMenuOpen(false)}>
					Commandes
				</Link>
				<Link to="/images" onClick={() => setMenuOpen(false)}>
					Images
				</Link>

				<Link to="/favorites" onClick={() => setMenuOpen(false)}>
					Favorites
				</Link>
			</nav>
		</header>
	);
}

export default Header;
