import PageTitle from "@/components/PageTitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

import { Progress } from "@/components/ui/progress";

const TrackPage = () => {
  return (
    <ScrollArea className="h-[300px] w-[450px] rounded-md border p-4">
      <div className="space-y-8">
        <PageTitle title="Application Status" />
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Application Submitted</div>
            <Check />
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Application Processed</div>
            <Check />
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Payment</div>
            <Check />
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Visa processing</div>
            <Check />
          </div>
        </div>
        <Progress value={100} />
      </div>
    </ScrollArea>
  );
};

export default TrackPage;
