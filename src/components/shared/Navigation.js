import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../http";
import { setAuth } from "../../store/authSlice";

const Navigation = () => {
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((state) => state.auth);
  const logoutUser = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="flex py-5 px-0 items-center justify-between">
        <Link to="/">
          <h1 className="font-Oxanium font-bold text-2xl">OMPodcast</h1>
        </Link>
        {isAuth && (
          <div className="flex items-center">
            {isAuth && (
              <>
                {" "}
                <h3 className="font-Jost text-xl font-medium ">
                  {user && user?.name}
                </h3>
                <Link to="/">
                  <img
                    className="avatar"
                    src={
                      user?.avatar ? user?.avatar : "assets/monkey-avatar.png"
                    }
                    width="40"
                    height="40"
                    alt="avatar"
                  />
                </Link>
              </>
            )}
            {isAuth && (
              <button
                className="border-none outline-none cursor-pointer"
                onClick={logoutUser}
              >
                <FiLogOut className="text-2xl ml-2" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
