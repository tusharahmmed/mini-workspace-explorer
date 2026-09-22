import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { setCurrentDir } from "@/rtk/features/fileManager/fileManagerSlice";

import { useDispatch, useSelector } from "react-redux";

const generateBreadCrumb = (list, item) => {
  const arr = [];
  const breadCrumb = (list, item) => {
    if (item == null) {
      return;
    }

    const parentDoc = list.find((doc) => doc.id == item.parentId);
    breadCrumb(list, parentDoc);
    arr.push(item);
  };
  breadCrumb(list, item);
  return arr;
};

const CustomeBreakcrumb = ({ className }) => {
  const fileManager = useSelector((state) => state.fileManager);

  const list = generateBreadCrumb(
    fileManager.documents,
    fileManager.currentDir,
  );

  const dispatch = useDispatch();
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {list?.map((item, idx) => (
          <>
            <BreadcrumbItem
              className="cursor-pointer"
              onClick={() => {
                dispatch(setCurrentDir(item));
              }}
            >
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            </BreadcrumbItem>
            {idx != list?.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomeBreakcrumb;
