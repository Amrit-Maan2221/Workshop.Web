import { store } from "@/store";
import { Provider } from "react-redux";

export default function AppProviders({ children }) {
  return (
    <>
      <Provider store={store}>
        {children}
      </Provider>
    </>
  );
}