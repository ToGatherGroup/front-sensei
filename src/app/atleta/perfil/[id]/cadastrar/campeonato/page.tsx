"use client";
import { NextPageContext } from "next";
import Button from "@/components/button";
import styles from "./campeonatos.module.css";
import { useForm } from "react-hook-form";
import FormTitle from "@/components/Title/formTitle/index";
import axios from "axios";

// Configuração da API
const api = axios.create({
  baseURL: "https://sensei.squareweb.app/",
});

// Definição do tipo de dados do formulário
type FormData = {
  name: string;
  date: string;
  position: string;
  atletaModel: string | number;
};

// Função para enviar o formulário
const submitForm = async (data: FormData) => {
  try {
    const response = await api.post(
      "campeonato",
      {
        nome: data.name,
        data: data.date,
        posicaoPodium: data.position,
        atletaModel: {
          id: data.atletaModel,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Erro ao cadastrar campeonato");
    }
    console.log("Campeonato cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar campeonato Api:", error);
    throw error;
  }
};

// Página de cadastro de campeonatos do atleta
const AtletaCampeonatos = (atletaId: number | string) => {
  // ID estático do atleta
  // const atletaId = "2";

  // Configuração do formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Função para submeter o formulário
  const onSubmit = async (data: FormData) => {
    try {
      data.atletaModel = atletaId; // Adiciona o ID do atleta ao dado do formulário
      await submitForm(data);
    } catch (error) {
      console.error("Erro ao cadastrar campeonato Submit:", error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="form-container">
        <div className="flex justify-center items-center">
          <FormTitle
            title="Cadastrar Campeonatos"
            iconSrc="/icons/trophy_24x24.png"
          />
        </div>
        <div className="flex justify-center my-40">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto my-6 box-border">
              <label
                htmlFor="name"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Nome do Campeonato
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="bg-gray-200 w-72 px-4 py-2 rounded"
                placeholder="Informe o nome do campeonato"
              />
              {errors.name && (
                <p className="text-center text-red-500 p-2">
                  Este campo é obrigatório
                </p>
              )}
            </div>

            <div className="mx-auto my-6 box-border">
              <label
                htmlFor="date"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Data do Campeonato
              </label>
              <input
                {...register("date", { required: true })}
                type="date"
                className="bg-gray-200 w-72 px-4 py-2 rounded"
              />
              {errors.date && (
                <p className="text-center text-red-500 p-2">
                  Este campo é obrigatório
                </p>
              )}
            </div>

            <div className="mx-auto my-6 box-border">
              <label
                htmlFor="position"
                className="inline-block w-48 text-center text-base font-semibold"
              >
                Posição
              </label>
              <select
                {...register("position", { required: true })}
                className="bg-gray-200 w-72 px-4 py-2 rounded"
              >
                <option value="PRIMEIRO">Primeiro Colocado</option>
                <option value="SEGUNDO">Segundo Colocado</option>
                <option value="TERCEIRO">Terceiro Colocado</option>
                <option value="PARTICIPACAO">Participação</option>
              </select>
              {errors.position && <span>Este campo é obrigatório</span>}
            </div>
            <div className="my-20">
              <Button label="cadastrar" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AtletaCampeonatos;
