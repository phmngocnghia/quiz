import preactLogo from "./assets/preact.svg";
import "antd/dist/antd.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { ConfigQuiz } from "./pages";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ConfigQuiz />,
  },
]);

const queryClient = new QueryClient();

/**
route
main 

quizes
- sync url -> fetch

 */
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}
