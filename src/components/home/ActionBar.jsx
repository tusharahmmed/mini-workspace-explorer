import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  FileTypeCorner,
  Folder,
  FolderPen,
  Pen,
  Plus,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const ActionBar = () => {
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

export default ActionBar;
