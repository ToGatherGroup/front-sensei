"use client";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useApiProvider } from "@/contexts";
import FormTitle from "@/components/title/formTitle";
import FormContainer from "@/components/ui/formContainer";

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
        const response = await get("avaliacoes/datas");
        if (response) {
          setDates(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const fetchReports = async () => {
        try {
          const response = await get(`atletas/avaliacao/${selectedDate}`);
          if (response) {
            const sortedData = response.data.sort(
              (a: IReportData, b: IReportData) => a.nome.localeCompare(b.nome)
            );
            setReportData(sortedData);
          }
        } catch (error) {
          console.error("Erro ao buscar dados da API:", error);
        }
      };
      fetchReports();
    }
  }, [selectedDate]);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <FormContainer>
      <FormTitle title="Relatório de Avaliação" iconSrc="/icons/report.png" />

      <div className="flex items-center justify-center gap-2 my-8">
        <label
          htmlFor="date"
          className="inline-block w-14 text-center text-base font-semibold"
        >
          Data
        </label>
        <Controller
          name="date"
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
              <option value="" className="text-center align-middle leading-10">
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

      <div className="m-auto flex flex-col gap-2 items-center justify-center max-w-80">
        {selectedDate ? (
          reportData.map((atleta) => (
            <Link
              key={atleta.id}
              href={{
                pathname: `/atleta/perfil/${atleta.id}/editar/avaliacao`,
                query: {
                  data: selectedDate,
                  nome: atleta.nome,
                },
              }}
              passHref
              className="bg-gray-200 cursor-pointer inline-block w-full text-lg text-center capitalize peer-checked:text-white peer-checked:bg-winePatternLight sm:hover:outline sm:hover:outline-winePatternLight py-2 px-4 rounded"
            >
              {atleta.nome}
            </Link>
          ))
        ) : (
          <div>
            <p className="text-center mt-16 mb-16 text-red-600">
              Nenhuma data selecionada
            </p>
          </div>
        )}
      </div>
    </FormContainer>
  );
};

export default RelatorioAvaliacao;
