import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/shared/Navigation";
import Authenticate from "./screens/Authenticate";
import Home from "./screens/Home";
// import Login from "./screens/Login";
// import Register from "./screens/Register";

const isAuth = false;

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
          exact
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        {/* <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact /> */}
      </Routes>
    </>
  );
}

const GuestRoute = ({ children }) => {
  const location = useLocation();
  return isAuth ? (
    <Navigate to="/rooms" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default App;
