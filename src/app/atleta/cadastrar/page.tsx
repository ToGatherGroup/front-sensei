import FormAtleta from "../../../components/FormAtleta/FormAtleta";

const atleta = {
  name: "Bruno Amado",
  email: "2225973@aluno.univesp.br",
  birthdate: new Date(1990, 0, 1),
  sex: "male",
  weight: 100.0,
  height: 173,
  faixa: "marrom",
};

type Props = {};
const CadastrarAtleta = (props: Props) => {
  return (
    <div>
      {/* <FormAtleta atleta={atleta} /> */}
      <FormAtleta />
    </div>
  );
};

export default CadastrarAtleta;
