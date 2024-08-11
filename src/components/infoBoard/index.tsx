import InfoArrow from "../infoArrow";
import { AthleteProfileProps } from "./../../contexts/athlete/athlete.type";

export default function InfoBoard({ leftAthlete, rightAthlete }: { leftAthlete: AthleteProfileProps | null, rightAthlete: AthleteProfileProps | null }) {
  return (
    <div className="flex max-h-64">
      <div className="z-10 flex flex-col max-h-fit">
        <InfoArrow side={"left"} info={leftAthlete?.peso?.toString()} />
        <InfoArrow side={"left"} info={leftAthlete?.altura?.toString()} />
        <InfoArrow side={"left"} info={leftAthlete?.idade?.toString()} />
        <InfoArrow side={"left"} info={leftAthlete?.faixa?.toString()} />
      </div>
      <section className="flex max-h-64 gap-9 flex-col bg-winePatternDark z-0 min-w-64 w-64 mx-[-20px] p-4">
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
        <InfoArrow side={"right"} info={rightAthlete?.peso?.toString()} />
        <InfoArrow side={"right"} info={rightAthlete?.altura?.toString()} />
        <InfoArrow side={"right"} info={rightAthlete?.idade?.toString()} />
        <InfoArrow side={"right"} info={rightAthlete?.faixa?.toString()} />
      </div>
    </div>
  );
}
