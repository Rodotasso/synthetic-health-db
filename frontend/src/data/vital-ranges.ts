// Vital Signs Reference Ranges - Based on Chilean Clinical Guidelines
// Sources: MINSAL Guidelines, Hospital Clínico UC, Sociedad Chilena de Pediatría

export type GrupoEtario = 
  | 'Recién nacido'      // 0-28 días
  | 'Lactante menor'     // 1-12 meses
  | 'Lactante mayor'     // 1-2 años
  | 'Preescolar'         // 2-5 años
  | 'Escolar'            // 6-11 años
  | 'Adolescente'        // 12-17 años
  | 'Adulto'             // 18-64 años
  | 'Adulto mayor'       // 65+ años

export type SignoVital = 
  | 'frecuencia_cardiaca'
  | 'frecuencia_respiratoria'
  | 'presion_sistolica'
  | 'presion_diastolica'
  | 'temperatura'
  | 'saturacion_o2'
  | 'peso'
  | 'talla'
  | 'imc'
  | 'circunferencia_cefalica'
  | 'glasgow'

export type Sexo = 'M' | 'F' | 'Ambos'

export interface RangoVital {
  signoVital: SignoVital
  nombreEspanol: string
  unidad: string
  grupoEtario: GrupoEtario
  edadMinMeses: number
  edadMaxMeses: number
  sexo: Sexo
  valorMinNormal: number
  valorMaxNormal: number
  valorCriticoBajo?: number
  valorCriticoAlto?: number
  notas?: string
}

