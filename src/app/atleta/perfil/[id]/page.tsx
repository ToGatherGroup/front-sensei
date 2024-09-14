"use client";

import AvatarAtleta from "@/components/avatarAtleta/avatarAtleta";

import { useEffect, useState, useCallback } from "react";
import useScreenSize from "@/hooks/useScreenSize";
import Injuries from "@/components/injuries";
import { ReviewsChart } from "@/components/reviewsChart";
import Frequency from "@/components/frequency";
import { useAthleteProvider } from "@/contexts";
import IconButton from "@/components/iconButton";
import MedalSection from "@/components/medalSection";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Qualitativos from "@/components/qualitativos/index";
import PosturaPage from "./postura/page";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const Page = ({ params }: Props) => {
  const {
    getInjuries,
    injuries,
    injuriesInfo,
    medals,
    athleteProfile,
    getProfile,
    isLoading,
  } = useAthleteProvider();
  const router = useRouter();
  const [lesoes, setLesoes] = useState<string[] | null>(null);
  const [grafico, setGrafico] = useState<any | null>(true);
  const [qualitativos, setQualitativos] = useState<any | null>(null);
  const [frequencia, setFrequencia] = useState<any | null>(null);
  const [postura, setPostura] = useState<any | null>(null);
  const [medalhaOuro, setMedalhaOuro] = useState<number>(0);
  const [medalhaPrata, setMedalhaPrata] = useState<number>(0);
  const [medalhaBronze, setMedalhaBronze] = useState<number>(0);
  const [activeButton, setActiveButton] = useState("Gráfico");
  const [id, setId] = useState<number | null>(null);

  const handleButtonClick = (buttonLabel: string, onClick: () => void) => {
    untoggleAll();
    setActiveButton(buttonLabel);
    onClick();
  };

  const untoggleAll = () => {
    setLesoes(null);
    setGrafico(null);
    setFrequencia(null);
    setQualitativos(null);
    setPostura(null);
  };

  const handleLesoesClick = useCallback(async () => {
    if (!lesoes) {
      getInjuries(parseInt(params.id));
      setLesoes(injuries);
    }
  }, [getInjuries, injuries, lesoes, params.id]);

  const handleGraficoClick = () => {
    setGrafico(true);
  };

  const handleFrequenciaClick = () => {
    setFrequencia(true);
  };

  const handleQualitativoClick = () => {
    setQualitativos(true);
  };

  const handlePosturaClick = () => {
    setPostura(true);
  };

  useEffect(() => {
    if (params.id && id == null) {
      setId(parseInt(params.id));
      getProfile(params.id);
    }
  }, [params.id]);

  const athleteInfo = [
    { label: athleteProfile?.faixa },
    { label: `${athleteProfile?.idade} anos` },
    {
      label: athleteProfile?.categoria
        ? athleteProfile?.categoria
        : "Sem categoria",
    },
  ];

  const buttons = [
    { label: "Gráfico", onClick: handleGraficoClick },
    { label: "Lesões", onClick: handleLesoesClick },
    { label: "Frequência", onClick: handleFrequenciaClick },
    { label: "Qualitativos", onClick: handleQualitativoClick },
    { label: "Postura", onClick: handlePosturaClick },
  ];

  const screenSize = useScreenSize();

  useEffect(() => {
    medals?.forEach((medalha: { posicao: string; quantidade: number }) => {
      switch (medalha.posicao) {
        case "Medalha de ouro":
          setMedalhaOuro(medalha.quantidade);
          break;
        case "Medalha de prata":
          setMedalhaPrata(medalha.quantidade);
          break;
        case "Medalha de bronze":
          setMedalhaBronze(medalha.quantidade);
          break;
        default:
          break;
      }
    });
  }, [medals]);

  const renderButtons = () => (
    <section className="flex m-auto mt-6 space-x-2 lg:space-x-6 box-border w-fit">
      {buttons.map((button, index) => (
        <Button
          key={index}
          text={button.label}
          type="button"
          onClick={() => handleButtonClick(button.label, button.onClick)}
          active={activeButton === button.label}
          className={`lg:mt-2 lg:px-4 lg:py-2 lg:text-lg text-xs py-2 px-[12px] rounded-md transition delay-100 duration-300 ease-in-out ${
            activeButton === button.label
              ? "bg-white text-winePattern font-semibold"
              : ""
          }`}
        />
      ))}
    </section>
  );

  const renderAthleteInfo = () => (
    <div className="flex flex-col items-center space-y-2 lg:space-y-6">
      {athleteInfo.map((info, index) => (
        <div
          key={index}
          className="bg-gray-300 p-2 lg:p-5 rounded-md text-center text-black flex justify-center items-center w-40 lg:w-60 h-7"
        >
          <h4 className="text-lg font-semibold">{info.label}</h4>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center mx-auto min-h-dvh max-h-max max-w-screen-xl">
      <section className="flex flex-col lg:flex-row lg:justify-around lg:w-full">
        <div>
          <div className="flex justify-center space-x-6 mb-4 mt-6 lg:space-x-10 lg:mt-8 lg:mb-8">
            {/* <IconButton href="/comparison" src="/icons/avaliacao_fisica.png" alt="Avaliação Física Individual" /> */}
            <IconButton
              href={`${params.id}/cadastrar/avaliacaoFisica`}
              src="/icons/avaliacao_fisica.png"
              alt="Edição"
            />
            <IconButton
              href={`${params.id}/cadastrar/campeonato`}
              src="/icons/campeonato.png"
              alt="Campeonato"
            />
            <IconButton
              href={`${params.id}/postura`}
              src="/icons/posture_icon.png"
              alt="Postura"
            />
            <IconButton
              href={`/atleta/editar/${params.id}`}
              src="/icons/ferramenta-lapis.png"
              alt="Edição"
            />
            {/* <IconButton href={`/atleta/perfil/${params.id}/cadastrar/campeonato`} src="/icons/campeonato.png" alt="Campeonato" /> */}
            {/* <IconButton href={`/postura/${params.id}`} src="/icons/posture_icon.png" alt="Postura" /> */}
          </div>
          <AvatarAtleta
            name={athleteProfile?.nome ?? "Carregando .."}
            photoUrl={athleteProfile?.foto}
            losangoClassName={"p-0"}
            className="mb-2"
          />
          <section>
            <div className="flex flex-col items-center space-y-2 lg:space-y-6">
              <div className="flex flex-row">
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza1.png"
                  altText="Ícone Medalha Ouro"
                  ringColor="amber-500"
                  medalCount={medalhaOuro}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza2.png"
                  altText="Ícone Medalha Prata"
                  ringColor="zinc-500"
                  medalCount={medalhaPrata}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza3.png"
                  altText="Ícone Medalha Bronze"
                  ringColor="copperMedal"
                  medalCount={medalhaBronze}
                />
              </div>
              {renderAthleteInfo()}
              <div>
                <div className="bottom-0 left-0 w-full flex justify-between"></div>
              </div>
            </div>
          </section>
        </div>{" "}
        {/* Seção lateral Fim */}
        <div>
          {" "}
          {/* Seção Botões Começo */}
          {renderButtons()}
          <div className="max-w-full">
            {qualitativos && (
              <div>
                <Qualitativos id={params.id} />
              </div>
            )}
            {frequencia && (
              <div className="mt-4 lg:mt-32 animate-fade-down animate-duration-1000">
                <Frequency
                  height={screenSize.width > 1024 ? 200 : 100}
                  width={screenSize.width > 1024 ? 200 : 100}
                  id={params.id}
                />
              </div>
            )}
            {postura && (
              <div className="mt-4 lg:mt-32 animate-fade-down animate-duration-1000">
                <PosturaPage />
              </div>
            )}
            {grafico && (
              <div className="lg:mt-24 animate-fade-down animate-duration-1000">
                <ReviewsChart
                  height={screenSize.width > 1024 ? 524 : 200}
                  width={screenSize.width > 1024 ? 524 : 200}
                  id={params.id}
                />
              </div>
            )}
            {lesoes && (
              <div>
                <div className="flex flex-row items-stretch justify-center mt-4 lg:mt-12 lg:gap-6 -z-50 animate-fade-down animate-duration-1000">
                  <Injuries
                    injuries={injuries}
                    type="front"
                    width={screenSize.width > 1024 ? "248px" : "150px"}
                    height={screenSize.width > 1024 ? "400px" : "200px"}
                    viewBoxValue={
                      screenSize.width > 1024
                        ? "1000 15400 19000 5000"
                        : "1000 12000 19000 5000"
                    }
                  />
                  <Injuries
                    injuries={injuries}
                    type="back"
                    width={screenSize.width > 1024 ? "232px" : "134px"}
                    height={screenSize.width > 1024 ? "400px" : "200px"}
                    viewBoxValue={
                      screenSize.width > 1024
                        ? "1000 4000 20000 27000"
                        : "1000 0 20000 27000"
                    }
                  />
                </div>
                <div className="flex mb-2 animate-fade-down animate-duration-1000">
                  <Button
                    text={"Adicionar lesão"}
                    type={"button"}
                    onClick={() =>
                      router.push(`/atleta/perfil/${params.id}/cadastrar/lesao`)
                    }
                    className="mx-auto mt-8 mb-2 lg:mt-2 lg:mb-6"
                  ></Button>
                </div>
                <div className="flex flex-col-reverse custom-scrollbar mx-auto max-h-26 lg:max-h-40 scroll-auto overflow-y-auto justify-center bg-white rounded-lg p-4 pt-2 lg:-mt-4 max-w-xs lg:min-w-fit lg:max-w-sm ">
                  {!isLoading && injuriesInfo.length <= 0 && (
                    <h3 className="text-sm lg:text-lg font-semibold">
                      O atleta não possui lesão registrada
                    </h3>
                  )}
                  {injuriesInfo.map((injuryInfo, index) => (
                    <p
                      key={index}
                      className="leading-7 justify-between inline-block align-text-bottom text-xs lg:text-sm text-wrap text-transform: capitalize"
                    >
                      <span className="font-bold">
                        {dayjs(injuryInfo.date).format("DD/MM/YYYY")}
                      </span>
                      <span className="italic "> {injuryInfo.regiaoLesao}</span>
                      <Tippy
                        hideOnClick={true}
                        content={injuryInfo.description}
                      >
                        <span className="cursor-pointer lg:text-base text-lg">
                          {" "}
                          ℹ️
                        </span>
                      </Tippy>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* Seção Botões Fim */}
      </section>
    </div>
  );
};

export default Page;
