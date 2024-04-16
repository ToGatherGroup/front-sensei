"use client";
import styles from "./frequency.module.css";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js/auto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const frequencyDatesSchema = yup.object().shape({
  startDate: yup.date().typeError("Insira a data inicial."),
  endDate: yup
    .date()
    .typeError("Insira uma data final.")
    .min(yup.ref("startDate"), "A data final deve ser maior que data inicial."),
});

const Frequency = () => {
  const [frequencyData, setFrequencyData] = useState([
    { label: "Presença", value: 1 },
    { label: "Faltas", value: 0 },
  ]);
  const [porcentagemPresenca, setPorcentagemPresenca] = useState(0);

  const {
    formState: { errors },
    register,
    watch,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(frequencyDatesSchema),
  });

  const idAtleta = 2;
  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  useEffect(() => {
    if (watchStartDate || watchEndDate) {
      const apiUrl = `https://sensei.squareweb.app/atleta/presenca/${idAtleta}/data_inicio/${watchStartDate}/data_fim/${watchEndDate}`;
      Chart.register(...registerables);
      axios
        .get(apiUrl)
        .then((response) => {
          const { totalPresenca, totalAusencia, porcentagemPresenca } =
            response.data;

          setFrequencyData([
            { label: "Presença", value: totalPresenca },
            { label: "Faltas", value: totalAusencia },
          ]);
          setPorcentagemPresenca(porcentagemPresenca);
        })
        .catch((error) => {
          console.error("Erro ao fazer a solicitação à API:", error);
        });
    }
  }, [watchStartDate, watchEndDate]);

  return (
    <main className={styles.frequency}>
      <section className={styles.dates}>
        <form className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <label htmlFor="startDate">Inicio: </label>
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
          <Doughnut
            data={{
              datasets: [
                {
                  data: frequencyData.map((data) => data.value),
                  backgroundColor: [
                    "rgba(43,63,229,0.8)",
                    "rgba(253,192,19,0)",
                  ],
                },
              ],
            }}
          />
          <p className={styles.percentage}>{porcentagemPresenca}</p>
        </div>
      </section>
    </main>
  );
};

export default Frequency;
