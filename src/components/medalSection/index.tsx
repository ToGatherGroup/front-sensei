import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Modal from "../modal";
import { getCampeonatosByAtleta } from "@/api/endpoints";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import Link from "next/link";

dayjs.locale("pt-br");

const positionMapping: Record<string, string> = {
  PRIMEIRO: "1º Lugar",
  SEGUNDO: "2º Lugar",
  TERCEIRO: "3º Lugar",
};

const highlightStyles: Record<string, string> = {
  PRIMEIRO: "border-4 border-yellow-500 bg-yellow-300 shadow-md",
  SEGUNDO: "border-4 border-gray-500 bg-gray-300 shadow-md",
  TERCEIRO: "border-4 border-amber-500 bg-amber-500 shadow-md",
};

interface Campeonato {
  name: string;
  date: string;
  posicaoPodium: string;
}

interface MedalSectionProps {
  imgSrc: string;
  altText: string;
  ringColor: string;
  medalCount: number;
  athleteId: number;
  podiumPosition: "PRIMEIRO" | "SEGUNDO" | "TERCEIRO";
}

const MedalSection = ({ imgSrc, altText, ringColor, medalCount, athleteId, podiumPosition }: MedalSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [championships, setChampionships] = useState<Campeonato[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<string>(podiumPosition);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      getCampeonatosByAtleta(athleteId)
        .then((response: { data: { nome: string; data: string; posicaoPodium: string }[] }) => {
          const data = response.data.map((champ) => ({
            name: champ.nome,
            date: dayjs(champ.data).format("DD/MM/YYYY"),
            posicaoPodium: champ.posicaoPodium,
          }));
          setChampionships(data);
          setSelectedPosition(podiumPosition);
        })
        .catch((error: unknown) => {
          console.error("Erro ao buscar campeonatos:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, athleteId, podiumPosition]);

  return (
    <>
      <section 
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={imgSrc}
          alt={altText}
          className={clsx(
            "object-contain rounded-lg transition hover:ring-2 p-1 w-14 h-14 lg:w-20 lg:h-20",
            {
              "hover:ring-yellow-400": ringColor === "gold",
              "hover:ring-gray-400": ringColor === "silver",
              "hover:ring-amber-600": ringColor === "bronze",
            }
          )}
        />
        <div className="lg:text-xl text-white font-semibold text-center">{medalCount}</div>
      </section>

      {isOpen && (
        <Modal 
          title="Campeonatos" 
          closeModalFunction={() => setIsOpen(false)} 
          showCloseIcon={true} 
          imageSrc="/icons/campeonato.png" 
          imageLink={`${athleteId}/cadastrar/campeonato`}
        >
          {isLoading ? (
            <p>Carregando...</p>
          ) : championships.length === 0 ? (
            <div className="text-center">
              <p className="text-lg text-gray-700 font-semibold">
                Este atleta ainda não possui medalhas.
              </p>
              <p className="text-gray-600 mt-2">
                Deseja adicionar um novo campeonato?
              </p>
              <Link 
                href={`${athleteId}/cadastrar/campeonato`}
                className="mt-4 inline-block bg-winePattern text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition"
              >
                Adicionar Campeonato
              </Link>
            </div>
          ) : (
            Object.entries(
              championships.reduce((acc: Record<string, Campeonato[]>, champ) => {
                if (!acc[champ.posicaoPodium]) {
                  acc[champ.posicaoPodium] = [];
                }
                acc[champ.posicaoPodium].push(champ);
                return acc;
              }, {})
            ).map(([position, champs]) => (
              <div 
                key={position} 
                className={clsx(
                  "mt-4 p-3 rounded-lg transition-all duration-300 ease-in-out",
                  selectedPosition === position ? highlightStyles[position] : "border border-gray-200"
                )}
                onClick={() => setSelectedPosition(position)}
              >
                <h3 className="text-lg font-bold text-center">{positionMapping[position] || position}</h3>
                <hr className="my-2 border-gray-300" />
                {champs.map((champ, index) => (
                  <p key={index} className="text-sm text-center">
                    <span className="font-semibold">{champ.name}</span> - {champ.date}
                  </p>
                ))}
              </div>
            ))
          )}
        </Modal>
      )}
    </>
  );
};

export default MedalSection;
