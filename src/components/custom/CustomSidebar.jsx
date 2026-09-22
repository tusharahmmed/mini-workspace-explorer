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

const items = [
  { id: "root", name: "Folder A", type: "folder", parentId: null },
  { id: "2", name: "Folder B", type: "folder", parentId: "root" },
  { id: "3", name: "test.txt", type: "file", parentId: "root" },
  { id: "4", name: "test 2.txt", type: "file", parentId: "2" },
  { id: "5", name: "test 3.tex", type: "file", parentId: "3" },
];

// recursive component
const TreeItem = ({ item, items, onSelect }) => {
  const children = items.filter((child) => child.parentId === item.id);
  const isFolder = item.type === "folder";
  const [open, setOpen] = useState(false);

  if (!isFolder) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => onSelect(item)}>
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

          <SidebarMenuButton onClick={() => onSelect(item)}>
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
                <TreeItem
                  key={child.id}
                  item={child}
                  items={items}
                  onSelect={onSelect}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </Collapsible>
    </SidebarMenuItem>
  );
};

export default function CustomSidebar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const rootItems = items.filter((item) => item.parentId === null);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {rootItems.map((item) => (
                <TreeItem
                  key={item.id}
                  item={item}
                  items={items}
                  onSelect={setSelectedItem}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
