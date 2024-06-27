"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PosturasType } from "@/types/Posturas";
import { getAvaliacaoPostural } from "@/api/endpoints";
import { converterData } from "@/utils/utils";

interface PosturaCardProps {
  atletaId: string;
  datasAvaliacaoArray: Array<string>;
  viewSide: number;
}

const PosturaCard = ({
  atletaId,
  datasAvaliacaoArray,
  viewSide,
}: PosturaCardProps) => {
  const dropdownHeader = "Selecione uma data";
  const defaultImage = "/postura/place_holder_postura.png";
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    datasAvaliacaoArray[0]
  );
  const [posturasAtleta, setPosturasAtleta] = useState<Array<PosturasType>>([]);

  //TODO: Cachear imagens para evitar requisições repetidas
  useEffect(() => {
    if (selectedOption != null) {
      const fetchData = async () => {
        let hasDates = datasAvaliacaoArray.length > 0;
        if (!hasDates && selectedOption == null) {
          return;
        }
        const posturas = await getAvaliacaoPostural(
          Number(atletaId),
          selectedOption != null ? selectedOption : datasAvaliacaoArray[0]
        );
        if (posturas && posturas.data) {
          setPosturasAtleta(posturas.data);
        }
      };
      fetchData();
    }
  }, [selectedOption, atletaId]);

  const handleOptionSelect = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOption =
      event.currentTarget.value != "info" ? event.currentTarget.value : null;
    setIsDisabled(!!selectedOption);
    setSelectedOption(selectedOption);
  };

  const RenderDatasAvaliacaoOptions = ({
    datasAvaliacaoArray,
  }: {
    datasAvaliacaoArray: string[];
  }) => (
    <>
      {datasAvaliacaoArray.length > 0 && (
        <select
          id="possibleDates"
          className="p-2 mt-4 shadow mx-auto w-fit rounded"
          onChange={handleOptionSelect}
          value={selectedOption ? selectedOption : undefined}
        >
          <option key={"info"} disabled={isDisabled} value={"info"}>
            {dropdownHeader}
          </option>
          {datasAvaliacaoArray.map((data) => (
            <option key={data} value={data}>
              {converterData(data)}
            </option>
          ))}
        </select>
      )}
    </>
  );

  return (
    <div className="flex flex-col">
      <div className="shadow rounded grid-overlay">
        <Image
          src={
            posturasAtleta[viewSide]?.foto
              ? posturasAtleta[viewSide].foto
              : defaultImage
          } //src={posturasAtleta[viewSide].foto}
          alt="Athlete Posture View"
          object-fit="contain"
          className="object-cover shadow w-full rounded aspect-[4/12] max-h-[600px]"
          width="750"
          height="750"
        />
      </div>
      {datasAvaliacaoArray && (
        <RenderDatasAvaliacaoOptions
          datasAvaliacaoArray={datasAvaliacaoArray}
        />
      )}
    </div>
  );
};

export default PosturaCard;
