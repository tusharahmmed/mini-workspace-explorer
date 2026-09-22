import {
  CustomCard,
  CustomCombobox,
  CustomeBreakcrumb,
  CustomSidebar,
} from "@/components/custom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  FileTypeCorner,
  Folder,
  FolderPen,
  Pen,
  Plus,
  Trash,
} from "lucide-react";
import { useState } from "react";

const MainLayout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const handleCreateSubmit = (e) => {
    const formData = new FormData(e.currentTarget);

    e.preventDefault();
    const name = formData.get("name");

    console.log(name);
    setDialogOpen(false);
    setDialogType(null);
  };

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
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline">
                      <Plus /> Add
                    </Button>
                  }
                />
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogType("folder");
                    }}
                  >
                    <Folder />
                    New Folder
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setDialogOpen(true);
                      setDialogType("file");
                    }}
                  >
                    <FileTypeCorner />
                    New File
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button className="cursor-pointer" variant="outline">
                <FolderPen /> Rename
              </Button>
              <Button className="cursor-pointer" variant="outline">
                <Pen /> Edit
              </Button>
              <Button className="cursor-pointer" variant="destructive">
                <Trash /> Delete
              </Button>
            </div>
          </div>
          <div className="card-wraper grid grid-cols-4 gap-5 mt-14">
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
            <CustomCard />
          </div>
        </div>
      </main>

      {/* create dialog  */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setDialogOpen(false);
            setDialogType(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleCreateSubmit}>
            <DialogHeader>
              <DialogTitle>
                {dialogType == "folder" ? "Add new folder" : "Add new file"}
              </DialogTitle>
            </DialogHeader>
            <Field className="py-4">
              <Input id="name-1" name="name" />
            </Field>

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MainLayout;
