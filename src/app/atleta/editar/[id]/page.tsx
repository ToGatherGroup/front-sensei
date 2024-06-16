"use client";

import { useAthleteProvider } from "@/contexts";
import FormAtleta from "../../../../components/formAtleta/index";
import { useEffect } from "react";

//import { Atleta } from "@/mock/atleta";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const EditarAtleta = ({ params }: Props) => {
  const { athlete, getAthlete } = useAthleteProvider();

  useEffect(() => {
    if(params.id) {
      getAthlete(parseInt(params.id))
    }
  }, [])

  return (
    <div>
      {<FormAtleta atleta={athlete} />}
    </div>
  );
};

export default EditarAtleta;
