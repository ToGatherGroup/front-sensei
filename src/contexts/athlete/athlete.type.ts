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