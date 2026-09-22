/* eslint-disable no-useless-assignment */
import { CustomCard, CustomEmpty } from "../custom";
import { useSelector } from "react-redux";

const Content = () => {
  const fileManager = useSelector((state) => state.fileManager);

  const docs = fileManager?.documents?.filter(
    (item) => item?.parentId == fileManager?.currentDir?.id,
  );

  let content = null;
  if (docs?.length > 0) {
    content = (
      <div className="card-wraper grid grid-cols-4 gap-5 mt-14">
        {docs?.map((doc) => {
          return <CustomCard key={doc.id} data={doc} />;
        })}
      </div>
    );
  } else {
    content = (
      <div className="my-8">
        <CustomEmpty />
      </div>
    );
  }
  return <>{content}</>;
};

export default Content;
