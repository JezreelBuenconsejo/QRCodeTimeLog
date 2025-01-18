import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestPage from "./pages/TestPage";
import QRGenerator from "./pages/QrGenerator";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<TestPage />} />
				<Route path="/qr" element={<QRGenerator />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
