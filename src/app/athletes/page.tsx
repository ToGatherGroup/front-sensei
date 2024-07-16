"use client";
import React, { useEffect } from "react";
import ListAthletes from "../../components/listAthletes/index";
import { useAthleteProvider } from "@/contexts";
import Loader from "@/components/loading";

const ListAthletesPage = () => {
  const { listAthletes, isLoading } = useAthleteProvider();

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="max-container">
        {isLoading ? <Loader /> : <ListAthletes listAthletes={listAthletes} />}
      </div>
    </div>
  );
};

export default ListAthletesPage;
