import { FileTypeCorner } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const CustomCard = ({ type }) => {
  const featureName = "New Folder";

  return (
    <Card size="sm" className="cursor-pointer hover:bg-primary/30">
      <CardHeader>
        <CardTitle className={"flex items-center gap-3"}>
          {/* <Folder /> */}
          <FileTypeCorner />
          {featureName}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
export default CustomCard;
