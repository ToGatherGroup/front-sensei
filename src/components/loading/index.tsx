import styles from "./loading.module.css";

type Props = {
  msg?: string;
};

const Loader = ({ msg }: Props) => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
      {msg && <p className={styles.msg}>{msg}</p>}
    </div>
  );
};
export default Loader;
