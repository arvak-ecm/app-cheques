import { Outlet } from "react-router-dom";
import "./App.css";
import Spinner from "./components/spinner";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <>
    
      <AppProvider>
        <Spinner />
        <Outlet />
      </AppProvider>
    </>
  );
}


export default App;
