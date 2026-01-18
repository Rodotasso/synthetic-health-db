// Chilean Health Establishments Dataset - Based on DEIS MINSAL 2024
// DEIS = Departamento de Estadísticas e Información de Salud
// Reference: https://deis.minsal.cl/

export type TipoEstablecimiento = 
  | 'Hospital Alta Complejidad'
  | 'Hospital Mediana Complejidad'
  | 'Hospital Baja Complejidad'
  | 'CRS' // Centro de Referencia de Salud
  | 'CESFAM' // Centro de Salud Familiar
  | 'CECOSF' // Centro Comunitario de Salud Familiar
  | 'Posta Rural'
  | 'SAPU' // Servicio de Atención Primaria de Urgencia
  | 'SAR' // Servicio de Alta Resolución
  | 'CGR' // Centro de Gestión de Camas
  | 'Consultorio General'
  | 'Clínica Privada'
  | 'Centro Médico Privado'

export type NivelAtencion = 'Primario' | 'Secundario' | 'Terciario'

export type DependenciaAdministrativa = 
  | 'SNSS' // Sistema Nacional de Servicios de Salud (Público)
  | 'Municipal'
  | 'Privado'
  | 'FF.AA.' // Fuerzas Armadas
  | 'Universitario'

export interface OrganizacionSalud {
  codigoDeis: string
  nombre: string
  tipo: TipoEstablecimiento
  nivelAtencion: NivelAtencion
  dependencia: DependenciaAdministrativa
  servicioSalud: string
  region: string
  regionCodigo: string
  comuna: string
  direccion: string
  telefono?: string
  urgencia24h: boolean
  camasHospitalarias?: number
}

// Chilean Health Services (Servicios de Salud)
export const serviciosSalud = [
  { codigo: 'SS01', nombre: 'Servicio de Salud Arica', region: '15' },
  { codigo: 'SS02', nombre: 'Servicio de Salud Iquique', region: '01' },
  { codigo: 'SS03', nombre: 'Servicio de Salud Antofagasta', region: '02' },
  { codigo: 'SS04', nombre: 'Servicio de Salud Atacama', region: '03' },
  { codigo: 'SS05', nombre: 'Servicio de Salud Coquimbo', region: '04' },
  { codigo: 'SS06', nombre: 'Servicio de Salud Valparaíso - San Antonio', region: '05' },
  { codigo: 'SS07', nombre: 'Servicio de Salud Viña del Mar - Quillota', region: '05' },
  { codigo: 'SS08', nombre: 'Servicio de Salud Aconcagua', region: '05' },
  { codigo: 'SS09', nombre: 'Servicio de Salud Metropolitano Norte', region: '13' },
  { codigo: 'SS10', nombre: 'Servicio de Salud Metropolitano Occidente', region: '13' },
  { codigo: 'SS11', nombre: 'Servicio de Salud Metropolitano Central', region: '13' },
  { codigo: 'SS12', nombre: 'Servicio de Salud Metropolitano Oriente', region: '13' },
  { codigo: 'SS13', nombre: 'Servicio de Salud Metropolitano Sur', region: '13' },
  { codigo: 'SS14', nombre: 'Servicio de Salud Metropolitano Sur Oriente', region: '13' },
  { codigo: 'SS15', nombre: "Servicio de Salud O'Higgins", region: '06' },
  { codigo: 'SS16', nombre: 'Servicio de Salud Maule', region: '07' },
  { codigo: 'SS17', nombre: 'Servicio de Salud Ñuble', region: '16' },
  { codigo: 'SS18', nombre: 'Servicio de Salud Concepción', region: '08' },
  { codigo: 'SS19', nombre: 'Servicio de Salud Talcahuano', region: '08' },
  { codigo: 'SS20', nombre: 'Servicio de Salud Biobío', region: '08' },
  { codigo: 'SS21', nombre: 'Servicio de Salud Arauco', region: '08' },
  { codigo: 'SS22', nombre: 'Servicio de Salud Araucanía Norte', region: '09' },
  { codigo: 'SS23', nombre: 'Servicio de Salud Araucanía Sur', region: '09' },
  { codigo: 'SS24', nombre: 'Servicio de Salud Valdivia', region: '14' },
  { codigo: 'SS25', nombre: 'Servicio de Salud Osorno', region: '10' },
  { codigo: 'SS26', nombre: 'Servicio de Salud Reloncaví', region: '10' },
  { codigo: 'SS27', nombre: 'Servicio de Salud Chiloé', region: '10' },
  { codigo: 'SS28', nombre: 'Servicio de Salud Aysén', region: '11' },
  { codigo: 'SS29', nombre: 'Servicio de Salud Magallanes', region: '12' },
]

