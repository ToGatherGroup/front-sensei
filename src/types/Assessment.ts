export enum AssessmentType {
    Tempo = 'Tempo',
    Repeticao = 'Repetição',
    Peso = 'Peso', //(kg)
    Distancia = 'Distância', // (m) e (cm)
  }

export interface Assessment {
    title: string;
    type: AssessmentType;
  }
  
  export interface ListItemProps {
    key: number;
    id: number
    itemTitle: string;
    assessments?:  Assessment | Assessment[];
    subItem?: string | string[];
  }