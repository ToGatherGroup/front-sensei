"use client";

import { useEffect, useState } from "react";
import { getAtletas, getAtletasByName } from "@/api/endpoints";

//import AvatarAtleta from "@/components/avatarAtleta/page";
import { apiToAtletas } from "@/api/middleware/atletas";
import { TAtletas } from "@/types/TAtletas";
import { useDebounce } from "@/hooks/useDebounce";
import Title from "@/components/ui/title";
import Loader from "@/components/ui/loader";
import AvatarAtleta from "@/components/avatarAtleta/avatarAtleta";
import { useRouter } from "next/navigation";

function Observer({ selector, callback, isModal = false }: any) {
  useEffect(() => {
    if (isModal) return; // Se isModal for true, o Observer não será ativado

    const observer = new IntersectionObserver((entries) => callback(entries), {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });

    const element = document.querySelector(selector);

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [isModal]); // Reexecuta o efeito caso isModal mude

  return null;
}

export default function AtletaSelecionar({ isModal = false }: any) {
  const [listAtleta, setListAtleta] = useState<TAtletas[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestError, setRequestError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollListener, setScrollListener] = useState(false);
  const [blockListener, setBlockListener] = useState(false);
  const [height, setHeight] = useState(1500);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isModal) {
      setHeight(window.innerHeight);
    } else {
      setHeight(500);
    }
  }, [isModal]);

const MINIMUM_ELEMENTS_PER_PAGE = isModal ? 4 : 16;
const ELEMENTS_PER_PAGE = Math.ceil(((height - 250) * 4) / 130);

  const debouncedValue = useDebounce(requestName, 500);

  async function fetchData(restartSearch: boolean, isLastPage: boolean) {
    try {
      if (isLastPage) return;

      const page = restartSearch ? 0 : currentPage;

      setLoading(true);
      const response = requestName
        ? await getAtletasByName(
            requestName,
            page,
            ELEMENTS_PER_PAGE > MINIMUM_ELEMENTS_PER_PAGE
              ? ELEMENTS_PER_PAGE
              : MINIMUM_ELEMENTS_PER_PAGE
          )
        : await getAtletas(
            page,
            ELEMENTS_PER_PAGE > MINIMUM_ELEMENTS_PER_PAGE
              ? ELEMENTS_PER_PAGE
              : MINIMUM_ELEMENTS_PER_PAGE
          );
      const atletas = apiToAtletas(response.data.content);
      setLastPage(response.data.last);
      setListAtleta((currentAtletas) => [...currentAtletas, ...atletas]);

      setCurrentPage((current) => current + 1);
    } catch (error) {
      setRequestError(true);
    } finally {
      setLoading(false);
    }
  }

  const searchByName = async () => {
    setBlockListener(true);
    setListAtleta([]);
    setCurrentPage(0);
    await fetchData(true, false);
    setBlockListener(false);
  };

  useEffect(() => {
    if (scrollListener && !blockListener) fetchData(false, lastPage);
  }, [scrollListener, blockListener]);

  useEffect(() => {
    if (currentPage > 0) searchByName();
  }, [debouncedValue]);


  return (
    <div
      className={`flex min-w-52 ${
        isModal ? " max-h-[480px] overflow-hidden bg-white mx-auto rounded" : ""
      }`}
    >
      <div
        className={`form-container !px-1 mx-auto flex flex-col items-center !w-[600px] ${
          isModal ? " max-h-[420px]" : ""
        }`}
      >
        <Title title="Buscar atleta" iconSrc="/icons/person_24x24_wine.png" />

        <input
          onChange={(e) => setRequestName(e.target.value)}
          value={requestName}
          className={`text-center my-6 w-72 placeholder:text-center ${
            isModal ? "-mt-4 " : ""
          }`}
          type="text"
          placeholder="Insira o nome do atleta"
          autoComplete="off"
        />

        <ul
          className={
            "flex flex-wrap max-w-[600px] gap-[10px] my-0 mx-auto min-[600px]:gap-5 justify-center"
          }
        >
          {listAtleta.map((atleta, i) => (
            <li key={i} className="w-40 h-fit">
              <AvatarAtleta
                name={atleta.name}
                photoUrl={atleta.photo}
                onClick={() => router.push(`/atleta/perfil/${atleta.id}`)}
                nameClassName="max-h-[33px] leading-4 scale-125 mt-3"
                className="scale-[.6] md:scale-[.7] -mt-10 -mb-10"
              />
            </li>
          ))}
          <li className="lastElement" />
          {/* {loading && (
            <div className="my-5 mx-auto border-solid border-[10px] border-white border-t-[10px] border-t-winePattern rounded-full w-[60px] h-[60px] animate-spin animate-duration-2000" />
          )} */}
        </ul>

        {!loading && listAtleta.length <= 0 && lastPage && (
          <p className={"text-center text-winePatternLight text-xl"}>
            Nenhum atleta encontrado.
          </p>
        )}

        {requestError && (
          <p className={"max-w-[250px] p-[5px] rounded text-white bg-red-600"}>
            Houve um erro ao tentar carregar os atletas. Tente atualizar a
            página.
          </p>
        )}
        {loading && <Loader className="mt-36" />}
      </div>
      <Observer
        selector=".lastElement"
        callback={(e: any) => {
          setScrollListener(e[0].isIntersecting ? true : false);
        }}
      />
    </div>
  );
}