// Comprehensive vital sign ranges by age group
export const rangosVitales: RangoVital[] = [
  // ========== FRECUENCIA CARDÍACA (lpm) ==========
  // Recién nacido (0-28 días)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Recién nacido',
    edadMinMeses: 0,
    edadMaxMeses: 1,
    sexo: 'Ambos',
    valorMinNormal: 100,
    valorMaxNormal: 160,
    valorCriticoBajo: 80,
    valorCriticoAlto: 200,
    notas: 'Puede aumentar con llanto hasta 180 lpm'
  },
  // Lactante menor (1-12 meses)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Lactante menor',
    edadMinMeses: 1,
    edadMaxMeses: 12,
    sexo: 'Ambos',
    valorMinNormal: 100,
    valorMaxNormal: 150,
    valorCriticoBajo: 80,
    valorCriticoAlto: 180
  },
  // Lactante mayor (1-2 años)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Lactante mayor',
    edadMinMeses: 12,
    edadMaxMeses: 24,
    sexo: 'Ambos',
    valorMinNormal: 90,
    valorMaxNormal: 140,
    valorCriticoBajo: 70,
    valorCriticoAlto: 170
  },
  // Preescolar (2-5 años)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Preescolar',
    edadMinMeses: 24,
    edadMaxMeses: 60,
    sexo: 'Ambos',
    valorMinNormal: 80,
    valorMaxNormal: 120,
    valorCriticoBajo: 60,
    valorCriticoAlto: 160
  },
  // Escolar (6-11 años)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Escolar',
    edadMinMeses: 72,
    edadMaxMeses: 132,
    sexo: 'Ambos',
    valorMinNormal: 70,
    valorMaxNormal: 110,
    valorCriticoBajo: 50,
    valorCriticoAlto: 140
  },
  // Adolescente (12-17 años)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Adolescente',
    edadMinMeses: 144,
    edadMaxMeses: 216,
    sexo: 'Ambos',
    valorMinNormal: 60,
    valorMaxNormal: 100,
    valorCriticoBajo: 45,
    valorCriticoAlto: 130
  },
  // Adulto (18-64 años)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 780,
    sexo: 'Ambos',
    valorMinNormal: 60,
    valorMaxNormal: 100,
    valorCriticoBajo: 40,
    valorCriticoAlto: 130,
    notas: 'Deportistas pueden tener FC en reposo de 40-50 lpm'
  },
  // Adulto mayor (65+ años)
  {
    signoVital: 'frecuencia_cardiaca',
    nombreEspanol: 'Frecuencia Cardíaca',
    unidad: 'lpm',
    grupoEtario: 'Adulto mayor',
    edadMinMeses: 780,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 60,
    valorMaxNormal: 100,
    valorCriticoBajo: 45,
    valorCriticoAlto: 120,
    notas: 'Puede ser menor si usa betabloqueadores'
  },

  // ========== FRECUENCIA RESPIRATORIA (rpm) ==========
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Recién nacido',
    edadMinMeses: 0,
    edadMaxMeses: 1,
    sexo: 'Ambos',
    valorMinNormal: 30,
    valorMaxNormal: 60,
    valorCriticoBajo: 20,
    valorCriticoAlto: 70
  },
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Lactante menor',
    edadMinMeses: 1,
    edadMaxMeses: 12,
    sexo: 'Ambos',
    valorMinNormal: 30,
    valorMaxNormal: 50,
    valorCriticoBajo: 20,
    valorCriticoAlto: 60
  },
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Lactante mayor',
    edadMinMeses: 12,
    edadMaxMeses: 24,
    sexo: 'Ambos',
    valorMinNormal: 24,
    valorMaxNormal: 40,
    valorCriticoBajo: 16,
    valorCriticoAlto: 50
  },
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Preescolar',
    edadMinMeses: 24,
    edadMaxMeses: 60,
    sexo: 'Ambos',
    valorMinNormal: 22,
    valorMaxNormal: 34,
    valorCriticoBajo: 14,
    valorCriticoAlto: 45
  },
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Escolar',
    edadMinMeses: 72,
    edadMaxMeses: 132,
    sexo: 'Ambos',
    valorMinNormal: 18,
    valorMaxNormal: 30,
    valorCriticoBajo: 12,
    valorCriticoAlto: 40
  },
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Adolescente',
    edadMinMeses: 144,
    edadMaxMeses: 216,
    sexo: 'Ambos',
    valorMinNormal: 12,
    valorMaxNormal: 20,
    valorCriticoBajo: 8,
    valorCriticoAlto: 30
  },
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 780,
    sexo: 'Ambos',
    valorMinNormal: 12,
    valorMaxNormal: 20,
    valorCriticoBajo: 8,
    valorCriticoAlto: 30
  },
  {
    signoVital: 'frecuencia_respiratoria',
    nombreEspanol: 'Frecuencia Respiratoria',
    unidad: 'rpm',
    grupoEtario: 'Adulto mayor',
    edadMinMeses: 780,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 12,
    valorMaxNormal: 22,
    valorCriticoBajo: 8,
    valorCriticoAlto: 30
  },

  // ========== PRESIÓN ARTERIAL SISTÓLICA (mmHg) ==========
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Recién nacido',
    edadMinMeses: 0,
    edadMaxMeses: 1,
    sexo: 'Ambos',
    valorMinNormal: 60,
    valorMaxNormal: 90,
    valorCriticoBajo: 50,
    valorCriticoAlto: 100
  },
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Lactante menor',
    edadMinMeses: 1,
    edadMaxMeses: 12,
    sexo: 'Ambos',
    valorMinNormal: 70,
    valorMaxNormal: 100,
    valorCriticoBajo: 60,
    valorCriticoAlto: 110
  },
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Lactante mayor',
    edadMinMeses: 12,
    edadMaxMeses: 24,
    sexo: 'Ambos',
    valorMinNormal: 80,
    valorMaxNormal: 105,
    valorCriticoBajo: 70,
    valorCriticoAlto: 115
  },
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Preescolar',
    edadMinMeses: 24,
    edadMaxMeses: 60,
    sexo: 'Ambos',
    valorMinNormal: 85,
    valorMaxNormal: 110,
    valorCriticoBajo: 75,
    valorCriticoAlto: 120
  },
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Escolar',
    edadMinMeses: 72,
    edadMaxMeses: 132,
    sexo: 'Ambos',
    valorMinNormal: 90,
    valorMaxNormal: 115,
    valorCriticoBajo: 80,
    valorCriticoAlto: 130
  },
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Adolescente',
    edadMinMeses: 144,
    edadMaxMeses: 216,
    sexo: 'Ambos',
    valorMinNormal: 100,
    valorMaxNormal: 120,
    valorCriticoBajo: 85,
    valorCriticoAlto: 140
  },
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 780,
    sexo: 'Ambos',
    valorMinNormal: 90,
    valorMaxNormal: 130,
    valorCriticoBajo: 80,
    valorCriticoAlto: 180,
    notas: 'HTA: ≥140 mmHg según guías ESC/ESH 2018'
  },
  {
    signoVital: 'presion_sistolica',
    nombreEspanol: 'Presión Arterial Sistólica',
    unidad: 'mmHg',
    grupoEtario: 'Adulto mayor',
    edadMinMeses: 780,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 90,
    valorMaxNormal: 140,
    valorCriticoBajo: 80,
    valorCriticoAlto: 180,
    notas: 'Meta terapéutica en adultos mayores: <150 mmHg'
  },

  // ========== PRESIÓN ARTERIAL DIASTÓLICA (mmHg) ==========
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Recién nacido',
    edadMinMeses: 0,
    edadMaxMeses: 1,
    sexo: 'Ambos',
    valorMinNormal: 30,
    valorMaxNormal: 60,
    valorCriticoBajo: 25,
    valorCriticoAlto: 70
  },
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Lactante menor',
    edadMinMeses: 1,
    edadMaxMeses: 12,
    sexo: 'Ambos',
    valorMinNormal: 40,
    valorMaxNormal: 65,
    valorCriticoBajo: 30,
    valorCriticoAlto: 75
  },
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Lactante mayor',
    edadMinMeses: 12,
    edadMaxMeses: 24,
    sexo: 'Ambos',
    valorMinNormal: 45,
    valorMaxNormal: 70,
    valorCriticoBajo: 35,
    valorCriticoAlto: 80
  },
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Preescolar',
    edadMinMeses: 24,
    edadMaxMeses: 60,
    sexo: 'Ambos',
    valorMinNormal: 50,
    valorMaxNormal: 70,
    valorCriticoBajo: 40,
    valorCriticoAlto: 80
  },
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Escolar',
    edadMinMeses: 72,
    edadMaxMeses: 132,
    sexo: 'Ambos',
    valorMinNormal: 55,
    valorMaxNormal: 75,
    valorCriticoBajo: 45,
    valorCriticoAlto: 85
  },
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Adolescente',
    edadMinMeses: 144,
    edadMaxMeses: 216,
    sexo: 'Ambos',
    valorMinNormal: 60,
    valorMaxNormal: 80,
    valorCriticoBajo: 50,
    valorCriticoAlto: 90
  },
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 780,
    sexo: 'Ambos',
    valorMinNormal: 60,
    valorMaxNormal: 85,
    valorCriticoBajo: 50,
    valorCriticoAlto: 110,
    notas: 'HTA: ≥90 mmHg según guías ESC/ESH 2018'
  },
  {
    signoVital: 'presion_diastolica',
    nombreEspanol: 'Presión Arterial Diastólica',
    unidad: 'mmHg',
    grupoEtario: 'Adulto mayor',
    edadMinMeses: 780,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 60,
    valorMaxNormal: 90,
    valorCriticoBajo: 50,
    valorCriticoAlto: 110
  },

  // ========== TEMPERATURA (°C) ==========
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Recién nacido',
    edadMinMeses: 0,
    edadMaxMeses: 1,
    sexo: 'Ambos',
    valorMinNormal: 36.5,
    valorMaxNormal: 37.5,
    valorCriticoBajo: 35.0,
    valorCriticoAlto: 38.0,
    notas: 'Axilar. Hipotermia neonatal <36.5°C es criterio de alarma'
  },
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Lactante menor',
    edadMinMeses: 1,
    edadMaxMeses: 12,
    sexo: 'Ambos',
    valorMinNormal: 36.5,
    valorMaxNormal: 37.5,
    valorCriticoBajo: 35.5,
    valorCriticoAlto: 39.0
  },
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Lactante mayor',
    edadMinMeses: 12,
    edadMaxMeses: 24,
    sexo: 'Ambos',
    valorMinNormal: 36.5,
    valorMaxNormal: 37.5,
    valorCriticoBajo: 35.5,
    valorCriticoAlto: 39.5
  },
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Preescolar',
    edadMinMeses: 24,
    edadMaxMeses: 60,
    sexo: 'Ambos',
    valorMinNormal: 36.5,
    valorMaxNormal: 37.5,
    valorCriticoBajo: 35.5,
    valorCriticoAlto: 40.0
  },
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Escolar',
    edadMinMeses: 72,
    edadMaxMeses: 132,
    sexo: 'Ambos',
    valorMinNormal: 36.0,
    valorMaxNormal: 37.5,
    valorCriticoBajo: 35.0,
    valorCriticoAlto: 40.0
  },
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Adolescente',
    edadMinMeses: 144,
    edadMaxMeses: 216,
    sexo: 'Ambos',
    valorMinNormal: 36.0,
    valorMaxNormal: 37.5,
    valorCriticoBajo: 35.0,
    valorCriticoAlto: 40.0
  },
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 780,
    sexo: 'Ambos',
    valorMinNormal: 36.0,
    valorMaxNormal: 37.5,
    valorCriticoBajo: 35.0,
    valorCriticoAlto: 40.0,
    notas: 'Fiebre ≥38°C, Hipotermia <35°C. Medición axilar +0.5°C para equivalente rectal'
  },
  {
    signoVital: 'temperatura',
    nombreEspanol: 'Temperatura Corporal',
    unidad: '°C',
    grupoEtario: 'Adulto mayor',
    edadMinMeses: 780,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 35.8,
    valorMaxNormal: 37.2,
    valorCriticoBajo: 35.0,
    valorCriticoAlto: 39.0,
    notas: 'Pueden tener temperatura basal más baja. Fiebre puede ser sutil'
  },

  // ========== SATURACIÓN DE OXÍGENO (%) ==========
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Recién nacido',
    edadMinMeses: 0,
    edadMaxMeses: 1,
    sexo: 'Ambos',
    valorMinNormal: 92,
    valorMaxNormal: 100,
    valorCriticoBajo: 88,
    valorCriticoAlto: 100,
    notas: 'En primeras horas puede ser 85-90%. Preductal vs postductal'
  },
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Lactante menor',
    edadMinMeses: 1,
    edadMaxMeses: 12,
    sexo: 'Ambos',
    valorMinNormal: 94,
    valorMaxNormal: 100,
    valorCriticoBajo: 90,
    valorCriticoAlto: 100
  },
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Lactante mayor',
    edadMinMeses: 12,
    edadMaxMeses: 24,
    sexo: 'Ambos',
    valorMinNormal: 94,
    valorMaxNormal: 100,
    valorCriticoBajo: 90,
    valorCriticoAlto: 100
  },
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Preescolar',
    edadMinMeses: 24,
    edadMaxMeses: 60,
    sexo: 'Ambos',
    valorMinNormal: 95,
    valorMaxNormal: 100,
    valorCriticoBajo: 90,
    valorCriticoAlto: 100
  },
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Escolar',
    edadMinMeses: 72,
    edadMaxMeses: 132,
    sexo: 'Ambos',
    valorMinNormal: 95,
    valorMaxNormal: 100,
    valorCriticoBajo: 90,
    valorCriticoAlto: 100
  },
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Adolescente',
    edadMinMeses: 144,
    edadMaxMeses: 216,
    sexo: 'Ambos',
    valorMinNormal: 95,
    valorMaxNormal: 100,
    valorCriticoBajo: 90,
    valorCriticoAlto: 100
  },
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 780,
    sexo: 'Ambos',
    valorMinNormal: 95,
    valorMaxNormal: 100,
    valorCriticoBajo: 90,
    valorCriticoAlto: 100,
    notas: 'En EPOC objetivo puede ser 88-92%. Hipoxemia <90%'
  },
  {
    signoVital: 'saturacion_o2',
    nombreEspanol: 'Saturación de Oxígeno',
    unidad: '%',
    grupoEtario: 'Adulto mayor',
    edadMinMeses: 780,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 94,
    valorMaxNormal: 100,
    valorCriticoBajo: 88,
    valorCriticoAlto: 100,
    notas: 'Puede ser menor en enfermedades pulmonares crónicas'
  },

  // ========== ESCALA DE GLASGOW ==========
  {
    signoVital: 'glasgow',
    nombreEspanol: 'Escala de Coma de Glasgow',
    unidad: 'puntos',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 15,
    valorMaxNormal: 15,
    valorCriticoBajo: 8,
    valorCriticoAlto: 15,
    notas: '15=Normal, 13-14=Leve, 9-12=Moderado, 3-8=Grave (intubar)'
  },
  {
    signoVital: 'glasgow',
    nombreEspanol: 'Escala de Coma de Glasgow',
    unidad: 'puntos',
    grupoEtario: 'Escolar',
    edadMinMeses: 72,
    edadMaxMeses: 216,
    sexo: 'Ambos',
    valorMinNormal: 15,
    valorMaxNormal: 15,
    valorCriticoBajo: 8,
    valorCriticoAlto: 15,
    notas: 'Usar escala pediátrica para menores de 5 años'
  },

  // ========== IMC (kg/m²) - Adultos ==========
  {
    signoVital: 'imc',
    nombreEspanol: 'Índice de Masa Corporal',
    unidad: 'kg/m²',
    grupoEtario: 'Adulto',
    edadMinMeses: 216,
    edadMaxMeses: 780,
    sexo: 'Ambos',
    valorMinNormal: 18.5,
    valorMaxNormal: 24.9,
    valorCriticoBajo: 16.0,
    valorCriticoAlto: 40.0,
    notas: 'Bajo peso <18.5, Sobrepeso 25-29.9, Obesidad I 30-34.9, II 35-39.9, III ≥40'
  },
  {
    signoVital: 'imc',
    nombreEspanol: 'Índice de Masa Corporal',
    unidad: 'kg/m²',
    grupoEtario: 'Adulto mayor',
    edadMinMeses: 780,
    edadMaxMeses: 1440,
    sexo: 'Ambos',
    valorMinNormal: 22.0,
    valorMaxNormal: 27.0,
    valorCriticoBajo: 18.0,
    valorCriticoAlto: 35.0,
    notas: 'En adultos mayores IMC ligeramente mayor puede ser protector'
  },
]

