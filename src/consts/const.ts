import { AssessmentType } from "@/types/Assessment"

export const AVALIACOES_FISICAS = [
    {
      key: 1,
      itemTitle: 'Core',
      assessments: [
        { title: 'Prancha Isométrica', type: AssessmentType.Tempo },
      ],
    },
    {
      key: 2,
      itemTitle: 'Força Máxima',
      assessments: [
        { title: '1RM Terra', type: AssessmentType.Peso },
      ],
    },
    {
      key: 3,
      itemTitle: 'Força Explosiva',
      assessments: [
        { title: 'Impulsão Vertical', type: AssessmentType.Distancia },
      ],
    },
    {
      key: 4,
      itemTitle: 'Força Isométrica',
      assessments: [
        { title: 'Força de prensão manual com quimono', type: AssessmentType.Tempo },
      ],
    },
    {
      key: 5,
      itemTitle: 'Mobilidade do Tornozelo',
      assessments: [
        { title: 'Lunge', type: AssessmentType.Distancia },
      ],
    },
    {
      key: 6,
      itemTitle: 'Resistência muscular localizada',
      subItems: ['Abdominal', 'MMSS'],
      assessments: [
        { title: 'Abdominal', type: AssessmentType.Repeticao },
        { title: 'Flexão', type: AssessmentType.Repeticao },
      ],
    },
    {
      key: 7, 
      itemTitle: 'Resistência Anaeróbica',
      assessments: [
      { title: 'Burpee', type: AssessmentType.Repeticao },
    ],
    },
    {
      key: 8, 
      itemTitle: 'Resistência Aeróbica',
      assessments: [
      { title: 'Teste de Cooper', type: AssessmentType.Distancia },
    ],
  },
  ]

  export const INDICES_FISICOS = [
    {
      key: 9,
      itemTitle: 'IMC',
      assessments: [
        { title: 'Avaliação IMC', type: AssessmentType.Tempo },
      ],
    },
  ]