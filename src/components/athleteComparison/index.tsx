import React from 'react';

type AthleteComparisonCardProps = {
  athlete?: {
    id?: number;
    nome?: string;
    foto?: string;
  } | null;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  avatarAtletaStyle?: string;
  isLeft: boolean;
};

const AthleteComparisonCard: React.FC<AthleteComparisonCardProps> = ({
  athlete,
  onClick,
  avatarAtletaStyle = "relative", // TODO: Aplicar espaçamento absoluto no botão
  isLeft,
}) => {
  const defaultNome = "Selecionar atleta";
  const defaultFoto = isLeft
    ? "/comparison/perfil-foto-reversed.png"
    : "/comparison/perfil-foto.png";

  return (
    <div
      className={avatarAtletaStyle}
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div className={`w-48 p-auto ${athlete?.foto ? 'mt-14 h-fit' : 'h-60 w-full h-full'}`}>
      <img
        // style={{
        //   ...(athlete?.foto ? {} : { width: "100%", height: "100%" }),
        // }}
        className={athlete?.foto ? '' : 'w-full h-full'}
        src={athlete?.foto || defaultFoto}
        alt={`Foto de ${athlete?.nome || "Atleta"}`}
      />
      </div>
      <button 
        className="absolute z-10 bg-winePattern w-48 min-w-fit h-fit"
        style={{
          transform: `skewX(${isLeft ? '-30deg' : '30deg'})`,
          marginLeft: isLeft ? '-6px' : '6px',
        }}
      >
        <p 
          className=" w-full h-full z-80 shadow-xl text-white text-center py-4  leading-6"
          style={{transform: `skewX(${isLeft ? '30deg' : '-30deg'})` }}
        >
          {athlete?.nome || defaultNome}
        </p>
        
      </button>
      <div 
      className='z-0 absolute w-48 h-12 bg-white mt-4'
      style={{transform: `skewX(${isLeft ? '-30deg' : '30deg'})` }}
      ></div>
    </div>
  );
};

export default AthleteComparisonCard;