// Representative sample of Chilean health establishments
export const organizacionesSalud: OrganizacionSalud[] = [
  // ========== HOSPITALES ALTA COMPLEJIDAD ==========
  // Región Metropolitana
  {
    codigoDeis: '101100',
    nombre: 'Hospital Clínico Universidad de Chile',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'Universitario',
    servicioSalud: 'Servicio de Salud Metropolitano Norte',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Independencia',
    direccion: 'Santos Dumont 999',
    telefono: '+56 2 2978 8000',
    urgencia24h: true,
    camasHospitalarias: 580
  },
  {
    codigoDeis: '101101',
    nombre: 'Hospital San Juan de Dios',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Occidente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Santiago',
    direccion: 'Huérfanos 3255',
    telefono: '+56 2 2574 8000',
    urgencia24h: true,
    camasHospitalarias: 520
  },
  {
    codigoDeis: '101102',
    nombre: 'Hospital del Salvador',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Providencia',
    direccion: 'Av. Salvador 364',
    telefono: '+56 2 2575 4000',
    urgencia24h: true,
    camasHospitalarias: 450
  },
  {
    codigoDeis: '101103',
    nombre: 'Hospital Barros Luco Trudeau',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Sur',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'San Miguel',
    direccion: 'Gran Avenida José Miguel Carrera 3204',
    telefono: '+56 2 2394 8000',
    urgencia24h: true,
    camasHospitalarias: 680
  },
  {
    codigoDeis: '101104',
    nombre: 'Hospital Sótero del Río',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Sur Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Puente Alto',
    direccion: 'Av. Concha y Toro 3459',
    telefono: '+56 2 2576 1000',
    urgencia24h: true,
    camasHospitalarias: 700
  },
  {
    codigoDeis: '101105',
    nombre: 'Hospital San Borja Arriarán',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Central',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Santiago',
    direccion: 'Santa Rosa 1234',
    telefono: '+56 2 2574 6000',
    urgencia24h: true,
    camasHospitalarias: 400
  },
  {
    codigoDeis: '101106',
    nombre: 'Instituto Nacional del Cáncer',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Norte',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Independencia',
    direccion: 'Av. Profesor Zañartu 1010',
    telefono: '+56 2 2707 5700',
    urgencia24h: false,
    camasHospitalarias: 180
  },
  {
    codigoDeis: '101107',
    nombre: 'Instituto Nacional del Tórax',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Providencia',
    direccion: 'Av. José Manuel Infante 717',
    telefono: '+56 2 2575 4800',
    urgencia24h: true,
    camasHospitalarias: 220
  },
  {
    codigoDeis: '101108',
    nombre: 'Hospital Luis Calvo Mackenna',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Providencia',
    direccion: 'Antonio Varas 360',
    telefono: '+56 2 2575 4900',
    urgencia24h: true,
    camasHospitalarias: 260
  },
  {
    codigoDeis: '101109',
    nombre: 'Hospital Roberto del Río',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Norte',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Independencia',
    direccion: 'Av. Profesor Zañartu 1085',
    telefono: '+56 2 2575 4600',
    urgencia24h: true,
    camasHospitalarias: 200
  },
  // Otras regiones
  {
    codigoDeis: '102100',
    nombre: 'Hospital Regional de Valparaíso Dr. Eduardo Pereira',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Valparaíso - San Antonio',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'Valparaíso',
    direccion: 'San Ignacio 725',
    telefono: '+56 32 236 4000',
    urgencia24h: true,
    camasHospitalarias: 450
  },
  {
    codigoDeis: '102101',
    nombre: 'Hospital Gustavo Fricke',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Viña del Mar - Quillota',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'Viña del Mar',
    direccion: 'Álvarez 1532',
    telefono: '+56 32 257 7600',
    urgencia24h: true,
    camasHospitalarias: 480
  },
  {
    codigoDeis: '103100',
    nombre: 'Hospital Regional de Concepción Dr. Guillermo Grant Benavente',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Concepción',
    region: 'Biobío',
    regionCodigo: '08',
    comuna: 'Concepción',
    direccion: 'San Martín 1436',
    telefono: '+56 41 272 2700',
    urgencia24h: true,
    camasHospitalarias: 750
  },
  {
    codigoDeis: '104100',
    nombre: 'Hospital Regional de Temuco Dr. Hernán Henríquez Aravena',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Araucanía Sur',
    region: 'La Araucanía',
    regionCodigo: '09',
    comuna: 'Temuco',
    direccion: 'Manuel Montt 115',
    telefono: '+56 45 255 2000',
    urgencia24h: true,
    camasHospitalarias: 600
  },
  {
    codigoDeis: '105100',
    nombre: 'Hospital Base de Valdivia',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Valdivia',
    region: 'Los Ríos',
    regionCodigo: '14',
    comuna: 'Valdivia',
    direccion: 'Simpson 850',
    telefono: '+56 63 229 3000',
    urgencia24h: true,
    camasHospitalarias: 450
  },
  {
    codigoDeis: '106100',
    nombre: 'Hospital Regional de Antofagasta Dr. Leonardo Guzmán',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Antofagasta',
    region: 'Antofagasta',
    regionCodigo: '02',
    comuna: 'Antofagasta',
    direccion: 'Av. Argentina 1962',
    telefono: '+56 55 265 6000',
    urgencia24h: true,
    camasHospitalarias: 450
  },
  
  // ========== HOSPITALES MEDIANA COMPLEJIDAD ==========
  {
    codigoDeis: '201100',
    nombre: 'Hospital de La Serena',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Coquimbo',
    region: 'Coquimbo',
    regionCodigo: '04',
    comuna: 'La Serena',
    direccion: 'Balmaceda 916',
    telefono: '+56 51 233 4000',
    urgencia24h: true,
    camasHospitalarias: 300
  },
  {
    codigoDeis: '201101',
    nombre: 'Hospital San Pablo de Coquimbo',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Coquimbo',
    region: 'Coquimbo',
    regionCodigo: '04',
    comuna: 'Coquimbo',
    direccion: 'Av. Videla s/n',
    telefono: '+56 51 232 5000',
    urgencia24h: true,
    camasHospitalarias: 250
  },
  {
    codigoDeis: '201102',
    nombre: 'Hospital de Rancagua',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: "Servicio de Salud O'Higgins",
    region: "O'Higgins",
    regionCodigo: '06',
    comuna: 'Rancagua',
    direccion: 'Alameda 611',
    telefono: '+56 72 220 0000',
    urgencia24h: true,
    camasHospitalarias: 400
  },
  {
    codigoDeis: '201103',
    nombre: 'Hospital de Talca',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Maule',
    region: 'Maule',
    regionCodigo: '07',
    comuna: 'Talca',
    direccion: '1 Norte 1990',
    telefono: '+56 71 241 2000',
    urgencia24h: true,
    camasHospitalarias: 380
  },
  {
    codigoDeis: '201104',
    nombre: 'Hospital Herminda Martín de Chillán',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Ñuble',
    region: 'Ñuble',
    regionCodigo: '16',
    comuna: 'Chillán',
    direccion: 'Francisco Ramírez 10',
    telefono: '+56 42 258 6000',
    urgencia24h: true,
    camasHospitalarias: 350
  },
  {
    codigoDeis: '201105',
    nombre: 'Hospital de Puerto Montt',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Reloncaví',
    region: 'Los Lagos',
    regionCodigo: '10',
    comuna: 'Puerto Montt',
    direccion: 'Los Aromos 65',
    telefono: '+56 65 236 2000',
    urgencia24h: true,
    camasHospitalarias: 400
  },
  {
    codigoDeis: '201106',
    nombre: 'Hospital Regional de Punta Arenas',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Magallanes',
    region: 'Magallanes',
    regionCodigo: '12',
    comuna: 'Punta Arenas',
    direccion: 'Av. Los Flamencos 1',
    telefono: '+56 61 229 3000',
    urgencia24h: true,
    camasHospitalarias: 300
  },
  
  // ========== HOSPITALES BAJA COMPLEJIDAD ==========
  {
    codigoDeis: '301100',
    nombre: 'Hospital de San Antonio',
    tipo: 'Hospital Baja Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Valparaíso - San Antonio',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'San Antonio',
    direccion: 'Av. Centenario 100',
    telefono: '+56 35 220 6000',
    urgencia24h: true,
    camasHospitalarias: 150
  },
  {
    codigoDeis: '301101',
    nombre: 'Hospital de Quilpué',
    tipo: 'Hospital Baja Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Viña del Mar - Quillota',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'Quilpué',
    direccion: 'Freire 1080',
    telefono: '+56 32 247 4000',
    urgencia24h: true,
    camasHospitalarias: 120
  },
  {
    codigoDeis: '301102',
    nombre: 'Hospital de Castro',
    tipo: 'Hospital Baja Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Chiloé',
    region: 'Los Lagos',
    regionCodigo: '10',
    comuna: 'Castro',
    direccion: 'Freire 852',
    telefono: '+56 65 263 2000',
    urgencia24h: true,
    camasHospitalarias: 100
  },
  {
    codigoDeis: '301103',
    nombre: 'Hospital de Coyhaique',
    tipo: 'Hospital Baja Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Aysén',
    region: 'Aysén',
    regionCodigo: '11',
    comuna: 'Coyhaique',
    direccion: 'Carrera 240',
    telefono: '+56 67 226 1000',
    urgencia24h: true,
    camasHospitalarias: 180
  },
  
  // ========== CESFAM (Atención Primaria) ==========
  {
    codigoDeis: '401100',
    nombre: 'CESFAM Dr. Raúl Yazigi',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Las Condes',
    direccion: 'Lo Fontecilla 441',
    urgencia24h: false
  },
  {
    codigoDeis: '401101',
    nombre: 'CESFAM Carol Urzúa',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Pedro Aguirre Cerda',
    direccion: 'Av. La Feria 3000',
    urgencia24h: false
  },
  {
    codigoDeis: '401102',
    nombre: 'CESFAM San Alberto Hurtado',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Puente Alto',
    direccion: 'Av. Concha y Toro 3000',
    urgencia24h: false
  },
  {
    codigoDeis: '401103',
    nombre: 'CESFAM Pablo Neruda',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Lo Espejo',
    direccion: 'Av. Central 567',
    urgencia24h: false
  },
  {
    codigoDeis: '401104',
    nombre: 'CESFAM Padre Alberto Hurtado',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Occidente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Cerro Navia',
    direccion: 'Las Torres 3450',
    urgencia24h: false
  },
  {
    codigoDeis: '401105',
    nombre: 'CESFAM Dr. Steeger',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Norte',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Conchalí',
    direccion: 'El Roble 1245',
    urgencia24h: false
  },
  {
    codigoDeis: '401106',
    nombre: 'CESFAM Juan Pablo II',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'La Pintana',
    direccion: 'Av. Santa Rosa 12500',
    urgencia24h: false
  },
  {
    codigoDeis: '401107',
    nombre: 'CESFAM Villa O\'Higgins',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'La Florida',
    direccion: 'Av. Vicuña Mackenna 7110',
    urgencia24h: false
  },
  {
    codigoDeis: '401108',
    nombre: 'CESFAM Dr. Patricio Hevia',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Macul',
    direccion: 'Los Plátanos 1860',
    urgencia24h: false
  },
  {
    codigoDeis: '401109',
    nombre: 'CESFAM Dr. Aníbal Ariztía',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Las Condes',
    direccion: 'Av. Fleming 6965',
    urgencia24h: false
  },
  // CESFAM otras regiones
  {
    codigoDeis: '401200',
    nombre: 'CESFAM Víctor Manuel Fernández',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Valparaíso - San Antonio',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'Valparaíso',
    direccion: 'Av. Playa Ancha 100',
    urgencia24h: false
  },
  {
    codigoDeis: '401201',
    nombre: 'CESFAM Recreo',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Viña del Mar - Quillota',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'Viña del Mar',
    direccion: 'Av. Libertad 1234',
    urgencia24h: false
  },
  {
    codigoDeis: '401202',
    nombre: 'CESFAM Lorenzo Arenas',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Concepción',
    region: 'Biobío',
    regionCodigo: '08',
    comuna: 'Concepción',
    direccion: 'Lorenzo Arenas 1445',
    urgencia24h: false
  },
  {
    codigoDeis: '401203',
    nombre: 'CESFAM Amanecer',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Araucanía Sur',
    region: 'La Araucanía',
    regionCodigo: '09',
    comuna: 'Temuco',
    direccion: 'Amanecer 890',
    urgencia24h: false
  },
  {
    codigoDeis: '401204',
    nombre: 'CESFAM Las Animas',
    tipo: 'CESFAM',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Valdivia',
    region: 'Los Ríos',
    regionCodigo: '14',
    comuna: 'Valdivia',
    direccion: 'Las Animas 1200',
    urgencia24h: false
  },
  
  // ========== SAPU (Urgencia Primaria) ==========
  {
    codigoDeis: '501100',
    nombre: 'SAPU La Florida',
    tipo: 'SAPU',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'La Florida',
    direccion: 'Av. Walker Martínez 2850',
    urgencia24h: true
  },
  {
    codigoDeis: '501101',
    nombre: 'SAPU Santa Anita',
    tipo: 'SAPU',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Puente Alto',
    direccion: 'Santa Anita 100',
    urgencia24h: true
  },
  {
    codigoDeis: '501102',
    nombre: 'SAPU Recoleta',
    tipo: 'SAPU',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Norte',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Recoleta',
    direccion: 'Av. Recoleta 2774',
    urgencia24h: true
  },
  {
    codigoDeis: '501103',
    nombre: 'SAPU Maipú',
    tipo: 'SAPU',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Occidente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Maipú',
    direccion: 'Av. Pajaritos 4567',
    urgencia24h: true
  },
  
  // ========== POSTAS RURALES ==========
  {
    codigoDeis: '601100',
    nombre: 'Posta de Salud Rural Putre',
    tipo: 'Posta Rural',
    nivelAtencion: 'Primario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Arica',
    region: 'Arica y Parinacota',
    regionCodigo: '15',
    comuna: 'Putre',
    direccion: 'Calle Principal s/n',
    urgencia24h: false
  },
  {
    codigoDeis: '601101',
    nombre: 'Posta de Salud Rural Codpa',
    tipo: 'Posta Rural',
    nivelAtencion: 'Primario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Arica',
    region: 'Arica y Parinacota',
    regionCodigo: '15',
    comuna: 'Camarones',
    direccion: 'Plaza de Armas s/n',
    urgencia24h: false
  },
  {
    codigoDeis: '601102',
    nombre: 'Posta de Salud Rural San Pedro de Atacama',
    tipo: 'Posta Rural',
    nivelAtencion: 'Primario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Antofagasta',
    region: 'Antofagasta',
    regionCodigo: '02',
    comuna: 'San Pedro de Atacama',
    direccion: 'Tocopilla 306',
    urgencia24h: false
  },
  {
    codigoDeis: '601103',
    nombre: 'Posta de Salud Rural Curaco de Vélez',
    tipo: 'Posta Rural',
    nivelAtencion: 'Primario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Chiloé',
    region: 'Los Lagos',
    regionCodigo: '10',
    comuna: 'Curaco de Vélez',
    direccion: 'Costanera s/n',
    urgencia24h: false
  },
  {
    codigoDeis: '601104',
    nombre: 'Posta de Salud Rural Chile Chico',
    tipo: 'Posta Rural',
    nivelAtencion: 'Primario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Aysén',
    region: 'Aysén',
    regionCodigo: '11',
    comuna: 'Chile Chico',
    direccion: 'O\'Higgins 123',
    urgencia24h: false
  },
  {
    codigoDeis: '601105',
    nombre: 'Posta de Salud Rural Cochrane',
    tipo: 'Posta Rural',
    nivelAtencion: 'Primario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Aysén',
    region: 'Aysén',
    regionCodigo: '11',
    comuna: 'Cochrane',
    direccion: 'Dr. Steffen 340',
    urgencia24h: false
  },
  {
    codigoDeis: '601106',
    nombre: 'Posta de Salud Rural Puerto Natales',
    tipo: 'Posta Rural',
    nivelAtencion: 'Primario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Magallanes',
    region: 'Magallanes',
    regionCodigo: '12',
    comuna: 'Natales',
    direccion: 'Bulnes 540',
    urgencia24h: false
  },
  
  // ========== CLÍNICAS PRIVADAS ==========
  {
    codigoDeis: '701100',
    nombre: 'Clínica Las Condes',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Terciario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Las Condes',
    direccion: 'Estoril 450',
    telefono: '+56 2 2210 4000',
    urgencia24h: true,
    camasHospitalarias: 250
  },
  {
    codigoDeis: '701101',
    nombre: 'Clínica Alemana',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Terciario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Vitacura',
    direccion: 'Av. Vitacura 5951',
    telefono: '+56 2 2210 1111',
    urgencia24h: true,
    camasHospitalarias: 380
  },
  {
    codigoDeis: '701102',
    nombre: 'Clínica Universidad de los Andes',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Terciario',
    dependencia: 'Universitario',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Las Condes',
    direccion: 'Av. Plaza 2501',
    telefono: '+56 2 2618 3000',
    urgencia24h: true,
    camasHospitalarias: 150
  },
  {
    codigoDeis: '701103',
    nombre: 'Clínica Santa María',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Terciario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Providencia',
    direccion: 'Av. Santa María 0500',
    telefono: '+56 2 2913 0000',
    urgencia24h: true,
    camasHospitalarias: 220
  },
  {
    codigoDeis: '701104',
    nombre: 'Clínica INDISA',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Terciario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Providencia',
    direccion: 'Av. Santa María 1810',
    telefono: '+56 2 2362 5555',
    urgencia24h: true,
    camasHospitalarias: 180
  },
  {
    codigoDeis: '701105',
    nombre: 'Clínica Dávila',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Terciario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Metropolitano Norte',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Recoleta',
    direccion: 'Av. Recoleta 464',
    telefono: '+56 2 2730 8000',
    urgencia24h: true,
    camasHospitalarias: 350
  },
  {
    codigoDeis: '701106',
    nombre: 'Clínica Bicentenario',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Secundario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Vitacura',
    direccion: 'Av. Américo Vespucio 2280',
    telefono: '+56 2 2757 0000',
    urgencia24h: true,
    camasHospitalarias: 120
  },
  // Clínicas regiones
  {
    codigoDeis: '701200',
    nombre: 'Clínica Reñaca',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Secundario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Viña del Mar - Quillota',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'Viña del Mar',
    direccion: 'Av. Borgoño 14800',
    telefono: '+56 32 265 8000',
    urgencia24h: true,
    camasHospitalarias: 80
  },
  {
    codigoDeis: '701201',
    nombre: 'Clínica Sanatorio Alemán',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Secundario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Concepción',
    region: 'Biobío',
    regionCodigo: '08',
    comuna: 'Concepción',
    direccion: 'Senador Estébanez 645',
    telefono: '+56 41 291 1000',
    urgencia24h: true,
    camasHospitalarias: 120
  },
  {
    codigoDeis: '701202',
    nombre: 'Clínica Alemana Temuco',
    tipo: 'Clínica Privada',
    nivelAtencion: 'Secundario',
    dependencia: 'Privado',
    servicioSalud: 'Servicio de Salud Araucanía Sur',
    region: 'La Araucanía',
    regionCodigo: '09',
    comuna: 'Temuco',
    direccion: 'Senador Estébanez 285',
    telefono: '+56 45 221 2000',
    urgencia24h: true,
    camasHospitalarias: 90
  },
  
  // ========== CRS (Centro de Referencia de Salud) ==========
  {
    codigoDeis: '801100',
    nombre: 'CRS Salvador Allende',
    tipo: 'CRS',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Norte',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Conchalí',
    direccion: 'Av. Dorsal 1400',
    urgencia24h: false
  },
  {
    codigoDeis: '801101',
    nombre: 'CRS Cordillera Oriente',
    tipo: 'CRS',
    nivelAtencion: 'Secundario',
    dependencia: 'SNSS',
    servicioSalud: 'Servicio de Salud Metropolitano Sur Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Puente Alto',
    direccion: 'Av. Concha y Toro 2345',
    urgencia24h: false
  },
  
  // ========== CECOSF (Centro Comunitario de Salud Familiar) ==========
  {
    codigoDeis: '901100',
    nombre: 'CECOSF El Bosque Norte',
    tipo: 'CECOSF',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'El Bosque',
    direccion: 'Pasaje Las Lilas 450',
    urgencia24h: false
  },
  {
    codigoDeis: '901101',
    nombre: 'CECOSF Villa Las Palmeras',
    tipo: 'CECOSF',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Occidente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Pudahuel',
    direccion: 'Las Palmeras 2300',
    urgencia24h: false
  },
  
  // ========== SAR (Servicio de Alta Resolución) ==========
  {
    codigoDeis: '1001100',
    nombre: 'SAR Peñalolén',
    tipo: 'SAR',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Peñalolén',
    direccion: 'Av. Grecia 4567',
    urgencia24h: true
  },
  {
    codigoDeis: '1001101',
    nombre: 'SAR San Bernardo',
    tipo: 'SAR',
    nivelAtencion: 'Primario',
    dependencia: 'Municipal',
    servicioSalud: 'Servicio de Salud Metropolitano Sur',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'San Bernardo',
    direccion: 'Av. Colón 800',
    urgencia24h: true
  },
  
  // ========== HOSPITALES FF.AA. ==========
  {
    codigoDeis: '1101100',
    nombre: 'Hospital Militar de Santiago',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'FF.AA.',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'La Reina',
    direccion: 'Av. Larraín 9100',
    telefono: '+56 2 2331 2000',
    urgencia24h: true,
    camasHospitalarias: 350
  },
  {
    codigoDeis: '1101101',
    nombre: 'Hospital Naval Almirante Nef',
    tipo: 'Hospital Alta Complejidad',
    nivelAtencion: 'Terciario',
    dependencia: 'FF.AA.',
    servicioSalud: 'Servicio de Salud Viña del Mar - Quillota',
    region: 'Valparaíso',
    regionCodigo: '05',
    comuna: 'Viña del Mar',
    direccion: 'Av. Subida Alessandri s/n',
    telefono: '+56 32 257 3000',
    urgencia24h: true,
    camasHospitalarias: 250
  },
  {
    codigoDeis: '1101102',
    nombre: 'Hospital de la Fuerza Aérea de Chile',
    tipo: 'Hospital Mediana Complejidad',
    nivelAtencion: 'Secundario',
    dependencia: 'FF.AA.',
    servicioSalud: 'Servicio de Salud Metropolitano Oriente',
    region: 'Metropolitana',
    regionCodigo: '13',
    comuna: 'Las Condes',
    direccion: 'Av. Las Condes 8631',
    telefono: '+56 2 2782 6000',
    urgencia24h: true,
    camasHospitalarias: 180
  },
]

