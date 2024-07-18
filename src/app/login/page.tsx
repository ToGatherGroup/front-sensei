"use client";
import React, { useEffect, useState } from "react";
import Title from "../../components/title/index";

import { useAuthProvider } from "@/contexts";
import Button from "@/components/ui/button";
import { LoaderIcon } from "react-hot-toast";

export default function LoginPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authentication, isLoading, error } = useAuthProvider();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authentication(login, password);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-dvh">
      {isLoading && <LoaderIcon />}
      <div className="bg-white rounded-md flex flex-col items-center md:gap-7 xl:gap-10 lg:gap-10 sm:gap-5 gap-5 w-full max-w-[90%] xl:max-w-[50%] lg:max-w-[50%] md:max-w-[70%] sm:max-w-[90%] p-8 md:p-8 sm:p-6 md:rounded-xl xl:rounded-3xl lg:rounded-3xl xl:p-16 lg:p-16">
        <Title title="Login" color="#000" />

        <form
          onSubmit={onSubmit}
          id="fLogin"
          className="flex flex-col items-center md:gap-7 xl:gap-10 lg:gap-10 sm:gap-5 gap-5 w-full max-w-lg"
        >
          <input
            onChange={(event) => setLogin(event.target.value)}
            type="text"
            placeholder="Usuário"
            className="p-2 w-full rounded-md bg-[#929292] text-white placeholder-text-white"
          />
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Senha"
            className="p-2 w-full rounded-md bg-[#929292] text-white placeholder-text-white"
          />
          {error && <p>{error}</p>}
          <Button text="Entrar" type="submit" className="w-40" />
        </form>
      </div>
    </div>
  );
}
