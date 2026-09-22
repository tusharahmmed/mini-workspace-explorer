import { CustomCard } from "../custom";
import { useSelector } from "react-redux";

const Content = () => {
  const fileManager = useSelector((state) => state.fileManager);

  const docs = fileManager?.documents?.filter(
    (item) => item?.parentId == fileManager?.currentDir?.id,
  );

  return (
    <div className="card-wraper grid grid-cols-4 gap-5 mt-14">
      {docs?.map((doc) => {
        return <CustomCard key={doc.id} data={doc} />;
      })}
    </div>
  );
};

export default Content;
