"use client";

import {
  FormEvent,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { getAtletas, getAtletasByName } from "@/api/endpoints";

import FormTitle from "@/components/Title/formTitle";
import AvatarAtleta from "@/components/avatarAtleta/page";
import { apiToAtletas } from "@/api/middleware/atletas";

import { TAtletas } from "@/types/TAtletas";

import styles from "./selecionar.module.css";

//How many elements per request (paginable)?
const elementsPerPage = null; // 'null' to let back server decide

const AtletaSelecionar = () => {
  const [listAtleta, setListAtleta] = useState<TAtletas[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [requestName, setRequestName] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const inputNameRef = useRef<HTMLInputElement>(null);

  let allowRequest = false;

  useEffect(() => {
    if (requestName) {
      getAtletasByName(requestName, currentPage, elementsPerPage)
        .then((response: any) => {
          const atletas = apiToAtletas(response.data.content);
          setLastPage(response.data.last);
          setListAtleta((currentAtletas) => [...currentAtletas, ...atletas]);
          allowRequest = true;
        })
        .catch((err: any) => {
          setRequestError(true);
        });
    } else {
      getAtletas(currentPage, elementsPerPage)
        .then((response: any) => {
          const atletas = apiToAtletas(response.data.content);
          setLastPage(response.data.last);
          setListAtleta((currentAtletas) => [...currentAtletas, ...atletas]);
          allowRequest = true;
        })
        .catch((err: any) => {
          setRequestError(true);
        });
    }
  }, [currentPage, requestName]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      console.log(entries);
      if (entries.some((entry) => entry.isIntersecting)) {
        if (allowRequest) setCurrentPage((current) => current + 1);
      }
    });
    intersectionObserver.observe(loaderRef.current!);
    return () => intersectionObserver.disconnect();
  }, []);

  const searchByName = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputNameRef.current) {
      const inputNameEl = inputNameRef.current;

      if (inputNameEl.value == "") {
        if (requestName) {
          //Reset variables
          setLastPage(false);
          setRequestError(false);
          setListAtleta([]);
          setCurrentPage(0);
          setRequestName(null);
          allowRequest = false;
        } else {
          inputNameEl.focus();
        }
        return;
      } else {
        //Reset variables
        setLastPage(false);
        setRequestError(false);
        setListAtleta([]);
        setCurrentPage(0);
        setRequestName(inputNameEl.value);
        allowRequest = false;
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={`form-container ${styles.content}`}>
        <FormTitle
          title="Buscar atleta"
          iconSrc="/icons/person_24x24.png"
          className={styles.title}
        />

        <form className={styles.form} onSubmit={(e) => searchByName(e)}>
          <input
            ref={inputNameRef}
            className={styles.inputName}
            type="text"
            placeholder="Insira o nome do atleta"
            autoComplete="off"
          />

          <input className={styles.submit} type="submit" value="Buscar" />
        </form>

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
        </ul>


        <div
          className={styles.loader}
          ref={loaderRef}
          style={{
            //Make sure to display loading before first request (on page load)
            //Hide the loading if an error occurs
            display: lastPage === false && !requestError ? "block" : "none",
          }}
        ></div>

        {listAtleta.length <= 0 && lastPage && (
          <p className={styles.notFound}>Nenhum atleta encontrado.</p>
        )}

        {requestError && (
          <p className={styles.requestError}>
            Houve um erro ao tentar carregar os atletas. Tente atualizar a
            página.
          </p>
        )}
      </div>
    </div>
  );
};
export default AtletaSelecionar;
