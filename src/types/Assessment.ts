import { Dayjs } from "dayjs";

interface AssessmentTypeDetail {
  key: string;
  value: string;
}

export interface Assessment {
  title: string;
  slug: string;
  slugCamelCase?: string;
  altTitle?: string;
  type: AssessmentTypeDetail;
}

export interface ListItemProps {
  key: number;
  id: number;
  itemTitle: string;
  assessments?: Assessment | Assessment[];
  subItem?: string | string[];
  isIMC?: boolean;
}

type Time = `PT${number}M${number}S`; // Example: "PT1M30S"

export type IncompleteAssessmentsAPI = {
  atletaId: number;
  atletaNome: string;
  exercicios: {
    [key: string]: number | Time;
    peso: number;
    altura: number;
    prancha: Time;
    flexoes: number;
    abdominais: number;
    burpees: number;
    cooper: number;
    rmTerra: number;
    forcaIsometricaMaos: Time;
    testeDeLungeEsquerdo: number;
    testeDeLungeDireito: number;
    impulsaoVertical: number;
  };
};

export type IncompleteAssessments = {
  atletaId: number;
  atletaName: string;
  exercises: {
    weight: number;
    height: number;
    plank: Time;
    pushUps: number;
    sitUps: number;
    burpees: number;
    cooper: number;
    deadLift: number;
    handsIsometricStrength: Time;
    lungeTest: number;
    verticalThrust: number;
  };
};

export type ResponseIncompleteAssessmentAPI = {
  data: string;
  avaliacoesIncompletas: IncompleteAssessmentsAPI[];
};

export type ResponseIncompleteAssesment = {
  data: Dayjs | null;
  incompleteAssesments: IncompleteAssessments[];
};

export type AssessmentReducerState = {
  core: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    plank: Dayjs | null | undefined;
  }[];
  maximumForce: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    deadLift: number | null | undefined;
  }[];
  isometricStrength: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    handsIsometricStrength: Dayjs | null | undefined;
  }[];
  explosiveForce: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    verticalThrust: Dayjs | null | undefined;
  }[];
  ankleMobility: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    lungeTestLeft: number | null | undefined;
    lungeTestRight: number | null | undefined;
  }[];
  abdominal: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    sitUps: number | null | undefined;
  }[];
  mmss: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    pushUps: number | null | undefined;
  }[];

  anaerobicResistance: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    burpees: number | null | undefined;
  }[];
  aerobicResistance: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    cooper: number | null | undefined;
  }[];
  imc: {
    athleteId: number | undefined;
    athleteName: string | undefined;
    height: number | null | undefined;
    weight: number | null | undefined;
  }[];
};
