'use client'
import { useAthleteProvider } from "@/contexts";
import Button from "../button/index";
import { ListAthletesProps } from "@/contexts/athlete/athlete.type";

export default function ListAthletes({ listAthletes } : {listAthletes: ListAthletesProps | null}){
    const { call, success, error } = useAthleteProvider()

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const selectedIds: number[] = [];
        const checkboxes = form.querySelectorAll('input[name="ids"]:checked');
        
        checkboxes.forEach((checkbox) => {
            const inputCheckbox = checkbox as HTMLInputElement;
            const value = inputCheckbox.value;
            selectedIds.push(Number(value));
        });
        
        call(selectedIds);
    };

    return (
        <form className="bg-defaultGray px-10 py-6 sm:px-8 sm:py-4 md:px-24 md:py-16 xl:px-36 xl:py-20 rounded-md max-h-[650px] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
            <h2 className="font-bold uppercase xl:text-4xl md:text-1xl sm:text-lg text-lg xl:mb-10 md:mb-7 sm:mb-5 mb-5 text-center">Lista de Atletas</h2>
            <ul className="w-full xl:mb-10 md:mb-7 sm:mb-5 mb-5">
                {listAthletes?.data?.map((athlete) => (
                    <li className="flex items-center justify-start xl:gap-2 md:gap-1 sm:gap-1 gap-1 xl:mb-3 md:mb-2 sm:mb-1 mb-1" key={athlete?.id}>
                        <input id="idAthlete" type="checkbox" name="ids" value={athlete?.id} className="xl:w-6 md:w-5 sm:w-3 w-3 xl:h-6 md:h-5 sm:h-3 h-3 bg-gray-100 rounded-md border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <span className="uppercase xl:text-lg md:text-base sm:text-sm text-sm whitespace-nowrap">{athlete?.nome}</span>
                    </li>
                ))}
            </ul>
            <Button label="Finalizar Chamada" type="submit" />
            {success && (
                <p className="xl:text-base md:text-sm sm:text-xs text-xs text-center text-green-400 xl:mt-10 md:mt-7 sm:mt-5 mt-5 font-bold">{success}</p>
            )}
            {error && (
                <p className="xl:text-base md:text-sm sm:text-xs text-xs text-center text-orange-700 xl:mt-10 md:mt-7 sm:mt-5 mt-5 font-bold">{error}</p>
            )}
        </form>
    )
}