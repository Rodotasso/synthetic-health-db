// Chilean GES (Garantías Explícitas en Salud) Pathologies
// 87 problemas de salud con garantías - Updated 2024

export interface GESPathology {
  gesNumber: number
  name: string
  cie10Codes: string[]
  cie10Primary: string
  category: string
  targetGroup: string
  guarantees: {
    access: string
    opportunity: string
    protection: string
  }
}

// GES Categories
export const gesCategories = [
  'Cardiovascular',
  'Respiratorio',
  'Digestivo',
  'Oncológico',
  'Neurológico',
  'Musculoesquelético',
  'Oftalmológico',
  'Renal',
  'Endocrino',
  'Salud Mental',
  'Materno-Perinatal',
  'Pediátrico',
  'Infeccioso',
  'Dental',
  'Otros'
]

export const gesPathologies: GESPathology[] = [
  // Cardiovascular
  {
    gesNumber: 1,
    name: 'Insuficiencia Renal Crónica Terminal',
    cie10Codes: ['N18.5', 'N18.6'],
    cie10Primary: 'N18.5',
    category: 'Renal',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 2,
    name: 'Cardiopatías Congénitas Operables en Menores de 15 Años',
    cie10Codes: ['Q20', 'Q21', 'Q22', 'Q23', 'Q24', 'Q25'],
    cie10Primary: 'Q21.0',
    category: 'Cardiovascular',
    targetGroup: 'Menores de 15 años',
    guarantees: { access: 'Sí', opportunity: '180 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 3,
    name: 'Cáncer Cervicouterino',
    cie10Codes: ['C53', 'D06'],
    cie10Primary: 'C53.9',
    category: 'Oncológico',
    targetGroup: 'Mujeres',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 4,
    name: 'Alivio del Dolor y Cuidados Paliativos por Cáncer Avanzado',
    cie10Codes: ['C00-C97', 'Z51.5'],
    cie10Primary: 'Z51.5',
    category: 'Oncológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '5 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 5,
    name: 'Infarto Agudo del Miocardio',
    cie10Codes: ['I21', 'I22'],
    cie10Primary: 'I21.9',
    category: 'Cardiovascular',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: 'Inmediato', protection: '20% copago máximo' }
  },
  {
    gesNumber: 6,
    name: 'Diabetes Mellitus Tipo 1',
    cie10Codes: ['E10'],
    cie10Primary: 'E10.9',
    category: 'Endocrino',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '7 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 7,
    name: 'Diabetes Mellitus Tipo 2',
    cie10Codes: ['E11'],
    cie10Primary: 'E11.9',
    category: 'Endocrino',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '45 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 8,
    name: 'Cáncer de Mama en Personas de 15 Años y Más',
    cie10Codes: ['C50', 'D05'],
    cie10Primary: 'C50.9',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 9,
    name: 'Disrafias Espinales',
    cie10Codes: ['Q05', 'Q06'],
    cie10Primary: 'Q05.9',
    category: 'Neurológico',
    targetGroup: 'Menores de 15 años',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 10,
    name: 'Tratamiento Quirúrgico de Escoliosis en Menores de 25 Años',
    cie10Codes: ['M41'],
    cie10Primary: 'M41.9',
    category: 'Musculoesquelético',
    targetGroup: 'Menores de 25 años',
    guarantees: { access: 'Sí', opportunity: '180 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 11,
    name: 'Tratamiento Quirúrgico de Cataratas',
    cie10Codes: ['H25', 'H26'],
    cie10Primary: 'H25.9',
    category: 'Oftalmológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '180 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 12,
    name: 'Endoprótesis Total de Cadera en Personas de 65 Años y Más con Artrosis de Cadera con Limitación Funcional Severa',
    cie10Codes: ['M16'],
    cie10Primary: 'M16.9',
    category: 'Musculoesquelético',
    targetGroup: '65 años y más',
    guarantees: { access: 'Sí', opportunity: '240 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 13,
    name: 'Fisura Labiopalatina',
    cie10Codes: ['Q35', 'Q36', 'Q37'],
    cie10Primary: 'Q37.9',
    category: 'Pediátrico',
    targetGroup: 'Menores de 15 años',
    guarantees: { access: 'Sí', opportunity: '60 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 14,
    name: 'Cáncer en Personas Menores de 15 Años',
    cie10Codes: ['C00-C97'],
    cie10Primary: 'C91.0',
    category: 'Oncológico',
    targetGroup: 'Menores de 15 años',
    guarantees: { access: 'Sí', opportunity: '14 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 15,
    name: 'Esquizofrenia',
    cie10Codes: ['F20'],
    cie10Primary: 'F20.9',
    category: 'Salud Mental',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '20 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 16,
    name: 'Cáncer de Testículo en Personas de 15 Años y Más',
    cie10Codes: ['C62'],
    cie10Primary: 'C62.9',
    category: 'Oncológico',
    targetGroup: 'Hombres 15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 17,
    name: 'Linfomas en Personas de 15 Años y Más',
    cie10Codes: ['C81', 'C82', 'C83', 'C84', 'C85'],
    cie10Primary: 'C85.9',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 18,
    name: 'Síndrome de Inmunodeficiencia Adquirida VIH/SIDA',
    cie10Codes: ['B20', 'B21', 'B22', 'B23', 'B24', 'Z21'],
    cie10Primary: 'B24',
    category: 'Infeccioso',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '7 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 19,
    name: 'Infección Respiratoria Aguda (IRA) de Manejo Ambulatorio en Menores de 5 Años',
    cie10Codes: ['J00', 'J01', 'J02', 'J03', 'J04', 'J06', 'J20', 'J21'],
    cie10Primary: 'J06.9',
    category: 'Respiratorio',
    targetGroup: 'Menores de 5 años',
    guarantees: { access: 'Sí', opportunity: '24 horas', protection: '20% copago máximo' }
  },
  {
    gesNumber: 20,
    name: 'Neumonía Adquirida en la Comunidad de Manejo Ambulatorio en Personas de 65 Años y Más',
    cie10Codes: ['J12', 'J13', 'J14', 'J15', 'J16', 'J17', 'J18'],
    cie10Primary: 'J18.9',
    category: 'Respiratorio',
    targetGroup: '65 años y más',
    guarantees: { access: 'Sí', opportunity: '24 horas', protection: '20% copago máximo' }
  },
  {
    gesNumber: 21,
    name: 'Hipertensión Arterial Primaria o Esencial en Personas de 15 Años y Más',
    cie10Codes: ['I10'],
    cie10Primary: 'I10',
    category: 'Cardiovascular',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '45 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 22,
    name: 'Epilepsia no Refractaria en Personas desde 1 Año y Menores de 15 Años',
    cie10Codes: ['G40'],
    cie10Primary: 'G40.9',
    category: 'Neurológico',
    targetGroup: '1-14 años',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 23,
    name: 'Salud Oral Integral para Niños de 6 Años',
    cie10Codes: ['K02', 'K04', 'K05'],
    cie10Primary: 'K02.9',
    category: 'Dental',
    targetGroup: '6 años',
    guarantees: { access: 'Sí', opportunity: '90 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 24,
    name: 'Prevención de Parto Prematuro',
    cie10Codes: ['O60'],
    cie10Primary: 'O60.0',
    category: 'Materno-Perinatal',
    targetGroup: 'Embarazadas',
    guarantees: { access: 'Sí', opportunity: '24 horas', protection: '20% copago máximo' }
  },
  {
    gesNumber: 25,
    name: 'Trastornos de Generación del Impulso y Conducción en Personas de 15 Años y Más que Requieren Marcapaso',
    cie10Codes: ['I44', 'I45', 'I49'],
    cie10Primary: 'I44.2',
    category: 'Cardiovascular',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 26,
    name: 'Colecistectomía Preventiva del Cáncer de Vesícula en Personas de 35 a 49 Años',
    cie10Codes: ['K80'],
    cie10Primary: 'K80.2',
    category: 'Digestivo',
    targetGroup: '35-49 años',
    guarantees: { access: 'Sí', opportunity: '90 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 27,
    name: 'Cáncer Gástrico',
    cie10Codes: ['C16'],
    cie10Primary: 'C16.9',
    category: 'Oncológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 28,
    name: 'Cáncer de Próstata en Personas de 15 Años y Más',
    cie10Codes: ['C61'],
    cie10Primary: 'C61',
    category: 'Oncológico',
    targetGroup: 'Hombres 15 años y más',
    guarantees: { access: 'Sí', opportunity: '60 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 29,
    name: 'Vicios de Refracción en Personas de 65 Años y Más',
    cie10Codes: ['H52'],
    cie10Primary: 'H52.4',
    category: 'Oftalmológico',
    targetGroup: '65 años y más',
    guarantees: { access: 'Sí', opportunity: '180 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 30,
    name: 'Estrabismo en Menores de 9 Años',
    cie10Codes: ['H50'],
    cie10Primary: 'H50.0',
    category: 'Oftalmológico',
    targetGroup: 'Menores de 9 años',
    guarantees: { access: 'Sí', opportunity: '180 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 31,
    name: 'Retinopatía Diabética',
    cie10Codes: ['H36.0', 'E10.3', 'E11.3'],
    cie10Primary: 'H36.0',
    category: 'Oftalmológico',
    targetGroup: 'Diabéticos',
    guarantees: { access: 'Sí', opportunity: '90 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 32,
    name: 'Desprendimiento de Retina Regmatógeno no Traumático',
    cie10Codes: ['H33.0'],
    cie10Primary: 'H33.0',
    category: 'Oftalmológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '7 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 33,
    name: 'Hemofilia',
    cie10Codes: ['D66', 'D67', 'D68'],
    cie10Primary: 'D66',
    category: 'Otros',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '24 horas', protection: '20% copago máximo' }
  },
  {
    gesNumber: 34,
    name: 'Depresión en Personas de 15 Años y Más',
    cie10Codes: ['F32', 'F33'],
    cie10Primary: 'F32.9',
    category: 'Salud Mental',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 35,
    name: 'Tratamiento de la Hiperplasia Benigna de la Próstata en Personas Sintomáticas',
    cie10Codes: ['N40'],
    cie10Primary: 'N40',
    category: 'Otros',
    targetGroup: 'Hombres',
    guarantees: { access: 'Sí', opportunity: '180 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 36,
    name: 'Órtesis (o Ayudas Técnicas) para Personas de 65 Años y Más',
    cie10Codes: ['Z46.7', 'Z46.8'],
    cie10Primary: 'Z46.7',
    category: 'Otros',
    targetGroup: '65 años y más',
    guarantees: { access: 'Sí', opportunity: '20 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 37,
    name: 'Accidente Cerebrovascular Isquémico en Personas de 15 Años y Más',
    cie10Codes: ['I63', 'I64'],
    cie10Primary: 'I63.9',
    category: 'Neurológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: 'Inmediato', protection: '20% copago máximo' }
  },
  {
    gesNumber: 38,
    name: 'Enfermedad Pulmonar Obstructiva Crónica de Tratamiento Ambulatorio',
    cie10Codes: ['J44'],
    cie10Primary: 'J44.9',
    category: 'Respiratorio',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 39,
    name: 'Asma Bronquial Moderada y Severa en Menores de 15 Años',
    cie10Codes: ['J45'],
    cie10Primary: 'J45.9',
    category: 'Respiratorio',
    targetGroup: 'Menores de 15 años',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 40,
    name: 'Síndrome de Dificultad Respiratoria en el Recién Nacido',
    cie10Codes: ['P22'],
    cie10Primary: 'P22.0',
    category: 'Materno-Perinatal',
    targetGroup: 'Recién nacidos',
    guarantees: { access: 'Sí', opportunity: 'Inmediato', protection: '20% copago máximo' }
  },
  {
    gesNumber: 41,
    name: 'Tratamiento Médico en Personas de 55 Años y Más con Artrosis de Cadera y/o Rodilla, Leve o Moderada',
    cie10Codes: ['M16', 'M17'],
    cie10Primary: 'M17.9',
    category: 'Musculoesquelético',
    targetGroup: '55 años y más',
    guarantees: { access: 'Sí', opportunity: '60 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 42,
    name: 'Hemorragia Subaracnoidea Secundaria a Ruptura de Aneurismas Cerebrales',
    cie10Codes: ['I60'],
    cie10Primary: 'I60.9',
    category: 'Neurológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: 'Inmediato', protection: '20% copago máximo' }
  },
  {
    gesNumber: 43,
    name: 'Tumores Primarios del Sistema Nervioso Central en Personas de 15 Años y Más',
    cie10Codes: ['C70', 'C71', 'C72'],
    cie10Primary: 'C71.9',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 44,
    name: 'Tratamiento Quirúrgico de Hernia del Núcleo Pulposo Lumbar',
    cie10Codes: ['M51.1'],
    cie10Primary: 'M51.1',
    category: 'Musculoesquelético',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '60 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 45,
    name: 'Leucemia en Personas de 15 Años y Más',
    cie10Codes: ['C91', 'C92', 'C93', 'C94', 'C95'],
    cie10Primary: 'C92.0',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '14 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 46,
    name: 'Urgencia Odontológica Ambulatoria',
    cie10Codes: ['K04.0', 'K04.4', 'K05.2', 'K08.8', 'S02.5'],
    cie10Primary: 'K04.4',
    category: 'Dental',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '24 horas', protection: '20% copago máximo' }
  },
  {
    gesNumber: 47,
    name: 'Salud Oral Integral del Adulto de 60 Años',
    cie10Codes: ['K02', 'K04', 'K05', 'K08'],
    cie10Primary: 'K08.1',
    category: 'Dental',
    targetGroup: '60 años',
    guarantees: { access: 'Sí', opportunity: '90 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 48,
    name: 'Politraumatizado Grave',
    cie10Codes: ['T00-T07'],
    cie10Primary: 'T07',
    category: 'Otros',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: 'Inmediato', protection: '20% copago máximo' }
  },
  {
    gesNumber: 49,
    name: 'Traumatismo Craneoencefálico Moderado o Grave',
    cie10Codes: ['S06'],
    cie10Primary: 'S06.9',
    category: 'Neurológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: 'Inmediato', protection: '20% copago máximo' }
  },
  {
    gesNumber: 50,
    name: 'Trauma Ocular Grave',
    cie10Codes: ['S05'],
    cie10Primary: 'S05.9',
    category: 'Oftalmológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '72 horas', protection: '20% copago máximo' }
  },
  // Continúa con más patologías GES...
  {
    gesNumber: 51,
    name: 'Fibrosis Quística',
    cie10Codes: ['E84'],
    cie10Primary: 'E84.9',
    category: 'Respiratorio',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 52,
    name: 'Artritis Reumatoide',
    cie10Codes: ['M05', 'M06'],
    cie10Primary: 'M06.9',
    category: 'Musculoesquelético',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 53,
    name: 'Consumo Perjudicial o Dependencia de Riesgo Bajo a Moderado de Alcohol y Drogas en Menores de 20 Años',
    cie10Codes: ['F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F18', 'F19'],
    cie10Primary: 'F10.1',
    category: 'Salud Mental',
    targetGroup: 'Menores de 20 años',
    guarantees: { access: 'Sí', opportunity: '10 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 54,
    name: 'Analgesia del Parto',
    cie10Codes: ['O80'],
    cie10Primary: 'O80',
    category: 'Materno-Perinatal',
    targetGroup: 'Embarazadas',
    guarantees: { access: 'Sí', opportunity: 'En trabajo de parto', protection: '20% copago máximo' }
  },
  {
    gesNumber: 55,
    name: 'Gran Quemado',
    cie10Codes: ['T20-T32'],
    cie10Primary: 'T31.9',
    category: 'Otros',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: 'Inmediato', protection: '20% copago máximo' }
  },
  {
    gesNumber: 56,
    name: 'Hipoacusia Bilateral en Personas de 65 Años y Más que Requieren Uso de Audífono',
    cie10Codes: ['H90', 'H91'],
    cie10Primary: 'H91.9',
    category: 'Otros',
    targetGroup: '65 años y más',
    guarantees: { access: 'Sí', opportunity: '120 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 57,
    name: 'Retinopatía del Prematuro',
    cie10Codes: ['H35.1'],
    cie10Primary: 'H35.1',
    category: 'Oftalmológico',
    targetGroup: 'Recién nacidos prematuros',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 58,
    name: 'Displasia Broncopulmonar del Prematuro',
    cie10Codes: ['P27.1'],
    cie10Primary: 'P27.1',
    category: 'Materno-Perinatal',
    targetGroup: 'Recién nacidos prematuros',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 59,
    name: 'Hipoacusia Neurosensorial Bilateral del Prematuro',
    cie10Codes: ['H90.3'],
    cie10Primary: 'H90.3',
    category: 'Pediátrico',
    targetGroup: 'Recién nacidos prematuros',
    guarantees: { access: 'Sí', opportunity: '60 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 60,
    name: 'Epilepsia no Refractaria en Personas de 15 Años y Más',
    cie10Codes: ['G40'],
    cie10Primary: 'G40.9',
    category: 'Neurológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 61,
    name: 'Asma Bronquial en Personas de 15 Años y Más',
    cie10Codes: ['J45'],
    cie10Primary: 'J45.9',
    category: 'Respiratorio',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 62,
    name: 'Enfermedad de Parkinson',
    cie10Codes: ['G20'],
    cie10Primary: 'G20',
    category: 'Neurológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '20 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 63,
    name: 'Artritis Idiopática Juvenil',
    cie10Codes: ['M08'],
    cie10Primary: 'M08.9',
    category: 'Musculoesquelético',
    targetGroup: 'Menores de 18 años',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 64,
    name: 'Prevención Secundaria Enfermedad Renal Crónica Terminal',
    cie10Codes: ['N18'],
    cie10Primary: 'N18.4',
    category: 'Renal',
    targetGroup: 'Diabéticos e hipertensos',
    guarantees: { access: 'Sí', opportunity: '90 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 65,
    name: 'Displasia Luxante de Caderas',
    cie10Codes: ['Q65'],
    cie10Primary: 'Q65.9',
    category: 'Pediátrico',
    targetGroup: 'Menores de 2 años',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 66,
    name: 'Salud Oral Integral de la Embarazada',
    cie10Codes: ['K02', 'K04', 'K05'],
    cie10Primary: 'K05.1',
    category: 'Dental',
    targetGroup: 'Embarazadas',
    guarantees: { access: 'Sí', opportunity: '60 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 67,
    name: 'Esclerosis Múltiple Remitente Recurrente',
    cie10Codes: ['G35'],
    cie10Primary: 'G35',
    category: 'Neurológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 68,
    name: 'Hepatitis B',
    cie10Codes: ['B16', 'B18.1'],
    cie10Primary: 'B18.1',
    category: 'Infeccioso',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 69,
    name: 'Hepatitis C',
    cie10Codes: ['B17.1', 'B18.2'],
    cie10Primary: 'B18.2',
    category: 'Infeccioso',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 70,
    name: 'Cáncer Colorrectal en Personas de 15 Años y Más',
    cie10Codes: ['C18', 'C19', 'C20'],
    cie10Primary: 'C18.9',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 71,
    name: 'Cáncer de Ovario Epitelial',
    cie10Codes: ['C56'],
    cie10Primary: 'C56',
    category: 'Oncológico',
    targetGroup: 'Mujeres',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 72,
    name: 'Cáncer de Vejiga en Personas de 15 Años y Más',
    cie10Codes: ['C67'],
    cie10Primary: 'C67.9',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 73,
    name: 'Osteosarcoma en Personas de 15 Años y Más',
    cie10Codes: ['C40', 'C41'],
    cie10Primary: 'C40.9',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 74,
    name: 'Tratamiento Quirúrgico de Lesiones Crónicas de la Válvula Aórtica en Personas de 15 Años y Más',
    cie10Codes: ['I35'],
    cie10Primary: 'I35.0',
    category: 'Cardiovascular',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '120 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 75,
    name: 'Tratamiento Quirúrgico de Lesiones Crónicas de las Válvulas Mitral y Tricúspide en Personas de 15 Años y Más',
    cie10Codes: ['I34', 'I36'],
    cie10Primary: 'I34.0',
    category: 'Cardiovascular',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '120 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 76,
    name: 'Trastorno Bipolar en Personas de 15 Años y Más',
    cie10Codes: ['F31'],
    cie10Primary: 'F31.9',
    category: 'Salud Mental',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 77,
    name: 'Hipotiroidismo en Personas de 15 Años y Más',
    cie10Codes: ['E03'],
    cie10Primary: 'E03.9',
    category: 'Endocrino',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '45 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 78,
    name: 'Tratamiento de Erradicación del Helicobacter Pylori',
    cie10Codes: ['B96.8', 'K29'],
    cie10Primary: 'K29.9',
    category: 'Digestivo',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 79,
    name: 'Cáncer de Pulmón en Personas de 15 Años y Más',
    cie10Codes: ['C34'],
    cie10Primary: 'C34.9',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 80,
    name: 'Cáncer de Tiroides Diferenciado y Medular en Personas de 15 Años y Más',
    cie10Codes: ['C73'],
    cie10Primary: 'C73',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 81,
    name: 'Cáncer Renal en Personas de 15 Años y Más',
    cie10Codes: ['C64'],
    cie10Primary: 'C64',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 82,
    name: 'Mieloma Múltiple en Personas de 15 Años y Más',
    cie10Codes: ['C90.0'],
    cie10Primary: 'C90.0',
    category: 'Oncológico',
    targetGroup: '15 años y más',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 83,
    name: 'Enfermedad de Alzheimer y Otras Demencias',
    cie10Codes: ['G30', 'F00', 'F01', 'F02', 'F03'],
    cie10Primary: 'G30.9',
    category: 'Neurológico',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 84,
    name: 'Atención Integral de Salud en Agresión Sexual Aguda',
    cie10Codes: ['T74.2', 'Y05'],
    cie10Primary: 'T74.2',
    category: 'Otros',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '72 horas', protection: '20% copago máximo' }
  },
  {
    gesNumber: 85,
    name: 'Lupus Eritematoso Sistémico',
    cie10Codes: ['M32'],
    cie10Primary: 'M32.9',
    category: 'Musculoesquelético',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 86,
    name: 'Trastorno del Espectro Autista',
    cie10Codes: ['F84'],
    cie10Primary: 'F84.0',
    category: 'Salud Mental',
    targetGroup: 'Menores de 18 años',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
  {
    gesNumber: 87,
    name: 'Enfermedad de Chagas',
    cie10Codes: ['B57'],
    cie10Primary: 'B57.2',
    category: 'Infeccioso',
    targetGroup: 'Todo beneficiario',
    guarantees: { access: 'Sí', opportunity: '30 días', protection: '20% copago máximo' }
  },
]

// Helper functions
export const getGESByNumber = (number: number): GESPathology | undefined => {
  return gesPathologies.find(g => g.gesNumber === number)
}

export const getGESByCIE10 = (cie10Code: string): GESPathology[] => {
  return gesPathologies.filter(g => 
    g.cie10Codes.some(c => cie10Code.startsWith(c.replace('.', '').substring(0, 3)))
  )
}

export const getGESByCategory = (category: string): GESPathology[] => {
  return gesPathologies.filter(g => g.category === category)
}

// Distribution of GES diagnoses by category (for realistic data generation)
export const gesCategoryDistribution = {
  'Cardiovascular': 0.18,
  'Respiratorio': 0.12,
  'Oncológico': 0.15,
  'Endocrino': 0.12,
  'Neurológico': 0.10,
  'Musculoesquelético': 0.08,
  'Salud Mental': 0.10,
  'Materno-Perinatal': 0.05,
  'Oftalmológico': 0.04,
  'Dental': 0.03,
  'Renal': 0.02,
  'Infeccioso': 0.01,
}
