export enum AssessmentType {
    Tempo = 'time',
    Repeticao = 'number',
    Peso = 'number', //(kg)
    Distancia = 'number', // (m) e (cm)
  }

export interface Assessment {
    title: string;
    type: AssessmentType;
  }
  
  export interface ListItemProps {
    key?: number;
    id: number
    itemTitle: string;
    assessments?:  Assessment | Assessment[];
    subItem?: string | string[];
  }