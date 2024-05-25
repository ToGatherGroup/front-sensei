import styles from "./loading.module.css";

type Props = {
  msg?: string;
};

const index = ({ msg }: Props) => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
      {msg && <p className={styles.msg}>{msg}</p>}
    </div>
  );
};
export default index;
