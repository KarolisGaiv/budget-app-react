import useFindRecord from "@/hooks/useFindRecord";
import { useEffect, useState } from "react";

type UpdateRecordFormProps = {
  recordID: number;
  type: "expenses" | "income";
};

export default function UpdateRecordForm({ recordID, type }: UpdateRecordFormProps) {
  const [recordDetails,setRecordDetails] = useState([])
  const findRecord = useFindRecord();

  useEffect(() => {
    async function fetchRecord() {
      const recordData = await findRecord(recordID, type);
      setRecordDetails(recordData)
    }

    fetchRecord();
  }, [recordID, type]); 

  return <form></form>;
}
