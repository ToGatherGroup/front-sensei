import Button from "../Button/Button";

type ListAthletesProps = {
    listAthletes: AthletesProps[];
}

type AthletesProps = {
    id: number | string;
    name: string;
}

export default function ListAthletes({ listAthletes } : ListAthletesProps){
    return (
        <form className="bg-defaultGray px-36 py-20 rounded-md">
            <h2 className="font-bold uppercase text-4xl mb-10">Lista de Atletas</h2>
            <ul className="w-full">
                {listAthletes.map((athlete) => (
                    <li className="flex items-center justify-start gap-2 mb-3" key={athlete.id}>
                        <input id="idAthlete" type="checkbox" value={athlete.id} className="w-6 h-6 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <span className="uppercase text-lg whitespace-nowrap">{athlete.name}</span>
                    </li>
                ))}
            </ul>
            <Button label="Finalizar Chamada" type="submit" />
            <Button label="Finalizar Chamada" type="submit" style="btn_red" align="left"/>
            <Button label="Finalizar Chamada" type="submit" style="btn_white" align="right"/>
        </form>
    )
}