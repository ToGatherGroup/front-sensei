import FormAtleta from "../../../components/formAtleta/index";

type Props = {};
const CadastrarAtleta = (props: Props) => {
  return (
    <div>
      {<FormAtleta method="POST" />}
    </div>
  );
};

export default CadastrarAtleta;
