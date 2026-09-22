import { SidebarProvider } from "@/components/ui/sidebar";
import { store } from "@/rtk/store";
import { Provider } from "react-redux";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <SidebarProvider>{children}</SidebarProvider>{" "}
    </Provider>
  );
};

export default Providers;
