import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import ErrorPage from "./pages/errorPage.tsx";
import Home from "./pages/home.tsx";
import Predict from "./pages/predict.tsx";
import { AxiosInterceptor } from "./services/axios.interceptor.tsx";
import Modal from 'react-modal';

Modal.setAppElement('#root')

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/predict",
        element: <Predict />,
      },
    ],
  },
]);
AxiosInterceptor();
ReactDOM.createRoot(document.getElementById("root")!).render(

  <RouterProvider router={router} />
);
