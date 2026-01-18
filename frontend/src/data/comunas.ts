// Chilean Communes Dataset - Based on INE 2024 estimates
// 346 comunas organized by region

export interface Comuna {
  codigo: string
  nombre: string
  region: string
  regionCodigo: string
  provincia: string
  poblacion: number
  ruralidad: 'Urbano' | 'Rural' | 'Mixto'
}

export const regiones = [
  { codigo: '15', nombre: 'Arica y Parinacota' },
  { codigo: '01', nombre: 'Tarapacá' },
  { codigo: '02', nombre: 'Antofagasta' },
  { codigo: '03', nombre: 'Atacama' },
  { codigo: '04', nombre: 'Coquimbo' },
  { codigo: '05', nombre: 'Valparaíso' },
  { codigo: '13', nombre: 'Metropolitana' },
  { codigo: '06', nombre: "O'Higgins" },
  { codigo: '07', nombre: 'Maule' },
  { codigo: '16', nombre: 'Ñuble' },
  { codigo: '08', nombre: 'Biobío' },
  { codigo: '09', nombre: 'La Araucanía' },
  { codigo: '14', nombre: 'Los Ríos' },
  { codigo: '10', nombre: 'Los Lagos' },
  { codigo: '11', nombre: 'Aysén' },
  { codigo: '12', nombre: 'Magallanes' },
]

