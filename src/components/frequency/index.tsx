"use client";

import styles from "./frequency.module.css";
import { Doughnut } from "react-chartjs-2";
// import { FrequencyData } from "@/mock/frequency/frequency_data";
import { useEffect, useState } from "react";
import { Chart, registerables } from "chart.js/auto";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const frequencyDatesSchema = yup.object().shape({
  startDate: yup
    .date()
    .required("Data Inicial Requerida")
    .typeError("Insira a data inicial."),
  endDate: yup
    .date()
    .required("Data Final Requerida")
    .typeError("Insira uma data final.")
    .min(
      yup.ref("startDate"),
      "A data final deve ser igual ou depois da data inicial."
    ),
});

const apiUrl =
  "https://sensei.squareweb.app/atleta/presenca/5/data_inicio/2024-01-01/data_fim/2024-04-30";

const Frequency = () => {
  const [frequencyData, setFrequencyData] = useState([
    { label: "Presença", value: 0 },
    { label: "Faltas", value: 0 },
  ]);
  const [porcentagemPresenca, setPorcentagemPresenca] = useState(0);

  const {
    formState: { errors },
    register,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(frequencyDatesSchema),
  });

  useEffect(() => {}, []);

  Chart.register(...registerables);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const { totalPresenca, totalAusencia, porcentagemPresenca } =
          response.data;

        setFrequencyData([
          { label: "Presença", value: totalPresenca },
          { label: "Faltas", value: totalAusencia },
        ]);
        Chart.register(...registerables);
        setPorcentagemPresenca(porcentagemPresenca);
      })
      .catch((error) => {
        console.error("Erro ao fazer a solicitação à API:", error);
      });
  }, []);

  return (
    <main className={styles.frequency}>
      <section className={styles.dates}>
        <form action="">
          <label htmlFor="startDate">Inicio: </label>
          <input
            className={styles.inputText}
            type="date"
            id="startDate"
            {...register("startDate")}
          />
          {errors.startDate && (
            <p className={styles.errorText}>{errors.startDate.message}</p>
          )}

          <label htmlFor="endDate">Fim: </label>
          <input
            className={styles.inputText}
            type="date"
            id="endDate"
            {...register("endDate")}
          />
          {errors.endDate && (
            <p className={styles.errorText}>{errors.endDate.message}</p>
          )}
        </form>
      </section>

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
