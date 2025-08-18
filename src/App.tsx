import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./components/globals/Header";
import Footer from "./components/globals/Footer";
function App() {
	return (
		<>
			<FavoritesProvider>
				<Header />
				<Outlet />
				<Footer />
			</FavoritesProvider>
		</>
	);
}


export default App;
