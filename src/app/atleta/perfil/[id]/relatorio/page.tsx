"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import FormTitle from "@/components/title/formTitle";
import Button from "@/components/ui/button";
import Link from "next/link";

const Relatorio = () => {
  //obeter os dados na url e renderizar
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const nome = searchParams.get("nome");

  //função para converter a data
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="min-h-screen flex-col justify-center mx-auto my-0 w-auto max-w-[650px] bg-container rounded">
      <div className="flex-col">
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle title="Relatório do Atleta" iconSrc="/icons/report.png" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="data"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Data
          </label>
          {/* renderização da data e verificação se ela é nula */}
          <h3>{data && formatDate(data)}</h3>
        </div>
        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="nome"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Atleta
          </label>
          <h3>{nome}</h3>
        </div>

        <div className="flex-col items-center justify-center pb-8 pt-8">
          <div className="flex items-center justify-center gap-2">
            <h1>Em construção</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center pb-10">
        <Link href="/relatorioAvaliacao">
          <Button text={"Voltar"} type={"button"} className="mx-auto" />
        </Link>
      </div>
    </section>
  );
};

export default Relatorio;
