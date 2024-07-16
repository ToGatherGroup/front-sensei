"use client";

import { useEffect } from "react";
import { useAthleteProvider } from "@/contexts";
import FormAtleta from "../../../../components/formAtleta/index";
import Loader from "@/components/loading";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const EditarAtleta = ({ params: { id } }: Props) => {
  const { athlete, getAthlete } = useAthleteProvider();

  useEffect(() => {
    getAthlete(id);
  }, []);

  return (
    <div>
      {athlete ? <FormAtleta atleta={athlete} method="PUT" /> : <Loader />}
    </div>
  );
};

export default EditarAtleta;
