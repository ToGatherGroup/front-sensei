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
      exerciseName: "prancha",
      exercisePath: "avaliacao/core",
      nestedExercise: null,
    },
    {
      title: "Força Máxima",
      exerciseName: "rmTerra",
      exercisePath: "avaliacao/forca_maxima",
      nestedExercise: null,
    },
    {
      title: "Força Explosiva",
      exerciseName: "impulsaoVertical",
      exercisePath: "avaliacao/forca_explosiva",
      nestedExercise: null,
    },
    {
      title: "Força Isométrica",
      exerciseName: "forcaIsometricaMaos",
      exercisePath: "avaliacao/forca_isometrica",
      nestedExercise: null,
    },
    {
      title: "Mobilidade do Tornozelo",
      exerciseName: "testeDeLunge",
      exercisePath: "avaliacao/mobilidade_tornozelo",
      nestedExercise: null,
    },
    {
      title: "Abdominal",
      exerciseName: "abdominais",
      exercisePath: "avaliacao/resistencia_localizada/abdominal",
      nestedExercise: {
        nestedCategory: "Resistência muscular localizada",
        title: "MMSS",
        exerciseName: "flexoes",
        exercisePath: "avaliacao/resistencia_localizada/mmss",
      },
    },
    {
      title: "Resistencia Anaerobica",
      exerciseName: "burpees",
      exercisePath: "avaliacao/resistencia_anaerobica",
      nestedExercise: null,
    },
    {
      title: "Resistencia Aerobica",
      exerciseName: "cooper",
      exercisePath: "avaliacao/resistencia_aerobica",
      nestedExercise: null,
    },
  ],
  [CATEGORIAS_ENUM.INDICES]: [
    {
      title: "IMC",
      exerciseName: "imc",
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

  console.log("prancha:", assessment.exerciseIsComplete("prancha"));

  return (
    <div className="w-full max-w-96">
      {assessment.assessmentData && (
        <div className="flex flex-col gap-1 bg-winePattern items-center justify-center w-fit m-auto px-4 py-2 rounded text-white font-semibold outline outline-1">
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
                  <details className="cursor-pointer [&_svg]:open:-rotate-180">
                    <summary
                      className={`flex items-center box-border bg-auto w-full font-semibold rounded-md bg-white p-2 min-h-10 text-left transition duration-400 hover:ease-in hover:border-winePattern z-1 hover:z-0 hover:scale-y-125 hover:scale-x-110`}
                    >
                      <div className="flex gap-1 items-center w-full">
                        <svg
                          className="rotate-0 transform text-winePatternLight transition-all duration-500"
                          fill="none"
                          height="20"
                          width="20"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        {/* <span className="mr-2">{">"}</span>{" "} */}
                        {/* Tentar inserir o icone aqui, usando ::before content url(iconPath). Use summary[open] para saber se o Modal está aberto ou fechado. Estilizar o details como default fechado, e estilizar aberto na tag details[open]*/}
                        {/* https://stackoverflow.com/questions/61292792/css-selector-for-details-element-when-opened */}
                        <p>{exercicio.nestedExercise.nestedCategory}</p>
                        {(!assessment.exerciseIsComplete(
                          exercicio.exerciseName
                        ) ||
                          !assessment.exerciseIsComplete(
                            exercicio.nestedExercise.exerciseName
                          )) && (
                          <span className="ml-auto px-2.5 py-1 text-white rounded-full bg-winePattern">
                            !
                          </span>
                        )}
                      </div>
                    </summary>
                    {/* <summary
                      className={`bg-white box-border bg-auto w-full rounded-md font-semibold py-3 px-2 text-left transition duration-400 hover:ease-in hover:border-winePattern z-1 hover:z-0 hover:scale-y-125 hover:scale-x-110 cursor-pointer`}
                    >
                      {exercicio.nestedExercise.nestedCategory}
                    </summary> */}
                    <Exercise
                      title={exercicio.title}
                      onClick={() => handleClick(exercicio.exercisePath)}
                      className={`!bg-gray-300 my-1 animate-fade-down animate-ease-linear animate-duration-100`}
                      completed={assessment.exerciseIsComplete(
                        exercicio.exerciseName
                      )}
                    />
                    <Exercise
                      title={exercicio.nestedExercise.title}
                      onClick={() =>
                        handleClick(exercicio.nestedExercise.exercisePath)
                      }
                      className={`!bg-gray-300 animate-fade-down animate-ease-linear animate-duration-100`}
                      completed={assessment.exerciseIsComplete(
                        exercicio.nestedExercise.exerciseName
                      )}
                    />
                  </details>
                ) : (
                  <Exercise
                    key={exercicio.exercisePath}
                    title={exercicio.title}
                    completed={
                      exercicio.exerciseName == "imc"
                        ? assessment.exerciseIsComplete("altura") &&
                          assessment.exerciseIsComplete("peso")
                        : assessment.exerciseIsComplete(exercicio.exerciseName)
                    }
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
  completed?: boolean;
  onClick?: () => void;
};

function Exercise({
  title,
  completed,
  onClick: onClickFunction,
  className: outerClass,
}: ExerciseProps) {
  return (
    <button
      className={`box-border bg-auto w-full font-semibold rounded-md bg-white p-2 min-h-10 text-left transition duration-400 hover:ease-in hover:border-winePattern z-1 hover:z-0 hover:scale-y-125 hover:scale-x-110 ${
        outerClass ?? ""
      }`}
      onClick={onClickFunction}
    >
      <div className="box-border max-w-full flex items-center justify-start">
        <p className="">{title}</p>
        {!completed && (
          <span className="ml-auto px-2.5 py-1 text-white rounded-full bg-winePattern">
            !
          </span>
        )}
      </div>
    </button>
  );
}
