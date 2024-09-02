"use client";
import { ReviewsChart } from "@/components/reviewsChart";
import MedalSection from "@/components/medalSection";
import InfoBoard from "@/components/infoBoard";
import { useComparisonProvider } from "@/contexts/comparison/comparison";
import AtletaSelecionar from "@/app/atleta/buscar/page";
import AthleteComparisonCard from "@/components/athleteComparison";
import { each } from "chart.js/helpers";

const medalSectionStyle = "flex flex-row h-26 w-32 mt-24";
const medalWrapper = "flex flex-col items-center space-y-2 lg:space-y-6";
const avatarAtletaStyle = "w-48";
const athleteWrapperStyle = "shrink flex";

// Array padrão de medalhas com contagem zero
const defaultMedals: MedalProps[] = [
  {
    tipo: "Ouro",
    imgSrc: "/medalhasCinzas1.png",
    ringColor: "amber-500",
    medalCount: 0,
  },
  {
    tipo: "Prata",
    imgSrc: "/medalhasCinzas2.png",
    ringColor: "zinc-500",
    medalCount: 0,
  },
  {
    tipo: "Bronze",
    imgSrc: "/medalhasCinzas3.png",
    ringColor: "copperMedal",
    medalCount: 0,
  },
];

// Definição de MedalProps para os objetos de entrada que podem ter campos opcionais
interface MedalProps {
  tipo?: string;
  imgSrc?: string;
  ringColor?: string;
  medalCount?: number;
}

export default function Comparison() {
  const {
    leftAthlete,
    rightAthlete,
    setIsLeft,
    showModal,
    toggleComparisonModalVisibility,
  } = useComparisonProvider();

  const handleClick = (isLeft?: boolean) => {
    if (isLeft) {
      setIsLeft(isLeft);
    }
    toggleComparisonModalVisibility(!showModal);
  };

  const handleInternClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  // Função para obter o array de medalhas (usar default se vazio)
  const getMedals = (medalhaDTO: MedalProps[] | undefined): MedalProps[] => {

    const medalhaExiste = (medalhaDTO && medalhaDTO?.length > 0 ? true : false)
    const medalhaIncompleta = (medalhaDTO && medalhaDTO?.length < 3 ? true : false)

    if (medalhaExiste && medalhaIncompleta) {
      console.log("medalhaIncompleta")
      for (let i = 0; i < 3; i++) {
        if (!medalhaDTO?.includes(defaultMedals[i]))
        medalhaDTO?.push(defaultMedals[i]);
    }
        
      }

    return (
      medalhaDTO && medalhaDTO.length > 0 ? medalhaDTO : defaultMedals
    ).map(
      (medal: MedalProps, index): MedalProps => ({
        tipo: medal.tipo || `Medalha ${index + 1}`,
        imgSrc:
          medal.imgSrc || `/formAtleta/medals/medalhasCinzas${index + 1}.png`,
        ringColor: medal.ringColor || "gray-500",
        medalCount: medal.medalCount || 0,
      })
    );
  };

  return (
    <div>
      <div className="flex-col h-svh w-screen">
        <div
          className={`${
            showModal ? "blur" : ""
          } flex justify-center relative max-w-screen-lg min-w-full`}
        >
          <div className="shrink h-fit flex-col z-10">
            {/* Div dos três elementos */}
            <div className={`${athleteWrapperStyle}`}>
              {/* Div do avatar e infos */}
              <AthleteComparisonCard
                athlete={leftAthlete ? leftAthlete : null}
                onClick={() => handleClick(true)}
                avatarAtletaStyle={avatarAtletaStyle}
                isLeft={true}
              />
            </div>
            <div className={medalWrapper}>
              {leftAthlete && (
                <div className={medalSectionStyle}>
                  {/* //{getMedals(leftAthlete?.medalhaDTO).map( */}
                  {/* //  (medal: MedalProps, index) => ( */}
                      { leftAthlete?.medalhaDTO && leftAthlete.medalhaDTO.every((medal: MedalProps) => (
                        medal.tipo == "Medalha de ouro"
                      ))}
                  {/* //  ) */}
                  {/* //)} */}
                </div>
              )}
            </div>
          </div>
          <InfoBoard
            leftAthlete={leftAthlete ? leftAthlete : null}
            rightAthlete={rightAthlete ? rightAthlete : null}
          />
          <div className="shrink h-fit flex-col">
            {/* Div dos três elementos */}
            <div className={`${athleteWrapperStyle}`}>
              {/* Div do avatar e infos */}
              <AthleteComparisonCard
                athlete={rightAthlete ? rightAthlete : null}
                onClick={() => handleClick(false)}
                avatarAtletaStyle={avatarAtletaStyle}
                isLeft={false}
              />
            </div>
            <div className={medalWrapper}>
              {rightAthlete && (
                <div className={medalSectionStyle}>
                  {getMedals(rightAthlete?.medalhaDTO).map(
                    (medal: MedalProps, index) => (
                      <MedalSection
                        key={index}
                        imgSrc={
                          `/formAtleta/medals/medalhasCinza${index + 1}.png`
                        }
                        altText={`Ícone Medalha ${medal.tipo}`}
                        ringColor={medal.ringColor}
                        medalCount={medal.medalCount}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {showModal && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-md xl:p-10 lg:p-8 md:p-5 w-svw h-svh p-5 z-10"
            onClick={() => handleClick()}
          >
            <div
              className="fixed mt-48 z-99"
              onClick={(event) => handleInternClick(event)}
            >
              <AtletaSelecionar />
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <div className="lg:max-w-md -mt-40 animate-fade-down animate-duration-1000">
            <ReviewsChart
              className={showModal ? "hidden" : "block"}
              height={600}
              width={600}
              firstValencia={leftAthlete?.valencia}
              secondValencia={rightAthlete?.valencia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
