import PageTitle from "@/components/PageTitle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { Minus } from "lucide-react";
import Data from "../Database/Data";

const user = Data;

import { Progress } from "@/components/ui/progress";

const TrackPage = () => {
  const ProgressBar = () => {
    let progressValue = 0;
    if (user.ApplicationSubmitted) {
      progressValue += 25; // 25% for submitted
    }
    if (user.ApplicationProcessed) {
      progressValue += 25; // Additional 25% for processed
    }
    // Add similar logic for Payment and VisaProcessing stages
  };
  return (
    <ScrollArea className="h-[300px] w-[450px] rounded-md border p-4">
      <div className="space-y-8">
        <PageTitle title="Application Status" />
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Application Submitted</div>
            {user.ApplicationSubmitted === true ? <Check /> : <Minus />}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Application Processed</div>
            {user.ApplicationProcessed === true ? <Check /> : <Minus />}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Payment</div>
            {user.Payment === true ? <Check /> : <Minus />}
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex flex-wrap border-4 rounded-2xl space-x-6 px-8">
            <div className="">Visa processing</div>
            {user.VisaProcessing === true ? <Check /> : <Minus />}
          </div>
        </div>
        <Progress value={100} />
      </div>
    </ScrollArea>
  );
};

export default TrackPage;
