export const AVALIACOES_FISICAS = [
    {
      key: 0,
      itemTitle: 'Core',
      assessments: [
        { title: 'Prancha Isométrica', slug: 'prancha', type: { key: "Tempo", value: "time" }},
      ],
    },
    {
      key: 1,
      itemTitle: 'Força Máxima',
      assessments: [
        { title: '1RM Terra', slug: 'rmTerra', type: { key: "Kg", value: "number" }},
      ],
    },
    {
      key: 2,
      itemTitle: 'Força Explosiva',
      assessments: [
        { title: 'Impulsão Vertical', slug: 'impulsaoVertical', type: { key: "Cm", value: "number" }},
      ],
    },
    {
      key: 3,
      itemTitle: 'Força Isométrica',
      assessments: [
        { title: 'Força de prensão manual com quimono', slug: 'forcaIsometricaMaos', type: { key: "Tempo", value: "time" } },
      ],
    },
    {
      key: 4,
      itemTitle: 'Mobilidade do Tornozelo',
      assessments: [
        { title: 'Lunge', slug: 'testeDeLunge', type: { key: "Cm", value: "number" }},
      ],
    },
    {
      key: 5,
      itemTitle: 'Resistência muscular localizada',
      assessments: [
        { title: 'Abdominal', slug: 'abdominais', type: { key: "Repeticao", value: "number" }},
        { title: 'MMSS', altTitle: 'Flexão', slug: 'flexoes', type: { key: "Repeticao", value: "number" }},
      ],
    },
    {
      key: 6, 
      itemTitle: 'Resistência Anaeróbica',
      assessments: [
      { title: 'Burpee', slug: 'burpees', type: { key: "Repeticao", value: "number" }},
    ],
    },
    {
      key: 7, 
      itemTitle: 'Resistência Aeróbica',
      assessments: [
        { title: 'Teste de Cooper', slug: 'cooper', type: { key: "Metros", value: "number" }},
      ],
  },
  ]

  export const INDICES_FISICOS = [
    {
      key: 8,
      itemTitle: 'IMC',
      assessments: [
        { title: 'Peso', slug: 'peso', type: { key: "Kg", value: "number" }},
        { title: 'Altura', slug: 'altura', type: { key: "Cm", value: "number" }},
      ],
    },
  ]