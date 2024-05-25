import styles from "./formTitle.module.css";
import Image from "next/image";

type Props = {
  title: string;
  iconSrc: string;
  className?: string;
};
function formTitle({ title, iconSrc, className }: Props) {
  const style = className
    ? `${className} ${styles.formTitle}`
    : styles.formTitle;
  return (
    <div className={style}>
      <h2>
        {title}{" "}
        <Image src={iconSrc} alt="Ícone do formulário" width={24} height={24} />
      </h2>
    </div>
  );
}

export default formTitle;
