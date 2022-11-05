import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./app.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { ConfigQuiz } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConfigQuiz />,
  },
]);

/**
route
main 

quizes
- sync url -> fetch

 */
export function App() {
  return <RouterProvider router={router} />;
}
