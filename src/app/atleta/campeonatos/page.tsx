import styles from "./campeonatos.module.css";

import FormTitle from "@/components/Title/formTitle/index";

type Props = {};
const atletaCampeonatos = (props: Props) => {
  return (
    <div style={{ display: "flex" }}>
      <div className="form-container">
        <FormTitle
          title="Cadastrar Campeonatos"
          iconSrc="/icons/trophy_24x24.png"
        />
      </div>
    </div>
  );
};
export default atletaCampeonatos;
