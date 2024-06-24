import React from "react";

import { useRouter } from "next/navigation";

const ApplyButton: React.FC = () => {
  const router = useRouter();
  const handleApply = () => {
    router.push("/ApplicationForm");
  };

  return <button onClick={handleApply}>Apply</button>;
};

export default ApplyButton;
