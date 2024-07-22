import FormContainer from "@/components/ui/formContainer";
import FormRow from "@/components/ui/formRow";
import Input from "@/components/ui/input";

const Teste = () => {
  return (
    <FormContainer>
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
    </FormContainer>
  );
};
export default Teste;
