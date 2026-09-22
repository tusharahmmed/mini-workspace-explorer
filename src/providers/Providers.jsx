import { SidebarProvider } from "@/components/ui/sidebar";
import { store, persistor } from "@/rtk/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toast";
import { PersistGate } from "redux-persist/integration/react";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SidebarProvider>{children}</SidebarProvider>
        <Toaster />
      </PersistGate>
    </Provider>
  );
};

export default Providers;