// Helper functions
export function getRangoVital(
  signoVital: SignoVital, 
  edadMeses: number,
  sexo?: Sexo
): RangoVital | undefined {
  return rangosVitales.find(r => 
    r.signoVital === signoVital &&
    edadMeses >= r.edadMinMeses &&
    edadMeses < r.edadMaxMeses &&
    (r.sexo === 'Ambos' || r.sexo === sexo || !sexo)
  )
}

export function getGrupoEtario(edadMeses: number): GrupoEtario {
  if (edadMeses < 1) return 'Recién nacido'
  if (edadMeses < 12) return 'Lactante menor'
  if (edadMeses < 24) return 'Lactante mayor'
  if (edadMeses < 72) return 'Preescolar'
  if (edadMeses < 144) return 'Escolar'
  if (edadMeses < 216) return 'Adolescente'
  if (edadMeses < 780) return 'Adulto'
  return 'Adulto mayor'
}

export function evaluarSignoVital(
  signoVital: SignoVital,
  valor: number,
  edadMeses: number,
  sexo?: Sexo
): 'Normal' | 'Bajo' | 'Alto' | 'Crítico bajo' | 'Crítico alto' | 'Desconocido' {
  const rango = getRangoVital(signoVital, edadMeses, sexo)
  if (!rango) return 'Desconocido'
  
  if (rango.valorCriticoBajo !== undefined && valor <= rango.valorCriticoBajo) {
    return 'Crítico bajo'
  }
  if (rango.valorCriticoAlto !== undefined && valor >= rango.valorCriticoAlto) {
    return 'Crítico alto'
  }
  if (valor < rango.valorMinNormal) return 'Bajo'
  if (valor > rango.valorMaxNormal) return 'Alto'
  return 'Normal'
}

