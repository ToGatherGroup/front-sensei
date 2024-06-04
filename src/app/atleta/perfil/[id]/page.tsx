"use client";

import AvatarAtleta from "@/components/avatarAtleta/page";
import { Atletas } from "@/mock/atletas";
import { TAtleta } from "@/types/TAtleta";
import { axios } from "@/api/api";
import { useEffect, useState, useCallback } from "react";
import useScreenSize from "@/hooks/useScreenSize";
import Injuries from "@/components/injuries";
// import getInjuries from 
import { ReviewsChart } from "@/components/reviewsChart";
import Frequency from "@/components/frequency";
import Link from "next/link";
import { useAthleteProvider } from "@/contexts";


useAthleteProvider

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const Page = ({ params }: Props) => {
  //const atleta: TAtleta = Atletas[parseInt(params.id)];
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
   // console.log(listAthletes)
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
    { label: dadosAtleta?.faixa },
    { label: dadosAtleta?.idade + " anos"},
    { label: dadosAtleta?.categoria ? dadosAtleta?.categoria : "Sem categoria" },
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

  const screenSize = useScreenSize();

  useEffect(() => {
    getDadosAtleta();
  }, [getDadosAtleta]);

  const renderButtons = () => (
    <section className="flex mt-6 space-x-2 lg:space-x-6 justify-center">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.onClick}
          className="lg:mt-2 lg:px-4 lg:py-2 lg:text-lg text-xs bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-2 rounded-md transition delay-100 duration-300 ease-in-out"
        >
          {button.label}
        </button>
      ))}
    </section>
  );

  const renderAthleteInfo = () => (
    <div className="flex flex-col items-center space-y-2 lg:space-y-6">
      {athleteInfo.map((info, index) => (
        <div key={index} className="bg-gray-300 p-2 lg:p-5 rounded-md text-center text-black flex justify-center items-center w-40 lg:w-60 h-7">
          <h4 className="text-lg font-semibold">{info.label}</h4>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center h-screen m-auto max-w-screen-xl">
      <section className="flex flex-col lg:flex-row lg:justify-around lg:w-full">
        <div> {/* Seção lateral esquerda Inicio */}
          <div className="flex justify-center space-x-6 mb-4 mt-6 lg:space-x-10 lg:mt-8 lg:mb-8">
            <Link href="/aDecidir">
              <img src="/icons/avaliacao_fisica.png" alt="Ícone Postura" className="bg-white rounded-lg p-1 object-contain w-12 h-12 lg:w-16 lg:h-16" />
            </Link>
            <Link href="/aDecidir">
              <img src="/icons/campeonato.png" alt="Ícone Postura" className="bg-white rounded-lg p-1 object-contain w-12 h-12 lg:w-16 lg:h-16" />
            </Link>
            <Link href="/aDecidir">
              <img src="/icons/posture_icon.png" alt="Ícone Postura" className="bg-white rounded-lg p-1 object-contain w-12 h-12 lg:w-16 lg:h-16" />
            </Link>
          </div>
          <AvatarAtleta
            id={params.id}
            name={dadosAtleta?.nome}
            belt={dadosAtleta?.faixa}
            photo={dadosAtleta?.foto}
            size={screenSize.width > 1024 ? "big" : "small"}
          />
          <section>
            <div className="flex flex-col items-center space-y-2 lg:space-y-6">
              
            <div className="flex flex-row">
                  <section className="hover:ring-2 hover:ring-amber-500 rounded-lg">
                    <img
                      src="/formAtleta/medals/medalhasCinza1.png"
                      alt="Ícone Medalha Ouro"
                      className=" transition delay-100 duration-300 ease-in-out hover:skew-y-6 hover:invert rounded-lg p-1 object-contain w-14 h-14 lg:w-20 lg:h-20" />
                    <div className="lg:text-xl text-white font-semibold text-center">
                      {medalhaOuro}
                    </div>
                  </section>
                  <section className="hover:ring-2 hover:ring-zinc-500 rounded-lg">
                    <img
                      src="/formAtleta/medals/medalhasCinza2.png"
                      alt="Ícone Medalha Prata"
                      className="transition delay-100 duration-300 ease-in-out hover:skew-y-6  hover:invert rounded-lg p-1 object-contain w-14 h-14 lg:w-20 lg:h-20" />
                    <div className="lg:text-xl text-white font-semibold text-center">
                      {medalhaPrata}
                    </div>
                  </section>
                  <section className="hover:ring-2 hover:ring-copperMedal rounded-lg ">
                    <img
                      src="/formAtleta/medals/medalhasCinza3.png"
                      alt="Ícone Medalha Bronze"
                      className=" transition delay-100 duration-300 ease-in-out hover:skew-y-6 hover:invert rounded-lg p-1 object-contain w-14 h-14 lg:w-20 lg:h-20" />
                    <div className="lg:text-xl text-white font-semibold text-center">
                      {medalhaBronze}
                    </div>
                  </section>
                </div>
              {renderAthleteInfo()}
              <div>

                <div className="bottom-0 left-0 w-full flex justify-between">
                </div>
              </div>
            </div>
          </section>
        </div> {/* Seção lateral Fim */}
        <div> {/* Seção Botões Começo */}
          {renderButtons()}
          <div className="max-w-full mt-2">
            {qualitativos && <div></div>}
            {frequencia && <div className="lg:mt-36"><Frequency id={params.id} /></div>}
            {grafico && <div className="lg:mt-24"><ReviewsChart id={params.id} /></div>}

            {/* lesões está setada com valores difíceis de manipular, postergarei a implementação */}
            {lesoes && <div className="w-12 h-12 flex flex-row" >
              <Injuries injuries={[]} type="front" />
              <Injuries injuries={[]} type="back" />
              {/* <Back injuries={[]}></Back> */}
              {/* <Front injuries={[]}></Front> */}
            </div>}

          </div>
        </div> {/* Seção Botões Fim */}
      </section>
    </div>
  );
};

export default Page;
