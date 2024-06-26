export enum lesoesFront {
    ANTERIOR_TORAXICA = "Anterior Toráxica",
    ANTERIOR_ABDOMINAL = "Anterior Abdominal",
    ANTERIOR_PELVICA = "Anterior Pélvica",

    ANTERIOR_OMBRO_DIREITO = "Anterior Ombro Direito",
    ANTERIOR_BRACO_DIREITO = "Anterior Braço Direito",
    ANTERIOR_ANTEBRACO_DIREITO = "Anterior Antebraço Direito",
    ANTERIOR_FERMURAL_DIREITO = "Anterior Femural Direito",
    ANTERIOR_JOELHO_DIREITO = "Anterior Joelho Direito",
    ANTERIOR_CRURAL_DIREITO = "Anterior Crural Direito",
    ANTERIOR_PE_DIREITO = "Anterior Pé Direito",

    ANTERIOR_OMBRO_ESQUERDO = "Anterior Ombro Esquerdo",
    ANTERIOR_BRACO_ESQUERDO = "Anterior Braço Esquerdo",
    ANTERIOR_ANTEBRACO_ESQUERDO = "Anterior Antebraço Esquerdo",
    ANTERIOR_FERMURAL_ESQUERDO = "Anterior Femural Esquerdo",
    ANTERIOR_JOELHO_ESQUERDO = "Anterior Joelho Esquerdo",
    ANTERIOR_CRURAL_ESQUERDO = "Anterior Crural Esquerdo",
    ANTERIOR_PE_ESQUERDO = "Anterior Pé Esquerdo",

    // Partes mapeadas para ambas posições:
    CABECA = "Cabeça",
    MAO_DIREITA = "Mão Direita",
    MAO_ESQUERDA = "Mão Esquerda",
}

export enum lesoesBack {
    POSTERIOR_CERVICAL = "Posterior Cervical",
    POSTERIOR_TORAXICA = "Posterior Torácica",
    POSTERIOR_LOMBAR = "Posterior Lombar",
    POSTERIOR_GLUTEO = "Posterior Glúteo",

    POSTERIOR_FERMURAL_DIREITO = "Posterior Femural Direito",
    POSTERIOR_CRURAL_DIREITO = "Posterior Crural Direito",
    POSTERIOR_OMBRO_DIREITO = "Posterior Ombro Direito",
    POSTERIOR_BRACO_DIREITO = "Posterior Braço Direito",
    POSTERIOR_ANTEBRACO_DIREITO = "Posterior Antebraço Direito",

    POSTERIOR_FERMURAL_ESQUERDO = "Posterior Femural Esquerdo",
    POSTERIOR_CRURAL_ESQUERDO = "Posterior Crural Esquerdo",
    POSTERIOR_OMBRO_ESQUERDO = "Posterior Ombro Esquerdo",
    POSTERIOR_BRACO_ESQUERDO = "Posterior Braço Esquerdo",
    POSTERIOR_ANTEBRACO_ESQUERDO = "Posterior Antebraço Esquerdo",

    // Partes mapeadas para ambas posições:
    CABECA = "Cabeça",
    MAO_DIREITA = "Mão Direita",
    MAO_ESQUERDA = "Mão Esquerda",
}

export function bodyPartToOutput(bodyPartName: string) {
    let indexOfBodyPart;
    let bodyPartNameFormatted;

    indexOfBodyPart = Object.keys(lesoesFront).indexOf(bodyPartName);
    bodyPartNameFormatted = Object.values(lesoesFront)[indexOfBodyPart];
    if (bodyPartNameFormatted) {
      return bodyPartNameFormatted;
    }

    indexOfBodyPart = Object.keys(lesoesBack).indexOf(bodyPartName);
    bodyPartNameFormatted = Object.values(lesoesBack)[indexOfBodyPart];
    if (bodyPartNameFormatted) {
      return bodyPartNameFormatted;
    }
    return undefined;
  }