import { Route, Routes } from "react-router-dom";
import Navigation from "./components/shared/Navigation";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact />
      </Routes>
    </>
  );
}

export default App;
