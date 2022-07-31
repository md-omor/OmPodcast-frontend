import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/shared/Navigation";
import Activate from "./screens/Activate";
import Authenticate from "./screens/Authenticate";
import Home from "./screens/Home";
import Rooms from "./screens/Rooms";
// import Login from "./screens/Login";
// import Register from "./screens/Register";

const isAuth = false;
const user = {
  activated: false,
};

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
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
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

const SemiProtectedRoute = ({ children }) => {
  const location = useLocation();
  return !isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : isAuth && !user.activated ? (
    children
  ) : (
    <Navigate to="/rooms" state={{ from: location }} replace />
  );
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  return !isAuth ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : isAuth && !user.activated ? (
    <Navigate to="/activate" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default App;
