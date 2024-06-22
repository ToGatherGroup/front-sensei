"use client";

import ListAvaliacao from "@/components/listAvaliacao";

const MenuAvaliacaoPage = () => {
  return (
    <div
      className={
        "flex-1 flex-col gap-y-2 fadeIn p-8 grid justify-items-center min-h-screen m-auto"
      }
    >
      <ListAvaliacao />
    </div>
  );
};

export default MenuAvaliacaoPage;
