import LoginPage from "./pages/LoginPage.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromChildren,
  Route,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useUser } from "./store/user.js";
import HomePage from "./pages/HomePage.jsx";
import { useEffect } from "react";

const App = () => {
  const authCheck = useUser((state) => state.authCheck);
  const user = useUser((state) => state.user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
};
export default App;
