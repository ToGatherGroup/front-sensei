import { Faixas } from "@/enums/faixas"

export type AthleteProps = {
    id: number,
    nome: string,
    nascimento: Date,
    sexo: string,
    peso: number,
    altura: number,
    categoria: string,
    faixa: string,
    foto: string,
    email: string
}

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
