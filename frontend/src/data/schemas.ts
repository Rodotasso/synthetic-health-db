import type { Schema } from '@/types'

export const schemas: Schema[] = [
  // Medical
  {
    id: 'demographics',
    name: 'Demografía',
    description: 'Datos demográficos de pacientes: edad, sexo, región, nivel socioeconómico',
    category: 'medical',
    columns: [
      { name: 'patient_id', type: 'string', description: 'ID único del paciente' },
      { name: 'age', type: 'number', description: 'Edad en años' },
      { name: 'sex', type: 'string', description: 'Sexo (M/F)' },
      { name: 'region', type: 'string', description: 'Región geográfica' },
      { name: 'ses', type: 'string', description: 'Nivel socioeconómico (A-E)' },
    ],
    analysis: ['Descriptivos', 'Pirámide poblacional'],
  },
  {
    id: 'cie10',
    name: 'CIE-10',
    description: 'Códigos de diagnóstico CIE-10 con descripciones',
    category: 'medical',
    columns: [
      { name: 'patient_id', type: 'string', description: 'ID único del paciente' },
      { name: 'code', type: 'string', description: 'Código CIE-10' },
      { name: 'description', type: 'string', description: 'Descripción del diagnóstico' },
      { name: 'date', type: 'date', description: 'Fecha del diagnóstico' },
    ],
    analysis: ['Frecuencias', 'Testing fuzzy'],
  },
  {
    id: 'encounters',
    name: 'Encuentros',
    description: 'Encuentros clínicos con fechas y servicios',
    category: 'medical',
    columns: [
      { name: 'encounter_id', type: 'string', description: 'ID del encuentro' },
      { name: 'patient_id', type: 'string', description: 'ID del paciente' },
      { name: 'date', type: 'date', description: 'Fecha del encuentro' },
      { name: 'service', type: 'string', description: 'Servicio clínico' },
      { name: 'provider_id', type: 'string', description: 'ID del proveedor' },
    ],
    analysis: ['Frecuencias', 'Utilización'],
  },

  // Epidemiology
  {
    id: 'sir',
    name: 'Modelo SIR',
    description: 'Modelo compartimental Susceptible-Infectado-Recuperado',
    category: 'epidemiology',
    columns: [
      { name: 'day', type: 'number', description: 'Día de simulación' },
      { name: 'susceptible', type: 'number', description: 'Población susceptible' },
      { name: 'infected', type: 'number', description: 'Población infectada' },
      { name: 'recovered', type: 'number', description: 'Población recuperada' },
    ],
    defaultParams: { beta: 0.3, gamma: 0.1, population: 10000, initial_infected: 10 },
    analysis: ['Curva epidémica', 'R0'],
  },
  {
    id: 'seir',
    name: 'Modelo SEIR',
    description: 'Modelo con período de latencia (Expuesto)',
    category: 'epidemiology',
    columns: [
      { name: 'day', type: 'number', description: 'Día de simulación' },
      { name: 'susceptible', type: 'number', description: 'Población susceptible' },
      { name: 'exposed', type: 'number', description: 'Población expuesta' },
      { name: 'infected', type: 'number', description: 'Población infectada' },
      { name: 'recovered', type: 'number', description: 'Población recuperada' },
    ],
    defaultParams: { beta: 0.3, sigma: 0.2, gamma: 0.1, population: 10000 },
    analysis: ['Curva epidémica', 'Período de latencia'],
  },
  {
    id: 'surveillance',
    name: 'Vigilancia',
    description: 'Datos de vigilancia epidemiológica con alertas',
    category: 'epidemiology',
    columns: [
      { name: 'week', type: 'number', description: 'Semana epidemiológica' },
      { name: 'cases', type: 'number', description: 'Número de casos' },
      { name: 'expected', type: 'number', description: 'Casos esperados' },
      { name: 'alert', type: 'boolean', description: 'Alerta activa' },
    ],
    analysis: ['Canal endémico', 'Alertas'],
  },
  {
    id: 'outbreak',
    name: 'Brote',
    description: 'Simulación de brote con generaciones de transmisión',
    category: 'epidemiology',
    columns: [
      { name: 'case_id', type: 'string', description: 'ID del caso' },
      { name: 'generation', type: 'number', description: 'Generación de transmisión' },
      { name: 'infector_id', type: 'string', description: 'ID del infectante' },
      { name: 'onset_date', type: 'date', description: 'Fecha de inicio' },
    ],
    analysis: ['Árbol de transmisión', 'Número reproductivo'],
  },

  // Biostatistics
  {
    id: 'survival_cohort',
    name: 'Cohorte de Supervivencia',
    description: 'Datos de supervivencia con censura y eventos',
    category: 'biostatistics',
    columns: [
      { name: 'patient_id', type: 'string', description: 'ID del paciente' },
      { name: 'time', type: 'number', description: 'Tiempo de seguimiento' },
      { name: 'event', type: 'boolean', description: 'Evento observado' },
      { name: 'group', type: 'string', description: 'Grupo de tratamiento' },
    ],
    defaultParams: { hazard_ratio: 0.7, median_survival: 365 },
    analysis: ['Kaplan-Meier', 'Log-rank test'],
  },
  {
    id: 'case_control',
    name: 'Caso-Control',
    description: 'Estudio de casos y controles con exposiciones',
    category: 'biostatistics',
    columns: [
      { name: 'subject_id', type: 'string', description: 'ID del sujeto' },
      { name: 'case', type: 'boolean', description: 'Caso (1) o Control (0)' },
      { name: 'exposed', type: 'boolean', description: 'Expuesto al factor' },
      { name: 'age', type: 'number', description: 'Edad' },
    ],
    defaultParams: { odds_ratio: 2.5, exposure_prevalence: 0.3 },
    analysis: ['Odds Ratio', 'Chi-cuadrado'],
  },

  // Regression
  {
    id: 'linear',
    name: 'Regresión Lineal',
    description: 'Datos para regresión lineal simple y múltiple',
    category: 'regression',
    columns: [
      { name: 'id', type: 'string', description: 'ID de observación' },
      { name: 'x1', type: 'number', description: 'Variable predictora 1' },
      { name: 'x2', type: 'number', description: 'Variable predictora 2' },
      { name: 'y', type: 'number', description: 'Variable respuesta' },
    ],
    defaultParams: { beta0: 10, beta1: 2.5, beta2: -1.5, noise: 5 },
    analysis: ['Coeficientes β', 'R²'],
  },
  {
    id: 'logistic',
    name: 'Regresión Logística',
    description: 'Datos binarios para regresión logística',
    category: 'regression',
    columns: [
      { name: 'id', type: 'string', description: 'ID de observación' },
      { name: 'x1', type: 'number', description: 'Variable predictora 1' },
      { name: 'x2', type: 'number', description: 'Variable predictora 2' },
      { name: 'outcome', type: 'boolean', description: 'Resultado binario' },
    ],
    defaultParams: { beta0: -2, beta1: 0.5, beta2: 0.8 },
    analysis: ['Odds Ratio', 'AUC-ROC'],
  },
  {
    id: 'poisson',
    name: 'Regresión Poisson',
    description: 'Datos de conteo para regresión Poisson',
    category: 'regression',
    columns: [
      { name: 'id', type: 'string', description: 'ID de observación' },
      { name: 'exposure', type: 'number', description: 'Tiempo de exposición' },
      { name: 'x1', type: 'number', description: 'Variable predictora' },
      { name: 'count', type: 'number', description: 'Conteo de eventos' },
    ],
    defaultParams: { beta0: 1, beta1: 0.3 },
    analysis: ['IRR', 'Deviance'],
  },
  {
    id: 'cox',
    name: 'Regresión Cox',
    description: 'Datos de supervivencia para modelo de riesgos proporcionales',
    category: 'regression',
    columns: [
      { name: 'id', type: 'string', description: 'ID del sujeto' },
      { name: 'time', type: 'number', description: 'Tiempo de seguimiento' },
      { name: 'event', type: 'boolean', description: 'Evento observado' },
      { name: 'treatment', type: 'boolean', description: 'Grupo de tratamiento' },
      { name: 'age', type: 'number', description: 'Edad al inicio' },
    ],
    defaultParams: { hazard_ratio_treatment: 0.6, hazard_ratio_age: 1.02 },
    analysis: ['Hazard Ratio', 'C-index'],
  },
]

export const categoryLabels: Record<string, string> = {
  medical: 'Médico',
  epidemiology: 'Epidemiología',
  biostatistics: 'Bioestadística',
  regression: 'Regresión',
}

export const categoryColors: Record<string, string> = {
  medical: 'bg-blue-500/20 text-blue-400',
  epidemiology: 'bg-green-500/20 text-green-400',
  biostatistics: 'bg-purple-500/20 text-purple-400',
  regression: 'bg-orange-500/20 text-orange-400',
}
