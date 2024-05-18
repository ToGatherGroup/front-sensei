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
        { title: '1RM Terra', slug: 'rm_terra', type: { key: "Kg", value: "number" }},
      ],
    },
    {
      key: 2,
      itemTitle: 'Força Explosiva',
      assessments: [
        { title: 'Impulsão Vertical', slug: 'impulsao_vertical', type: { key: "Cm", value: "number" }},
      ],
    },
    {
      key: 3,
      itemTitle: 'Força Isométrica',
      assessments: [
        { title: 'Força de prensão manual com quimono', slug: 'forca_isometrica_maos', type: { key: "Tempo", value: "time" } },
      ],
    },
    {
      key: 4,
      itemTitle: 'Mobilidade do Tornozelo',
      assessments: [
        { title: 'Lunge', slug: 'teste_de_lunge', type: { key: "Cm", value: "number" }},
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
        { title: 'Avaliação IMC', slug: 'peso', type: { key: "Cm", value: "number" }},
      ],
    },
  ]