import {
  mulberry32,
  randomPick,
} from './utils'
import { 
  organizacionesSalud, 
  type OrganizacionSalud,
  type TipoEstablecimiento,
  type NivelAtencion,
} from '@/data/deis-organizations'

export interface OrganizationRecord {
  organization_id: string
  name: string
  type: TipoEstablecimiento
  level: NivelAtencion
  dependency: string
  health_service: string
  region: string
  region_code: string
  comuna: string
  address: string
  phone: string | null
  has_emergency: boolean
  beds: number | null
}

export interface OrganizationsParams {
  types?: TipoEstablecimiento[]
  levels?: NivelAtencion[]
  regions?: string[]
}

export function generateOrganizations(
  count: number,
  seed: number,
  params: OrganizationsParams = {}
): OrganizationRecord[] {
  const {
    types,
    levels,
    regions,
  } = params

  const rng = mulberry32(seed)
  
  // Filter organizations based on params
  let filtered = [...organizacionesSalud]
  
  if (types && types.length > 0) {
    filtered = filtered.filter(org => types.includes(org.tipo))
  }
  if (levels && levels.length > 0) {
    filtered = filtered.filter(org => levels.includes(org.nivelAtencion))
  }
  if (regions && regions.length > 0) {
    filtered = filtered.filter(org => regions.includes(org.regionCodigo))
  }

  // If requesting more than available, repeat with variation
  const data: OrganizationRecord[] = []
  
  for (let i = 0; i < count; i++) {
    const org = randomPick(rng, filtered) as OrganizacionSalud

    data.push({
      organization_id: org.codigoDeis,
      name: org.nombre,
      type: org.tipo,
      level: org.nivelAtencion,
      dependency: org.dependencia,
      health_service: org.servicioSalud,
      region: org.region,
      region_code: org.regionCodigo,
      comuna: org.comuna,
      address: org.direccion,
      phone: org.telefono || null,
      has_emergency: org.urgencia24h,
      beds: org.camasHospitalarias || null,
    })
  }

  return data
}

// Get all organizations without randomization
export function getAllOrganizations(): OrganizationRecord[] {
  return organizacionesSalud.map(org => ({
    organization_id: org.codigoDeis,
    name: org.nombre,
    type: org.tipo,
    level: org.nivelAtencion,
    dependency: org.dependencia,
    health_service: org.servicioSalud,
    region: org.region,
    region_code: org.regionCodigo,
    comuna: org.comuna,
    address: org.direccion,
    phone: org.telefono || null,
    has_emergency: org.urgencia24h,
    beds: org.camasHospitalarias || null,
  }))
}
