import {
  CustomCombobox,
  CustomeBreakcrumb,
  CustomSidebar,
} from "@/components/custom";
import { ActionBar, Content } from "@/components/home";

const MainLayout = () => {
  return (
    <>
      <main className="flex w-full">
        <aside>
          <CustomSidebar />
        </aside>
        <div className="content mx-6 my-8 w-full">
          <div className="flex gap-10 items-center">
            <div>
              <CustomCombobox />
            </div>
            <div>
              <CustomeBreakcrumb className="me-10" />
            </div>
            <div className="flex flex-1 justify-end gap-3">
              <ActionBar />
            </div>
          </div>
          <Content />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