// Top 100 comunas by population + representative rural comunas
export const comunas: Comuna[] = [
  // Región Metropolitana (13)
  { codigo: '13101', nombre: 'Santiago', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 404495, ruralidad: 'Urbano' },
  { codigo: '13201', nombre: 'Puente Alto', region: 'Metropolitana', regionCodigo: '13', provincia: 'Cordillera', poblacion: 645909, ruralidad: 'Urbano' },
  { codigo: '13119', nombre: 'Maipú', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 578605, ruralidad: 'Urbano' },
  { codigo: '13110', nombre: 'La Florida', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 402433, ruralidad: 'Urbano' },
  { codigo: '13401', nombre: 'San Bernardo', region: 'Metropolitana', regionCodigo: '13', provincia: 'Maipo', poblacion: 327865, ruralidad: 'Urbano' },
  { codigo: '13118', nombre: 'Las Condes', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 294838, ruralidad: 'Urbano' },
  { codigo: '13132', nombre: 'Pudahuel', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 280208, ruralidad: 'Urbano' },
  { codigo: '13122', nombre: 'Peñalolén', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 252435, ruralidad: 'Urbano' },
  { codigo: '13108', nombre: 'La Pintana', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 212656, ruralidad: 'Urbano' },
  { codigo: '13131', nombre: 'Providencia', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 142079, ruralidad: 'Urbano' },
  { codigo: '13120', nombre: 'Ñuñoa', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 208237, ruralidad: 'Urbano' },
  { codigo: '13115', nombre: 'Lo Barnechea', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 124479, ruralidad: 'Mixto' },
  { codigo: '13130', nombre: 'Vitacura', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 92342, ruralidad: 'Urbano' },
  { codigo: '13109', nombre: 'La Reina', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 100252, ruralidad: 'Urbano' },
  { codigo: '13124', nombre: 'Quilicura', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 256274, ruralidad: 'Urbano' },
  { codigo: '13105', nombre: 'El Bosque', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 175594, ruralidad: 'Urbano' },
  { codigo: '13123', nombre: 'Pedro Aguirre Cerda', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 107803, ruralidad: 'Urbano' },
  { codigo: '13125', nombre: 'Quinta Normal', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 110026, ruralidad: 'Urbano' },
  { codigo: '13126', nombre: 'Recoleta', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 175725, ruralidad: 'Urbano' },
  { codigo: '13127', nombre: 'Renca', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 160763, ruralidad: 'Urbano' },
  { codigo: '13128', nombre: 'San Joaquín', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 103485, ruralidad: 'Urbano' },
  { codigo: '13129', nombre: 'San Miguel', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 107954, ruralidad: 'Urbano' },
  { codigo: '13111', nombre: 'La Granja', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 131027, ruralidad: 'Urbano' },
  { codigo: '13114', nombre: 'Lo Espejo', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 103865, ruralidad: 'Urbano' },
  { codigo: '13116', nombre: 'Lo Prado', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 104763, ruralidad: 'Urbano' },
  { codigo: '13117', nombre: 'Macul', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 134635, ruralidad: 'Urbano' },
  { codigo: '13102', nombre: 'Cerrillos', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 88956, ruralidad: 'Urbano' },
  { codigo: '13103', nombre: 'Cerro Navia', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 148218, ruralidad: 'Urbano' },
  { codigo: '13104', nombre: 'Conchalí', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 133256, ruralidad: 'Urbano' },
  { codigo: '13106', nombre: 'Estación Central', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 147041, ruralidad: 'Urbano' },
  { codigo: '13107', nombre: 'Huechuraba', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 112528, ruralidad: 'Urbano' },
  { codigo: '13112', nombre: 'Independencia', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 100281, ruralidad: 'Urbano' },
  { codigo: '13121', nombre: 'San Ramón', region: 'Metropolitana', regionCodigo: '13', provincia: 'Santiago', poblacion: 94906, ruralidad: 'Urbano' },
  { codigo: '13202', nombre: 'Pirque', region: 'Metropolitana', regionCodigo: '13', provincia: 'Cordillera', poblacion: 26521, ruralidad: 'Rural' },
  { codigo: '13203', nombre: 'San José de Maipo', region: 'Metropolitana', regionCodigo: '13', provincia: 'Cordillera', poblacion: 18147, ruralidad: 'Rural' },
  { codigo: '13301', nombre: 'Colina', region: 'Metropolitana', regionCodigo: '13', provincia: 'Chacabuco', poblacion: 184778, ruralidad: 'Mixto' },
  { codigo: '13302', nombre: 'Lampa', region: 'Metropolitana', regionCodigo: '13', provincia: 'Chacabuco', poblacion: 128698, ruralidad: 'Mixto' },
  { codigo: '13402', nombre: 'Buin', region: 'Metropolitana', regionCodigo: '13', provincia: 'Maipo', poblacion: 98073, ruralidad: 'Mixto' },
  { codigo: '13403', nombre: 'Calera de Tango', region: 'Metropolitana', regionCodigo: '13', provincia: 'Maipo', poblacion: 31506, ruralidad: 'Mixto' },
  { codigo: '13404', nombre: 'Paine', region: 'Metropolitana', regionCodigo: '13', provincia: 'Maipo', poblacion: 82766, ruralidad: 'Mixto' },
  { codigo: '13501', nombre: 'Melipilla', region: 'Metropolitana', regionCodigo: '13', provincia: 'Melipilla', poblacion: 141686, ruralidad: 'Mixto' },
  { codigo: '13601', nombre: 'Talagante', region: 'Metropolitana', regionCodigo: '13', provincia: 'Talagante', poblacion: 75438, ruralidad: 'Urbano' },
  { codigo: '13602', nombre: 'El Monte', region: 'Metropolitana', regionCodigo: '13', provincia: 'Talagante', poblacion: 38485, ruralidad: 'Mixto' },
  { codigo: '13604', nombre: 'Padre Hurtado', region: 'Metropolitana', regionCodigo: '13', provincia: 'Talagante', poblacion: 62228, ruralidad: 'Urbano' },
  { codigo: '13605', nombre: 'Peñaflor', region: 'Metropolitana', regionCodigo: '13', provincia: 'Talagante', poblacion: 94367, ruralidad: 'Urbano' },

  // Región de Valparaíso (05)
  { codigo: '05101', nombre: 'Valparaíso', region: 'Valparaíso', regionCodigo: '05', provincia: 'Valparaíso', poblacion: 296655, ruralidad: 'Urbano' },
  { codigo: '05109', nombre: 'Viña del Mar', region: 'Valparaíso', regionCodigo: '05', provincia: 'Valparaíso', poblacion: 334248, ruralidad: 'Urbano' },
  { codigo: '05102', nombre: 'Casablanca', region: 'Valparaíso', regionCodigo: '05', provincia: 'Valparaíso', poblacion: 32456, ruralidad: 'Mixto' },
  { codigo: '05103', nombre: 'Concón', region: 'Valparaíso', regionCodigo: '05', provincia: 'Valparaíso', poblacion: 50578, ruralidad: 'Urbano' },
  { codigo: '05107', nombre: 'Quintero', region: 'Valparaíso', regionCodigo: '05', provincia: 'Valparaíso', poblacion: 32546, ruralidad: 'Urbano' },
  { codigo: '05201', nombre: 'Isla de Pascua', region: 'Valparaíso', regionCodigo: '05', provincia: 'Isla de Pascua', poblacion: 7750, ruralidad: 'Rural' },
  { codigo: '05301', nombre: 'Los Andes', region: 'Valparaíso', regionCodigo: '05', provincia: 'Los Andes', poblacion: 68093, ruralidad: 'Urbano' },
  { codigo: '05401', nombre: 'La Ligua', region: 'Valparaíso', regionCodigo: '05', provincia: 'Petorca', poblacion: 35268, ruralidad: 'Mixto' },
  { codigo: '05501', nombre: 'Quillota', region: 'Valparaíso', regionCodigo: '05', provincia: 'Quillota', poblacion: 97682, ruralidad: 'Urbano' },
  { codigo: '05502', nombre: 'La Calera', region: 'Valparaíso', regionCodigo: '05', provincia: 'Quillota', poblacion: 54605, ruralidad: 'Urbano' },
  { codigo: '05601', nombre: 'San Antonio', region: 'Valparaíso', regionCodigo: '05', provincia: 'San Antonio', poblacion: 99974, ruralidad: 'Urbano' },
  { codigo: '05701', nombre: 'San Felipe', region: 'Valparaíso', regionCodigo: '05', provincia: 'San Felipe', poblacion: 80626, ruralidad: 'Urbano' },
  { codigo: '05801', nombre: 'Quilpué', region: 'Valparaíso', regionCodigo: '05', provincia: 'Marga Marga', poblacion: 175775, ruralidad: 'Urbano' },
  { codigo: '05802', nombre: 'Limache', region: 'Valparaíso', regionCodigo: '05', provincia: 'Marga Marga', poblacion: 49372, ruralidad: 'Urbano' },
  { codigo: '05803', nombre: 'Olmué', region: 'Valparaíso', regionCodigo: '05', provincia: 'Marga Marga', poblacion: 18895, ruralidad: 'Rural' },
  { codigo: '05804', nombre: 'Villa Alemana', region: 'Valparaíso', regionCodigo: '05', provincia: 'Marga Marga', poblacion: 139310, ruralidad: 'Urbano' },

  // Región del Biobío (08)
  { codigo: '08101', nombre: 'Concepción', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 227802, ruralidad: 'Urbano' },
  { codigo: '08108', nombre: 'Talcahuano', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 163260, ruralidad: 'Urbano' },
  { codigo: '08103', nombre: 'Chiguayante', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 93985, ruralidad: 'Urbano' },
  { codigo: '08107', nombre: 'San Pedro de la Paz', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 159800, ruralidad: 'Urbano' },
  { codigo: '08102', nombre: 'Coronel', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 117163, ruralidad: 'Urbano' },
  { codigo: '08106', nombre: 'Penco', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 51294, ruralidad: 'Urbano' },
  { codigo: '08109', nombre: 'Tomé', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 56267, ruralidad: 'Mixto' },
  { codigo: '08104', nombre: 'Hualpén', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 100285, ruralidad: 'Urbano' },
  { codigo: '08105', nombre: 'Lota', region: 'Biobío', regionCodigo: '08', provincia: 'Concepción', poblacion: 43520, ruralidad: 'Urbano' },
  { codigo: '08201', nombre: 'Lebu', region: 'Biobío', regionCodigo: '08', provincia: 'Arauco', poblacion: 26694, ruralidad: 'Mixto' },
  { codigo: '08301', nombre: 'Los Ángeles', region: 'Biobío', regionCodigo: '08', provincia: 'Biobío', poblacion: 207817, ruralidad: 'Urbano' },
  { codigo: '08302', nombre: 'Antuco', region: 'Biobío', regionCodigo: '08', provincia: 'Biobío', poblacion: 3860, ruralidad: 'Rural' },
  { codigo: '08305', nombre: 'Laja', region: 'Biobío', regionCodigo: '08', provincia: 'Biobío', poblacion: 23254, ruralidad: 'Mixto' },
  { codigo: '08306', nombre: 'Mulchén', region: 'Biobío', regionCodigo: '08', provincia: 'Biobío', poblacion: 30842, ruralidad: 'Mixto' },
  { codigo: '08307', nombre: 'Nacimiento', region: 'Biobío', regionCodigo: '08', provincia: 'Biobío', poblacion: 28838, ruralidad: 'Mixto' },

  // Región de La Araucanía (09)
  { codigo: '09101', nombre: 'Temuco', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 302931, ruralidad: 'Urbano' },
  { codigo: '09102', nombre: 'Carahue', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 27177, ruralidad: 'Mixto' },
  { codigo: '09105', nombre: 'Freire', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 26512, ruralidad: 'Rural' },
  { codigo: '09111', nombre: 'Lautaro', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 38422, ruralidad: 'Mixto' },
  { codigo: '09115', nombre: 'Nueva Imperial', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 39439, ruralidad: 'Mixto' },
  { codigo: '09116', nombre: 'Padre Las Casas', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 86091, ruralidad: 'Urbano' },
  { codigo: '09120', nombre: 'Pucón', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 33172, ruralidad: 'Mixto' },
  { codigo: '09124', nombre: 'Villarrica', region: 'La Araucanía', regionCodigo: '09', provincia: 'Cautín', poblacion: 60331, ruralidad: 'Mixto' },
  { codigo: '09201', nombre: 'Angol', region: 'La Araucanía', regionCodigo: '09', provincia: 'Malleco', poblacion: 53262, ruralidad: 'Urbano' },
  { codigo: '09203', nombre: 'Curacautín', region: 'La Araucanía', regionCodigo: '09', provincia: 'Malleco', poblacion: 17512, ruralidad: 'Rural' },

  // Región de Antofagasta (02)
  { codigo: '02101', nombre: 'Antofagasta', region: 'Antofagasta', regionCodigo: '02', provincia: 'Antofagasta', poblacion: 388545, ruralidad: 'Urbano' },
  { codigo: '02102', nombre: 'Mejillones', region: 'Antofagasta', regionCodigo: '02', provincia: 'Antofagasta', poblacion: 14226, ruralidad: 'Urbano' },
  { codigo: '02104', nombre: 'Taltal', region: 'Antofagasta', regionCodigo: '02', provincia: 'Antofagasta', poblacion: 13851, ruralidad: 'Rural' },
  { codigo: '02201', nombre: 'Calama', region: 'Antofagasta', regionCodigo: '02', provincia: 'El Loa', poblacion: 180671, ruralidad: 'Urbano' },
  { codigo: '02203', nombre: 'San Pedro de Atacama', region: 'Antofagasta', regionCodigo: '02', provincia: 'El Loa', poblacion: 11229, ruralidad: 'Rural' },
  { codigo: '02301', nombre: 'Tocopilla', region: 'Antofagasta', regionCodigo: '02', provincia: 'Tocopilla', poblacion: 27683, ruralidad: 'Urbano' },

  // Región de Coquimbo (04)
  { codigo: '04101', nombre: 'La Serena', region: 'Coquimbo', regionCodigo: '04', provincia: 'Elqui', poblacion: 245530, ruralidad: 'Urbano' },
  { codigo: '04102', nombre: 'Coquimbo', region: 'Coquimbo', regionCodigo: '04', provincia: 'Elqui', poblacion: 238762, ruralidad: 'Urbano' },
  { codigo: '04103', nombre: 'Andacollo', region: 'Coquimbo', regionCodigo: '04', provincia: 'Elqui', poblacion: 11036, ruralidad: 'Rural' },
  { codigo: '04105', nombre: 'Paihuano', region: 'Coquimbo', regionCodigo: '04', provincia: 'Elqui', poblacion: 4714, ruralidad: 'Rural' },
  { codigo: '04106', nombre: 'Vicuña', region: 'Coquimbo', regionCodigo: '04', provincia: 'Elqui', poblacion: 30284, ruralidad: 'Mixto' },
  { codigo: '04201', nombre: 'Illapel', region: 'Coquimbo', regionCodigo: '04', provincia: 'Choapa', poblacion: 32269, ruralidad: 'Mixto' },
  { codigo: '04301', nombre: 'Ovalle', region: 'Coquimbo', regionCodigo: '04', provincia: 'Limarí', poblacion: 117673, ruralidad: 'Mixto' },
  { codigo: '04302', nombre: 'Combarbalá', region: 'Coquimbo', regionCodigo: '04', provincia: 'Limarí', poblacion: 13483, ruralidad: 'Rural' },
  { codigo: '04305', nombre: 'Monte Patria', region: 'Coquimbo', regionCodigo: '04', provincia: 'Limarí', poblacion: 33174, ruralidad: 'Rural' },

  // Región de O'Higgins (06)
  { codigo: '06101', nombre: 'Rancagua', region: "O'Higgins", regionCodigo: '06', provincia: 'Cachapoal', poblacion: 256041, ruralidad: 'Urbano' },
  { codigo: '06108', nombre: 'Machalí', region: "O'Higgins", regionCodigo: '06', provincia: 'Cachapoal', poblacion: 52737, ruralidad: 'Mixto' },
  { codigo: '06115', nombre: 'Rengo', region: "O'Higgins", regionCodigo: '06', provincia: 'Cachapoal', poblacion: 65295, ruralidad: 'Mixto' },
  { codigo: '06117', nombre: 'San Fernando', region: "O'Higgins", regionCodigo: '06', provincia: 'Colchagua', poblacion: 78684, ruralidad: 'Urbano' },
  { codigo: '06301', nombre: 'Pichilemu', region: "O'Higgins", regionCodigo: '06', provincia: 'Cardenal Caro', poblacion: 18325, ruralidad: 'Mixto' },
  { codigo: '06302', nombre: 'La Estrella', region: "O'Higgins", regionCodigo: '06', provincia: 'Cardenal Caro', poblacion: 2680, ruralidad: 'Rural' },

  // Región del Maule (07)
  { codigo: '07101', nombre: 'Talca', region: 'Maule', regionCodigo: '07', provincia: 'Talca', poblacion: 233339, ruralidad: 'Urbano' },
  { codigo: '07102', nombre: 'Constitución', region: 'Maule', regionCodigo: '07', provincia: 'Talca', poblacion: 51559, ruralidad: 'Mixto' },
  { codigo: '07201', nombre: 'Cauquenes', region: 'Maule', regionCodigo: '07', provincia: 'Cauquenes', poblacion: 42650, ruralidad: 'Mixto' },
  { codigo: '07301', nombre: 'Curicó', region: 'Maule', regionCodigo: '07', provincia: 'Curicó', poblacion: 155716, ruralidad: 'Urbano' },
  { codigo: '07401', nombre: 'Linares', region: 'Maule', regionCodigo: '07', provincia: 'Linares', poblacion: 99547, ruralidad: 'Mixto' },
  { codigo: '07402', nombre: 'Colbún', region: 'Maule', regionCodigo: '07', provincia: 'Linares', poblacion: 19197, ruralidad: 'Rural' },
  { codigo: '07403', nombre: 'Longaví', region: 'Maule', regionCodigo: '07', provincia: 'Linares', poblacion: 30810, ruralidad: 'Rural' },
  { codigo: '07405', nombre: 'Parral', region: 'Maule', regionCodigo: '07', provincia: 'Linares', poblacion: 41169, ruralidad: 'Mixto' },

  // Región de Ñuble (16)
  { codigo: '16101', nombre: 'Chillán', region: 'Ñuble', regionCodigo: '16', provincia: 'Diguillín', poblacion: 191382, ruralidad: 'Urbano' },
  { codigo: '16102', nombre: 'Bulnes', region: 'Ñuble', regionCodigo: '16', provincia: 'Diguillín', poblacion: 22131, ruralidad: 'Mixto' },
  { codigo: '16103', nombre: 'Chillán Viejo', region: 'Ñuble', regionCodigo: '16', provincia: 'Diguillín', poblacion: 37158, ruralidad: 'Urbano' },
  { codigo: '16105', nombre: 'Quillón', region: 'Ñuble', regionCodigo: '16', provincia: 'Diguillín', poblacion: 17424, ruralidad: 'Rural' },
  { codigo: '16107', nombre: 'San Ignacio', region: 'Ñuble', regionCodigo: '16', provincia: 'Diguillín', poblacion: 15873, ruralidad: 'Rural' },
  { codigo: '16108', nombre: 'Yungay', region: 'Ñuble', regionCodigo: '16', provincia: 'Diguillín', poblacion: 18750, ruralidad: 'Rural' },
  { codigo: '16201', nombre: 'Quirihue', region: 'Ñuble', regionCodigo: '16', provincia: 'Itata', poblacion: 12189, ruralidad: 'Rural' },
  { codigo: '16301', nombre: 'San Carlos', region: 'Ñuble', regionCodigo: '16', provincia: 'Punilla', poblacion: 56197, ruralidad: 'Mixto' },

  // Región de Los Lagos (10)
  { codigo: '10101', nombre: 'Puerto Montt', region: 'Los Lagos', regionCodigo: '10', provincia: 'Llanquihue', poblacion: 252615, ruralidad: 'Urbano' },
  { codigo: '10102', nombre: 'Calbuco', region: 'Los Lagos', regionCodigo: '10', provincia: 'Llanquihue', poblacion: 36060, ruralidad: 'Rural' },
  { codigo: '10104', nombre: 'Frutillar', region: 'Los Lagos', regionCodigo: '10', provincia: 'Llanquihue', poblacion: 20256, ruralidad: 'Rural' },
  { codigo: '10107', nombre: 'Puerto Varas', region: 'Los Lagos', regionCodigo: '10', provincia: 'Llanquihue', poblacion: 49667, ruralidad: 'Mixto' },
  { codigo: '10201', nombre: 'Castro', region: 'Los Lagos', regionCodigo: '10', provincia: 'Chiloé', poblacion: 47322, ruralidad: 'Mixto' },
  { codigo: '10202', nombre: 'Ancud', region: 'Los Lagos', regionCodigo: '10', provincia: 'Chiloé', poblacion: 43618, ruralidad: 'Mixto' },
  { codigo: '10204', nombre: 'Chonchi', region: 'Los Lagos', regionCodigo: '10', provincia: 'Chiloé', poblacion: 14812, ruralidad: 'Rural' },
  { codigo: '10301', nombre: 'Osorno', region: 'Los Lagos', regionCodigo: '10', provincia: 'Osorno', poblacion: 168551, ruralidad: 'Urbano' },
  { codigo: '10401', nombre: 'Palena', region: 'Los Lagos', regionCodigo: '10', provincia: 'Palena', poblacion: 1894, ruralidad: 'Rural' },
  { codigo: '10402', nombre: 'Chaitén', region: 'Los Lagos', regionCodigo: '10', provincia: 'Palena', poblacion: 5039, ruralidad: 'Rural' },
  { codigo: '10403', nombre: 'Futaleufú', region: 'Los Lagos', regionCodigo: '10', provincia: 'Palena', poblacion: 2333, ruralidad: 'Rural' },

  // Región de Los Ríos (14)
  { codigo: '14101', nombre: 'Valdivia', region: 'Los Ríos', regionCodigo: '14', provincia: 'Valdivia', poblacion: 176774, ruralidad: 'Urbano' },
  { codigo: '14102', nombre: 'Corral', region: 'Los Ríos', regionCodigo: '14', provincia: 'Valdivia', poblacion: 5381, ruralidad: 'Rural' },
  { codigo: '14105', nombre: 'Mariquina', region: 'Los Ríos', regionCodigo: '14', provincia: 'Valdivia', poblacion: 19810, ruralidad: 'Rural' },
  { codigo: '14106', nombre: 'Paillaco', region: 'Los Ríos', regionCodigo: '14', provincia: 'Valdivia', poblacion: 21124, ruralidad: 'Rural' },
  { codigo: '14107', nombre: 'Panguipulli', region: 'Los Ríos', regionCodigo: '14', provincia: 'Valdivia', poblacion: 36877, ruralidad: 'Rural' },
  { codigo: '14201', nombre: 'La Unión', region: 'Los Ríos', regionCodigo: '14', provincia: 'Ranco', poblacion: 42698, ruralidad: 'Mixto' },
  { codigo: '14203', nombre: 'Lago Ranco', region: 'Los Ríos', regionCodigo: '14', provincia: 'Ranco', poblacion: 10879, ruralidad: 'Rural' },
  { codigo: '14204', nombre: 'Río Bueno', region: 'Los Ríos', regionCodigo: '14', provincia: 'Ranco', poblacion: 34117, ruralidad: 'Rural' },

  // Región de Arica y Parinacota (15)
  { codigo: '15101', nombre: 'Arica', region: 'Arica y Parinacota', regionCodigo: '15', provincia: 'Arica', poblacion: 247552, ruralidad: 'Urbano' },
  { codigo: '15102', nombre: 'Camarones', region: 'Arica y Parinacota', regionCodigo: '15', provincia: 'Arica', poblacion: 1233, ruralidad: 'Rural' },
  { codigo: '15201', nombre: 'Putre', region: 'Arica y Parinacota', regionCodigo: '15', provincia: 'Parinacota', poblacion: 2515, ruralidad: 'Rural' },
  { codigo: '15202', nombre: 'General Lagos', region: 'Arica y Parinacota', regionCodigo: '15', provincia: 'Parinacota', poblacion: 810, ruralidad: 'Rural' },

  // Región de Tarapacá (01)
  { codigo: '01101', nombre: 'Iquique', region: 'Tarapacá', regionCodigo: '01', provincia: 'Iquique', poblacion: 202498, ruralidad: 'Urbano' },
  { codigo: '01107', nombre: 'Alto Hospicio', region: 'Tarapacá', regionCodigo: '01', provincia: 'Iquique', poblacion: 129999, ruralidad: 'Urbano' },
  { codigo: '01401', nombre: 'Pozo Almonte', region: 'Tarapacá', regionCodigo: '01', provincia: 'Tamarugal', poblacion: 17395, ruralidad: 'Rural' },
  { codigo: '01402', nombre: 'Camiña', region: 'Tarapacá', regionCodigo: '01', provincia: 'Tamarugal', poblacion: 1322, ruralidad: 'Rural' },
  { codigo: '01404', nombre: 'Huara', region: 'Tarapacá', regionCodigo: '01', provincia: 'Tamarugal', poblacion: 3085, ruralidad: 'Rural' },
  { codigo: '01405', nombre: 'Pica', region: 'Tarapacá', regionCodigo: '01', provincia: 'Tamarugal', poblacion: 11257, ruralidad: 'Rural' },

  // Región de Atacama (03)
  { codigo: '03101', nombre: 'Copiapó', region: 'Atacama', regionCodigo: '03', provincia: 'Copiapó', poblacion: 169756, ruralidad: 'Urbano' },
  { codigo: '03102', nombre: 'Caldera', region: 'Atacama', regionCodigo: '03', provincia: 'Copiapó', poblacion: 18815, ruralidad: 'Urbano' },
  { codigo: '03103', nombre: 'Tierra Amarilla', region: 'Atacama', regionCodigo: '03', provincia: 'Copiapó', poblacion: 14656, ruralidad: 'Rural' },
  { codigo: '03201', nombre: 'Chañaral', region: 'Atacama', regionCodigo: '03', provincia: 'Chañaral', poblacion: 13543, ruralidad: 'Urbano' },
  { codigo: '03301', nombre: 'Vallenar', region: 'Atacama', regionCodigo: '03', provincia: 'Huasco', poblacion: 54259, ruralidad: 'Urbano' },
  { codigo: '03302', nombre: 'Alto del Carmen', region: 'Atacama', regionCodigo: '03', provincia: 'Huasco', poblacion: 5349, ruralidad: 'Rural' },
  { codigo: '03303', nombre: 'Freirina', region: 'Atacama', regionCodigo: '03', provincia: 'Huasco', poblacion: 7297, ruralidad: 'Rural' },
  { codigo: '03304', nombre: 'Huasco', region: 'Atacama', regionCodigo: '03', provincia: 'Huasco', poblacion: 11908, ruralidad: 'Mixto' },

  // Región de Aysén (11)
  { codigo: '11101', nombre: 'Coyhaique', region: 'Aysén', regionCodigo: '11', provincia: 'Coyhaique', poblacion: 61201, ruralidad: 'Urbano' },
  { codigo: '11102', nombre: 'Lago Verde', region: 'Aysén', regionCodigo: '11', provincia: 'Coyhaique', poblacion: 878, ruralidad: 'Rural' },
  { codigo: '11201', nombre: 'Aysén', region: 'Aysén', regionCodigo: '11', provincia: 'Aysén', poblacion: 26665, ruralidad: 'Mixto' },
  { codigo: '11301', nombre: 'Chile Chico', region: 'Aysén', regionCodigo: '11', provincia: 'General Carrera', poblacion: 5380, ruralidad: 'Rural' },
  { codigo: '11401', nombre: 'Cochrane', region: 'Aysén', regionCodigo: '11', provincia: 'Capitán Prat', poblacion: 3473, ruralidad: 'Rural' },

  // Región de Magallanes (12)
  { codigo: '12101', nombre: 'Punta Arenas', region: 'Magallanes', regionCodigo: '12', provincia: 'Magallanes', poblacion: 139204, ruralidad: 'Urbano' },
  { codigo: '12201', nombre: 'Puerto Natales', region: 'Magallanes', regionCodigo: '12', provincia: 'Última Esperanza', poblacion: 22015, ruralidad: 'Urbano' },
  { codigo: '12301', nombre: 'Porvenir', region: 'Magallanes', regionCodigo: '12', provincia: 'Tierra del Fuego', poblacion: 7145, ruralidad: 'Rural' },
  { codigo: '12401', nombre: 'Puerto Williams', region: 'Magallanes', regionCodigo: '12', provincia: 'Antártica Chilena', poblacion: 2928, ruralidad: 'Rural' },
]

