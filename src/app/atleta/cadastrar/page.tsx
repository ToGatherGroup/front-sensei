import FormAtleta from "../../../components/formAtleta/index";

//import { Atleta } from "@/mock/atleta";

type Props = {};
const CadastrarAtleta = (props: Props) => {
  //console.log(Atleta);
  return (
    <div>
      {<FormAtleta method="POST" />}
    </div>
  );
};

export default CadastrarAtleta;
