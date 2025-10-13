import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

const AuthContext = createContext({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  setIsAuthenticated: () => { },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data.user);
        // console.log(user);
        setIsAuthenticated(true);
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("Unauthorized. User is not logged in.");
        } else {
          console.error("An unexpected error occurred:", err);
        }
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};