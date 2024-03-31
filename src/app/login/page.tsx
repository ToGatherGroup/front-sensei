import Button from "../../components/button/index";
import Title from "../../components/Title/index";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

export default function LoginPage() {
  
  const loginSchema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
  });
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  
  const onSubmit = (data) => {
    console.log(data);
  };
  
  return (
    <div
      className={`flex w-full items-center justify-center w-100 min-h-dvh`}
    >
      <div
        className={`bg-white rounded-md flex flex-col items-center justify-items-center md:gap-7 xl:gap-10 lg:gap-10 sm:gap-5 gap-5 w-full max-w-[90%] xl:max-w-[50%] lg:max-w-[50%] md:max-w-[70%] sm:max-w-[90%] p-8 md:p-8 sm:p-6 md:rounded-xl xl:rounded-3xl lg:rounded-3xl xl:p-16 lg:p-16`}
      >
        <Title title="Login" color="#000" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          action="javascript:;"
          method="POST"
          id="fLogin"
          className="flex flex-col items-center justify-items-center md:gap-7 xl:gap-10 lg:gap-10 sm:gap-5 gap-5 w-full max-w-lg"
        >
          <input
            {...register("login")}
            type="text"
            placeholder="Usuário"
            className="p-2 w-full rounded-md bg-[#929292] text-white placeholder:text-white"
          />
          {errors.login && <span>{errors.login.message}</span>}
          <input
            {...register("password")}
            type="password"
            placeholder="Senha"
            className="p-2 w-full rounded-md bg-[#929292] text-white placeholder:text-white"
          />
          {errors.password && <span>{errors.password.message}</span>}
          <Button label="Entrar" type="submit" style="btn_default" />
        </form>
      </div>
    </div>
  );
}
