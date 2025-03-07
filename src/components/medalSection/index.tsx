import React, { useState, useEffect } from "react";
import Modal from "../modal";
import { getCampeonatosByAtleta } from "@/api/endpoints";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

const positionMapping: Record<string, string> = {
  PRIMEIRO: "1º Lugar",
  SEGUNDO: "2º Lugar",
  TERCEIRO: "3º Lugar",
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
}

const MedalSection = ({ imgSrc, altText, ringColor, medalCount, athleteId }: MedalSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [championships, setChampionships] = useState<Campeonato[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [currentMedalCount, setCurrentMedalCount] = useState(medalCount); 

  useEffect(() => {
    setCurrentMedalCount(medalCount); 
  }, [medalCount, athleteId]);

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
        })
        .catch((error: unknown) => {
          console.error("Erro ao buscar campeonatos:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, athleteId]);

  return (
    currentMedalCount > 0 && (
      <>
        <section 
          className="cursor-pointer"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={imgSrc}
            alt={altText}
            className={`transition hover:ring-2 hover:invert rounded-lg p-1 object-contain w-14 h-14 lg:w-20 lg:h-20`}
          />
          <div className="lg:text-xl text-white font-semibold text-center">{medalCount}</div>
        </section>

        {isOpen && (
          <Modal title="Campeonatos" closeModalFunction={() => setIsOpen(false)} showCloseIcon={true} imageSrc="/icons/campeonato.png">
            {isLoading ? (
              <p>Carregando...</p>
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
                <div key={position} className="mt-4">
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
    )
  );
};

export default MedalSection;
