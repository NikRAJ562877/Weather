 import ReactDOM from "react-dom";
import App from "./App";
import { WeatherProvider } from "./context/WeatherContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <WeatherProvider>
    <App />
  </WeatherProvider>
);
