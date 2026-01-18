// Chilean National Immunization Program (PNI) 2024
// Programa Nacional de Inmunizaciones - MINSAL Chile

export interface Vaccine {
  cvxCode: string
  name: string
  shortName: string
  targetDiseases: string[]
  doses: VaccineDose[]
  route: string
  site: string
  pni: boolean
  campaign?: string
}

export interface VaccineDose {
  doseNumber: number
  doseSequence: string
  scheduledAge: string
  scheduledAgeMonths?: number
  scheduledAgeYears?: number
}

export const vaccines: Vaccine[] = [
  // Recién nacido
  {
    cvxCode: '19',
    name: 'BCG (Bacillus Calmette-Guérin)',
    shortName: 'BCG',
    targetDiseases: ['Tuberculosis meníngea', 'Tuberculosis miliar'],
    doses: [
      { doseNumber: 1, doseSequence: 'Única', scheduledAge: 'RN', scheduledAgeMonths: 0 }
    ],
    route: 'ID',
    site: 'Deltoides izquierdo',
    pni: true
  },
  {
    cvxCode: '45',
    name: 'Hepatitis B pediátrica',
    shortName: 'HepB',
    targetDiseases: ['Hepatitis B'],
    doses: [
      { doseNumber: 1, doseSequence: 'Única RN', scheduledAge: 'RN', scheduledAgeMonths: 0 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },

  // 2, 4, 6 meses
  {
    cvxCode: '107',
    name: 'Vacuna Pentavalente (DTPa-HepB-Hib)',
    shortName: 'Pentavalente',
    targetDiseases: ['Difteria', 'Tétanos', 'Pertussis', 'Hepatitis B', 'Haemophilus influenzae tipo b'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '2 meses', scheduledAgeMonths: 2 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '4 meses', scheduledAgeMonths: 4 },
      { doseNumber: 3, doseSequence: '3° dosis', scheduledAge: '6 meses', scheduledAgeMonths: 6 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },
  {
    cvxCode: '133',
    name: 'Vacuna Neumocócica conjugada 13-valente',
    shortName: 'PCV13',
    targetDiseases: ['Enfermedad neumocócica invasora', 'Neumonía', 'Otitis media'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '2 meses', scheduledAgeMonths: 2 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '4 meses', scheduledAgeMonths: 4 },
      { doseNumber: 3, doseSequence: 'Refuerzo', scheduledAge: '12 meses', scheduledAgeMonths: 12 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },
  {
    cvxCode: '89',
    name: 'Vacuna Antipoliomielítica inactivada (IPV)',
    shortName: 'Polio IPV',
    targetDiseases: ['Poliomielitis'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '2 meses', scheduledAgeMonths: 2 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '4 meses', scheduledAgeMonths: 4 },
      { doseNumber: 3, doseSequence: '3° dosis', scheduledAge: '6 meses', scheduledAgeMonths: 6 },
      { doseNumber: 4, doseSequence: 'Refuerzo', scheduledAge: '18 meses', scheduledAgeMonths: 18 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },

  // 6 meses - Influenza
  {
    cvxCode: '141',
    name: 'Vacuna Influenza',
    shortName: 'Influenza',
    targetDiseases: ['Influenza estacional'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '6 meses', scheduledAgeMonths: 6 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '7 meses', scheduledAgeMonths: 7 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral / Deltoides',
    pni: true,
    campaign: 'Campaña Influenza'
  },

  // 12 meses
  {
    cvxCode: '03',
    name: 'Vacuna Tres Vírica (SRP)',
    shortName: 'Tres Vírica',
    targetDiseases: ['Sarampión', 'Rubéola', 'Parotiditis'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '12 meses', scheduledAgeMonths: 12 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '1° básico', scheduledAgeYears: 6 }
    ],
    route: 'SC',
    site: 'Deltoides',
    pni: true
  },
  {
    cvxCode: '83',
    name: 'Vacuna Meningocócica conjugada ACWY',
    shortName: 'MenACWY',
    targetDiseases: ['Enfermedad meningocócica invasora'],
    doses: [
      { doseNumber: 1, doseSequence: 'Única', scheduledAge: '12 meses', scheduledAgeMonths: 12 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },

  // 18 meses
  {
    cvxCode: '106',
    name: 'Vacuna DTPa (Difteria, Tétanos, Pertussis acelular)',
    shortName: 'DTPa refuerzo',
    targetDiseases: ['Difteria', 'Tétanos', 'Pertussis'],
    doses: [
      { doseNumber: 1, doseSequence: '1° refuerzo', scheduledAge: '18 meses', scheduledAgeMonths: 18 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },
  {
    cvxCode: '48',
    name: 'Vacuna Haemophilus influenzae tipo b',
    shortName: 'Hib refuerzo',
    targetDiseases: ['Haemophilus influenzae tipo b'],
    doses: [
      { doseNumber: 1, doseSequence: 'Refuerzo', scheduledAge: '18 meses', scheduledAgeMonths: 18 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },
  {
    cvxCode: '43',
    name: 'Vacuna Hepatitis B pediátrica',
    shortName: 'HepB refuerzo',
    targetDiseases: ['Hepatitis B'],
    doses: [
      { doseNumber: 1, doseSequence: 'Refuerzo', scheduledAge: '18 meses', scheduledAgeMonths: 18 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral',
    pni: true
  },

  // 4 años (Pre-kinder)
  {
    cvxCode: '20',
    name: 'Vacuna DTPa (refuerzo preescolar)',
    shortName: 'DTPa 4 años',
    targetDiseases: ['Difteria', 'Tétanos', 'Pertussis'],
    doses: [
      { doseNumber: 1, doseSequence: '2° refuerzo', scheduledAge: '4 años', scheduledAgeYears: 4 }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true
  },
  {
    cvxCode: '10',
    name: 'Vacuna Antipoliomielítica oral bivalente (bOPV)',
    shortName: 'Polio oral',
    targetDiseases: ['Poliomielitis'],
    doses: [
      { doseNumber: 1, doseSequence: '2° refuerzo', scheduledAge: '4 años', scheduledAgeYears: 4 }
    ],
    route: 'Oral',
    site: 'Boca',
    pni: true
  },

  // 1° básico (6 años)
  {
    cvxCode: '94',
    name: 'Vacuna Tres Vírica (SRP) - 2° dosis',
    shortName: 'Tres Vírica 2°',
    targetDiseases: ['Sarampión', 'Rubéola', 'Parotiditis'],
    doses: [
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '1° básico', scheduledAgeYears: 6 }
    ],
    route: 'SC',
    site: 'Deltoides',
    pni: true
  },

  // 4° y 5° básico
  {
    cvxCode: '62',
    name: 'Vacuna VPH (Virus Papiloma Humano)',
    shortName: 'VPH',
    targetDiseases: ['Cáncer cervicouterino', 'Verrugas genitales'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '4° básico', scheduledAgeYears: 9 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '5° básico', scheduledAgeYears: 10 }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true
  },

  // 8° básico
  {
    cvxCode: '115',
    name: 'Vacuna dTpa (Difteria, Tétanos, Pertussis acelular - adulto)',
    shortName: 'dTpa',
    targetDiseases: ['Difteria', 'Tétanos', 'Pertussis'],
    doses: [
      { doseNumber: 1, doseSequence: 'Refuerzo escolar', scheduledAge: '8° básico', scheduledAgeYears: 13 }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true
  },

  // Embarazo
  {
    cvxCode: '115',
    name: 'Vacuna dTpa gestacional',
    shortName: 'dTpa embarazo',
    targetDiseases: ['Difteria', 'Tétanos', 'Pertussis neonatal'],
    doses: [
      { doseNumber: 1, doseSequence: 'Gestacional', scheduledAge: '28 semanas gestación', scheduledAgeMonths: undefined }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true
  },
  {
    cvxCode: '141',
    name: 'Vacuna Influenza gestacional',
    shortName: 'Influenza embarazo',
    targetDiseases: ['Influenza estacional'],
    doses: [
      { doseNumber: 1, doseSequence: 'Gestacional', scheduledAge: 'Cualquier trimestre', scheduledAgeMonths: undefined }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true,
    campaign: 'Campaña Influenza'
  },

  // Adulto mayor (65+)
  {
    cvxCode: '33',
    name: 'Vacuna Neumocócica polisacárida 23-valente',
    shortName: 'PPSV23',
    targetDiseases: ['Enfermedad neumocócica invasora', 'Neumonía'],
    doses: [
      { doseNumber: 1, doseSequence: 'Única', scheduledAge: '65 años', scheduledAgeYears: 65 }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true
  },
  {
    cvxCode: '141',
    name: 'Vacuna Influenza adulto mayor',
    shortName: 'Influenza AM',
    targetDiseases: ['Influenza estacional'],
    doses: [
      { doseNumber: 1, doseSequence: 'Anual', scheduledAge: '65+ años', scheduledAgeYears: 65 }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true,
    campaign: 'Campaña Influenza'
  },

  // COVID-19
  {
    cvxCode: '208',
    name: 'Vacuna COVID-19 (Pfizer-BioNTech)',
    shortName: 'COVID Pfizer',
    targetDiseases: ['COVID-19'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '6 meses+', scheduledAgeMonths: 6 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '21 días después', scheduledAgeMonths: undefined },
      { doseNumber: 3, doseSequence: 'Refuerzo', scheduledAge: '4 meses después', scheduledAgeMonths: undefined }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true,
    campaign: 'Campaña COVID-19'
  },
  {
    cvxCode: '211',
    name: 'Vacuna COVID-19 (Sinovac)',
    shortName: 'COVID Sinovac',
    targetDiseases: ['COVID-19'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '3 años+', scheduledAgeYears: 3 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '28 días después', scheduledAgeMonths: undefined }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: true,
    campaign: 'Campaña COVID-19'
  },

  // Hepatitis A (grupos de riesgo)
  {
    cvxCode: '52',
    name: 'Vacuna Hepatitis A',
    shortName: 'HepA',
    targetDiseases: ['Hepatitis A'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '18 meses', scheduledAgeMonths: 18 }
    ],
    route: 'IM',
    site: 'Muslo anterolateral / Deltoides',
    pni: true
  },

  // Varicela
  {
    cvxCode: '21',
    name: 'Vacuna Varicela',
    shortName: 'Varicela',
    targetDiseases: ['Varicela'],
    doses: [
      { doseNumber: 1, doseSequence: '1° dosis', scheduledAge: '18 meses', scheduledAgeMonths: 18 },
      { doseNumber: 2, doseSequence: '2° dosis', scheduledAge: '4 años', scheduledAgeYears: 4 }
    ],
    route: 'SC',
    site: 'Deltoides',
    pni: true
  },

  // Fiebre amarilla (viajeros)
  {
    cvxCode: '37',
    name: 'Vacuna Fiebre Amarilla',
    shortName: 'Fiebre Amarilla',
    targetDiseases: ['Fiebre amarilla'],
    doses: [
      { doseNumber: 1, doseSequence: 'Única', scheduledAge: '9 meses+', scheduledAgeMonths: 9 }
    ],
    route: 'SC',
    site: 'Deltoides',
    pni: false
  },

  // Rabia (post-exposición)
  {
    cvxCode: '40',
    name: 'Vacuna Antirrábica',
    shortName: 'Rabia',
    targetDiseases: ['Rabia'],
    doses: [
      { doseNumber: 1, doseSequence: 'Día 0', scheduledAge: 'Post-exposición', scheduledAgeMonths: undefined },
      { doseNumber: 2, doseSequence: 'Día 3', scheduledAge: 'Post-exposición', scheduledAgeMonths: undefined },
      { doseNumber: 3, doseSequence: 'Día 7', scheduledAge: 'Post-exposición', scheduledAgeMonths: undefined },
      { doseNumber: 4, doseSequence: 'Día 14', scheduledAge: 'Post-exposición', scheduledAgeMonths: undefined },
      { doseNumber: 5, doseSequence: 'Día 28', scheduledAge: 'Post-exposición', scheduledAgeMonths: undefined }
    ],
    route: 'IM',
    site: 'Deltoides',
    pni: false
  }
]

// Helper functions
export const getVaccineByCVX = (cvxCode: string): Vaccine | undefined => {
  return vaccines.find(v => v.cvxCode === cvxCode)
}

export const getPNIVaccines = (): Vaccine[] => {
  return vaccines.filter(v => v.pni)
}

export const getVaccinesByAge = (ageMonths: number): Vaccine[] => {
  return vaccines.filter(v => 
    v.doses.some(d => d.scheduledAgeMonths !== undefined && d.scheduledAgeMonths <= ageMonths)
  )
}

export const getCampaignVaccines = (): Vaccine[] => {
  return vaccines.filter(v => v.campaign !== undefined)
}

// Vaccine routes
export const vaccineRoutes = ['IM', 'SC', 'ID', 'Oral']

// Vaccine sites
export const vaccineSites = [
  'Deltoides',
  'Deltoides izquierdo',
  'Muslo anterolateral',
  'Boca'
]

// PNI Schedule summary by age
export const pniSchedule = [
  { age: 'Recién nacido', vaccines: ['BCG', 'HepB'] },
  { age: '2 meses', vaccines: ['Pentavalente 1°', 'PCV13 1°', 'Polio IPV 1°'] },
  { age: '4 meses', vaccines: ['Pentavalente 2°', 'PCV13 2°', 'Polio IPV 2°'] },
  { age: '6 meses', vaccines: ['Pentavalente 3°', 'Polio IPV 3°', 'Influenza 1°'] },
  { age: '7 meses', vaccines: ['Influenza 2°'] },
  { age: '12 meses', vaccines: ['Tres Vírica 1°', 'MenACWY', 'PCV13 refuerzo'] },
  { age: '18 meses', vaccines: ['DTPa refuerzo', 'Hib refuerzo', 'HepB refuerzo', 'Polio IPV refuerzo', 'Hepatitis A', 'Varicela 1°'] },
  { age: '4 años', vaccines: ['DTPa 2° refuerzo', 'Polio oral', 'Varicela 2°'] },
  { age: '1° básico', vaccines: ['Tres Vírica 2°'] },
  { age: '4° básico', vaccines: ['VPH 1° (niñas y niños)'] },
  { age: '5° básico', vaccines: ['VPH 2°'] },
  { age: '8° básico', vaccines: ['dTpa'] },
  { age: 'Embarazo', vaccines: ['dTpa (28 sem)', 'Influenza'] },
  { age: '65+ años', vaccines: ['PPSV23', 'Influenza anual'] },
]
