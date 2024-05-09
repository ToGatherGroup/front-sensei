export const AVALIACOES_FISICAS = [
    {
      key: 0,
      itemTitle: 'Core',
      assessments: [
        { title: 'Prancha Isométrica', type: { key: "Tempo", value: "time" }},
      ],
    },
    {
      key: 1,
      itemTitle: 'Força Máxima',
      assessments: [
        { title: '1RM Terra', type: { key: "Kg", value: "number" }},
      ],
    },
    {
      key: 2,
      itemTitle: 'Força Explosiva',
      assessments: [
        { title: 'Impulsão Vertical', type: { key: "Cm", value: "number" }},
      ],
    },
    {
      key: 3,
      itemTitle: 'Força Isométrica',
      assessments: [
        { title: 'Força de prensão manual com quimono', type: { key: "Tempo", value: "time" } },
      ],
    },
    {
      key: 4,
      itemTitle: 'Mobilidade do Tornozelo',
      assessments: [
        { title: 'Lunge', type: { key: "Cm", value: "number" }},
      ],
    },
    {
      key: 5,
      itemTitle: 'Resistência muscular localizada',
      assessments: [
        { title: 'Abdominal', type: { key: "Repeticao", value: "number" }},
        { title: 'MMSS', altTitle: 'Flexão', type: { key: "Repeticao", value: "number" }},
      ],
    },
    {
      key: 6, 
      itemTitle: 'Resistência Anaeróbica',
      assessments: [
      { title: 'Burpee', type: { key: "Repeticao", value: "number" }},
    ],
    },
    {
      key: 7, 
      itemTitle: 'Resistência Aeróbica',
      assessments: [
      { title: 'Teste de Cooper', type: { key: "Metros", value: "number" }},
    ],
  },
  ]

  export const INDICES_FISICOS = [
    {
      key: 8,
      itemTitle: 'IMC',
      assessments: [
        { title: 'Avaliação IMC', type: { key: "Cm", value: "number" }},
      ],
    },
  ]