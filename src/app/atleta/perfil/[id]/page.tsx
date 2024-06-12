"use client";

import AvatarAtleta from "@/components/avatarAtleta/page";
import { axios } from "@/api/api";
import { useEffect, useState, useCallback } from "react";
import useScreenSize from "@/hooks/useScreenSize";
import Injuries from "@/components/injuries";
import { ReviewsChart } from "@/components/reviewsChart";
import Frequency from "@/components/frequency";
import { useAthleteProvider } from "@/contexts";
import IconButton from "@/components/iconButton";
import MedalSection from "@/components/medalSection";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const Page = ({ params }: Props) => {
  const { getInjuries, injuries, injuriesDescription } = useAthleteProvider();
  const [dadosAtleta, setDadosAtleta] = useState<any | null>(null);
  const [lesoes, setLesoes] = useState<string[] | null>(null);
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

  const handleLesoesClick = useCallback(async () => {
    untoggleAll();
    if (!lesoes) {
      await getInjuries(parseInt(params.id));
      setLesoes(injuries);
    }
  }, [getInjuries, injuries, lesoes, params.id]);

  const handleGraficoClick = () => {
    untoggleAll();
    setGrafico(true);
  };

  const handleFrequenciaClick = () => {
    untoggleAll();
    setFrequencia(true);
  };

  const handleQualitativoClick = () => {
    untoggleAll();
    setQualitativos(true);
  };

  const athleteInfo = [
    { label: dadosAtleta?.faixa },
    { label: `${dadosAtleta?.idade} anos` },
    { label: dadosAtleta?.categoria ? dadosAtleta?.categoria : "Sem categoria" },
  ];

  const buttons = [
    { label: 'Gráfico', onClick: handleGraficoClick },
    { label: 'Lesões', onClick: handleLesoesClick },
    { label: 'Frequência', onClick: handleFrequenciaClick },
    { label: 'Qualitativos', onClick: handleQualitativoClick },
  ];

  const getDadosAtleta = useCallback(async () => {
    try {
      const response = await axios.get(`/atleta/ficha/${params.id}`);
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
  }, [params.id]);

  const screenSize = useScreenSize();

  useEffect(() => {
    getDadosAtleta();
    setGrafico(true);
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
    <div className="flex justify-center mx-auto min-h-dvh max-h-max max-w-screen-xl">
      <section className="flex flex-col lg:flex-row lg:justify-around lg:w-full">
        <div>
          <div className="flex justify-center space-x-6 mb-4 mt-6 lg:space-x-10 lg:mt-8 lg:mb-8">
            <IconButton href="/comparison" src="/icons/avaliacao_fisica.png" alt="Avaliação Física Individual" />
            <IconButton href={`/atleta/perfil/${params.id}/cadastrar/campeonato`} src="/icons/campeonato.png" alt="Campeonato" />
            <IconButton href={`/postura/${params.id}`} src="/icons/posture_icon.png" alt="Postura" />
            <IconButton href="/comparison" src="/icons/ferramenta-lapis.png" alt="Edição" />
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
        </div> {/* Seção lateral Fim */}
        <div> {/* Seção Botões Começo */}
          {renderButtons()}
          <div className="max-w-full">
            {qualitativos && <div></div>}
            {frequencia && <div className="mt-4 lg:mt-32"><Frequency height={screenSize.width > 1024 ? 200 : 100} width={screenSize.width > 1024 ? 200 : 100} id={params.id} /></div>}
            {grafico && <div className="lg:mt-24"><ReviewsChart height={screenSize.width > 1024 ? 524 : 256} width={screenSize.width > 1024 ? 524 : 256} id={params.id} /></div>}
            {lesoes && (
              <div>
                <div className="flex flex-row items-stretch justify-center lg:mt-12 lg:gap-6 -z-50">
                  <Injuries injuries={lesoes} type="front" width={screenSize.width > 1024 ? "248px" : "150px"} viewBoxSecondValue={screenSize.width > 1024 ? "3000" : "12000"} />
                  <Injuries injuries={lesoes} type="back" width={screenSize.width > 1024 ? "232px" : "134px"} viewBoxSecondValue={screenSize.width > 1024 ? "0" : "9000"} />
                </div>
                <div className="flex flex-col-reverse custom-scrollbar mx-auto max-h-24 lg:max-h-40 scroll-auto overflow-y-auto justify-center bg-white rounded-lg p-4 -mt-40 lg:-mt-4 max-w-xs lg:min-w-fit lg:max-w-md ">
                  {(injuriesDescription.length <= 0) && <h3 className="text-sm lg:text-lg font-semibold">Esse atleta não possui nenhuma lesão registrada</h3>}
                  {
                    injuriesDescription.map((injury, index) => (
                      <p key={index} className="leading-relaxed text-xs lg:text-sm text-wrap text-transform: capitalize">{`${injury} \n`}</p>
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        </div> {/* Seção Botões Fim */}
      </section>
    </div>
  );
};

export default Page;
