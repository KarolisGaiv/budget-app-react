import useFindRecord from "@/hooks/useFindRecord";
import { useEffect } from "react";

type UpdateRecordFormProps = {
  recordID: number;
  type: "expenses" | "income";
};

export default function UpdateRecordForm({ recordID, type }: UpdateRecordFormProps) {
  const findRecord = useFindRecord();

  useEffect(() => {
    async function fetchRecord() {
      const recordData = await findRecord(recordID, type);
      console.log("Fetched record:", recordData);
    }

    fetchRecord();
  }, [recordID, type]); 

  return <form></form>;
}
