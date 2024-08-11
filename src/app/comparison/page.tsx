"use client";
import { ReviewsChart } from "@/components/reviewsChart";
import { AthleteProfileProps, Valencia } from "@/contexts/athlete/athlete.type";
import MedalSection from "@/components/medalSection";
import InfoBoard from "@/components/infoBoard";
import { useContext, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ComparisonState,
  useComparisonProvider,
} from "@/contexts/comparison/comparison";
import AtletaSelecionar from "@/app/atleta/buscar/page";

const rightAthlete: AthleteProfileProps = {
  nome: "Fulano de tal",
  idade: 32,
  categoria: "Porradeiro",
  faixa: "Ouro",
  foto: "strrring",
  altura: 1.8,
  medalhaDTO: [],
  valencia: {
    labels: ["string[]", "asd"],
    values: [12, 31],
  }
};
let leftAthlete: AthleteProfileProps = {
  nome: "Fulano de tal",
  idade: 32,
  categoria: "Porradeiro",
  faixa: "Ouro",
  foto: "strrring",
  altura: 1.8,
  medalhaDTO: [],
  valencia: {
    labels: ["string[]", "asd"],
    values: [12, 31],
  }
};

const medalSectionStyle = "flex flex-row h-26 w-32";
const medalWrapper = "flex flex-col items-center space-y-2 lg:space-y-6";
const avatarAtletaStyle = "w-32 h-32";
const athleteWrapperStyle = "shrink max-h-fit flex max-w-fit";

export default function Comparison() {
  const { leftAthlete, rightAthlete, setIsLeft, showModal, toggleComparisonModalVisibility } = useComparisonProvider();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [pageShowModal, setPageShowModal] = useState(false);

  // const updateParentState = (newState: SetStateAction<string>) => {
  //   setParentState(newState);
  // };

  const handleClick = (isLeft?: boolean) => {
    console.log("handleClick acionado:")
    
    console.log(isLeft)
    console.log(rightAthlete)
    console.log(leftAthlete)
    console.log("---------------------")
    if (isLeft) {
      setIsLeft(isLeft);
    }

    toggleComparisonModalVisibility(!showModal);
    setPageShowModal(!pageShowModal);
    setTimeout(() => {
      console.log("showModal ->");
      console.log(showModal);
      console.log("pageShowModal");
      console.log(pageShowModal);
    })
  };

  
  const handleInternClick = ( event: { stopPropagation: () => void },) => {
    event.stopPropagation();
    //setar modal falso com uso de useeffect em caso de mudança de objeto atleta um ou dois? Isso fecharia o modal após a seleção do usuario
    //setPageShowModal(false);
    //toggleComparisonModalVisibility(pageShowModal);
  };

  useEffect(() => {
    //toggleComparisonModalVisibility(pageShowModal);
    //setPageShowModal(showModal)
    const url = `${pathname}?${searchParams}`;
    console.log("showModal");
    console.log(showModal);
  }, [showModal]);

  // useEffect(() => {
  //   console.log("Athlete atualizado:", leftAthlete, rightAthlete);
  //   //setPageShowModal(false);
  // }, [leftAthlete, rightAthlete]);

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
              <div
                className={avatarAtletaStyle}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClick(true);
                }}
              >
                <img
                  className=""
                  src={leftAthlete?.foto}
                  alt={`Foto de ${leftAthlete?.nome}`}
                />
                <div className="">
                  <p>{leftAthlete?.nome}</p>
                </div>
              </div>
            </div>
            <div className={medalWrapper}>
              <div className={medalSectionStyle}>
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza1.png"
                  altText="Ícone Medalha Ouro"
                  ringColor="amber-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza2.png"
                  altText="Ícone Medalha Prata"
                  ringColor="zinc-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza3.png"
                  altText="Ícone Medalha Bronze"
                  ringColor="copperMedal"
                  medalCount={2}
                />
              </div>
            </div>
          </div>
          <InfoBoard leftAthlete={leftAthlete? leftAthlete : null} rightAthlete={rightAthlete ? rightAthlete : null} />
          <div className="shrink h-fit flex-col z-10">
            {/* Div dos três elementos */}
            <div className={`${athleteWrapperStyle}`}>
              {/* Div do avatar e infos */}

              <div
                className={avatarAtletaStyle}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClick(false);
                }}
              >
                <img
                  className=""
                  src={rightAthlete?.foto}
                  alt={`Foto de ${rightAthlete?.nome}`}
                />
                <div className="">
                  <p>{rightAthlete?.nome}</p>
                </div>
              </div>
            </div>
            <div className={medalWrapper}>
              <div className={medalSectionStyle}>
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza1.png"
                  altText="Ícone Medalha Ouro"
                  ringColor="amber-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza2.png"
                  altText="Ícone Medalha Prata"
                  ringColor="zinc-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza3.png"
                  altText="Ícone Medalha Bronze"
                  ringColor="copperMedal"
                  medalCount={2}
                />
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-md xl:p-10 lg:p-8 md:p-5 w-svw h-svh p-5 z-10"
            onClick={() => handleClick()}
          >
            <div className="fixed mt-48 z-99" onClick={(event) => handleInternClick(event)}>
              <AtletaSelecionar />
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <div className="lg:max-w-md lg:mt-10 animate-fade-down animate-duration-1000">
              <ReviewsChart
                className={showModal ? "hidden" : "block"}
                height={600}
                width={600}
                firstValencia={leftAthlete?.valencia} // Não vai ser parâmetro de tela, no caso será devolvido o id do busca atleta
                secondValencia={rightAthlete?.valencia}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
