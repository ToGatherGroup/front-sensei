import Container from "@/components/ui/container";
import FormRow from "@/components/ui/formRow";
import Input from "@/components/ui/input";

const Teste = () => {
  return (
    <Container>
      <FormRow
        label={<p className="w-36 text-center sm:text-left">TesteJfdjsdfds</p>}
        input={<input type="text"></input>}
      />
      <FormRow
        label={<p className="w-36">Teste</p>}
        input={<input type="text"></input>}
      />
      <FormRow
        label={<p className="w-36">Teste</p>}
        input={<input type="text"></input>}
      />
    </Container>
  );
};
export default Teste;
