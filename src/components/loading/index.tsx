import styles from "./loading.module.css";

const index = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
    </div>
  );
};
export default index;
