import React from "react";
type Props = {};

const textChamada = {
  H1Titulo: "Página em Construção",
};

const Comparison = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex items-center">
        <svg
          className="w-8 h-8 text-white mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <h1 className="text-white font-bold text-4xl transition-colors duration-300 hover:text-gray-400">
          {textChamada.H1Titulo}
        </h1>
      </div>
    </div>
  );
};

export default Comparison;
