import FormTitle from "@/components/title/formTitle";
import Button from "@/components/ui/button";

type Props = {};

const Relatorio = (props: Props) => {
  return (
    <section className="min-h-screen flex-col  justify-center mx-auto my-0 w-auto max-w-[650px] bg-container rounded">
      <form action="" className="flex-col ">
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle title="Relatório do Atleta" iconSrc="/icons/report.png" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="data"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Data
          </label>
          <input type="date" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label htmlFor="">Atleta</label>
          <h3>Nome do Atleta</h3>
        </div>

        <div className="flex-col items-center justify-center pb-8 pt-8">
          {/* <p>Nenhuma data Selecionada</p>
          <p>Não existe avaliações para essa data</p> */}
          <ul>
            <li className="flex items-center justify-center gap-2 py-2">
              <h5>Roberto Galvão</h5>
              <div className="flex gap-2">
                <button>2</button>
                <button>2</button>
                <button>2</button>
              </div>
            </li>
            <li className="flex items-center justify-center gap-2 py-2">
              <h5>Roberto Galvão</h5>
              <div className="flex gap-2">
                <button>2</button>
                <button>2</button>
                <button>2</button>
              </div>
            </li>
            <li className="flex items-center justify-center gap-2 py-2">
              <h5>Roberto Galvão</h5>
              <div className="flex gap-2">
                <button>2</button>
                <button>2</button>
                <button>2</button>
              </div>
            </li>
          </ul>
        </div>
      </form>
      <div className="flex justify-center items-center ">
        <Button text={"Voltar"} type={"button"} className="mx-auto" />
      </div>
    </section>
  );
};

export default Relatorio;
