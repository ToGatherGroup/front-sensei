"use client";
import { ReviewsChart } from "@/components/reviewsChart";
import MedalSection from "@/components/medalSection";
import InfoBoard from "@/components/infoBoard";
import { useComparisonProvider } from "@/contexts/comparison/comparison";
import AtletaSelecionar from "@/app/atleta/buscar/page";
import AthleteComparisonCard from "@/components/athleteComparison";

const medalSectionStyle = "flex flex-row h-26 w-32 mt-24";
const medalWrapper = "flex flex-col items-center space-y-2 lg:space-y-6";
const avatarAtletaStyle = "nax-w-48";
const athleteWrapperStyle = "shrink max-h-fit flex max-w-fit";

export default function Comparison() {
  const {
    leftAthlete,
    rightAthlete,
    setIsLeft,
    showModal,
    toggleComparisonModalVisibility,
  } = useComparisonProvider();

  const handleClick = (isLeft?: boolean) => {
    if (isLeft) {
      setIsLeft(isLeft);
    }
    toggleComparisonModalVisibility(!showModal);
  };

  const handleInternClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  };

  return (
    <div>
      <div className="flex-col h-svh w-screen">
        <div
          className={`${
            showModal ? "blur" : ""
          } flex justify-center relative max-w-screen-lg min-w-full`}
        >
          <div className="shrink h-fit flex-col z-10">
            {/* Div dos três elementos */}
            <div className={`${athleteWrapperStyle}`}>
              {/* Div do avatar e infos */}
              <AthleteComparisonCard
                athlete={leftAthlete ? leftAthlete : null}
                onClick={() => handleClick(true)}
                avatarAtletaStyle={avatarAtletaStyle}
                isLeft={true} />
            </div>
            <div className={medalWrapper}>
              <div className={medalSectionStyle}>
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza1.png"
                  altText="Ícone Medalha Ouro"
                  ringColor="amber-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza2.png"
                  altText="Ícone Medalha Prata"
                  ringColor="zinc-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza3.png"
                  altText="Ícone Medalha Bronze"
                  ringColor="copperMedal"
                  medalCount={2}
                />
              </div>
            </div>
          </div>
          <InfoBoard
            leftAthlete={leftAthlete ? leftAthlete : null}
            rightAthlete={rightAthlete ? rightAthlete : null}
          />
          <div className="shrink h-fit flex-col z-10">
            {/* Div dos três elementos */}
            <div className={`${athleteWrapperStyle}`}>
              {/* Div do avatar e infos */}
              <AthleteComparisonCard
                athlete={rightAthlete ? rightAthlete : null}
                onClick={() => handleClick(true)}
                avatarAtletaStyle={avatarAtletaStyle}
                isLeft={false} />
            </div>
            <div className={medalWrapper}>
              <div className={medalSectionStyle}>
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza1.png"
                  altText="Ícone Medalha Ouro"
                  ringColor="amber-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza2.png"
                  altText="Ícone Medalha Prata"
                  ringColor="zinc-500"
                  medalCount={2}
                />
                <MedalSection
                  imgSrc="/formAtleta/medals/medalhasCinza3.png"
                  altText="Ícone Medalha Bronze"
                  ringColor="copperMedal"
                  medalCount={2}
                />
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-md xl:p-10 lg:p-8 md:p-5 w-svw h-svh p-5 z-10"
            onClick={() => handleClick()}
          >
            <div
              className="fixed mt-48 z-99"
              onClick={(event) => handleInternClick(event)}
            >
              <AtletaSelecionar />
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <div className="lg:max-w-md lg:mt-10 animate-fade-down animate-duration-1000">
            <ReviewsChart
              className={showModal ? "hidden" : "block"}
              height={600}
              width={600}
              firstValencia={leftAthlete?.valencia}
              secondValencia={rightAthlete?.valencia}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
