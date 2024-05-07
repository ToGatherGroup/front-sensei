"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PosturasType } from "@/types/Posturas"; // Import the missing type
import { getAvaliacaoPostural } from "@/api/endpoints";

interface PosturaCardProps {
    atletaId: string;
    datasAvaliacaoArray: Array<string>;
    viewSide: number;
    }

const PosturaCard = ({atletaId, datasAvaliacaoArray, viewSide}: PosturaCardProps) => {

  const defaultImage = "/postura/placeholderpostura.png"
    const [selectedOption, setSelectedOption] = useState(datasAvaliacaoArray[0]);// useState<string | null>(null);
    const [posturasAtleta, setPosturasAtleta] = useState<Array<PosturasType>>([]); // Fix the syntax error and provide an initial value

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
  }, [selectedOption, atletaId]); // Dependency array ensures fetch is called on change

    const handleOptionSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.currentTarget.value;
        setSelectedOption(selectedOption);
        // let posturasAtleta = await getAvaliacaoPostural(Number(atletaId), selectedOption != null  ? selectedOption : datasAvaliacaoArray[0]);
        // console.log("posturasAtleta:");
        // console.log(posturasAtleta);
        // setPosturasAtleta(posturasAtleta.data);
      }
    
      const RenderDatasAvaliacaoOptions = ({ datasAvaliacaoArray }: { datasAvaliacaoArray: string[] }) => (
        <>
          { (datasAvaliacaoArray.length > 0) && <select onChange={handleOptionSelect} value={selectedOption}>
            {datasAvaliacaoArray.map((data) => (
              <option key={data} value={data}>{data}</option>
            ))}
          </select>}
        </>
      );

    return (
        <div className="flex flex-col">
        <div className="shadow rounded grid-overlay">
        <Image
          src={posturasAtleta[viewSide]?.foto ? posturasAtleta[viewSide].foto : defaultImage} //src={posturasAtleta[viewSide].foto}
          alt="Lateral View"
          object-fit="contain"
          className="object-cover shadow w-full rounded aspect-[4/12] max-h-[750px]"
          width='750'
          height='750'
        />
      </div>
      {datasAvaliacaoArray && <RenderDatasAvaliacaoOptions datasAvaliacaoArray={datasAvaliacaoArray} />}
      </div>
    )};

    export default PosturaCard;