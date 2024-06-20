"use client";

import { useEffect, useState } from "react";
import { useAthleteProvider } from "@/contexts";
import FormAtleta from "../../../../components/formAtleta/index";
import Loading from "@/components/loading/index";
//import { Atleta } from "@/mock/atleta";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const EditarAtleta = ({ params }: Props) => {
  const { athlete, getAthlete } = useAthleteProvider();
  const [id, setId] = useState<number | null>(null)

  useEffect(() => {
    if(params.id && id == null)  {
      setId(parseInt(params.id))
    }

    if(id) {
      getAthlete(id)
    }
  }, [params.id, id])
  
  return (
    <div>
      {athlete ? (
        <FormAtleta atleta={athlete} method="PATCH"/>
      )
       : (
        <Loading />
       )}
    </div>
  );
};

export default EditarAtleta;
