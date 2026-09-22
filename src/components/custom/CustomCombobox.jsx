import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  setCurrentDir,
  setSelected,
} from "@/rtk/features/fileManager/fileManagerSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CustomCombobox = () => {
  const [value, setValue] = useState(null);
  const dispatch = useDispatch();

  const currentDirId = useSelector(
    (state) => state?.fileManager?.currentDir?.id,
  );
  const docs = useSelector((state) => state.fileManager.documents);

  const allIds = new Set([currentDirId]);

  const selectNestedDocument = (parentId) => {
    docs
      .filter((item) => item.parentId == parentId)
      .forEach((item) => {
        allIds.add(item.id);
        selectNestedDocument(item.id);
      });
  };

  selectNestedDocument(currentDirId);

  const options = docs
    .filter((item) => allIds.has(item.id))
    .filter((item) => item.id != "root")
    .filter((item) => item.id != currentDirId)
    .map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

  const handleOnValueChange = (item) => {
    setValue(item);
    if (!item) {
      return;
    }

    const itemDetails = docs.find((doc) => doc.id == item?.value);

    const currentDir = docs.find((doc) => doc.id == itemDetails?.parentId);
    dispatch(setCurrentDir(currentDir));

    dispatch(setSelected(itemDetails));
  };
  return (
    <Combobox items={options} value={value} onValueChange={handleOnValueChange}>
      <ComboboxInput />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(doc) => (
            <ComboboxItem key={doc?.value} value={doc}>
              {doc?.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default CustomCombobox;
