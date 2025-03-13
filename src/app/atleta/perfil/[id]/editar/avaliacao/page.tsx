"use client";
import { useSearchParams } from "next/navigation";
import EvaluationForm from "@/components/evaluationForm";
import FormTitle from "@/components/title/formTitle";
import FormContainer from "@/components/ui/formContainer";
import Image from "next/image";
import mail from "../../../../../../../public/icons/mails 8.png";
import edt from "../../../../../../../public/icons/edt.png";

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
    <FormContainer>
      <FormTitle title="Editar Avaliação" iconSrc="/icons/report.png" />

      <div className="flex items-center justify-center mt-16">
        <p className="inline-block w-20 text-right text-base font-semibold">
          Atleta:
        </p>
        <h3 className="inline-block w-48 text-center">{nome}</h3>
      </div>

      <div className="ml-auto flex gap-2 justify-end">
        <button>
          <Image src={mail} alt="enviar email do relatorio" className="w-5" />
        </button>
        <button>
          <Image src={edt} alt="edição relatorio" className="w-5" />
        </button>
      </div>

      <EvaluationForm method={"PUT"} id={id} />
    </FormContainer>
  );
};

export default EvaluationUpdate;
