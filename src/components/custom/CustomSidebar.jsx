/* eslint-disable no-unused-vars */
import { useState } from "react";
import { ChevronRight, FileTypeCorner, Folder, FolderOpen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentDir,
  setSelected,
} from "@/rtk/features/fileManager/fileManagerSlice";

// recursive component
const TreeItem = ({ item, items }) => {
  const children = items.filter((child) => child.parentId === item.id);
  const isFolder = item.type === "folder";
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  if (!isFolder) {
    return (
      <SidebarMenuItem
        onClick={() => {
          const currentDir = items.find((doc) => doc.id == item.parentId);
          dispatch(setCurrentDir(currentDir));
          dispatch(setSelected(item));
        }}
      >
        <SidebarMenuButton>
          <FileTypeCorner />
          <span>{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  // Folder
  return (
    <SidebarMenuItem>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center">
          <CollapsibleTrigger asChild>
            <div
              // type="button"
              className="flex cursor-pointer size-7 shrink-0 items-center justify-center rounded-md hover:bg-accent"
            >
              <ChevronRight
                className={`size-4 transition-transform duration-200 ${
                  open ? "rotate-90" : ""
                }`}
              />
            </div>
          </CollapsibleTrigger>

          <SidebarMenuButton onClick={() => dispatch(setCurrentDir(item))}>
            {open ? (
              <FolderOpen className="size-4" />
            ) : (
              <Folder className="size-4" />
            )}
            <span>{item.name}</span>
          </SidebarMenuButton>
        </div>

        {children.length > 0 && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {children.map((child) => (
                <TreeItem key={child.id} item={child} items={items} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );
};

export default function CustomSidebar() {
  const items = useSelector((state) => state?.fileManager?.documents);
  const rootItems = items?.filter((item) => item.parentId === null);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {rootItems?.map((item) => (
                <TreeItem key={item.id} item={item} items={items} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
