"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getAvaliacaoPosturalDatas } from "@/api/endpoints";
import { useEffect, useState } from "react";
import PosturaCard from "@/components/posturaCard";
import IconButton from "@/components/iconButton";
import Button from "@/components/ui/button";
import Link from "next/link";

const PosturaPage = () => {
  const [datasAvaliacaoArray, setDatasAvaliacaoArray] = useState<string[]>([]); //useState([])
  const [viewSide, setViewSide] = useState<number>(0);
  const parametros = useParams<{ id: string }>();
  const rotateIcon = "/icons/axis_z_rotate_counterclockwise_icon.png";

  useEffect(() => {
    const fetchData = async () => {
      const datasAvaliacao = await getAvaliacaoPosturalDatas(
        Number(parametros.id)
      );
      setDatasAvaliacaoArray(datasAvaliacao.data); // `data.data`, bom demais.
    };
    fetchData();
  }, [parametros.id]);

  const handleViewSide = () => {
    if (viewSide === 2) {
      setViewSide(0);
    } else {
      setViewSide(viewSide + 1);
    }
  };

  return (
    <div className="mx-auto">
      <div className="mx-auto lg:-mt-14">
        <style jsx>{cssGrid}</style>
        {datasAvaliacaoArray.length == 0 && (
          <p className="mx-auto my-2 italic text-white block w-fit border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-center">
            Nenhuma data de avaliação encontrada.
          </p>
        )}
        {datasAvaliacaoArray.length > 0 && (
          <button
            className=" mx-auto justify-center mb-6 w-14 h-14 bg-stone-200 rounded flex items-center text-black font-bold"
            onClick={handleViewSide}
          >
            <Image src={rotateIcon} alt="Rotate Icon" width="80" height="80" />
          </button>
        )}
        <div className="m-auto box-border flex justify-center w-[350px] lg:w-full space-x-2 mb-4 p-2">
          <PosturaCard
            atletaId={parametros.id}
            datasAvaliacaoArray={datasAvaliacaoArray}
            viewSide={viewSide}
          />
          <PosturaCard
            atletaId={parametros.id}
            datasAvaliacaoArray={datasAvaliacaoArray}
            viewSide={viewSide}
          />
        </div>

        <Link
          href={`/atleta/perfil/${parametros.id}/cadastrar/avaliacaoPostural`}
          className="block w-fit m-auto"
        >
          <Button text="Cadastrar avaliação postural" type="button" />
        </Link>
      </div>
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
  background-size: 80px 80px;
}
`;
