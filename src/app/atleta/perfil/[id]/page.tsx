import AvatarAtleta from "@/components/avatarAtleta/page";
import { Atletas } from "@/mock/atletas";
import { IAtleta } from "@/types/IAtleta";

import styles from "./page.module.css";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};
const page = ({ params }: Props) => {
  const atleta: IAtleta = Atletas[parseInt(params.id)];

  return (
    <div className={styles.container}>
      <AvatarAtleta
        name={atleta.name}
        faixa={atleta.faixa}
        avatar={atleta.avatar}
        size="big"
      />
    </div>
  );
};
export default page;
