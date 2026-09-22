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
  Trash2Icon,
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  addDocuments,
  removeDocument,
} from "@/rtk/features/fileManager/fileManagerSlice";
import { toast } from "../ui/toast";

const ActionBar = () => {
  const fileManager = useSelector((state) => state.fileManager);
  const selected = fileManager.selected;
  const dispatch = useDispatch();

  // create actions
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const handleCreateSubmit = (e) => {
    const formData = new FormData(e.currentTarget);

    e.preventDefault();
    const name = formData.get("name");
    // validation
    if (name.trim().length == 0) {
      toast.add({
        type: "error",
        description: `Name requried!`,
        priority: "high",
      });
      return;
    }
    const payload = {
      id: crypto.randomUUID(),
      name: dialogType == "file" ? `${name}.txt` : name,
      type: dialogType,
      parentId: fileManager?.currentDir?.id,
    };

    dispatch(addDocuments(payload));

    setDialogOpen(false);
    setDialogType(null);
  };

  // delete actions
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleDelete = () => {
    dispatch(removeDocument());
    setDeleteDialogOpen(false);
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
      {selected && (
        <Button className="cursor-pointer" variant="outline">
          <FolderPen /> Rename
        </Button>
      )}
      {selected && (
        <Button className="cursor-pointer" variant="outline">
          <Pen /> Edit
        </Button>
      )}
      {selected && (
        <Button
          className="cursor-pointer"
          variant="destructive"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash /> Delete
        </Button>
      )}

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
              <Input id="name-1" name="name" required />
            </Field>

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* delete dialog  */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <Trash2Icon />
            </AlertDialogMedia>
            <AlertDialogTitle>
              Delete {selected?.name} {selected?.type}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this {selected?.type}.{" "}
              {selected?.type == "folder" &&
                "All folders and files inside it will also be permanently deleted."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionBar;
