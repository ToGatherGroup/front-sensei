import { Faixas } from "@/enums/faixas"

type AthleteListProps = {
    id: number,
    nome: string,
}

export type ListAthletesProps = {
    data: AthleteListProps[] | [],
}

// Interface para Valência
export type Valencia = {
    labels: string[];
    values: number[];
  }

export type AthleteProfileProps = {
    id?: number
    nome: string,
    peso?: number,
    altura?: number,
    idade: number,
    categoria?: string,
    faixa: ((typeof Faixas)[number]) | string,
    medalhaDTO: MedalProps[];
    valencia: Valencia;
    foto: string,
}

export type MedalsProps = MedalProps[];

type MedalProps = {
    imgSrc?: string;
    tipo?: any;
    ringColor?: string;
    medalCount?: number;
    posicao: string,
    quantidade: number,
}

export type InjuriesProps = {
    date: string,
    description: string,
    regiaoLesao: string
}   