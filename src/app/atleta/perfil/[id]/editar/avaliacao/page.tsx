"use client";
import { useSearchParams } from "next/navigation";
import EvaluationForm from "@/components/evaluationForm";
import FormTitle from "@/components/title/formTitle";

type Params = {
  id: number | string;
};

type Props = {
  params: Params;
};

const EvaluationUpdate = ({ params: { id } }: Props) => {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome");

  return (
    <section className="min-h-screen flex-col justify-center mx-auto my-0 w-auto max-w-[650px] bg-container rounded">
      {/* Título */}
      <div className="flex justify-center items-end pb-16 pt-16">
        <FormTitle title="Editar Avaliação" iconSrc="/icons/report.png" />
      </div>

      <div className="flex items-center justify-center">
        <label className="inline-block w-20 text-right text-base font-semibold">
          Atleta:
        </label>
        <h3 className="inline-block w-48 text-center">{nome}</h3>
      </div>

      <EvaluationForm method={"PUT"} id={id} />
    </section>
  );
};

export default EvaluationUpdate;
