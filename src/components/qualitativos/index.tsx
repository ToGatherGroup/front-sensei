import useScreenSize from "@/hooks/useScreenSize";
import Image from "next/image";
import { useEffect, useState } from "react";

const RESULT_TEXT_COLOR = "text-[#599BD6]";
const IMC_CORES: { [key: string]: string } = {
  "baixo peso": "text-orange-600",
  normal: "text-green-600",
  sobrepeso: "text-orange-600",
  obesidade: "text-red-600",
  "obesidade grau 1": "text-red-600",
  "obesidade grau 2": "text-red-600",
  "obesidade grau 3": "text-red-600",
};

const MOCK: any = [
  {
    label: "Vo2",
    resultado: "acimaMedia",
  },
  {
    label: "Flexoes",
    resultado: "fraco",
  },
  {
    label: "IMC",
    resultado: "obesidade grau 3",
  },
];

type Resultados = {
  [key: string]:
    | "muitoFraco"
    | "fraco"
    | "media"
    | "acimaMedia"
    | "excelente"
    | "superior";
};
let resultados: Resultados = {};
let imc = "";

MOCK.forEach((item: any) => {
  if (item.label == "IMC") {
    imc = item.resultado;
    return;
  }
  resultados[item.label] = item.resultado;
});

console.log("resultados:", resultados);
console.log("imc:", imc);

type Props = {};
const Qualitativos = ({}: Props) => {
  const screenSize = useScreenSize();
  return (
    <div className="p-2 mt-8">
      <p
        className={`decoration-white scale-75 lg:scale-100 underline font-extrabold text-center mb-14`}
      >
        <label htmlFor="imc" className="uppercase text-white">
          imc:{" "}
        </label>
        <span className={`${IMC_CORES[imc]} uppercase`}>{imc}</span>
      </p>

      <div className="m-auto w-fit relative [&>label]:text-white [&>label]:uppercase [&>label]:text-xs [&>label]:lg:text-sm [&>label]:font-extrabold [&>label]:text-center [&>label]:absolute [&>label]:z-10 [&>label]:lg:font-extrabold">
        <ResultBar
          result={resultados["Vo2"]}
          className="scale-90 lg:scale-100 absolute z-20 -top-4 left-7 lg:-top-5 lg:left-16"
        />
        <label
          htmlFor="superiores"
          className="left-2 top-3 lg:left-10 lg:top-5"
        >
          resist.
          <br />
          superiores
        </label>

        <ResultBar
          result="acimaMedia"
          className="box-border absolute z-20 top-1.5 right-7 scale-90 lg:scale-100 lg:top-4 lg:right-[70px]"
        />
        <label htmlFor="vo2" className="right-6 top-9 lg:top-14 lg:right-12">
          vo2
        </label>

        <ResultBar
          result="media"
          className="absolute z-20 bottom-[143px] right-5 scale-90 lg:scale-100 lg:bottom-[222px] lg:right-[58px]"
        />
        <label
          htmlFor="abdominal"
          className="right-4 top-44 lg:right-12 lg:top-auto lg:bottom-[170px]"
        >
          resist. <br />
          abdominal
        </label>

        <ResultBar
          result="superior"
          className="absolute z-20 bottom-3 left-6 scale-90 lg:scale-100 lg:bottom-5 lg:left-[70px]"
        />
        <label htmlFor="cooper" className="left-7 -bottom-3 lg:left-14">
          cooper
        </label>

        <Image
          src={"/boneco_qualitativo_540x480.png"}
          alt="Informações qualitativas"
          width={screenSize.width < 1024 ? 350 : 540} //Mobile: 350x338
          height={screenSize.width < 1024 ? 338 : 480}
        />
      </div>
    </div>
  );
};
export default Qualitativos;

function resultToDisplay(result: string) {
  switch (result) {
    case "muitoFraco":
      return "Muito Fraco";
    case "fraco":
      return "fraco";
    case "media":
      return "Na média";
    case "acimaMedia":
      return "Acima da Média";
    case "excelente":
      return "Excelente";
    case "superior":
      return "Superior";
  }
}

type ResultBar = {
  result:
    | "muitoFraco"
    | "fraco"
    | "media"
    | "acimaMedia"
    | "excelente"
    | "superior";
  className: string;
};
const ResultBar = ({ result, className }: ResultBar) => {
  const [barsElement, setBarsElement] = useState<Array<React.ReactElement>>([]);
  const [displayResult, setDisplayResult] = useState<string | undefined>(
    undefined
  );

  const bars = {
    muitoFraco: {
      barsAmount: 1,
      color: "bg-[#ff0816]",
    },
    fraco: {
      barsAmount: 2,
      color: "bg-[#ffa420]",
    },
    media: {
      barsAmount: 3,
      color: "bg-[#ffff00]",
    },
    acimaMedia: {
      barsAmount: 4,
      color: "bg-[#99ff33]",
    },
    excelente: {
      barsAmount: 5,
      color: "bg-[#00cc00]",
    },
    superior: {
      barsAmount: 6,
      color: "bg-blue-400",
    },
  };

  useEffect(() => {
    setDisplayResult(resultToDisplay(result));
  }, [result]);

  useEffect(() => {
    setBarsElement(() => {
      let newArray: Array<React.ReactElement> = [];
      for (let i = 1; i <= 6; i++) {
        newArray.push(
          <div
            key={i}
            className={`${
              i <= bars[result].barsAmount
                ? bars[result].color
                : "bg-transparent"
            } border-[#6b88a1] border border-solid h-5 w-3`}
          />
        );
      }
      return newArray;
    });
  }, []);

  return (
    <>
      <div
        className={`${className} w-[100px] flex flex-col justify-center items-center`}
      >
        <p
          className={` text-[12px] lg:text-[16px] mb-1 font-bold uppercase ${RESULT_TEXT_COLOR} text-nowrap -mt-3.5`}
        >
          {displayResult}
        </p>
        <div className="flex gap-1">
          {/* <div className={`${bars.muitoFraco.color} h-5 w-3`} />
        <div
          className={`bg-transparent border-[#6b88a1] border border-solid h-5 w-3`}
        />
        <div
          className={`bg-transparent border-[#6b88a1] border border-solid h-5 w-3`}
        />
        <div
          className={`bg-transparent border-[#6b88a1] border border-solid h-5 w-3`}
        />
        <div
          className={`bg-transparent border-[#6b88a1] border border-solid h-5 w-3`}
        />
        <div
          className={`bg-transparent border-[#6b88a1] border border-solid h-5 w-3`}
        /> */}
          {barsElement}
        </div>
      </div>
    </>
  );
};
