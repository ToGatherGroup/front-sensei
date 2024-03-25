import Button from "@/components/button";
import styles from "./campeonatos.module.css";

import FormTitle from "@/components/Title/formTitle/index";

type Props = {};
const atletaCampeonatos = (props: Props) => {
  return (
    // <div style={{ display: "flex" }}>
    <div className="flex justify-center items-center">
      <div className="form-container">
        <div className="flex justify-center items-center">
          <FormTitle
            title="Cadastrar Campeonatos"
            iconSrc="/icons/trophy_24x24.png"
          />
        </div>
        <div className="flex justify-center my-40">
          <form action="">
            <div className="mx-auto my-6 box-border">
              <label
                htmlFor="name"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Nome do Campeonato
              </label>
              <input
                type="text"
                className="bg-gray-200 w-72 px-4 py-2 rounded"
                placeholder="Informe o nome do campeonato"
              />
            </div>

            <div className="mx-auto my-6 box-border">
              <label
                htmlFor="name"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Data do Campeonato
              </label>
              <input
                type="date"
                className="bg-gray-200 w-72 px-4 py-2 rounded"
              />
            </div>

            <div className="mx-auto my-6 box-border">
              <label
                htmlFor="name"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Posição
              </label>
              <select
                name=""
                id=""
                className="bg-gray-200 w-72 px-4 py-2 rounded"
              >
                <option value="first">Primeiro Colocado</option>
                <option value="second">Segundo Colocado</option>
                <option value="third">Terceiro Colocado</option>
                <option value="competed">Competiu</option>
              </select>
            </div>
            <div className="my-20">
              <Button label="cadastrar" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default atletaCampeonatos;
