"use client";
import { useApiProvider } from "@/contexts";
import { Chart, registerables } from "chart.js/auto";
import { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";

Chart.register(...registerables);

type ReviewsChartProps = {
  id?: number | string;
  width?: number;
  height?: number;
  firstValencia?: boolean;
  secondValencia?: boolean;
};

interface IApiData {
  labels: string[];
  values: number[];
}

export const ReviewsChart = ({ id, className, height, width }: ReviewsChartProps & { className?: string }) => {
  const [apiData, setApiData] = useState<IApiData | null>(null);
  const { get } = useApiProvider();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for atleta id: ${id}`);
        const response = await get(`avaliacao/${id}`);
        console.log("API response:", response);
        if (response?.data) {
          const { labels, values } = response.data;
          console.log("Data received:", { labels, values });
          setApiData({ labels, values });
        } else {
          console.log("No data found in response");
        }
      } catch (error) {
        console.error("Erro ao solicitar a API", error);
      }
    };
    fetchData();
  }, [id]);

  const chartData = {
    labels: apiData ? apiData.labels : [],
    // labels: [
    //   "Core",
    //   "Explosiva",
    //   "Isométrica",
    //   "Tornozelo",
    //   "Abdominal",
    //   "MMSS",
    //   "Anaeróbica",
    //   "Aeróbica",
    // ],
    datasets: [
      {
        label: "Avaliação Atual",
        data: apiData ? apiData.values : [],
        //data: [60, 70, 80, 75, 96, 70, 90, 70, 80],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "white",
        },
        grid: {
          color: "White",
        },
        suggestedMin: 20,
        suggestedMax: 30,
        ticks: {
          display: false,
          stepSize: 20,
        },
        pointLabels: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <section className={`mx-auto w-64 lg:w-full ${className || ""}`}>
      <Radar key={`${width}-${height}`} height={height} width={width} data={chartData} options={options}></Radar>
      </section>
    </>
  );
};
