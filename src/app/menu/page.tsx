import Link from "next/link";

type Props = {};

import styles from "./menu.module.css";

import Card from "../../components/card/index";

type Card = {
  title: string;
  imgSrc: string;
};

//  Cards to be shown at Menu
//  All cards here, will be automatic rendered and displayed in this order
const cards: Card[] = [
  {
    title: "Chamada",
    imgSrc: "/cards/chamada_512x512.png",
  },
  {
    title: "Iniciar Avaliação",
    imgSrc: "/cards/iniciar_avaliacao_512x512.png",
  },
  {
    title: "Ficha Do Atleta",
    imgSrc: "/cards/ficha_atleta_512x512.png",
  },
  {
    title: "Cadastrar Atleta",
    imgSrc: "/cards/cadastrar_atleta_512x512.png",
  },
  {
    title: "Relatório Avaliação",
    imgSrc: "/cards/relatorio_avaliacao_512x512.png",
  },
  {
    title: "Comparação",
    imgSrc: "/cards/comparar_atleta_512x512.png",
  },
];

// const Menu = (props: Props) => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.cardContainer}>
//         {cards.map((card: Card) => (
//           <div className={styles.card} key={card.title}>
//             <Card cardTitle={card.title} src={card.imgSrc} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Menu;

// const Menu = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.cardContainer}>
//         {cards.map((card: Card) => (
//           <div className={styles.card} key={card.title}>
//             {card.title === "Cadastrar Atleta" ? (
//               <Link href="/atleta/cadastrar">
//                 <Card cardTitle={card.title} src={card.imgSrc} />
//               </Link>
//             ) : (
//               <Card cardTitle={card.title} src={card.imgSrc} />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Menu;

const Menu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        {cards.map((card: Card) => (
          <div className={styles.card} key={card.title}>
            {card.title === "Iniciar Avaliação" ? (
              <Link href="/avaliacao">
                <Card cardTitle={card.title} src={card.imgSrc} />
              </Link>
            ) : card.title === "Ficha Do Atleta" ? (
              <Link href="/atleta/buscar">
                <Card cardTitle={card.title} src={card.imgSrc} />
              </Link>
            ) : card.title === "Cadastrar Atleta" ? (
              <Link href="/atleta/cadastrar">
                <Card cardTitle={card.title} src={card.imgSrc} />
              </Link>
            ) : (
              <Card cardTitle={card.title} src={card.imgSrc} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
