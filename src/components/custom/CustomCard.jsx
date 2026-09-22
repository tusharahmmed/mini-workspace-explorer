/* eslint-disable no-unused-vars */
import { FileTypeCorner, Folder } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentDir,
  setSelected,
} from "@/rtk/features/fileManager/fileManagerSlice";
import { useRef } from "react";

const CustomCard = ({ data: { id, name, type, parentId } }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.fileManager.selected);

  const timer = useRef(null);

  const handleOnClick = () => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (selected && selected.id == id) {
        dispatch(setSelected(null));
      } else {
        dispatch(
          setSelected({
            id,
            name,
            type,
            parentId,
          }),
        );
      }
    }, 200);
  };

  const handleOnDoubleClick = () => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      if (type == "folder") {
        dispatch(
          setCurrentDir({
            id,
            name,
            type,
            parentId,
          }),
        );
      }
    }, 200);
  };

  return (
    <Card
      size="sm"
      className={`cursor-pointer select-none ${selected?.id == id && "bg-primary/30"}`}
      onClick={handleOnClick}
      onDoubleClick={handleOnDoubleClick}
    >
      <CardHeader>
        <CardTitle className={"flex items-center gap-3"}>
          {type == "folder" ? <Folder /> : <FileTypeCorner />}
          {name}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
export default CustomCard;
