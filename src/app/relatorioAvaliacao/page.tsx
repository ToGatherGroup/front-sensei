"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { useApiProvider } from "@/contexts";
import Button from "@/components/ui/button";
import FormTitle from "@/components/title/formTitle";
import download from "../../../public/icons/download.png";
import edt from "../../../public/icons/edt.png";
import mail from "../../../public/icons/mails 8.png";

interface IReportData {
  id: number;
  nome: string;
}

const RelatorioAvaliacao = () => {
  const { get } = useApiProvider();
  const { control } = useForm();
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [reportData, setReportData] = useState<IReportData[]>([]);

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

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

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
            <ul className="flex-col">
              {reportData.map((athlete) => (
                <li
                  key={athlete.id}
                  className="flex items-center justify-start gap-2 py-2 ml-8 md:ml-32 lg:ml-32 xl:ml-40 2xl:ml-32 mr-3"
                >
                  <h5 className="text-justify">{athlete.nome}</h5>
                  <div className="flex gap-2 items-center justify-center">
                    <button>
                      <Image
                        src={download}
                        alt="download relatorio"
                        className="w-5"
                      />
                    </button>
                    <Link
                      href={{
                        pathname: `/atleta/perfil/${athlete.id}/relatorio`,
                        query: { data: selectedDate, nome: athlete.nome },
                      }}
                      passHref
                    >
                      <button>
                        <Image
                          src={edt}
                          alt="edição relatorio"
                          className="w-5"
                        />
                      </button>
                    </Link>
                    <button>
                      <Image
                        src={mail}
                        alt="enviar email do relatorio"
                        className="w-5"
                      />
                    </button>
                  </div>
                </li>
              ))}
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
      <div className="flex justify-center items-center pb-10">
        <Link href="/menu">
          <Button text={"Voltar"} type={"button"} className="mx-auto" />
        </Link>
      </div>
    </section>
  );
};

export default RelatorioAvaliacao;