export function generarValorNormal(
  signoVital: SignoVital,
  edadMeses: number,
  sexo?: Sexo
): number | undefined {
  const rango = getRangoVital(signoVital, edadMeses, sexo)
  if (!rango) return undefined
  
  // Generate value with normal distribution around the middle of the range
  const media = (rango.valorMinNormal + rango.valorMaxNormal) / 2
  const desviacion = (rango.valorMaxNormal - rango.valorMinNormal) / 4
  
  // Box-Muller transform for normal distribution
  const u1 = Math.random()
  const u2 = Math.random()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  
  let valor = media + z * desviacion
  
  // Clamp to normal range
  valor = Math.max(rango.valorMinNormal, Math.min(rango.valorMaxNormal, valor))
  
  // Round appropriately based on the vital sign
  if (signoVital === 'temperatura') {
    return Math.round(valor * 10) / 10  // 1 decimal
  } else if (signoVital === 'imc') {
    return Math.round(valor * 10) / 10  // 1 decimal
  } else {
    return Math.round(valor)  // Integer
  }
}

// Specific vital sign generators for convenience
export function generarFrecuenciaCardiaca(edadMeses: number): number {
  return generarValorNormal('frecuencia_cardiaca', edadMeses) ?? 75
}

export function generarFrecuenciaRespiratoria(edadMeses: number): number {
  return generarValorNormal('frecuencia_respiratoria', edadMeses) ?? 16
}

export function generarPresionSistolica(edadMeses: number): number {
  return generarValorNormal('presion_sistolica', edadMeses) ?? 120
}

export function generarPresionDiastolica(edadMeses: number): number {
  return generarValorNormal('presion_diastolica', edadMeses) ?? 80
}

export function generarTemperatura(edadMeses: number): number {
  return generarValorNormal('temperatura', edadMeses) ?? 36.8
}

export function generarSaturacionO2(edadMeses: number): number {
  return generarValorNormal('saturacion_o2', edadMeses) ?? 98
}
