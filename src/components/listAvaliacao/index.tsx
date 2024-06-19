import { useAssessmentsProvider } from "@/contexts/assessments/assessments";
import { useRouter } from "next/navigation";

enum CATEGORIAS_ENUM {
  VALENCIAS_FISCIAS,
  INDICES,
}

const CATEGORIAS = [
  { enum: CATEGORIAS_ENUM.VALENCIAS_FISCIAS, title: "Valências Físicas" },
  { enum: CATEGORIAS_ENUM.INDICES, title: "Indíces" },
];

const EXERCICIOS = {
  [CATEGORIAS_ENUM.VALENCIAS_FISCIAS]: [
    {
      title: "Core",
      exercisePath: "avaliacao/core",
      nestedExercise: null,
    },
    {
      title: "Força Máxima",
      exercisePath: "avaliacao/forca_maxima",
      nestedExercise: null,
    },
    {
      title: "Força Explosiva",
      exercisePath: "avaliacao/forca_explosiva",
      nestedExercise: null,
    },
    {
      title: "Força Isométrica",
      exercisePath: "avaliacao/forca_isometrica",
      nestedExercise: null,
    },
    {
      title: "Mobilidade do Tornozelo",
      exercisePath: "avaliacao/mobilidade_tornozelo",
      nestedExercise: null,
    },
    {
      title: "Abdominal",
      exercisePath: "avaliacao/resistencia_localizada/abdominal",
      nestedExercise: {
        nestedCategory: "Resistência muscular localizada",
        title: "MMSS",
        exercisePath: "avaliacao/resistencia_localizada/mmss",
      },
    },
    {
      title: "Resistencia Anaerobica",
      exercisePath: "avaliacao/resistencia_anaerobica",
      nestedExercise: null,
    },
    {
      title: "Resistencia Aerobica",
      exercisePath: "avaliacao/resistencia_aerobica",
      nestedExercise: null,
    },
  ],
  [CATEGORIAS_ENUM.INDICES]: [
    {
      title: "IMC",
      exercisePath: "avaliacao/imc",
      nestedExercise: null,
    },
  ],
};

export default function ListAvaliacao() {
  const router = useRouter();
  const assessment = useAssessmentsProvider();

  function handleClick(path: string) {
    router.push(path);
  }

  return (
    <div className="w-full max-w-96">
      {assessment.assessmentData && (
        <div className="flex flex-col gap-1 bg-winePattern items-center justify-center w-fit m-auto px-4 py-2 rounded text-white font-semibold">
          <p>Avaliação iniciada</p>
          <p>{assessment.assessmentData.format("DD/MM/YYYY")}</p>
        </div>
      )}
      {CATEGORIAS.map((categoria) => (
        <div key={categoria.enum}>
          <Category title={categoria.title} />
          <div className="flex flex-1 flex-col gap-y-3">
            {EXERCICIOS[categoria.enum].map((exercicio) => (
              <div key={exercicio.exercisePath}>
                {exercicio.nestedExercise ? (
                  <details className="">
                    <summary className="box-border bg-auto w-full rounded-md font-semibold bg-white py-3 px-2 text-left transition duration-400 hover:ease-in hover:border-winePattern z-1 hover:z-0 hover:scale-y-125 hover:scale-x-110 cursor-pointer">
                      {exercicio.nestedExercise.nestedCategory}
                    </summary>
                    <Exercise
                      title={exercicio.title}
                      onClick={() => handleClick(exercicio.exercisePath)}
                      className="my-1 !bg-gray-300 animate-fade-down animate-ease-linear animate-duration-100"
                    />
                    <Exercise
                      title={exercicio.nestedExercise.title}
                      onClick={() =>
                        handleClick(exercicio.nestedExercise.exercisePath)
                      }
                      className="!bg-gray-300 animate-fade-down animate-ease-linear animate-duration-100"
                    />
                  </details>
                ) : (
                  <Exercise
                    key={exercicio.exercisePath}
                    title={exercicio.title}
                    onClick={() => handleClick(exercicio.exercisePath)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

type CategoryProps = {
  title: string;
};
function Category({ title }: CategoryProps) {
  return (
    <h2 className="text-white font-extrabold text-xl pl-0 pt-5 mb-0">
      {title}
    </h2>
  );
}

type ExerciseProps = {
  title: string;
  className?: string;
  onClick: () => void;
};

function Exercise({
  title,
  onClick: onClickFunction,
  className: outerClass,
}: ExerciseProps) {
  return (
    <button
      className={`box-border bg-auto w-full font-semibold rounded-md bg-white py-3 px-2 text-left transition duration-400 hover:ease-in hover:border-winePattern z-1 hover:z-0 hover:scale-y-125 hover:scale-x-110 ${
        outerClass ?? ""
      }`}
      onClick={onClickFunction}
    >
      {title}
    </button>
  );
}
