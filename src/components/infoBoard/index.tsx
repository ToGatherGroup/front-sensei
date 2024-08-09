import InfoArrow from "../infoArrow";

export default function InfoBoard() {
  return (
    <div className="flex max-h-64">
      <div className="z-10 flex flex-col max-h-fit">
        <InfoArrow side={"left"} info={"110"} />
        <InfoArrow side={"left"} info={"1.91"} />
        <InfoArrow side={"left"} info={"34"} />
        <InfoArrow side={"left"} info={"Preta"} />
      </div>
      <section className="flex max-h-64 gap-8 flex-col bg-winePatternDark z-0 min-w-64 w-64 mx-[-20px] p-4">
        <span className="italic font-bold text-xl text-center text-white">
          PESO
        </span>
        <span className="italic font-bold text-xl text-center text-white">
          ALTURA
        </span>
        <span className="italic font-extrabold text-xl text-center text-white">
          IDADE
        </span>
        <span className="italic font-bold text-xl text-center text-white">
          FAIXA
        </span>
      </section>
      <div className="flex flex-col">
        <InfoArrow side={"right"} info={"110"} />
        <InfoArrow side={"right"} info={"1.91"} />
        <InfoArrow side={"right"} info={"34"} />
        <InfoArrow side={"right"} info={"Preta"} />
      </div>
    </div>
  );
}
