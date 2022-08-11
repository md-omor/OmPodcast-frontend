import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loader from "./components/shared/Loader";
import Navigation from "./components/shared/Navigation";
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Activate from "./screens/Activate";
import Authenticate from "./screens/Authenticate";
import Home from "./screens/Home";
import Room from "./screens/Room";
import Rooms from "./screens/Rooms";
// import Login from "./screens/Login";
// import Register from "./screens/Register";

function App() {
  // call refresh endpoint
  const { loading } = useLoadingWithRefresh();
  return loading ? (
    <Loader message="Activation in progress ..." />
  ) : (
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
        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <Room />
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
  const { isAuth } = useSelector((state) => state.auth);

  const location = useLocation();
  return isAuth ? (
    <Navigate to="/rooms" state={{ from: location }} replace />
  ) : (
    children
  );
};

const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);

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
  const { user, isAuth } = useSelector((state) => state.auth);

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
