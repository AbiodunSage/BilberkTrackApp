import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDegree() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="what degree would you like to apply for?" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Degrees</SelectLabel>
          <SelectItem value="HighSchoolCertificate">
            High School Certificate
          </SelectItem>
          <SelectItem value="Bachelors Degree">Bachelors Degree</SelectItem>
          <SelectItem value="Masters Degree">Masters Degree</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
