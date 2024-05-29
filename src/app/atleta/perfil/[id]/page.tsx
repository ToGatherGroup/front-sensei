import AvatarAtleta from "@/components/avatarAtleta/page";
import { Atletas } from "@/mock/atletas";
import { TAtleta } from "@/types/TAtleta";
import styles from "./page.module.css";
import Frequency from "@/components/frequency";

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
      <div>
        <AvatarAtleta
          id={atleta.id}
          name={atleta.name}
          belt={atleta.belt}
          photo={atleta.photo}
          size="big"
        />
      </div>
      <Frequency id={params.id} />
    </div>
  );
};
export default page;
