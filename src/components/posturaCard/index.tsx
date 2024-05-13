"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PosturasType } from "@/types/Posturas";
import { getAvaliacaoPostural } from "@/api/endpoints";
import { converterData } from '@/utils/utils';

interface PosturaCardProps {
    atletaId: string;
    datasAvaliacaoArray: Array<string>;
    viewSide: number;
    }

const PosturaCard = ({atletaId, datasAvaliacaoArray, viewSide}: PosturaCardProps) => {

  const defaultImage = "/postura/placeholderpostura.png"
    const [selectedOption, setSelectedOption] = useState(datasAvaliacaoArray[0]);
    const [posturasAtleta, setPosturasAtleta] = useState<Array<PosturasType>>([]);

    useEffect(() => {
      const fetchData = async () => {
          let hasDates = datasAvaliacaoArray.length > 0;
          if (!hasDates && selectedOption == null) {
              return;
          }
          const posturas = await getAvaliacaoPostural(Number(atletaId), selectedOption != null  ? selectedOption : datasAvaliacaoArray[0]);
          if (posturas && posturas.data) {
              setPosturasAtleta(posturas.data);
          }
      };
      fetchData();
  }, [selectedOption, atletaId]);

    const handleOptionSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.currentTarget.value;
        setSelectedOption(selectedOption);
      }
    
      const RenderDatasAvaliacaoOptions = ({ datasAvaliacaoArray }: { datasAvaliacaoArray: string[] }) => (
        <>
          { (datasAvaliacaoArray.length > 0) && <select id='possibleDates' className='p-2 mt-4 shadow mx-auto w-fit rounded' onChange={handleOptionSelect} value={selectedOption}>
            {datasAvaliacaoArray.map((data) => (
              <option key={data} value={data}>{converterData(data)}</option>
            ))}
          </select>}
        </>
      );

    return (
        <div className="flex flex-col">
        <div className="shadow rounded grid-overlay">
        <Image
          src={posturasAtleta[viewSide]?.foto ? posturasAtleta[viewSide].foto : defaultImage} //src={posturasAtleta[viewSide].foto}
          alt="Athlete Posture View"
          object-fit="contain"
          className="object-cover shadow w-full rounded aspect-[4/12] max-h-[600px]"
          width='750'
          height='750'
        />
      </div>
      {datasAvaliacaoArray && <RenderDatasAvaliacaoOptions datasAvaliacaoArray={datasAvaliacaoArray} />}
      </div>
    )};

    export default PosturaCard;