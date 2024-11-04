import { Faixas } from "@/enums/faixas";
import {
  MedalsProps,
} from "./../contexts/athlete/athlete.type";


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
  medals: MedalsProps;
};