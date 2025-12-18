import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfileThunk } from "./reduxStore/userSlice/user.thunk";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserProfileThunk())
  }, [])

  return (
    <BrowserRouter>
      {/* Global toast container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
