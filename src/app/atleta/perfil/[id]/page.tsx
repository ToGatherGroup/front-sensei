// import AvatarAtleta from "@/components/avatarAtleta/page";
// import { Atletas } from "@/mock/atletas";
// import { TAtleta } from "@/types/TAtleta";
// import Image from "next/image";

// import styles from "./page.module.css";

// type Params = {
//   id: string;
// };

// type Props = {
//   params: Params;
// };
// const page = ({ params }: Props) => {
//   const atleta: TAtleta = Atletas[parseInt(params.id)];

//   return (
//     <div className="flex justify-center items-center mt-50 p-50 h-screen">
//       <div className="flex flex-col items-center mt-20">
//         <AvatarAtleta
//           id={atleta.id}
//           name={atleta.name}
//           belt={atleta.belt}
//           photo={atleta.photo}
//           size="big"
//         />

//         <section>
//           <div className="mt-4 flex flex-col items-center space-y-2">
//             <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
//               <h4 className="text-lg font-semibold">{atleta.name}</h4>
//             </div>
//             <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
//               <h4 className="text-lg font-semibold">{atleta.belt}</h4>
//             </div>
//             <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
//               <h4 className="text-lg font-semibold">{atleta.email}</h4>
//             </div>
//             <Image
//               src="/formAtleta/medals/medalhasLight.png"
//               className="w-64"
//               alt="Imagem das Medalhas"
//               width={400}
//               height={300}
//             />
//             <div className="absolute bottom-0 left-0 w-full flex justify-betwenn">
//               <div className="w-1/3 text-center text-white font-semibold">
//                 1
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };
// export default page;

// ***********************************************************************************************************************************************************

// import AvatarAtleta from "@/components/avatarAtleta/page";
// import { Atletas } from "@/mock/atletas";
// import { TAtleta } from "@/types/TAtleta";
// import Image from "next/image";
// import { axios } from "@/api/api";

// import styles from "./page.module.css";
// import { useEffect, useState } from "react";

// type Params = {
//   id: string;
// };

// type Props = {
//   params: Params;
// };

// //nova adição
// interface DadosAtleta {
//   nome: string;
//   foto: string;
//   faixa: string;
//   categoria: string;
// }

// const initialDadosAtleta: DadosAtleta[] = []; //add

// const Page = ({ params }: Props) => {
//   const atleta: TAtleta = Atletas[parseInt(params.id)];
//   const [dadosAtleta, setDadosAtleta] =
//     useState<DadosAtleta[]>(initialDadosAtleta); //add

//   async function getDadosAtleta() {
//     const response = await axios.get(`/atleta/ficha/${id}`);
//     console.log(response);

//     const showDadosAtleta: DadosAtleta[] = response.data.dadosAtleta;
//     setDadosAtleta(showDadosAtleta);
//   }

//   useEffect(() => {
//     getDadosAtleta();
//     console.log("Os dados dos atletas foram carregados");
//   }, []);

//   return (
//     <div className="flex justify-center items-center mt-50 p-50 h-screen">
//       <div className="flex flex-col items-center mt-20">
//         <div className="flex space-x-16 mb-6">
//           <Image
//             src="/icons/avaliacao_fisica.png"
//             alt="Ícone Avaliação Física"
//             width={70}
//             height={65}
//             className="bg-white rounded-lg p-1"
//           />
//           <Image
//             src="/icons/campeonato.png"
//             alt="Ícone Campeonato"
//             width={70}
//             height={65}
//             className="bg-white rounded-lg p-1"
//           />
//           <Image
//             src="/icons/postura.png"
//             alt="Ícone Campeonato"
//             width={70}
//             height={65}
//             className="bg-white rounded-lg p-1"
//           />
//         </div>
//         <AvatarAtleta
//           id={atleta.id}
//           name={atleta.name}
//           belt={atleta.belt}
//           photo={atleta.photo}
//           size="big"
//         />

//         <section>
//           <div className="mt-4 flex flex-col items-center space-y-2">
//             <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
//               <h4 className="text-lg font-semibold">{atleta.name}</h4>
//             </div>
//             <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
//               <h4 className="text-lg font-semibold">{atleta.belt}</h4>
//             </div>
//             <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
//               <h4 className="text-lg font-semibold">{atleta.email}</h4>
//             </div>
//             <div>
//               <Image
//                 src="/formAtleta/medals/medalhasLight.png"
//                 className="rounded w-64"
//                 alt="Imagem das Medalhas"
//                 width={400}
//                 height={300}
//               />
//               <div className="bottom-0 left-0 w-full flex justify-between">
//                 <div className="w-1/3 text-center text-white font-semibold">
//                   1
//                 </div>
//                 <div className="w-1/3 text-center text-white font-semibold">
//                   2
//                 </div>
//                 <div className="w-1/3 text-center text-white font-semibold">
//                   3
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="flex flex-wrap justify-end mt-8 space-x-4">
//           <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
//             Lesões
//           </button>
//           <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
//             Frequência
//           </button>
//           <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
//             Qualitativos
//           </button>
//           <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
//             Gráfico
//           </button>
//         </section>
//       </div>
//     </div>
//   );
// };
// export default Page;

