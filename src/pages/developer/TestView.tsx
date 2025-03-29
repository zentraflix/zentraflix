import { useState } from "react";

import { Button } from "@/components/buttons/Button";
import { DetailsModal, useModal } from "@/components/overlays/Modal";

// mostly empty view, add whatever you need
export default function TestView() {
  const [val, setVal] = useState(false);
  const modal = useModal("details");

  if (val) throw new Error("I crashed");

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button onClick={() => setVal(true)}>Crash me!</Button>
      <Button onClick={() => modal.show()}>Show Details Modal</Button>
      <DetailsModal id="details" />
    </div>
  );
}
