import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditWorkout from "./pages/EditWorkout";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const App = () => {

  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/workouts/edit/:id" element={user ? <EditWorkout /> : <Navigate to="/login" />} />
      </Route>
    </Routes>
  )
}

export default App
