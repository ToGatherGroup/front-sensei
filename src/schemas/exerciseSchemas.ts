import Imc from "@/app/valencia/avaliacao/imc/page";
import * as yup from "yup";


const minSecValidation = yup.object().shape({
    atletaId: yup.number(),
    atletaNome: yup.string(),
    value: yup.string()
    .transform((_, val) => {
        if (val == "") return null
        return val;
    })
    .test("time_check", function (timeInput) {
        if (timeInput == null) return true;

        let error = false;

        const [minStr, segStr] = timeInput.split(":");
        try {
            const min = Number(minStr);
            const seg = Number(segStr);
            if (isNaN(min) || isNaN(seg)) error = true;

            if (min < 0 || min >= 60) error = true;

            if (seg >= 60) error = true;

        }
        catch (e) {
            return this.createError({
                message:
                "Tempo inserido é inválido.",
                path: this.path,
                });
        }

        
        if (error) return this.createError({
            message:
            "Tempo inserido é inválido.",
            path: this.path,
            });

        return true;
    })
        .nullable()
        .typeError("Verifique se inseriu corretamente o tempo"),
})

const numberValidation = yup.object().shape({
    atletaId: yup.number(),
    atletaNome: yup.string(),
    value: yup.number()
    .transform((_, val) => {
        if (val == "" || val == undefined) return null
        return Number(val);
    })
    .test("number_check", function (nInput) {
        if (nInput == null) return true;
        
        try {
            if (isNaN(nInput)) throw new Error("Valor inserido é inválido");
            
            if (nInput <= 0 ) return this.createError({
                message:
                "Valor não pode ser igual ou menor a zero.",
                path: this.path,
            });;
        }
        catch (e) {
            return this.createError({
                message:
                "Valor inserido é inválido.",
                path: this.path,
            });
        }
        
        return true;
    })
    .min(1)
    .nullable()
    .typeError("Verifique se inseriu corretamente o valor"),
})

//  Validations:

export const coreSchema = yup.object().shape({
    coreTime: yup.array()
            .of(minSecValidation)
});
export type CoreSchemaType = typeof coreSchema.__outputType;

export const forcaMaximaSchema = yup.object().shape({
    terraKg: yup.array()
    .of(numberValidation)
});
export type forcaMaximaSchemaType = typeof forcaMaximaSchema.__outputType;

export const forcaExplosivaSchema = yup.object().shape({
    impulsaoVertical: yup.array()
    .of(numberValidation)
});
export type forcaExplosivaSchemaType = typeof forcaExplosivaSchema.__outputType;

export const forcaIsometricaSchema = yup.object().shape({
    forcaIsometricaMaos: yup.array()
    .of(minSecValidation)
});
export type forcaIsometricaSchemaType = typeof forcaIsometricaSchema.__outputType;

export const mobilidadeTornozeloSchema = yup.object().shape({
    testeDeLunge: yup.array()
    .of(numberValidation)
});
export type mobilidadeTornozeloSchemaType = typeof mobilidadeTornozeloSchema.__outputType;

export const abdominalSchema = yup.object().shape({
    abdominais: yup.array()
    .of(numberValidation)
});
export type AbdominalSchemaType = typeof abdominalSchema.__outputType;

export const mmssSchema = yup.object().shape({
    flexoes: yup.array()
    .of(numberValidation)
});
export type MmssSchemaType = typeof mmssSchema.__outputType;

export const resistenciaAnaerobicaSchema = yup.object().shape({
    burpees: yup.array()
    .of(numberValidation)
});
export type resistenciaAnaerobicaSchemaType = typeof resistenciaAnaerobicaSchema.__outputType;

export const resistenciaAaerobicaSchema = yup.object().shape({
    cooper: yup.array()
    .of(numberValidation)
});
export type resistenciaAaerobicaSchemaType = typeof resistenciaAaerobicaSchema.__outputType;

export const ImcSchema = yup.object().shape({
    imc: yup.array()
    .of(yup.object().shape({
        atletaId: yup.number(),
        atletaNome: yup.string(),
        peso: yup.number()
        .transform((_, val) => {
            if (val == "" || val == undefined) return null
            return Number(String(val).replace(',', '.'));
        })
        .test("weight_check", function (weightInput) {
            if (weightInput == null) return true;
            
            try {
                if (isNaN(weightInput)) throw new Error("Peso inserido é inválido");
                
                if (weightInput <= 0 ) return this.createError({
                    message:
                    "Peso não pode ser igual ou menor a zero.",
                    path: this.path,
                });;
            }
            catch (e) {
                return this.createError({
                    message:
                    "Peso inserido é inválido.",
                    path: this.path,
                });
            }
            
            return true;
        })
            .nullable()
            .typeError("Verifique se inseriu corretamente o peso teste"),
        altura: yup.number()
        .transform((_, val) => {
            if (val == "" || val == undefined) return null
            return Number(val);
        })
        .test("height_check", function (heightInput) {
            if (heightInput == null) return true;
            
            try {
                if (isNaN(heightInput)) throw new Error("Altura inserida é inválido");
                
                if (heightInput <= 0 ) return this.createError({
                    message:
                    "Altura não pode ser igual ou menor a zero.",
                    path: this.path,
                });;
            }
            catch (e) {
                return this.createError({
                    message:
                    "Altura inserida é inválido.",
                    path: this.path,
                });
            }
            
            return true;
        })
            .nullable()
            .typeError("Verifique se inseriu corretamente a altura"),
    }))
});
export type ImcSchemaType = typeof ImcSchema.__outputType;