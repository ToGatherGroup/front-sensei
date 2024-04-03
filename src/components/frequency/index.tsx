import styles from "./frequency.module.css";
import Image from "next/image";
import frequency_image from "../../mock/frequency/frequency_image.png";

const Frequency = () => {
  return (
    <main className={styles.frequency}>
      <header className={styles.header}>
        <h1>Frequencia</h1>
      </header>

      <section className={styles.dates}>
        <div>
          <label htmlFor="">Inicio: </label>
          <input type="date" className={styles.inputText} />
        </div>
        <div>
          <label htmlFor="">Fim: </label>
          <input type="date" className={styles.inputText} />
        </div>
      </section>

      <section className={styles.grafic}>
        <h1>Gráficos</h1>
        <Image src={frequency_image} alt="imagem da frequencia" width={300} />
      </section>
    </main>
  );
};

export default Frequency;
