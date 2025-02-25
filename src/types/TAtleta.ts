import { Faixas } from "@/enums/faixas";
import { Grupo } from "./Grupo";

export type Atleta = {
  id?: number;
  nome: string;
  email: string;
  nascimento: string;
  foto: string;
  categoria?: string;
  faixa: (typeof Faixas)[number];
  grupo?: Grupo;
  sexo: "M" | "F";
  isAtivo?: boolean;
};