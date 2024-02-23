import Title from "@/components/title/index";

export default function LoginPage() {
  return (
    <main
      className={`flex w-full items-center justify-center w-100 min-h-dvh bg-[#F5F5F5]`}
    >
      <div
        className={`bg-[#CD2626] rounded-3xl p-16 flex flex-col items-center justify-items-center gap-10 w-full max-w-lg`}
      >
        <Title title="Login" />

        <form
          action="javascript:;"
          method="POST"
          id="fLogin"
          className="flex flex-col items-center justify-items-center gap-10 w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Usuário"
            className="p-2 w-full rounded-md"
          />
          <input
            type="text"
            placeholder="Senha"
            className="p-2 w-full rounded-md"
          />
          <button
            type="submit"
            className="bg-white py-2 w-[200px] rounded-md font-bold text-black uppercase"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
