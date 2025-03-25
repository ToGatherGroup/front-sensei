"use client";
import { useSearchParams } from "next/navigation";
import EvaluationForm from "@/components/evaluationForm";
import FormTitle from "@/components/title/formTitle";
import FormContainer from "@/components/ui/formContainer";
import Image from "next/image";
import { useState } from "react";

type Params = {
  id: number | string;
};

type Props = {
  params: Params;
};

const EvaluationUpdate = ({ params: { id } }: Props) => {
  const searchParams = useSearchParams();
  const nome = searchParams.get("nome");
  const [viewMode, setViewMode] = useState(true);

  return (
    <FormContainer>
      <FormTitle
        title={viewMode ? "Avaliação" : "Editar Avaliação"}
        iconSrc="/icons/report.png"
      />

      {viewMode && (
        <div className="mt-4 flex justify-end gap-4 md:gap-2 mr-3 md:justify-center">
          <button>
            <Image
              src="/icons/mails.png"
              alt="enviar email do relatorio"
              width={32}
              height={32}
            />
          </button>
          <button onClick={() => setViewMode(false)}>
            <Image
              src="/icons/edt.png"
              alt="edição relatorio"
              width={32}
              height={32}
            />
          </button>
        </div>
      )}

      <div className="flex items-center justify-center mt-16 gap-2">
        <p className="inline-block w-fit text-right text-base font-semibold">
          Atleta:
        </p>
        <h3 className="inline-block w-48 text-center">{nome}</h3>
      </div>

      <EvaluationForm method={"PUT"} viewMode={viewMode} id={id} />
    </FormContainer>
  );
};

export default EvaluationUpdate;
