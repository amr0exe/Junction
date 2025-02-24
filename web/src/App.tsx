import { Route, Routes, BrowserRouter } from "react-router-dom";
import Public from "./pages/Public";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";

function App() {

	return (
		<div>

			<BrowserRouter>
				<Routes>
					<Route path="/" element={ <Lobby /> } />
					<Route path="/public" element={ <Public /> } />
					<Route path="/room" element={ <Room /> } />
				</Routes>
			</BrowserRouter>

		</div>
	)
}

export default App