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
}