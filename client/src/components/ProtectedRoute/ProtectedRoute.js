import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import { login, logout } from "../redux/authSlice";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const publicPaths1 = ["/login", "/register"];
  const publicPaths2 = ["/orders", "/profile", "/confirm"];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        dispatch(login(res.data.user));
        if (publicPaths1.includes(location.pathname)) {
          navigate("/");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("Unauthorized. User is not logged in.");
          dispatch(logout());
          if (publicPaths2.includes(location.pathname)) {
            navigate("/login");
          }
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchUser();
  }, [location.pathname]);

  return children;
};

export default ProtectedRoute;