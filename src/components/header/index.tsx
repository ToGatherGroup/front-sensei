import useScreenSize from "@/hooks/useScreenSize";
import Image from "next/image";
import Link from "next/link";

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
    linkSrc: "/athletes",
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

const USERNAME = "Michel Espada Machado";

export default function Header() {
  //const screenSize = useScreenSize();
  return (
    <>
      <header className="min-w-screen box-border h-20 block bg-winePattern">
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
          {true ? (
            // Header menu icons (Desktop)
            <>
              <div className="flex absolute flex-col top-0 right-0 bg-winePatternDark rounded-tl-md rounded-bl-md px-5 py-10 lg:static lg:flex-row lg:bg-transparent lg:rounded-none lg:p-0">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.title}
                    href={item.linkSrc}
                    className="flex justify-center items-center hover:bg-winePatternLight lg:hover:bg-winePatternDark hover:rounded hover:outline hover:outline-1 hover:outline-white py-3 px-5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="min-w-fit">
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
                <div className="lg:hidden text-[#962e2e] text-base mr-4 flex flex-col gap-2 ml-auto p-2 whitespace-nowrap max-w-48 mt-6">
                  <p className="truncate">Olá, {USERNAME}</p>
                  <Link href="#" className="m-auto">
                    Sair
                  </Link>
                </div>
              </div>
              <div className="text-[#962e2e] text-base mr-4 flex flex-col gap-2 ml-auto p-2 whitespace-nowrap max-w-48 mt-6 lg:max-w-none lg:mt-0 lg:min-w-[120px]">
                <p className="truncate">Olá, {USERNAME}</p>
                <Link href="#" className="ml-auto">
                  Sair
                </Link>
              </div>
            </>
          ) : (
            // sanduiche
            <>
              <div className="absolute flex-col top-0 right-0 bg-winePatternDark rounded-tl-md rounded-bl-md px-5 py-10">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.title}
                    href={item.linkSrc}
                    className="flex justify-center items-center hover:bg-winePatternLight hover:rounded hover:outline hover:outline-1 hover:outline-white py-3 px-5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-[30px]">
                        <Image
                          src={item.imgSrc}
                          width={item.imgW}
                          height={item.imgH}
                          alt={item.title}
                          className="m-auto"
                        />
                      </div>
                      <span className="text-white h-fit w-28 text-center">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                ))}
                <div className="text-[#962e2e] text-base mr-4 flex flex-col gap-2 ml-auto p-2 whitespace-nowrap max-w-48 mt-6">
                  <p className="truncate">Olá, {USERNAME}</p>
                  <Link href="#" className="m-auto">
                    Logout
                  </Link>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
