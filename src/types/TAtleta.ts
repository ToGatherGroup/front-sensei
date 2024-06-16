import { Faixas } from "@/enums/faixas";

export type TAtleta = {
  id: string;
  name: string;
  email: string;
  birthdate: Date;
  sex: "male" | "female";
  weight: number;
  height: number;
  belt: (typeof Faixas)[number];
  photo: string;
  category?: string;
};

export type Atleta = {
  id: string;
  nome: string;
  email: string;
  nascimento: string;
  sexo: "male" | "female";
  peso: number;
  altura: number;
  faixa: (typeof Faixas)[number];
  foto: string;
  categoria?: string;
};