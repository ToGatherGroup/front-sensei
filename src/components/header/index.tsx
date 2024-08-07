"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MENU_ITEMS = [
  {
    title: "Cadastro",
    linkSrc: "/atleta/cadastrar",
    imgSrc: "/header_icons/add_atletas.png",
    imgW: 25,
    imgH: 20,
  },
  {
    title: "Chamada",
    linkSrc: "/chamada",
    imgSrc: "/header_icons/chamada.png",
    imgW: 20,
    imgH: 20,
  },
  {
    title: "Avaliação",
    linkSrc: "/valencia/menu",
    imgSrc: "/header_icons/avaliacao.png",
    imgW: 30,
    imgH: 30,
  },
  {
    title: "Relatórios",
    linkSrc: "/relatorioAvaliacao",
    imgSrc: "/header_icons/relatorio.png",
    imgW: 20,
    imgH: 20,
  },
  {
    title: "Atletas",
    linkSrc: "/atleta/buscar",
    imgSrc: "/header_icons/atletas.png",
    imgW: 30,
    imgH: 25,
  },
  {
    title: "Comparativo",
    linkSrc: "/comparison",
    imgSrc: "/header_icons/versus.png",
    imgW: 30,
    imgH: 25,
  },
];

const USERNAME = "Bruno Amado";

export default function Header() {
  //const screenSize = useScreenSize();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <>
      <header className="fixed w-screen h-20 block bg-winePattern font-sans text-lg z-[999999]">
        <nav className="flex items-center justify-start">
          <Link
            href="/"
            className="h-20 w-fit inline-block ml-2 mr-10 flex-shrink-0"
          >
            <Image
              width={90}
              height={50}
              alt="Logotipo Sensei"
              src="/logo_sensei_white.png"
              className="mt-[15px]"
            />
          </Link>
          {/* Background for mobile */}
          <div
            onClick={() => setShowMobileMenu(false)}
            className={`${
              showMobileMenu ? "block" : "hidden"
            } bg-black z-[99998] bg-opacity-40 w-screen h-screen top-0 left-0 fixed lg:hidden`}
          ></div>
          <div
            className={`${
              showMobileMenu
                ? "right-0 animate-fade-left"
                : "animate-fade-right left-full"
            } animate-duration-75 fixed z-[99999] flex flex-col top-0 lg:right-0 bg-winePatternDark min-h-screen rounded-bl-md px-5 py-10 lg:min-h-0 lg:h-fit lg:static lg:flex-row lg:bg-transparent lg:rounded-none lg:p-0`}
          >
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.linkSrc}
                className="flex justify-center items-center hover:bg-winePatternLight lg:hover:bg-winePatternDark hover:rounded hover:outline hover:outline-1 hover:outline-white py-3 px-5"
                onClick={() => setShowMobileMenu(false)}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-[30px] h-[30px] flex justify-center items-center">
                    <Image
                      src={item.imgSrc}
                      width={item.imgW}
                      height={item.imgH}
                      alt={item.title}
                      className="m-auto"
                    />
                  </div>
                  <span className="text-white h-fit w-28 text-center lg:w-fit lg:text-start">
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}

            {/* Mobile return menu */}
            <div
              onClick={() => setShowMobileMenu((oldValue) => !oldValue)}
              className={`lg:hidden h-14 w-20 bg-transparent absolute top-3.5 right-[248px] flex ${
                !showMobileMenu && "cursor-pointer"
              } rounded-tl-md rounded-bl-md`}
            >
              <Image
                src="/icons/sanduiche.png"
                width={40}
                height={40}
                alt="Abrir menu"
                className={`m-auto outline outline-2 outline-winePattern rounded-lg bg-winePattern ${
                  showMobileMenu && "hidden"
                }`}
              />
            </div>

            <div className="lg:hidden text-[#962e2e] text-base mr-4 flex flex-col gap-2 ml-auto p-2 whitespace-nowrap max-w-44 mt-6">
              <p className="truncate">Olá, {USERNAME}</p>
              <Link href="#" className="m-auto">
                Sair
              </Link>
            </div>
          </div>
          <div className="hidden text-[#962e2e] text-base mr-4 lg:flex flex-col gap-2 ml-auto p-2 whitespace-nowrap max-w-48 mt-6 lg:max-w-none lg:mt-0 lg:min-w-[120px]">
            <p className="truncate">Olá, {USERNAME}</p>
            <Link href="#" className="m-auto">
              Sair
            </Link>
          </div>
        </nav>
      </header>

      {/* Feito para simular que o Header ocupe espaço vertical em tela */}
      <div className="w-screen h-20"></div>
    </>
  );
}
