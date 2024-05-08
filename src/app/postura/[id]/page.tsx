"use client";

import Image from 'next/image';

import rightImage from '/src/mock/images/posture_mock.png';
import { useParams } from 'next/navigation'
import { getAvaliacaoPostural, getAvaliacaoPosturalDatas } from "@/api/endpoints";
import { useEffect, useState } from 'react';
import { PosturasType } from "@/types/Posturas"; // Import the missing type

import React from 'react';
import { useRouter } from "next/navigation";
import { set } from 'react-hook-form';
import PosturaCard from '@/components/posturaCard';


const PosturaPage = () => {

  const [datasAvaliacaoArray, setDatasAvaliacaoArray] = useState<string[]>([]); //useState([])
  const [mockBase64, setMockBase64] = useState<string>(""); //useState([])
  

 // const [posturasAtleta, setPosturasAtleta] = useState<Array<PosturasType>>([]); // Fix the syntax error and provide an initial value
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [viewSide, setViewSide] = useState<number>(0);
  const parametros = useParams<{ id: string; }>()
  const rotateIcon = "/icons/axis_z_rotate_counterclockwise_icon.png"

  useEffect(() => {
    const fetchData = async () => {
      const datasAvaliacao = await getAvaliacaoPosturalDatas(Number(parametros.id));
      //  await getAvaliacaoPostural(Number(parametros.id), selectedOption ? selectedOption != null : datasAvaliacao.data[0]);
      // console.log("posturasAtleta:");
      // console.log(posturasAtleta);
      // console.log("-----------------");
      //console.log(posturasAtleta.data[0].foto);
      // o array que contem (foto e posicao) é posturasAtleta.data[0]
      //setMockBase64(posturasAtleta.data[0].foto);

      // console.log("datasAvaliacao:");
      // console.log(datasAvaliacao);
      setDatasAvaliacaoArray(datasAvaliacao.data); // `data.data`, bom demais.
      console.log("datasAvaliacaoArray");
      console.log(datasAvaliacaoArray);
      console.log(datasAvaliacaoArray.length == 0);
      
      //console.log(data.data);
    };
    fetchData();
  }, [parametros.id]);

  const handleViewSide = () => {
    if (viewSide === 2) {
      setViewSide(0);
    } else {
      setViewSide(viewSide + 1);
    }
  }

  // const handleOptionSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedOption = event.currentTarget.value;
  //   setSelectedOption(selectedOption);
  //   let posturasAtleta = await getAvaliacaoPostural(Number(parametros.id), selectedOption != null  ? selectedOption : datasAvaliacaoArray[0]);
  //   console.log("posturasAtleta:");
  //   console.log(posturasAtleta);
  //   setPosturasAtleta(posturasAtleta.data);
  // }

  // const RenderDatasAvaliacaoOptions = ({ datasAvaliacaoArray }: { datasAvaliacaoArray: string[] }) => (
  //   <>
  //     <select onChange={handleOptionSelect}>
  //       {datasAvaliacaoArray.map((data) => (
  //         <option key={data} value={data}>{data}</option>
  //       ))}
  //     </select>
  //   </>
  // );


return (
  <div className="mx-auto min-h-screen flex flex-col justify-center">
    <button
        className=" mx-auto justify-center mx-2 px-2 mb-4 w-fit h-8 bg-stone-200 rounded flex justify-center items-center text-black font-bold"

      > + Avaliação
      </button> 
    <style jsx>{cssGrid}</style>
    <div className="flex justify-center items-center space-x-2 mb-4 mx-4">
      {/* <div className="shadow rounded grid-overlay">
        <Image
          src={posturasAtleta[viewSide]?.foto ? posturasAtleta[viewSide].foto : leftImage} //src={posturasAtleta[viewSide].foto}
          alt="Lateral View"
          object-fit="contain"
          className="object-cover shadow w-full rounded aspect-[4/12] max-h-[750px]"
          width='750'
          height='750'
        />
      </div>
      <RenderDatasAvaliacaoOptions datasAvaliacaoArray={datasAvaliacaoArray} /> */}
      <PosturaCard atletaId={parametros.id} datasAvaliacaoArray={datasAvaliacaoArray} viewSide={viewSide}/>
      {/* <div className="shadow rounded grid-overlay">
        <Image
          src={leftImage}
          alt="Front View"
          object-fit="cover"
          className="object-cover shadow w-full rounded aspect-[4/12] max-h-[750px]"
          width='750'
          height='750'
        />
      </div>
      <RenderDatasAvaliacaoOptions datasAvaliacaoArray={datasAvaliacaoArray} /> */}
      <PosturaCard atletaId={parametros.id} datasAvaliacaoArray={datasAvaliacaoArray} viewSide={viewSide}/>
    </div>

    {(datasAvaliacaoArray.length == 0) && <p className='mx-auto my-2 italic text-white block w-fit border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-center'>Nenhuma data de avaliação encontrada.</p>}
    {(datasAvaliacaoArray.length > 0) && <button
        className=" mx-auto justify-center mx-2 w-14 h-14 bg-stone-200 rounded flex justify-center items-center text-black font-bold"
        onClick={handleViewSide}
      >
        <Image src={rotateIcon}           alt="Rotate Icon"
          width='80'
          height='80'/>
      </button> }

  </div>
);
};

export default PosturaPage;

const cssGrid = `
.grid-overlay {
  position: relative;
}

.grid-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.5) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.5) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.5) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.5) 76%, transparent 77%, transparent);
  background-size: 40px 40px;
}
`
