"use client";

import ListAvaliacao from "@/components/listAvaliacao";

const MenuAvaliacaoPage = () => {
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
};

export default MenuAvaliacaoPage;
