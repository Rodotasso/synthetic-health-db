// Laboratory Tests with LOINC codes and Chilean reference ranges
// Based on ISP Chile guidelines and international standards

export interface LabTest {
  loincCode: string
  name: string
  shortName: string
  category: string
  unit: string
  specimen: string
  referenceRanges: {
    group: string
    low: number
    high: number
    criticalLow?: number
    criticalHigh?: number
  }[]
  interpretation: {
    L: string
    N: string
    H: string
    LL?: string
    HH?: string
  }
}

export const labCategories = [
  'Hematología',
  'Química Clínica',
  'Perfil Lipídico',
  'Función Renal',
  'Función Hepática',
  'Electrolitos',
  'Glicemia',
  'Función Tiroidea',
  'Orina',
  'Coagulación',
  'Marcadores Cardíacos',
  'Marcadores Tumorales'
]

export const labTests: LabTest[] = [
  // Hematología
  {
    loincCode: '718-7',
    name: 'Hemoglobina',
    shortName: 'Hb',
    category: 'Hematología',
    unit: 'g/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Hombres adultos', low: 13.5, high: 17.5, criticalLow: 7, criticalHigh: 20 },
      { group: 'Mujeres adultas', low: 12.0, high: 16.0, criticalLow: 7, criticalHigh: 20 },
      { group: 'Niños 6-12 años', low: 11.5, high: 15.5 },
      { group: 'Embarazadas', low: 11.0, high: 14.0 }
    ],
    interpretation: { L: 'Anemia', N: 'Normal', H: 'Policitemia', LL: 'Anemia severa', HH: 'Policitemia severa' }
  },
  {
    loincCode: '789-8',
    name: 'Hematocrito',
    shortName: 'Hto',
    category: 'Hematología',
    unit: '%',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Hombres adultos', low: 40, high: 54, criticalLow: 20, criticalHigh: 60 },
      { group: 'Mujeres adultas', low: 36, high: 48, criticalLow: 20, criticalHigh: 60 },
      { group: 'Niños', low: 35, high: 45 }
    ],
    interpretation: { L: 'Anemia/Hemodilución', N: 'Normal', H: 'Deshidratación/Policitemia' }
  },
  {
    loincCode: '6690-2',
    name: 'Leucocitos',
    shortName: 'GB',
    category: 'Hematología',
    unit: 'x10³/µL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 4.5, high: 11.0, criticalLow: 2.0, criticalHigh: 30.0 },
      { group: 'Niños', low: 5.0, high: 15.0 }
    ],
    interpretation: { L: 'Leucopenia', N: 'Normal', H: 'Leucocitosis', LL: 'Inmunosupresión', HH: 'Posible leucemia' }
  },
  {
    loincCode: '777-3',
    name: 'Plaquetas',
    shortName: 'PLT',
    category: 'Hematología',
    unit: 'x10³/µL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 150, high: 400, criticalLow: 50, criticalHigh: 1000 }
    ],
    interpretation: { L: 'Trombocitopenia', N: 'Normal', H: 'Trombocitosis', LL: 'Riesgo de sangrado', HH: 'Riesgo trombótico' }
  },
  {
    loincCode: '787-2',
    name: 'Volumen Corpuscular Medio',
    shortName: 'VCM',
    category: 'Hematología',
    unit: 'fL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 80, high: 100 }
    ],
    interpretation: { L: 'Microcitosis', N: 'Normocitosis', H: 'Macrocitosis' }
  },

  // Química Clínica - Glicemia
  {
    loincCode: '2345-7',
    name: 'Glucosa en ayunas',
    shortName: 'Glicemia',
    category: 'Glicemia',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 70, high: 100, criticalLow: 40, criticalHigh: 400 },
      { group: 'Niños', low: 60, high: 100 }
    ],
    interpretation: { L: 'Hipoglicemia', N: 'Normal', H: 'Hiperglicemia', LL: 'Hipoglicemia severa', HH: 'Cetoacidosis diabética' }
  },
  {
    loincCode: '4548-4',
    name: 'Hemoglobina glicosilada',
    shortName: 'HbA1c',
    category: 'Glicemia',
    unit: '%',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'No diabético', low: 4.0, high: 5.7 },
      { group: 'Prediabetes', low: 5.7, high: 6.4 },
      { group: 'Diabético controlado', low: 6.5, high: 7.0 }
    ],
    interpretation: { L: 'Buen control', N: 'Normal', H: 'Control inadecuado' }
  },

  // Perfil Lipídico
  {
    loincCode: '2093-3',
    name: 'Colesterol Total',
    shortName: 'Col Total',
    category: 'Perfil Lipídico',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos deseable', low: 0, high: 200 },
      { group: 'Límite alto', low: 200, high: 239 },
      { group: 'Alto', low: 240, high: 500 }
    ],
    interpretation: { L: 'Bajo', N: 'Deseable', H: 'Elevado - Riesgo CV' }
  },
  {
    loincCode: '2085-9',
    name: 'Colesterol HDL',
    shortName: 'HDL',
    category: 'Perfil Lipídico',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Hombres', low: 40, high: 60 },
      { group: 'Mujeres', low: 50, high: 60 }
    ],
    interpretation: { L: 'Bajo - Riesgo CV', N: 'Normal', H: 'Protector' }
  },
  {
    loincCode: '2089-1',
    name: 'Colesterol LDL',
    shortName: 'LDL',
    category: 'Perfil Lipídico',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Óptimo', low: 0, high: 100 },
      { group: 'Cercano a óptimo', low: 100, high: 129 },
      { group: 'Límite alto', low: 130, high: 159 },
      { group: 'Alto', low: 160, high: 189 }
    ],
    interpretation: { L: 'Óptimo', N: 'Aceptable', H: 'Elevado - Riesgo CV' }
  },
  {
    loincCode: '2571-8',
    name: 'Triglicéridos',
    shortName: 'TG',
    category: 'Perfil Lipídico',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Normal', low: 0, high: 150 },
      { group: 'Límite alto', low: 150, high: 199 },
      { group: 'Alto', low: 200, high: 499 },
      { group: 'Muy alto', low: 500, high: 2000 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Elevado - Riesgo CV' }
  },

  // Función Renal
  {
    loincCode: '2160-0',
    name: 'Creatinina sérica',
    shortName: 'Creat',
    category: 'Función Renal',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Hombres', low: 0.7, high: 1.3, criticalHigh: 10 },
      { group: 'Mujeres', low: 0.6, high: 1.1, criticalHigh: 10 },
      { group: 'Niños', low: 0.3, high: 0.7 }
    ],
    interpretation: { L: 'Masa muscular baja', N: 'Normal', H: 'Insuficiencia renal', HH: 'IRC avanzada' }
  },
  {
    loincCode: '3094-0',
    name: 'Nitrógeno ureico (BUN)',
    shortName: 'BUN',
    category: 'Función Renal',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 7, high: 20, criticalHigh: 100 }
    ],
    interpretation: { L: 'Desnutrición/Hepatopatía', N: 'Normal', H: 'Insuficiencia renal/Deshidratación' }
  },
  {
    loincCode: '33914-3',
    name: 'Tasa de Filtración Glomerular estimada',
    shortName: 'TFGe',
    category: 'Función Renal',
    unit: 'mL/min/1.73m²',
    specimen: 'Calculado',
    referenceRanges: [
      { group: 'Normal (G1)', low: 90, high: 150 },
      { group: 'Leve (G2)', low: 60, high: 89 },
      { group: 'Moderada (G3a)', low: 45, high: 59 },
      { group: 'Moderada-severa (G3b)', low: 30, high: 44 },
      { group: 'Severa (G4)', low: 15, high: 29 },
      { group: 'Falla renal (G5)', low: 0, high: 15 }
    ],
    interpretation: { L: 'ERC avanzada', N: 'Normal', H: 'Hiperfiltración' }
  },

  // Función Hepática
  {
    loincCode: '1742-6',
    name: 'Alanina aminotransferasa',
    shortName: 'ALT/GPT',
    category: 'Función Hepática',
    unit: 'U/L',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Hombres', low: 7, high: 56, criticalHigh: 1000 },
      { group: 'Mujeres', low: 7, high: 45, criticalHigh: 1000 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Daño hepático', HH: 'Hepatitis aguda' }
  },
  {
    loincCode: '1920-8',
    name: 'Aspartato aminotransferasa',
    shortName: 'AST/GOT',
    category: 'Función Hepática',
    unit: 'U/L',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 10, high: 40, criticalHigh: 1000 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Daño hepático/cardíaco' }
  },
  {
    loincCode: '6768-6',
    name: 'Fosfatasa alcalina',
    shortName: 'FA',
    category: 'Función Hepática',
    unit: 'U/L',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 44, high: 147 },
      { group: 'Niños en crecimiento', low: 100, high: 400 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Obstrucción biliar/Enfermedad ósea' }
  },
  {
    loincCode: '1975-2',
    name: 'Bilirrubina total',
    shortName: 'BT',
    category: 'Función Hepática',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 0.1, high: 1.2, criticalHigh: 15 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Ictericia', HH: 'Ictericia severa' }
  },
  {
    loincCode: '2336-6',
    name: 'Gamma-glutamil transferasa',
    shortName: 'GGT',
    category: 'Función Hepática',
    unit: 'U/L',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Hombres', low: 0, high: 60 },
      { group: 'Mujeres', low: 0, high: 40 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Enfermedad hepática/Alcoholismo' }
  },
  {
    loincCode: '1751-7',
    name: 'Albúmina sérica',
    shortName: 'Alb',
    category: 'Función Hepática',
    unit: 'g/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 3.5, high: 5.0, criticalLow: 1.5 }
    ],
    interpretation: { L: 'Desnutrición/Hepatopatía', N: 'Normal', H: 'Deshidratación' }
  },

  // Electrolitos
  {
    loincCode: '2951-2',
    name: 'Sodio sérico',
    shortName: 'Na',
    category: 'Electrolitos',
    unit: 'mEq/L',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 136, high: 145, criticalLow: 120, criticalHigh: 160 }
    ],
    interpretation: { L: 'Hiponatremia', N: 'Normal', H: 'Hipernatremia', LL: 'Hiponatremia severa', HH: 'Hipernatremia severa' }
  },
  {
    loincCode: '2823-3',
    name: 'Potasio sérico',
    shortName: 'K',
    category: 'Electrolitos',
    unit: 'mEq/L',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 3.5, high: 5.0, criticalLow: 2.5, criticalHigh: 6.5 }
    ],
    interpretation: { L: 'Hipokalemia', N: 'Normal', H: 'Hiperkalemia', LL: 'Riesgo de arritmia', HH: 'Riesgo de arritmia' }
  },
  {
    loincCode: '2075-0',
    name: 'Cloro sérico',
    shortName: 'Cl',
    category: 'Electrolitos',
    unit: 'mEq/L',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 98, high: 106 }
    ],
    interpretation: { L: 'Hipocloremia', N: 'Normal', H: 'Hipercloremia' }
  },
  {
    loincCode: '17861-6',
    name: 'Calcio sérico',
    shortName: 'Ca',
    category: 'Electrolitos',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 8.5, high: 10.5, criticalLow: 6.0, criticalHigh: 13.0 }
    ],
    interpretation: { L: 'Hipocalcemia', N: 'Normal', H: 'Hipercalcemia' }
  },
  {
    loincCode: '2601-3',
    name: 'Magnesio sérico',
    shortName: 'Mg',
    category: 'Electrolitos',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 1.7, high: 2.2 }
    ],
    interpretation: { L: 'Hipomagnesemia', N: 'Normal', H: 'Hipermagnesemia' }
  },
  {
    loincCode: '2777-1',
    name: 'Fósforo sérico',
    shortName: 'P',
    category: 'Electrolitos',
    unit: 'mg/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 2.5, high: 4.5 }
    ],
    interpretation: { L: 'Hipofosfatemia', N: 'Normal', H: 'Hiperfosfatemia' }
  },

  // Función Tiroidea
  {
    loincCode: '3016-3',
    name: 'Hormona estimulante de tiroides',
    shortName: 'TSH',
    category: 'Función Tiroidea',
    unit: 'µUI/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 0.4, high: 4.0 },
      { group: 'Embarazo 1er trimestre', low: 0.1, high: 2.5 }
    ],
    interpretation: { L: 'Hipertiroidismo', N: 'Eutiroidismo', H: 'Hipotiroidismo' }
  },
  {
    loincCode: '3026-2',
    name: 'Tiroxina libre',
    shortName: 'T4 libre',
    category: 'Función Tiroidea',
    unit: 'ng/dL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 0.8, high: 1.8 }
    ],
    interpretation: { L: 'Hipotiroidismo', N: 'Normal', H: 'Hipertiroidismo' }
  },
  {
    loincCode: '3053-6',
    name: 'Triyodotironina libre',
    shortName: 'T3 libre',
    category: 'Función Tiroidea',
    unit: 'pg/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 2.3, high: 4.2 }
    ],
    interpretation: { L: 'Hipotiroidismo', N: 'Normal', H: 'Hipertiroidismo/T3 toxicosis' }
  },

  // Coagulación
  {
    loincCode: '5902-2',
    name: 'Tiempo de Protrombina',
    shortName: 'TP',
    category: 'Coagulación',
    unit: 'segundos',
    specimen: 'Plasma citratado',
    referenceRanges: [
      { group: 'Adultos', low: 11, high: 13.5, criticalHigh: 30 }
    ],
    interpretation: { L: 'Hipercoagulabilidad', N: 'Normal', H: 'Anticoagulación/Hepatopatía' }
  },
  {
    loincCode: '6301-6',
    name: 'INR',
    shortName: 'INR',
    category: 'Coagulación',
    unit: 'ratio',
    specimen: 'Plasma citratado',
    referenceRanges: [
      { group: 'Sin anticoagulación', low: 0.8, high: 1.2 },
      { group: 'Anticoagulación oral', low: 2.0, high: 3.0, criticalHigh: 5.0 }
    ],
    interpretation: { L: 'Normal/Subóptimo', N: 'Rango terapéutico', H: 'Sobreanticoagulación' }
  },
  {
    loincCode: '3173-2',
    name: 'Tiempo de Tromboplastina Parcial Activada',
    shortName: 'TTPA',
    category: 'Coagulación',
    unit: 'segundos',
    specimen: 'Plasma citratado',
    referenceRanges: [
      { group: 'Adultos', low: 25, high: 35, criticalHigh: 100 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Deficiencia factores/Heparina' }
  },
  {
    loincCode: '3255-7',
    name: 'Fibrinógeno',
    shortName: 'Fib',
    category: 'Coagulación',
    unit: 'mg/dL',
    specimen: 'Plasma citratado',
    referenceRanges: [
      { group: 'Adultos', low: 200, high: 400, criticalLow: 100 }
    ],
    interpretation: { L: 'Hipofibrinogenemia/CID', N: 'Normal', H: 'Inflamación/Infección' }
  },

  // Orina
  {
    loincCode: '5811-5',
    name: 'Gravedad específica urinaria',
    shortName: 'GE orina',
    category: 'Orina',
    unit: 'ratio',
    specimen: 'Orina',
    referenceRanges: [
      { group: 'Adultos', low: 1.005, high: 1.030 }
    ],
    interpretation: { L: 'Orina diluida', N: 'Normal', H: 'Orina concentrada' }
  },
  {
    loincCode: '2349-9',
    name: 'Glucosa en orina',
    shortName: 'Glucosuria',
    category: 'Orina',
    unit: 'mg/dL',
    specimen: 'Orina',
    referenceRanges: [
      { group: 'Normal', low: 0, high: 0 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Glucosuria - Hiperglicemia/Diabetes' }
  },
  {
    loincCode: '20454-5',
    name: 'Proteínas en orina',
    shortName: 'Proteinuria',
    category: 'Orina',
    unit: 'mg/dL',
    specimen: 'Orina',
    referenceRanges: [
      { group: 'Normal', low: 0, high: 15 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Proteinuria - Daño renal' }
  },

  // Marcadores Cardíacos
  {
    loincCode: '10839-9',
    name: 'Troponina I cardíaca',
    shortName: 'TnI',
    category: 'Marcadores Cardíacos',
    unit: 'ng/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Normal', low: 0, high: 0.04, criticalHigh: 0.5 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Daño miocárdico/IAM', HH: 'IAM en curso' }
  },
  {
    loincCode: '33762-6',
    name: 'Péptido natriurético tipo B',
    shortName: 'BNP',
    category: 'Marcadores Cardíacos',
    unit: 'pg/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos < 75 años', low: 0, high: 100 },
      { group: 'Adultos >= 75 años', low: 0, high: 300 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Insuficiencia cardíaca' }
  },

  // Marcadores Tumorales
  {
    loincCode: '2857-1',
    name: 'Antígeno prostático específico',
    shortName: 'PSA',
    category: 'Marcadores Tumorales',
    unit: 'ng/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Hombres < 50 años', low: 0, high: 2.5 },
      { group: 'Hombres 50-59 años', low: 0, high: 3.5 },
      { group: 'Hombres 60-69 años', low: 0, high: 4.5 },
      { group: 'Hombres >= 70 años', low: 0, high: 6.5 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Elevado - Requiere evaluación' }
  },
  {
    loincCode: '2039-6',
    name: 'Antígeno carcinoembrionario',
    shortName: 'CEA',
    category: 'Marcadores Tumorales',
    unit: 'ng/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'No fumadores', low: 0, high: 3.0 },
      { group: 'Fumadores', low: 0, high: 5.0 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Elevado - Posible malignidad GI' }
  },
  {
    loincCode: '1668-3',
    name: 'Alfafetoproteína',
    shortName: 'AFP',
    category: 'Marcadores Tumorales',
    unit: 'ng/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 0, high: 10 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Hepatocarcinoma/Tumores germinales' }
  },
  {
    loincCode: '10334-1',
    name: 'CA 125',
    shortName: 'CA-125',
    category: 'Marcadores Tumorales',
    unit: 'U/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Mujeres', low: 0, high: 35 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Elevado - Cáncer de ovario' }
  },
  {
    loincCode: '6875-9',
    name: 'CA 19-9',
    shortName: 'CA 19-9',
    category: 'Marcadores Tumorales',
    unit: 'U/mL',
    specimen: 'Sangre venosa',
    referenceRanges: [
      { group: 'Adultos', low: 0, high: 37 }
    ],
    interpretation: { L: 'Normal', N: 'Normal', H: 'Elevado - Cáncer pancreático/biliar' }
  }
]

// Helper functions
export const getLabTestByLOINC = (loincCode: string): LabTest | undefined => {
  return labTests.find(t => t.loincCode === loincCode)
}

export const getLabTestsByCategory = (category: string): LabTest[] => {
  return labTests.filter(t => t.category === category)
}

// Get reference range for specific group
export const getReferenceRange = (test: LabTest, group: string) => {
  return test.referenceRanges.find(r => r.group.toLowerCase().includes(group.toLowerCase()))
    || test.referenceRanges[0]
}

// Interpret result
export const interpretResult = (test: LabTest, value: number, group: string = 'Adultos'): string => {
  const range = getReferenceRange(test, group)
  
  if (range.criticalLow !== undefined && value <= range.criticalLow) {
    return test.interpretation.LL || 'Crítico bajo'
  }
  if (range.criticalHigh !== undefined && value >= range.criticalHigh) {
    return test.interpretation.HH || 'Crítico alto'
  }
  if (value < range.low) return 'L'
  if (value > range.high) return 'H'
  return 'N'
}

// Common lab panels
export const labPanels = {
  'Hemograma completo': ['718-7', '789-8', '6690-2', '777-3', '787-2'],
  'Perfil lipídico': ['2093-3', '2085-9', '2089-1', '2571-8'],
  'Perfil hepático': ['1742-6', '1920-8', '6768-6', '1975-2', '2336-6', '1751-7'],
  'Perfil renal': ['2160-0', '3094-0', '33914-3'],
  'Electrolitos plasmáticos': ['2951-2', '2823-3', '2075-0'],
  'Perfil tiroideo': ['3016-3', '3026-2', '3053-6'],
  'Perfil de coagulación': ['5902-2', '6301-6', '3173-2', '3255-7'],
  'Glicemia y control metabólico': ['2345-7', '4548-4'],
}
