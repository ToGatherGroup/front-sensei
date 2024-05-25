"use client";

import { useEffect, useState } from "react";
import { getAtletas, getAtletasByName } from "@/api/endpoints";

import FormTitle from "@/components/title/formTitle/index";
import AvatarAtleta from "@/components/avatarAtleta/page";
import { apiToAtletas } from "@/api/middleware/atletas";

import { TAtletas } from "@/types/TAtletas";

import styles from "./selecionar.module.css";
import { useDebounce } from "@/hooks/useDebounce";

let height = 1500; // A secure large height definition, in case window is not defined

if (typeof window !== "undefined") {
  height = window.innerHeight;
}

const ELEMENTS_PER_PAGE = Math.ceil(((height - 250) * 4) / 130);

function Observer({ selector, callback }: any) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => callback(entries), {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    });

    const element = document.querySelector(selector);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

const AtletaSelecionar = () => {
  const [listAtleta, setListAtleta] = useState<TAtletas[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestError, setRequestError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scrollListener, setScrollListener] = useState(false);
  const [blockListener, setBlockListener] = useState(false);

  const debouncedValue = useDebounce(requestName, 500);

  async function fetchData(restartSearch: boolean, isLastPage: boolean) {
    try {
      if (isLastPage) return;

      const page = restartSearch ? 0 : currentPage;

      setLoading(true);
      const response = requestName
        ? await getAtletasByName(requestName, page, ELEMENTS_PER_PAGE)
        : await getAtletas(page, ELEMENTS_PER_PAGE);
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
    <div className={styles.container}>
      <div className={`form-container ${styles.content}`}>
        <FormTitle
          title="Buscar atleta"
          iconSrc="/icons/person_24x24.png"
          className={styles.title}
        />

        <input
          onChange={(e) => setRequestName(e.target.value)}
          value={requestName}
          className={styles.inputName}
          type="text"
          placeholder="Insira o nome do atleta"
          autoComplete="off"
        />

        <ul className={styles.listAtletas}>
          {listAtleta.map((atleta, i) => (
            <li key={i}>
              <AvatarAtleta
                id={atleta.id}
                name={atleta.name}
                photo={atleta.photo}
                size="small"
              />
            </li>
          ))}
          <li className="lastElement" />
          {loading && <div className={styles.loader} />}
        </ul>

        {!loading && listAtleta.length <= 0 && lastPage && (
          <p className={styles.notFound}>Nenhum atleta encontrado.</p>
        )}

        {requestError && (
          <p className={styles.requestError}>
            Houve um erro ao tentar carregar os atletas. Tente atualizar a
            página.
          </p>
        )}
      </div>
      <Observer
        selector=".lastElement"
        callback={(e: any) => {
          setScrollListener(e[0].isIntersecting ? true : false);
        }}
      />
    </div>
  );
};
export default AtletaSelecionar;
