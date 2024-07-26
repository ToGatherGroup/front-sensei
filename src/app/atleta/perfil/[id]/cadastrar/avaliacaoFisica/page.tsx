"use client";
import EvaluationForm from "@/components/evaluationForm";
import FormTitle from "@/components/title/formTitle";

type Params = {
  id: number | string;
};

type Props = {
  params: Params;
};

const Evaluation = ({ params: { id } }: Props) => {
  return (
    <section className="min-h-screen flex-col justify-center mx-auto my-0 w-auto max-w-[650px] bg-container rounded">
      <div className="flex-col">
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle
            title="Cadastrar Avaliação"
            iconSrc="/icons/assessment.png"
          />
        </div>

        <div className="flex items-center justify-center">
          <label className="inline-block w-20 text-left text-base font-semibold">
            Atleta
          </label>
          <h3 className="inline-block w-24 text-left">nome</h3>
        </div>
      </div>
      <EvaluationForm method={"POST"} id={id} />
    </section>
  );
};

export default Evaluation;
