import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="w-screen box-border h-20">
        <nav className="">
          <Link href="/menu" className="h-fit w-fit inline-block">
            <Image
              width={100}
              height={80}
              alt="Logotipo Sensei"
              src="/logo-sensei.jpeg"
              className="h-20 block"
            />
          </Link>
          <div className="size-4 bg-gray-400 inline-block float-right"></div>
        </nav>
      </header>
    </>
  );
}
