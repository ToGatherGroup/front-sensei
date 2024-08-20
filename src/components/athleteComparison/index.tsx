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
  avatarAtletaStyle = "",
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
      <img
        className="max-w-48"
        src={athlete?.foto || defaultFoto}
        alt={`Foto de ${athlete?.nome || "Atleta"}`}
      />
      <button className={`bg-yellow-500 w-48 min-w-fit h-24 skew-x-[${isLeft ? '-30deg' : '30deg'}]`}>
        <p className={`skew-x-[${isLeft ? '30deg' : '-30deg'}] w-full h-full z-80 shadow-xl text-white text-center pt-9 p-auto leading-6`}>
          {athlete?.nome || defaultNome}
        </p>
      </button>
    </div>
  );
};

export default AthleteComparisonCard;
