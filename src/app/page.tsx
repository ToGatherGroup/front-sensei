import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen flex flex-col gap-20 items-center justify-center">
      <Image
        src="/logo_sensei_white.png"
        width={500}
        height={500}
        alt="Logotipo do Instituto Sensei Divino"
        className="mx-6"
      />
      {/* <h1 className="text-white text-[50px] font-bold">Sensei Divino</h1> */}
    </main>
  );
}
