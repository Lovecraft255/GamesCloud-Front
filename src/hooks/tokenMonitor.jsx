import { useEffect, useCallback } from "react";
import { useAuth } from "../context/authContext";
import authService from "../services/authServices";

export const useTokenMonitor = () => {
  const { refreshUser, logout } = useAuth();

  const checkTokenExpiration = useCallback(async () => {
    const token = authService.getAccessToken();

    if (!token) {
      return;
    }

    if (authService.isTokenValid(token)) {
      try {
        await authService.refreshToken();

        refreshUser();
      } catch (error) {
        console.error("Token refresh failed:", error);
        logout();
      }
    }
  }, [refreshUser, logout]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    checkTokenExpiration();

    const handleFocus = () => {
      checkTokenExpiration();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkTokenExpiration]);

  return { checkTokenExpiration };
};
