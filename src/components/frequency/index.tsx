"use client";
import styles from "./frequency.module.css";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js/auto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useApiProvider } from "@/contexts";

type FrequencyProps = {
  id: number | string;
  width?: number;
  height?: number;
};

// Adjust the schema to validate string dates
const frequencyDatesSchema = yup.object().shape({
  startDate: yup
    .string()
    .required("Data inicial é obrigatória.")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data inicial deve estar no formato yyyy-mm-dd."),
  endDate: yup
    .string()
    .required("Data final é obrigatória.")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Data final deve estar no formato yyyy-mm-dd.")
    .test("is-greater", "A data final deve ser maior que a data inicial.", function (value) {
      const { startDate } = this.parent;
      return !startDate || !value || new Date(value) > new Date(startDate);
    }),
});

type Props = {
  id: number | string;
};

const Frequency = ({ id, height, width }: FrequencyProps) => {
  const [frequencyData, setFrequencyData] = useState([
    { label: "Presença", value: 1 },
    { label: "Faltas", value: 0 },
  ]);
  const [porcentagemPresenca, setPorcentagemPresenca] = useState(0);
  const [chartKey, setChartKey] = useState(`${width}-${height}`);

  // Calculate the default start and end dates
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const defaultValues = {
    startDate: thirtyDaysAgo.toISOString().substring(0, 10),
    endDate: today.toISOString().substring(0, 10),
  };

  const {
    formState: { errors },
    register,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(frequencyDatesSchema),
    defaultValues,
  });

  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");
  const { get } = useApiProvider();

  useEffect(() => {
    if (watchStartDate && watchEndDate) {
      Chart.register(...registerables);
      const fetchData = async () => {
        try {
          const response = await get(
            `atleta/presenca/${id}/data_inicio/${watchStartDate}/data_fim/${watchEndDate}`
          );
          const { totalPresenca, totalAusencia, porcentagemPresenca } = response?.data;

          setFrequencyData([
            { label: "Presença", value: totalPresenca },
            { label: "Faltas", value: totalAusencia },
          ]);
          setPorcentagemPresenca(porcentagemPresenca);
        } catch (error) {
          console.error("Erro ao fazer a solicitação à API:", error);
        }
      };

      fetchData();
    }
  }, [watchStartDate, watchEndDate, get, id]);

  useEffect(() => {
    setChartKey(`${width}-${height}`);
  }, [width, height]);

  return (
    <main className={styles.frequency}>
      <section className={styles.dates}>
        <form className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="startDate">Início: </label>
            <input
              className={styles.inputText}
              type="date"
              id="startDate"
              {...register("startDate")}
            />
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="endDate">Fim: </label>
            <input
              className={styles.inputText}
              type="date"
              id="endDate"
              {...register("endDate")}
            />
          </div>
        </form>
      </section>
      <div className={styles.inputErrors}>
        {errors.startDate && (
          <p className={styles.errorText}>{errors.startDate.message}</p>
        )}
        {errors.endDate && (
          <p className={styles.errorText}>{errors.endDate.message}</p>
        )}
      </div>

      <section className={styles.grafic}>
        <div className={styles["chart-container"]}>
          <div className="m-auto size-36 lg:size-52">
            <Doughnut
              data={{
                datasets: [
                  {
                    data: frequencyData.map((data) => data.value),
                    backgroundColor: [
                      "rgba(43, 63, 229, 0.8)",
                      "rgba(253,192,19,0)",
                    ],
                  },
                ],
              }}
              key={chartKey}
              height={height}
              width={width}
            />
            <p className={"text-center w-auto -mt-20 lg:-mt-28 text-xl"}>{porcentagemPresenca}</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Frequency;
