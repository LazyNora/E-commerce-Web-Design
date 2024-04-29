import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { StrictMode } from "react";

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
