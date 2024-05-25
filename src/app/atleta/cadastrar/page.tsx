import FormAtleta from "../../../components/formAtleta/index";

//import { Atleta } from "@/mock/atleta";

type Props = {};
const CadastrarAtleta = (props: Props) => {
  //console.log(Atleta);
  return (
    <div>
      {<FormAtleta atleta={atleta} />}
    </div>
  );
};

export default CadastrarAtleta;
