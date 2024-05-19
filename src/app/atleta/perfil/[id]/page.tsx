"use client";

import AvatarAtleta from "@/components/avatarAtleta/page";
import { Atletas } from "@/mock/atletas";
import { TAtleta } from "@/types/TAtleta";
import Image from "next/image";
import { axios } from "@/api/api"; // Importe o tipo AtletaData aqui
import { useEffect, useState, useCallback } from "react";
import Injuries from "@/components/injuries";
import { ReviewsChart } from "@/components/reviewsChart";
import Frequency from "@/components/frequency";
import Back from "../../../../../public/svg/injuries/Back";
import Front from "../../../../../public/svg/injuries/Front";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const Page = ({ params }: Props) => {
  const atleta: TAtleta = Atletas[parseInt(params.id)];
  const [dadosAtleta, setDadosAtleta] = useState<any | null>(null);
  const [lesoes, setLesoes] = useState<any | null>(null);
  const [grafico, setGrafico] = useState<any | null>(null);
  const [qualitativos, setQualitativos] = useState<any | null>(null);
  const [frequencia, setFrequencia] = useState<any | null>(null);
  const [medalhaOuro, setMedalhaOuro] = useState<number>(0);
  const [medalhaPrata, setMedalhaPrata] = useState<number>(0);
  const [medalhaBronze, setMedalhaBronze] = useState<number>(0);

  const untoggleAll = () => {
    setLesoes(null);
    setGrafico(null);
    setFrequencia(null);
    setQualitativos(null);
  };

  const handleLesoesClick = () => {
    console.log("Lesões");
    untoggleAll();
    setLesoes(true);
  };

  const handleGraficoClick = () => {
    console.log("Gráfico");
    untoggleAll();
    setGrafico(true);
  };

  const handleFrequenciaClick = () => {
    console.log("Frequência");
    untoggleAll();
    setFrequencia(true);
  };

  const handleQualitativoClick = () => {
    console.log("Qualitativos");
    untoggleAll();
    setQualitativos(true);
  };

  const athleteInfo = [
    { label: dadosAtleta?.nome },
    { label: dadosAtleta?.faixa },
    { label: dadosAtleta?.categoria }
  ];

  const buttons = [
    { label: 'Lesões', onClick: handleLesoesClick },
    { label: 'Frequência', onClick: handleFrequenciaClick },
    { label: 'Qualitativos', onClick: handleQualitativoClick },
    { label: 'Gráfico', onClick: handleGraficoClick }
  ];

  const getDadosAtleta = useCallback(async () => {
    try {
      const response = await axios.get(`/atleta/ficha/${params.id}`);
      console.log("response.data:");
      console.log(response.data);
      setDadosAtleta(response.data);
      const medalhaDTO = response.data.medalhaDTO;

      medalhaDTO.forEach((medalha: { posicao: string; quantidade: number }) => {
        switch (medalha.posicao) {
          case 'Medalha de ouro':
            setMedalhaOuro(medalha.quantidade);
            break;
          case 'Medalha de prata':
            setMedalhaPrata(medalha.quantidade);
            break;
          case 'Medalha de bronze':
            setMedalhaBronze(medalha.quantidade);
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.error("Erro ao obter dados do atleta", error);
    }
  }, [params.id, setDadosAtleta]);

  useEffect(() => {
    getDadosAtleta();
  }, [getDadosAtleta]);

  const renderButtons = () => (
    <section className="flex mt-6 space-x-1 lg:">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className=" lg:px-7 lg:py-3 lg:text-lg text-xs bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-2 rounded-md"
        >
          {button.label}
        </button>
      ))}
    </section>
  );

  const renderAthleteInfo = () => (
    <div className="flex flex-col items-center space-y-2 lg:space-y-6">
      {athleteInfo.map((info, index) => (
        <div key={index} className="outline outline-offset-2 outline-winePattern bg-gray-300 p-2 rounded-md text-center text-black flex justify-center items-center w-60 h-7">
          <h4 className="text-lg font-semibold">{info.label}</h4>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center h-screen">
        <section className="flex flex-col lg:flex-row lg:justify-around lg:w-full">
          <div> {/* Seção lateral esquerda Inicio */}
            <div className="flex justify-center space-x-6 mb-4 mt-6">
              <Image
                src="/icons/avaliacao_fisica.png"
                alt="Ícone Avaliação Física"
                width={50}
                height={50}
                className="bg-white rounded-lg p-1 object-contain"
              />
              <Image
                src="/icons/campeonato.png"
                alt="Ícone Campeonato"
                width={50}
                height={50}
                className="bg-white rounded-lg p-1 object-contain"
              />
              <Image
                src="/icons/postura.png"
                alt="Ícone Postura"
                width={60}
                height={60}
                className="bg-white rounded-lg p-1 object-contain w-12 h-12"
              />
            </div>
            <AvatarAtleta
              id={atleta.id}
              name={atleta.name}
              belt={atleta.belt}
              photo={atleta.photo}
              size="big"
            />
            <section>
              <div className="flex flex-col items-center space-y-2 lg:space-y-6">
                {renderAthleteInfo()}
                <div>
                  <Image
                    src="/formAtleta/medals/medalhasLight.png"
                    className="rounded w-40"
                    alt="Imagem das Medalhas"
                    width={100}
                    height={50}
                  />
                  <div className="bottom-0 left-0 w-full flex justify-between">
                    <div className="w-1/3 text-center text-white font-semibold">
                      {medalhaOuro}
                    </div>
                    <div className="w-1/3 text-center text-white font-semibold">
                      {medalhaPrata}
                    </div>
                    <div className="w-1/3 text-center text-white font-semibold">
                      {medalhaBronze}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div> {/* Seção lateral Fim */}
          <div> {/* Seção Botões Começo */}
            {renderButtons()}
            <div className="max-w-full mt-2">
              {qualitativos && <div></div>}
              {frequencia && <div><Frequency id={params.id} /></div>}
              {grafico && <div><ReviewsChart id={params.id} /></div>}
              
              {/* lesões está setada com valores difíceis de manipular, postergarei a implementação */}
              {lesoes && <div className="w-12 h-12" >
                {/* <Back injuries={[]}></Back> */}
                <Front injuries={[]}></Front>
                                </div>}
             
            </div>
          </div> {/* Seção Botões Fim */}
        </section>
      </div>
  );
};

export default Page;
