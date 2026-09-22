import { SidebarProvider } from "@/components/ui/sidebar";
import { store } from "@/rtk/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toast";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <SidebarProvider>{children}</SidebarProvider>
      <Toaster />
    </Provider>
  );
};

export default Providers;
