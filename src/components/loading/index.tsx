import Image from "next/image";

type Props = {
  type?: "full-screen" | "local"; // Default: local
  msg?: string;
  className?: string;
};

const Loader = ({ msg, type = "local", className }: Props) => {
  if (type === "full-screen") {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-10 bg-[#00000045] backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center">
          <div className={`bg-black rounded-2xl h-fit w-fit m-4 ${className}`}>
            <Image
              src="/loader/sensei_loader.gif"
              width={128}
              height={128}
              alt={"Carregando ..."}
              className="rounded-xl"
            />
          </div>
          {msg && (
            <p className="text-lg inline-block max-w-72 p-4 text-white bg-winePattern text-center rounded-lg">
              {msg}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="my-5 mx-auto border-solid border-[10px] border-white border-t-[10px] border-t-winePattern rounded-full size-32 animate-spin animate-duration-2000" />
        <Image
          src="/loader/logo_sensei.png"
          width={80}
          height={80}
          alt="Carregando ..."
          className="absolute top-[calc(50%-25px)] left-[calc(50%-40px)]"
        />
      </div>
      {msg && (
        <p className="relative text-base inline-block max-w-64 p-2 text-white top-1/2 left-1/2 -translate-x-1/2 text-center">
          {msg}
        </p>
      )}
    </>
  );

  // Local:
  /* return (
    <div className={`bg-black rounded-2xl h-fit w-fit m-4 ${className}`}>
      <Image
        src="/loader/sensei_loader_transp.gif"
        width={128}
        height={128}
        alt={"Carregando ..."}
        className="rounded-xl"
      />
      {msg && (
        <p className="relative text-lg inline-block max-w-64 p-4 text-white bg-[rgb(110,10,10)] top-1/2 left-1/2 -translate-x-1/2 text-center rounded-lg">
          {msg}
        </p>
      )}
    </div>
  ); */
};
export default Loader;
