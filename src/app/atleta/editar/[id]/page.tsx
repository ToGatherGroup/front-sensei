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

  useEffect(() => {
    if(params.id && athlete == null) {
      getAthlete(parseInt(params.id))
    }
  }, [athlete, getAthlete])

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
