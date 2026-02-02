import { msalInstance } from "@/auth/authConfig";
import { AuthProvider } from "@/hooks/useAuth";
import { store } from "@/store";
import { MsalProvider } from "@azure/msal-react";
import { Provider } from "react-redux";

export default function AppProviders({ children }) {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </AuthProvider>
      </MsalProvider>
    </>
  );
}