//************************************************************************************************************************************************************

"use client";

import AvatarAtleta from "@/components/avatarAtleta/page";
import { Atletas } from "@/mock/atletas";
import { TAtleta } from "@/types/TAtleta";
import Image from "next/image";
import { axios } from "@/api/api"; // Importe o tipo AtletaData aqui

import styles from "./page.module.css";
import { useEffect, useState, useCallback } from "react";
import Injuries from "@/components/injuries";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const Page = ({ params }: Props) => {
  const atleta: TAtleta = Atletas[parseInt(params.id)];
  const [dadosAtleta, setDadosAtleta] = useState<any | null>(null);

  // async function getDadosAtleta() {
  //   try {
  //     const response = await api.get<AtletaData>(`/atleta/ficha/${params.id}`);
  //     console.log(response.data);
  //     setDadosAtleta(response.data);
  //   } catch (error) {
  //     console.error("Erro ao obter dados do atleta", error);
  //   }
  // }

  const getDadosAtleta = useCallback(async () => {
    try {
      const response = await axios.get(`/atleta/ficha/${params.id}`);
      console.log(response.data);
      setDadosAtleta(response.data);
    } catch (error) {
      console.error("Erro ao obter dados do atleta", error);
    }
  }, [params.id, setDadosAtleta]);

  useEffect(() => {
    getDadosAtleta();
  }, [getDadosAtleta]);

  return (
    <div className="flex justify-center items-center mt-50 p-50 h-screen">

      <div className="flex items-center mt-20">
        <section className="flex lg:flex-row sm:flex-col ">
          <div> {/* Seção lateral esquerda Inicio */}
            <div className="flex space-x-16 mb-6">
              <Image
                src="/icons/avaliacao_fisica.png"
                alt="Ícone Avaliação Física"
                width={70}
                height={65}
                className="bg-white rounded-lg p-1"
              />
              <Image
                src="/icons/campeonato.png"
                alt="Ícone Campeonato"
                width={70}
                height={65}
                className="bg-white rounded-lg p-1"
              />
              <Image
                src="/icons/postura.png"
                alt="Ícone Campeonato"
                width={70}
                height={65}
                className="bg-white rounded-lg p-1"
              />
            </div>
              Foto
              <AvatarAtleta
                id={atleta.id}
                name={atleta.name}
                belt={atleta.belt}
                photo={atleta.photo}
                size="big"
              />

              <section> infos
                <div className="mt-4 flex flex-col items-center space-y-2">
                  <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
                    <h4 className="text-lg font-semibold">{dadosAtleta?.nome}</h4>
                  </div>
                  <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
                    <h4 className="text-lg font-semibold">{dadosAtleta?.faixa}</h4>
                  </div>
                  <div className="bg-blue-500 p-4 rounded-lg text-center text-white flex justify-center items-center w-64 h-14">
                    <h4 className="text-lg font-semibold">
                      {dadosAtleta?.categoria}
                    </h4>
                  </div>
                  <div>
                    <Image
                      src="/formAtleta/medals/medalhasLight.png"
                      className="rounded w-64"
                      alt="Imagem das Medalhas"
                      width={400}
                      height={300}
                    />
                    <div className="bottom-0 left-0 w-full flex justify-between">
                      <div className="w-1/3 text-center text-white font-semibold">
                        1
                      </div>
                      <div className="w-1/3 text-center text-white font-semibold">
                        2
                      </div>
                      <div className="w-1/3 text-center text-white font-semibold">
                        3
                      </div>
                    </div>
                  </div>
                </div>
              </section>
          </div> {/*  Seção lateral Fim  */}
          <section className="justify-end mt-8 space-x-4"> Botões
            <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
              Lesões
            </button>
            <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
              Frequência
            </button>
            <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
              Qualitativos
            </button>
            <button className="bg-gray-300 hover:bg-blue-500 text-black font-semibold py-2 px-4 rounded-lg">
              Gráfico
            </button>
          </section>
    {/* <Injuries/> */}
        </section>
      </div>
      <Frequency id={params.id} />
    </div>
  );
};

export default Page;