"use client";

import Image from 'next/image';
import leftImage from '/src/mock/images/posture_mock.png';
import rightImage from '/src/mock/images/posture_mock.png';

import React from 'react';
import { useRouter } from "next/navigation";

type EvaluationData = {
  date: string; // assumindo o formato "dd/mm/yyyy"
};

const Postura = () => {
  const router = useRouter();
  return (
    <div className="max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
      <style jsx>{cssGrid}</style>
      <h1 className="text-2xl font-bold text-center  rounded text-white mb-4">Avaliação</h1>
      <div className="flex justify-center items-center space-x-4 mb-4">
        <div className="w-1/3 shadow rounded grid-overlay">
          <Image
            src={leftImage}
            alt="Lateral View"
            className="shadow rounded w-full h-auto"
          />
        </div>
        <button
          className="mx-4  w-14 h-14 bg-stone-200 rounded flex justify-center items-center text-black font-bold"
          onClick={() => { /* Função de alternância ou navegação aqui */ }}
        >
          &#x21bb;
        </button>
        <div className="w-1/3 shadow rounded grid-overlay">
          <Image
            src={rightImage}
            alt="Front View"
	    className="shadow rounded w-full h-auto"	
            
          />
        </div>
      </div>
      <div className="flex justify-around text-white">
        <span className="text-sm">DATA</span>
        <span className="text-sm">DATA</span>
      </div>
    </div>
  );
};

export default Postura;

const cssGrid = `
.grid-overlay {
  position: relative;
}

.grid-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.5) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.5) 76%, transparent 77%, transparent),
                    linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.5) 25%, rgba(0, 0, 0, 0.5) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.5) 75%, rgba(0, 0, 0, 0.5) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
}
`