type Props = {
  cardTitle: string;
  src: string;
  width?: number;
  height?: number;
};

import Image from "next/image";

import styles from "./card.module.css";

// Default size of cards icon images (if passed as prop, it'll be ignored)
const defaultWidth = 180;
const defaultHeight = 180;

const Card = ({ cardTitle, src, width, height }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>
        <h2>{cardTitle}</h2>
      </div>

      <div className={styles.icon}>
        <figure>
          <Image
            src={src}
            alt={`Ícone do ${cardTitle}`}
            width={width ?? defaultWidth}
            height={height ?? defaultHeight}
          />
        </figure>
      </div>
    </div>
  );
};
export default Card;
