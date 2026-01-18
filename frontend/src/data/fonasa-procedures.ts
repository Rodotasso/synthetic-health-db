// FONASA Procedures - Top Chilean healthcare procedures with codes
// Based on Arancel FONASA MAI (Modalidad de Atención Institucional)

export interface FonasaProcedure {
  fonasaCode: string
  name: string
  category: string
  group: string
  complexity: 'baja' | 'mediana' | 'alta'
  requiresHospitalization: boolean
  gesRelated: boolean
}

export const fonasaCategories = [
  'Consultas',
  'Procedimientos Diagnósticos',
  'Procedimientos Terapéuticos',
  'Cirugía',
  'Imagenología',
  'Laboratorio',
  'Kinesiología',
  'Salud Mental',
  'Dental',
  'Maternidad'
]

export const fonasaProcedures: FonasaProcedure[] = [
  // Consultas
  { fonasaCode: '0101001', name: 'Consulta medicina general', category: 'Consultas', group: 'Atención Primaria', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0101002', name: 'Consulta médica de especialidad', category: 'Consultas', group: 'Especialidad', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0101003', name: 'Consulta de urgencia', category: 'Consultas', group: 'Urgencia', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0101004', name: 'Consulta integral de especialidad', category: 'Consultas', group: 'Especialidad', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0101005', name: 'Control de salud', category: 'Consultas', group: 'Atención Primaria', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0101006', name: 'Control prenatal', category: 'Consultas', group: 'Maternidad', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0101007', name: 'Control de niño sano', category: 'Consultas', group: 'Atención Primaria', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0101008', name: 'Control de paciente crónico', category: 'Consultas', group: 'Atención Primaria', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0101009', name: 'Consulta cardiológica', category: 'Consultas', group: 'Especialidad', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0101010', name: 'Consulta neurológica', category: 'Consultas', group: 'Especialidad', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },

  // Imagenología
  { fonasaCode: '0401001', name: 'Radiografía de tórax (2 proyecciones)', category: 'Imagenología', group: 'Rayos X', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401002', name: 'Radiografía de columna lumbar', category: 'Imagenología', group: 'Rayos X', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401003', name: 'Radiografía de extremidad', category: 'Imagenología', group: 'Rayos X', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401004', name: 'Radiografía de cráneo', category: 'Imagenología', group: 'Rayos X', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401005', name: 'Radiografía de abdomen simple', category: 'Imagenología', group: 'Rayos X', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401101', name: 'Ecografía abdominal', category: 'Imagenología', group: 'Ecografía', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401102', name: 'Ecografía pélvica ginecológica', category: 'Imagenología', group: 'Ecografía', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401103', name: 'Ecografía obstétrica', category: 'Imagenología', group: 'Ecografía', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401104', name: 'Ecografía mamaria bilateral', category: 'Imagenología', group: 'Ecografía', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401105', name: 'Ecografía tiroidea', category: 'Imagenología', group: 'Ecografía', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401106', name: 'Ecografía renal y vesical', category: 'Imagenología', group: 'Ecografía', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401107', name: 'Ecografía doppler venoso extremidades', category: 'Imagenología', group: 'Ecografía', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401108', name: 'Ecografía doppler carotídeo', category: 'Imagenología', group: 'Ecografía', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401201', name: 'Mamografía bilateral', category: 'Imagenología', group: 'Mamografía', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401301', name: 'TAC de cerebro sin contraste', category: 'Imagenología', group: 'Tomografía', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401302', name: 'TAC de cerebro con contraste', category: 'Imagenología', group: 'Tomografía', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401303', name: 'TAC de tórax', category: 'Imagenología', group: 'Tomografía', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401304', name: 'TAC de abdomen y pelvis', category: 'Imagenología', group: 'Tomografía', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401305', name: 'TAC de columna', category: 'Imagenología', group: 'Tomografía', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401401', name: 'Resonancia magnética de cerebro', category: 'Imagenología', group: 'Resonancia', complexity: 'alta', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401402', name: 'Resonancia magnética de columna', category: 'Imagenología', group: 'Resonancia', complexity: 'alta', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0401403', name: 'Resonancia magnética de rodilla', category: 'Imagenología', group: 'Resonancia', complexity: 'alta', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0401404', name: 'Resonancia magnética cardíaca', category: 'Imagenología', group: 'Resonancia', complexity: 'alta', requiresHospitalization: false, gesRelated: false },

  // Procedimientos Diagnósticos
  { fonasaCode: '0301001', name: 'Electrocardiograma de reposo', category: 'Procedimientos Diagnósticos', group: 'Cardiología', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301002', name: 'Test de esfuerzo', category: 'Procedimientos Diagnósticos', group: 'Cardiología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301003', name: 'Holter de arritmias 24 horas', category: 'Procedimientos Diagnósticos', group: 'Cardiología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301004', name: 'Ecocardiograma transtorácico', category: 'Procedimientos Diagnósticos', group: 'Cardiología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301005', name: 'MAPA (Monitoreo ambulatorio presión arterial)', category: 'Procedimientos Diagnósticos', group: 'Cardiología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301101', name: 'Espirometría', category: 'Procedimientos Diagnósticos', group: 'Broncopulmonar', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301102', name: 'Flujometría', category: 'Procedimientos Diagnósticos', group: 'Broncopulmonar', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301103', name: 'Polisomnografía', category: 'Procedimientos Diagnósticos', group: 'Broncopulmonar', complexity: 'alta', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0301201', name: 'Endoscopía digestiva alta', category: 'Procedimientos Diagnósticos', group: 'Gastroenterología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301202', name: 'Colonoscopía', category: 'Procedimientos Diagnósticos', group: 'Gastroenterología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301203', name: 'Rectosigmoidoscopía', category: 'Procedimientos Diagnósticos', group: 'Gastroenterología', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0301301', name: 'Electroencefalograma estándar', category: 'Procedimientos Diagnósticos', group: 'Neurología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301302', name: 'Electromiografía', category: 'Procedimientos Diagnósticos', group: 'Neurología', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0301401', name: 'Cistoscopía', category: 'Procedimientos Diagnósticos', group: 'Urología', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0301501', name: 'Colposcopía', category: 'Procedimientos Diagnósticos', group: 'Ginecología', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301502', name: 'Biopsia de cuello uterino', category: 'Procedimientos Diagnósticos', group: 'Ginecología', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301503', name: 'Papanicolaou', category: 'Procedimientos Diagnósticos', group: 'Ginecología', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301601', name: 'Biopsia de piel', category: 'Procedimientos Diagnósticos', group: 'Dermatología', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0301701', name: 'Audiometría', category: 'Procedimientos Diagnósticos', group: 'Otorrinolaringología', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301702', name: 'Impedanciometría', category: 'Procedimientos Diagnósticos', group: 'Otorrinolaringología', complexity: 'baja', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '0301801', name: 'Fondo de ojo', category: 'Procedimientos Diagnósticos', group: 'Oftalmología', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301802', name: 'Tonometría', category: 'Procedimientos Diagnósticos', group: 'Oftalmología', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0301803', name: 'Campimetría computarizada', category: 'Procedimientos Diagnósticos', group: 'Oftalmología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },

  // Cirugías
  { fonasaCode: '0201001', name: 'Colecistectomía laparoscópica', category: 'Cirugía', group: 'Digestiva', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201002', name: 'Hernioplastía inguinal', category: 'Cirugía', group: 'Pared abdominal', complexity: 'mediana', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201003', name: 'Hernioplastía umbilical', category: 'Cirugía', group: 'Pared abdominal', complexity: 'mediana', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201004', name: 'Apendicectomía', category: 'Cirugía', group: 'Digestiva', complexity: 'mediana', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201005', name: 'Resección intestinal', category: 'Cirugía', group: 'Digestiva', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201006', name: 'Gastrectomía', category: 'Cirugía', group: 'Digestiva', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201101', name: 'Cirugía de bypass coronario', category: 'Cirugía', group: 'Cardíaca', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201102', name: 'Reemplazo valvular', category: 'Cirugía', group: 'Cardíaca', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201103', name: 'Instalación de marcapaso', category: 'Cirugía', group: 'Cardíaca', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201201', name: 'Craneotomía', category: 'Cirugía', group: 'Neurológica', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201202', name: 'Laminectomía', category: 'Cirugía', group: 'Neurológica', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201203', name: 'Hernia de núcleo pulposo', category: 'Cirugía', group: 'Neurológica', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201301', name: 'Prótesis total de cadera', category: 'Cirugía', group: 'Traumatología', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201302', name: 'Prótesis total de rodilla', category: 'Cirugía', group: 'Traumatología', complexity: 'alta', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201303', name: 'Osteosíntesis de fémur', category: 'Cirugía', group: 'Traumatología', complexity: 'alta', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201304', name: 'Artroscopía de rodilla', category: 'Cirugía', group: 'Traumatología', complexity: 'mediana', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201305', name: 'Corrección de escoliosis', category: 'Cirugía', group: 'Traumatología', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201401', name: 'Histerectomía', category: 'Cirugía', group: 'Ginecológica', complexity: 'alta', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201402', name: 'Cesárea', category: 'Cirugía', group: 'Ginecológica', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201403', name: 'Laparoscopía ginecológica', category: 'Cirugía', group: 'Ginecológica', complexity: 'mediana', requiresHospitalization: true, gesRelated: false },
  { fonasaCode: '0201501', name: 'Prostatectomía', category: 'Cirugía', group: 'Urológica', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201502', name: 'Nefrectomía', category: 'Cirugía', group: 'Urológica', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201503', name: 'RTU de próstata', category: 'Cirugía', group: 'Urológica', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201601', name: 'Cirugía de cataratas', category: 'Cirugía', group: 'Oftalmológica', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0201602', name: 'Corrección de estrabismo', category: 'Cirugía', group: 'Oftalmológica', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0201701', name: 'Tiroidectomía', category: 'Cirugía', group: 'Cabeza y cuello', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201702', name: 'Mastectomía', category: 'Cirugía', group: 'Mama', complexity: 'alta', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201703', name: 'Tumorectomía mamaria', category: 'Cirugía', group: 'Mama', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '0201801', name: 'Reparación de fisura labiopalatina', category: 'Cirugía', group: 'Maxilofacial', complexity: 'alta', requiresHospitalization: true, gesRelated: true },

  // Kinesiología
  { fonasaCode: '0901001', name: 'Sesión de kinesiología respiratoria', category: 'Kinesiología', group: 'Respiratoria', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0901002', name: 'Sesión de kinesiología motora', category: 'Kinesiología', group: 'Motora', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0901003', name: 'Rehabilitación cardiovascular', category: 'Kinesiología', group: 'Cardiovascular', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0901004', name: 'Rehabilitación neurológica', category: 'Kinesiología', group: 'Neurológica', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },

  // Salud Mental
  { fonasaCode: '0902001', name: 'Consulta psiquiátrica', category: 'Salud Mental', group: 'Psiquiatría', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0902002', name: 'Psicoterapia individual', category: 'Salud Mental', group: 'Psicología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0902003', name: 'Psicoterapia grupal', category: 'Salud Mental', group: 'Psicología', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '0902004', name: 'Evaluación psicológica', category: 'Salud Mental', group: 'Psicología', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },

  // Dental
  { fonasaCode: '1001001', name: 'Examen de salud oral', category: 'Dental', group: 'Diagnóstico', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '1001002', name: 'Destartraje supragingival', category: 'Dental', group: 'Periodoncia', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '1001003', name: 'Obturación resina', category: 'Dental', group: 'Operatoria', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '1001004', name: 'Exodoncia simple', category: 'Dental', group: 'Cirugía oral', complexity: 'baja', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '1001005', name: 'Exodoncia compleja', category: 'Dental', group: 'Cirugía oral', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '1001006', name: 'Endodoncia uniradicular', category: 'Dental', group: 'Endodoncia', complexity: 'mediana', requiresHospitalization: false, gesRelated: false },
  { fonasaCode: '1001007', name: 'Prótesis dental removible', category: 'Dental', group: 'Prótesis', complexity: 'mediana', requiresHospitalization: false, gesRelated: true },
  { fonasaCode: '1001008', name: 'Urgencia dental', category: 'Dental', group: 'Urgencia', complexity: 'baja', requiresHospitalization: false, gesRelated: true },

  // Maternidad
  { fonasaCode: '1101001', name: 'Parto vaginal', category: 'Maternidad', group: 'Parto', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '1101002', name: 'Atención del recién nacido', category: 'Maternidad', group: 'Neonatal', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '1101003', name: 'Hospitalización en puerperio', category: 'Maternidad', group: 'Puerperio', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
  { fonasaCode: '1101004', name: 'Analgesia del parto', category: 'Maternidad', group: 'Analgesia', complexity: 'mediana', requiresHospitalization: true, gesRelated: true },
]

// Helper functions
export const getProcedureByCode = (code: string): FonasaProcedure | undefined => {
  return fonasaProcedures.find(p => p.fonasaCode === code)
}

export const getProceduresByCategory = (category: string): FonasaProcedure[] => {
  return fonasaProcedures.filter(p => p.category === category)
}

export const getGESProcedures = (): FonasaProcedure[] => {
  return fonasaProcedures.filter(p => p.gesRelated)
}

export const getProceduresByComplexity = (complexity: 'baja' | 'mediana' | 'alta'): FonasaProcedure[] => {
  return fonasaProcedures.filter(p => p.complexity === complexity)
}

// Distribution for realistic generation
export const procedureCategoryDistribution = {
  'Consultas': 0.35,
  'Imagenología': 0.20,
  'Procedimientos Diagnósticos': 0.15,
  'Cirugía': 0.08,
  'Kinesiología': 0.07,
  'Salud Mental': 0.05,
  'Dental': 0.05,
  'Maternidad': 0.03,
  'Laboratorio': 0.02,
}
