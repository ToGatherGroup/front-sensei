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
  }

  const handleLesoesClick = () => {
    console.log("Lesões");
    untoggleAll();
    setLesoes(true);
  };

  const handleGraficoClick = () => {
    console.log("Gráfico");
    untoggleAll();
    setGrafico(true);
    console.log(dadosAtleta?.medalhaDTO.posicao == "Medalha de ouro" ? dadosAtleta?.medalhaDTO.quantidade : 0)
  }

  const handleFrequenciaClick = () => {
    console.log("Frequência");
    untoggleAll();
    setFrequencia(true);
    console.log() 
  }

  const handleQualitativoClick = () => {
    console.log("Qualitativos");
    untoggleAll();
    setQualitativos(true);
  }

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
    }  catch (error) {
      console.error("Erro ao obter dados do atleta", error);
    }
  }, [params.id, setDadosAtleta]);

  useEffect(() => {
    getDadosAtleta();
  }, [getDadosAtleta]);

  return (
    <div className="flex justify-center  h-screen">
      <div className="flex mt-8">
        <section className="flex flex-col lg:flex-row ">
          <div> {/* Seção lateral esquerda Inicio */}
            <div className="flex justify-center space-x-6 mb-4">
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
                alt="Ícone Campeonato"
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
                <div className="flex flex-col items-center space-y-2">
                  <div className="outline outline-offset-2 outline-winePattern bg-gray-300 p-2 rounded-md text-center text-black flex justify-center items-center w-60 h-7">
                    <h4 className="text-lg font-semibold">{dadosAtleta?.nome}</h4>
                  </div>
                  <div className="outline outline-offset-2 outline-winePattern bg-gray-300 p-2 rounded-md text-center text-black flex justify-center items-center w-60 h-7">
                    <h4 className="text-lg font-semibold">{dadosAtleta?.faixa}</h4>
                  </div>
                  <div className="outline outline-offset-2 outline-winePattern bg-gray-300 p-2 rounded-md text-center text-black flex justify-center items-center w-60 h-7">
                    <h4 className="text-lg font-semibold">
                      {dadosAtleta?.categoria}
                    </h4>
                  </div>
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
          </div> {/*  Seção lateral Fim  */}
          <div> {/*  Seção Botões Começo  */}
          <section className="flex mt-6 space-x-1">
            <button onClick={handleLesoesClick} className="text-xs bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-2 rounded-md">
              Lesões
            </button>
            <button onClick={handleFrequenciaClick} className="text-xs bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-2 rounded-md">
              Frequência
            </button>
            <button onClick={handleQualitativoClick} className="text-xs bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-2 rounded-md">
              Qualitativos
            </button>
            <button onClick={handleGraficoClick}  className="text-xs bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-2 rounded-md">
              Gráfico
            </button>
          </section>
          <div className="max-w-full mt-2">
            {qualitativos && <div >
              </div>}
            {frequencia && <div>
              <Frequency id={params.id}/>
            </div>}
            {grafico && <div>
              <ReviewsChart id={params.id}/>
            </div>}
          {/*
          lesões está setada com valores dificeis de manipular, postergarei a implementação
          {lesoes &&
          <div className="max-w-full"> 
          <Injuries injuries={[]} type={"back"}/>
          </div>} 
          */}
          </div>
          </div> {/*  Seção Botões Fim  */}
    {/* <Injuries/> */}
        </section>
      </div>
      <Frequency id={params.id} />
    </div>
  );
};
export default Page;
