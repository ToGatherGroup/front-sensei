import { Faixas } from "@/enums/faixas";

export type IAtleta = {
    name: string;
    email: string;
    birthdate: Date;
    sex: "male" | "female";
    weight: number;
    height: number;
    faixa: (typeof Faixas)[number];
    avatar: string;
}