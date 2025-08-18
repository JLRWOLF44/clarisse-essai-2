import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./components/globals/pages/Home";
import About from "./components/globals/pages/About";
import Commandes from "./components/globals/pages/Commandes";
import Images from "./components/globals/pages/Images";
import Favorites from "./components/globals/pages/Favorites";
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ path: "", element: <Home /> },

			{ path: "About", element: <About /> },

			{ path: "Commandes", element: <Commandes /> },

			{ path: "Images", element: <Images /> },
			
			{ path: "Favorites", element: <Favorites /> },
		],
	},
]);
export default router;
