import { createContext, useContext } from "react";
import { useMsal } from "@azure/msal-react";
import { apiScopes } from "@/auth/authScopes";
import { setAuthTokenProvider } from "@/services/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { instance, accounts, inProgress } = useMsal();

  const account = accounts[0] || null;

  const isAuthenticated =
    inProgress === "none" && !!account;

  const login = () =>
    instance.loginRedirect({
      scopes: apiScopes,
    });
  const logout = () => instance.logoutRedirect();

  const getAccessToken = async () => {
    if (!account) return null;

    try {
      const response = await instance.acquireTokenSilent({
        account,
        scopes: apiScopes,
      });

      return response.accessToken;
    } catch (error) {
      // fallback if silent fails
      await instance.acquireTokenRedirect({
        scopes: apiScopes,
      });
    }
  };
  setAuthTokenProvider(getAccessToken);

  return (
    <AuthContext.Provider
      value={{
        account,
        isAuthenticated,
        login,
        logout,
        inProgress,
        getAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
