import { ResponseIncompleteAssesment, ResponseIncompleteAssesmentAPI } from "@/types/Assessment";
import dayjs from "dayjs";

export default function incompleteAssesmentAPIToIncompleteAssesment(ResponseIncompleteAssesmentAPI: ResponseIncompleteAssesmentAPI): ResponseIncompleteAssesment {
    return {
        data: !!ResponseIncompleteAssesmentAPI.data ? dayjs(ResponseIncompleteAssesmentAPI.data) : null,
        incompleteAssesments: ResponseIncompleteAssesmentAPI.avaliacoesIncompletas.map((incompleteAssesment) => {
            return {
            atletaId: incompleteAssesment.atletaId,
            atletaName: incompleteAssesment.atletaNome,
            exercises: {
                weight: incompleteAssesment.exercicios.peso,
                height: incompleteAssesment.exercicios.altura,
                plank: incompleteAssesment.exercicios.prancha,
                pushUps: incompleteAssesment.exercicios.flexoes,
                sitUps: incompleteAssesment.exercicios.abdominais,
                burpees: incompleteAssesment.exercicios.burpees,
                cooper: incompleteAssesment.exercicios.cooper,
                deadLift: incompleteAssesment.exercicios.rmTerra,
                handsIsometricStrength: incompleteAssesment.exercicios.forcaIsometricaMaos,
                lungeTest: incompleteAssesment.exercicios.testeDeLunge,
                verticalThrust: incompleteAssesment.exercicios.impulsaoVertical,
            }
            }
        })
    }
}