import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error";
import App from "./App";
import First from "./First";
import Second from "./Second";
import Third from "./Third";
import Fourth from "./Fourth";
import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <Error/> },
  { path: "/first", element: <First /> },
  { path: "/second", element: <Second /> },
  { path: "/third", element: <Third /> },
  { path: "/fourth", element: <Fourth /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
