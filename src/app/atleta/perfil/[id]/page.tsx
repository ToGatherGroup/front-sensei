import AvatarAtleta from "@/components/avatarAtleta/page";
import { Atletas } from "@/mock/atletas";
import { TAtleta } from "@/types/TAtleta";

import styles from "./page.module.css";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};
const page = ({ params }: Props) => {
  const atleta: TAtleta = Atletas[parseInt(params.id)];

  return (
    <div className={styles.container}>
      <AvatarAtleta
        id={atleta.id}
        name={atleta.name}
        belt={atleta.belt}
        photo={atleta.photo}
        size="big"
      />
    </div>
  );
};
export default page;
