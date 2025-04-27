import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { DotLoader } from "react-spinners";
import { useThemeStore } from "./store/useThemeStore";
function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(onlineUsers);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <DotLoader color="#1884a8" speedMultiplier={1.4} size={50} />
      </div>
    );
  }

  return (
    <>
      <div className="h-fit" data-theme = {theme} >
        <Toaster />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />}
          />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
