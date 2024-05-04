import PageRoutes from "./Routes";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
	return (
		<>
			<PageRoutes />
			<SpeedInsights />
		</>
	);
};

export default App;
