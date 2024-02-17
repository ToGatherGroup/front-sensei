import styles from "./index.module.css";
import Image from "next/image";

const FormAtleta = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Cadastrar atleta</h1>
          <Image
            src="/icons/person_24x24.png"
            alt="Ícone de cadastro"
            width={24}
            height={24}
          />
        </div>
        <form className={styles.form}>
          <div className={styles.inputRow}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Insira seu nome"
            />
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Insira seu e-mail"
            />
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="birthdate">Data de nascimento</label>
            <input type="date" name="birthdate" id="birthdate" />
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="sex">Sexo</label>
            <select name="sex" id="sex" defaultValue="">
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="weight">Peso (kg)</label>
            <input type="number" name="weight" id="weight" placeholder={"0"} />
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="height">Altura (cm)</label>
            <input type="number" name="height" id="height" placeholder={"0"} />
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="category">Categoria</label>
            <select name="category" id="category" defaultValue="">
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="branca">Sub 9</option>
              <option value="cinza">Sub 11</option>
              <option value="azulClaro">Sub 13</option>
              <option value="azulEscuro">Sub 15</option>
              <option value="amarela">Sub 18</option>
              <option value="laranja">Adulto</option>
            </select>
          </div>

          <div className={styles.inputRow}>
            <label htmlFor="faixa">Faixa</label>
            <select name="faixa" id="faixa" defaultValue="">
              <option value="" disabled hidden>
                Selecione
              </option>
              <option value="branca">Branca</option>
              <option value="cinza">Cinza</option>
              <option value="azulClaro">Azul claro</option>
              <option value="azulEscuro">Azul escuro</option>
              <option value="amarela">Amarela</option>
              <option value="laranja">Laranja</option>
              <option value="verde">Verde</option>
              <option value="roxa">Roxa</option>
              <option value="marrom">Marrom</option>
              <option value="preta">Preta</option>
              <option value="coral">Coral</option>
              <option value="vermelha">Vermelha</option>
            </select>
          </div>

          <input type="submit" value="Cadastrar" className="btnSubmit" />
        </form>
      </div>
    </div>
  );
};

export default FormAtleta;
