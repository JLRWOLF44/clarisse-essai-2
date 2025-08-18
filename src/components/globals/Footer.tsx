import "./Footer.css";

function Footer() {
	return (
		<footer className="bg-gray-800 text-white py-4">
			<div className="container mx-auto text-center">
				<p>&copy; 2023 Your Company. All rights reserved.</p>
				<p>
					Follow us on{" "}
					<a href="#" className="text-blue-400 hover:underline">
						Twitter
					</a>{" "}
					and{" "}
					<a href="#" className="text-blue-400 hover:underline">
						GitHub
					</a>
				</p>
			</div>
		</footer>
	);
}
export default Footer;
