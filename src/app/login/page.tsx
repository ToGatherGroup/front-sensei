import Button from "../../components/button/index";
import Title from "../../components/title/index";

export default function LoginPage() {
  return (
    <div className={`flex w-full items-center justify-center w-100 min-h-dvh`}>
      <div
        className={`bg-white rounded-3xl p-16 flex flex-col items-center justify-items-center gap-10 w-full max-w-[60%]`}
      >
        <Title title="Login" color="#000" />

        <form
          action="javascript:;"
          method="POST"
          id="fLogin"
          className="flex flex-col items-center justify-items-center gap-10 w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Usuário"
            className="p-2 w-full rounded-md bg-[#929292] text-white placeholder:text-white"
          />
          <input
            type="password"
            placeholder="Senha"
            className="p-2 w-full rounded-md bg-[#929292] text-white placeholder:text-white"
          />
          <Button label="Entrar" type="submit" style="btn_default" />
        </form>
      </div>
    </div>
  );
}
