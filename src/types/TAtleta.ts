import { Faixas } from "@/enums/faixas";

export type Atleta = {
  id?: number;
  nome: string;
  email: string;
  nascimento: string;
  foto: string;
  categoria?: string;
  faixa: (typeof Faixas)[number];
  sexo: "M" | "F";
  isAtivo?: boolean;
};