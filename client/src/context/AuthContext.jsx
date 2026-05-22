import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearStoredAuth, getMe, getStoredToken, getStoredUser, login, setStoredAuth, signup } from "@/lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());
  const [authLoading, setAuthLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await getMe();
        setUser(response.user);
        setStoredAuth({ token, user: response.user });
      } catch (_error) {
        clearStoredAuth();
        setToken(null);
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  const signupUser = async (payload) => {
    const response = await signup(payload);
    setStoredAuth(response);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const loginUser = async (payload) => {
    const response = await login(payload);
    setStoredAuth(response);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const logout = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ token, user, authLoading, signupUser, loginUser, logout, isAuthenticated: Boolean(token && user) }),
    [token, user, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
