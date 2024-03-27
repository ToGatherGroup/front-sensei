import { TAtletas } from "@/types/TAtletas";

export const apiToAtletas = (atletasApi: any[]) => {

    const atletas: TAtletas[] = atletasApi.map( (element: any) => <TAtletas>{
        id: element.id,
        name: element.nome,
        photo: element.foto
    })
    return atletas;
}