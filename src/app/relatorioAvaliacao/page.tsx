"use client";
import Button from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import download from "../../../public/icons/download.png";
import edt from "../../../public/icons/edt.png";
import mail from "../../../public/icons/mails 8.png";
import FormTitle from "@/components/title/formTitle";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { useApiProvider } from "@/contexts";

type Props = {};

const RelatorioAvaliacao = (props: Props) => {
  const { get } = useApiProvider();
  const { control } = useForm();
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [reportData, setReportData] = useState<any[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await get("avaliacao/datas");
        if (response) {
          setDates(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchDates();
  }, [get]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (selectedDate) {
      const fetchReports = async () => {
        try {
          const response = await get(`atleta/avaliacao/${selectedDate}`);
          if (response) {
            setReportData(response.data);
          }
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
        }
      };

      fetchReports();
    }
  }, [get, selectedDate]);

  return (
    <section className="min-h-screen flex-col justify-center mx-auto my-0 w-auto max-w-[650px] bg-container rounded">
      <div className="flex-col">
        <div className="flex justify-center items-end pb-16 pt-16">
          <FormTitle
            title="Relatório de Avaliação"
            iconSrc="/icons/report.png"
          />
        </div>
        <div className="flex items-center justify-center gap-2">
          <label
            htmlFor="data"
            className="inline-block w-14 text-center text-base font-semibold"
          >
            Data
          </label>
          <Controller
            name="data"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setSelectedDate(e.target.value);
                }}
                className="block w-30 h-12 mt-1 text-center align-middle leading-10"
              >
                <option
                  value=""
                  className="text-center align-middle leading-10"
                >
                  Selecione uma data
                </option>
                {dates.map((date) => (
                  <option
                    key={date}
                    value={date}
                    className="text-center align-middle leading-10"
                  >
                    {formatDate(date)}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {selectedDate ? (
          <div className="flex-col items-center justify-center pb-8 pt-8">
            <ul>
              <li className="flex items-center justify-center gap-2 py-2">
                <h5>Roberto Galvão</h5>
                <div className="flex gap-2">
                  <button>
                    <Image src={download} alt="" className="w-5" />
                  </button>
                  <button>
                    <Image src={edt} alt="" className="w-5" />
                  </button>
                  <button>
                    <Image src={mail} alt="" className="w-5" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="text-center mt-16 mb-16 text-red-600">
              Nenhuma data selecionada
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center ">
        <Button text={"Voltar"} type={"button"} className="mx-auto" />
      </div>
    </section>
  );
};

export default RelatorioAvaliacao;