// Helper functions
export function getOrganizacionByDeis(codigoDeis: string): OrganizacionSalud | undefined {
  return organizacionesSalud.find(org => org.codigoDeis === codigoDeis)
}

export function getOrganizacionesByTipo(tipo: TipoEstablecimiento): OrganizacionSalud[] {
  return organizacionesSalud.filter(org => org.tipo === tipo)
}

export function getOrganizacionesByRegion(regionCodigo: string): OrganizacionSalud[] {
  return organizacionesSalud.filter(org => org.regionCodigo === regionCodigo)
}

export function getOrganizacionesByServicioSalud(servicioSalud: string): OrganizacionSalud[] {
  return organizacionesSalud.filter(org => org.servicioSalud === servicioSalud)
}

export function getOrganizacionesByNivel(nivel: NivelAtencion): OrganizacionSalud[] {
  return organizacionesSalud.filter(org => org.nivelAtencion === nivel)
}

export function getOrganizacionesConUrgencia(): OrganizacionSalud[] {
  return organizacionesSalud.filter(org => org.urgencia24h)
}

export function getHospitalesPublicos(): OrganizacionSalud[] {
  return organizacionesSalud.filter(org => 
    org.dependencia === 'SNSS' && 
    (org.tipo.includes('Hospital') || org.tipo === 'CRS')
  )
}

export function getAtencionPrimaria(): OrganizacionSalud[] {
  return organizacionesSalud.filter(org => org.nivelAtencion === 'Primario')
}
