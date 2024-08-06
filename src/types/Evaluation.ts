export type Time = `PT${number}M${number}S`;

export interface IEvaluationData {
  data?: string | undefined;
  peso: number;
  altura: number;
  prancha: string;
  flexoes: number;
  abdominais: number;
  burpees: number;
  cooper: number;
  rmTerra: number;
  forcaIsometricaMaos: string;
  testeDeLungeJoelhoDireito: number;
  testeDeLungeJoelhoEsquerdo: number;
  impulsaoVertical: number;
}

export interface IEvaluationDataApi {
  data?: string | undefined;
  peso: number;
  altura: number;
  prancha: Time;
  flexoes: number;
  abdominais: number;
  burpees: number;
  cooper: number;
  rmTerra: number;
  forcaIsometricaMaos: Time;
  testeDeLungeJoelhoDireito: number;
  testeDeLungeJoelhoEsquerdo: number;
  impulsaoVertical: number;
}
