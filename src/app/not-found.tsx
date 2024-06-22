"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="*:text-white rounded p-6">
        <h1 className="my-6 text-6xl">Oops...</h1>
        <h2 className="ml-6 text-2xl">404 not found</h2>
        <p className="ml-6 text-xl">
          Não encontramos a página que você procura...
        </p>
        <p className="mt-6 ml-6 text-xl underline">
          <Link href="/menu">Clique aqui para voltar a página inicial</Link>
        </p>
      </div>
    </div>
  );
};
export default NotFound;
