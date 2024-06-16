"use client";
import Loading from "@/components/loading/index";

import Modal from "@/components/modal";
import ListAvaliacao from "@/components/listAvaliacao";
import { useAssessmentsProvider } from "@/contexts/assessments/assessments";

const MenuAvaliacaoPage = () => {
  const { isLoading, modalVisible, cancelModal, confirmModal, assessment } =
    useAssessmentsProvider();

  console.log("--MODAL VISIBLE:", modalVisible);

  return (
    <div className="w-screen h-screen">
      <div
        className={
          "flex-1 flex-col gap-y-2 fadeIn p-8 grid justify-items-center min-h-screen m-auto"
        }
      >
        <ListAvaliacao />
      </div>
    </div>
  );

  return (
    <div className="w-screen h-screen">
      {modalVisible ? (
        isLoading ? (
          <Loading />
        ) : (
          <Modal
            title={
              assessment
                ? "Existe uma avaliação em andamento...\nDeseja continuar?"
                : "Deseja criar uma nova avaliação?"
            }
            closeModalFunction={cancelModal}
            confirmButtonFunction={confirmModal}
            cancelButtonFunction={cancelModal}
            confirmButtonText={
              assessment ? "Retomar avaliação" : "Iniciar nova avaliação"
            }
          />
        )
      ) : (
        <div
          className={
            "flex-1 flex-col gap-y-2 fadeIn p-8 grid justify-items-center min-h-screen m-auto"
          }
        >
          <ListAvaliacao />
        </div>
      )}
    </div>
  );
};

export default MenuAvaliacaoPage;