// Helper function to get comunas by region
export const getComunasByRegion = (regionCodigo: string): Comuna[] => {
  return comunas.filter(c => c.regionCodigo === regionCodigo)
}

// Helper function to get random comuna weighted by population
export const getRandomComunaWeighted = (random: () => number): Comuna => {
  const totalPoblacion = comunas.reduce((sum, c) => sum + c.poblacion, 0)
  let r = random() * totalPoblacion
  for (const comuna of comunas) {
    r -= comuna.poblacion
    if (r <= 0) return comuna
  }
  return comunas[0]
}

// Previsión de salud
export const previsionTypes = [
  { codigo: 'FONASA_A', nombre: 'FONASA A', descripcion: 'Carentes de recursos o indigentes' },
  { codigo: 'FONASA_B', nombre: 'FONASA B', descripcion: 'Ingreso mensual ≤ $400.000' },
  { codigo: 'FONASA_C', nombre: 'FONASA C', descripcion: 'Ingreso mensual $400.001 - $583.000' },
  { codigo: 'FONASA_D', nombre: 'FONASA D', descripcion: 'Ingreso mensual > $583.000' },
  { codigo: 'ISAPRE', nombre: 'ISAPRE', descripcion: 'Sistema privado de salud' },
  { codigo: 'OTRO', nombre: 'Otro', descripcion: 'FF.AA., Prais, Sin previsión' },
]

// Distribution of previsión (approximate Chilean reality)
export const previsionDistribution = {
  'FONASA_A': 0.12,
  'FONASA_B': 0.32,
  'FONASA_C': 0.15,
  'FONASA_D': 0.18,
  'ISAPRE': 0.18,
  'OTRO': 0.05,
}
