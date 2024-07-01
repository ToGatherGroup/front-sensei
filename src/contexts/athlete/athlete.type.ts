import { Faixas } from "@/enums/faixas"

type AthleteListProps = {
    id: number,
    nome: string,
}

export type ListAthletesProps = {
    data: AthleteListProps[] | [],
}

export type AthleteProfileProps = {
    nome: string,
    idade: number,
    categoria: string,
    faixa: (typeof Faixas)[number],
    foto: string,
    medalhaDTO: MedalProps[];
}

export type MedalsProps = MedalProps[];

type MedalProps = {
    posicao: string,
    quantidade: number,
}

export type InjuriesProps = {
    date: string,
    description: string,
    regiaoLesao: string
}   
