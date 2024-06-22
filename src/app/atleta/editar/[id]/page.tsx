"use client";

import { useEffect, useState } from "react";
import { useAthleteProvider } from "@/contexts";
import FormAtleta from "../../../../components/formAtleta/index";
import Loading from "@/components/loading/index";
import { useParams } from "next/navigation";
//import { Atleta } from "@/mock/atleta";


const EditarAtleta = () => {
  const { athlete, getAthlete } = useAthleteProvider();
  const params = useParams()

  useEffect(() => {
    let id = params.id;
  
    if (Array.isArray(id)) {
      id = id[0];
    }
  
    if (id) {
      getAthlete(id)
    }
  }, [params.id])
  
  return (
    <div>
      {athlete ? (
        <FormAtleta atleta={athlete} method="PUT"/>
      )
       : (
        <Loading />
       )}
    </div>
  );
};

export default EditarAtleta;
