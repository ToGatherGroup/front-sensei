"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { getAtletas, getAtletasByName } from "@/api/endpoints";

import FormTitle from "@/components/Title/formTitle";
import AvatarAtleta from "@/components/avatarAtleta/page";
import { apiToAtletas } from "@/api/middleware/atletas";

import { TAtletas } from "@/types/TAtletas";

import styles from "./selecionar.module.css";

//How many elements per request (paginable)?
const elementsPerPage = 16;

const AtletaSelecionar = () => {
  const [listAtleta, setListAtleta] = useState<TAtletas[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [requestName, setRequestName] = useState<string | null>(null);
  const [requestError, setRequestError] = useState<boolean>(false);
  const loaderRef = useRef(null);
  const inputNameRef = useRef<HTMLInputElement>(null);

  let allowRequest = false;

  useEffect(() => {
    console.log(
      `Entrei no request\ncurrentPage: ${currentPage}\nrequestName: ${requestName}`
    );
    if (requestName) {
      getAtletasByName(requestName, currentPage, elementsPerPage)
        .then((response: any) => {
          const atletas = apiToAtletas(response.data.content);
          console.log("byName: ", atletas);
          setLastPage(response.data.last);
          setListAtleta((currentAtletas) => [...currentAtletas, ...atletas]);
          allowRequest = true;
        })
        .catch((err: any) => {
          console.log(err);
          setRequestError(true);
        });
    } else {
      getAtletas(currentPage, elementsPerPage)
        .then((response: any) => {
          const atletas = apiToAtletas(response.data.content);
          console.log("default: ", atletas);
          setLastPage(response.data.last);
          setListAtleta((currentAtletas) => [...currentAtletas, ...atletas]);
          allowRequest = true;
        })
        .catch((err: any) => {
          console.log(err);
          setRequestError(true);
        });
    }
  }, [currentPage, requestName]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (allowRequest) {
          setCurrentPage((current) => current + 1);
          console.log("Incrementei currentPage: ", currentPage);
        }
      }
    });
    intersectionObserver.observe(loaderRef.current!);
    return () => intersectionObserver.disconnect();
  }, []);

  const searchByName = (e: FormEvent<HTMLFormElement>) => {
    console.log("Cliquei no botão ----------------");
    e.preventDefault();
    if (inputNameRef.current) {
      const inputNameEl = inputNameRef.current;

      if (inputNameEl.value == "") {
        if (requestName) {
          //Reset variables
          //A
          console.log("A");
          setLastPage(false);
          setRequestError(false);
          setListAtleta([]);
          setCurrentPage(0);
          setRequestName(null);
          /*           flushSync(() => {
          }); */
          allowRequest = false;
        } else {
          inputNameEl.focus();
        }
        return;

        //The setCurrentPage will call the api request useEffect
      } else {
        //Reset variables
        //B
        console.log("Entrei no B");
        setLastPage(false);
        setRequestError(false);
        setListAtleta([]);
        setCurrentPage(0);
        setRequestName(inputNameEl.value);
        /*         flushSync(() => {
        }); */
        allowRequest = false;

        //The setCurrentPage will call the api request useEffect
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
          ref={loaderRef}
          className={styles.loader}
          style={{
            //Make sure to display loading before first request (on page load)
            //Hide the loading if an error occurs
            display: lastPage === false && !requestError ? "block" : "none",
          }}
        ></div>
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
