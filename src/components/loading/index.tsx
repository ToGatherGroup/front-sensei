import styles from "./loading.module.css";

type Props = {
  enable: boolean;
};

const index = ({ enable }: Props) => {
  return (
    <>
      {enable && (
        <div className={styles.loading}>
          <div className={styles.loader}></div>
        </div>
      )}
    </>
  );
};
export default index;
