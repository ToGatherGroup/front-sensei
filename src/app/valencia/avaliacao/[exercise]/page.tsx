"use client";
import React from "react";
import Loading from "@/components/loading/index";

type Params = {
  exercise: string;
};

type Props = {
  params: Params;
};

const ListAvaliacaoPage = ({ params }: Props) => {
  return (
    <div>
      <p>{params.exercise}</p>
    </div>
  );
};

export default ListAvaliacaoPage;

// https://nextjs.org/docs/app/api-reference/functions/use-params
