import React from "react";

type MedalSectionProps = {
  imgSrc: string;
  altText: string;
  ringColor?: string;
  medalCount?: number;
};

const MedalSection = ({ imgSrc, altText, ringColor, medalCount }: MedalSectionProps) => {
  const ringClass = `hover:ring-2 hover:ring-${ringColor}`;
  
  return (
    <section className={`${ringClass} rounded-lg`}>
      <img
        src={imgSrc}
        alt={altText}
        className="transition delay-100 duration-300 ease-in-out hover:skew-y-6 hover:invert rounded-lg p-1 object-contain w-14 h-14 lg:w-20 lg:h-20"
      />
      <div className="lg:text-xl text-white font-semibold text-center">
        {medalCount ?? "0"}
      </div>
    </section>
  );
};

export default MedalSection;
