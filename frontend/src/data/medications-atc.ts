// Chilean Medications Database - Based on Formulario Nacional de Medicamentos
// Top 100 medications with ATC codes (WHO classification)

export interface Medication {
  atcCode: string
  atcLevel1: string
  atcLevel1Name: string
  genericName: string
  brandExamples: string[]
  dose: string
  unit: string
  frequency: string
  route: string
  ges: boolean
  formularioNacional: boolean
  category: string
}

// ATC Level 1 Categories
export const atcCategories = {
  'A': 'Tracto alimentario y metabolismo',
  'B': 'Sangre y órganos hematopoyéticos',
  'C': 'Sistema cardiovascular',
  'D': 'Dermatológicos',
  'G': 'Sistema genitourinario y hormonas sexuales',
  'H': 'Hormonas sistémicas',
  'J': 'Antiinfecciosos sistémicos',
  'L': 'Antineoplásicos e inmunomoduladores',
  'M': 'Sistema musculoesquelético',
  'N': 'Sistema nervioso',
  'P': 'Antiparasitarios',
  'R': 'Sistema respiratorio',
  'S': 'Órganos de los sentidos',
  'V': 'Varios',
}

export const medications: Medication[] = [
  // A - Tracto alimentario y metabolismo
  { atcCode: 'A02BC01', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Omeprazol', brandExamples: ['Losec', 'Omepral'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'IBP' },
  { atcCode: 'A02BC02', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Pantoprazol', brandExamples: ['Zurcal', 'Pantoloc'], dose: '40', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'IBP' },
  { atcCode: 'A02BC05', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Esomeprazol', brandExamples: ['Nexium'], dose: '40', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'IBP' },
  { atcCode: 'A03FA01', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Metoclopramida', brandExamples: ['Primperan'], dose: '10', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: false, formularioNacional: true, category: 'Procinético' },
  { atcCode: 'A04AA01', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Ondansetrón', brandExamples: ['Zofran'], dose: '8', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiemético' },
  { atcCode: 'A06AD11', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Lactulosa', brandExamples: ['Duphalac'], dose: '15', unit: 'ml', frequency: 'c/12h', route: 'oral', ges: false, formularioNacional: true, category: 'Laxante' },
  { atcCode: 'A10BA02', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Metformina', brandExamples: ['Glucophage', 'Glafornil'], dose: '850', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antidiabético' },
  { atcCode: 'A10BB01', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Glibenclamida', brandExamples: ['Euglucon', 'Daonil'], dose: '5', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antidiabético' },
  { atcCode: 'A10AB01', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Insulina rápida', brandExamples: ['Humulin R', 'Actrapid'], dose: '10', unit: 'UI', frequency: 'c/8h', route: 'SC', ges: true, formularioNacional: true, category: 'Insulina' },
  { atcCode: 'A10AE04', atcLevel1: 'A', atcLevel1Name: 'Tracto alimentario', genericName: 'Insulina glargina', brandExamples: ['Lantus', 'Toujeo'], dose: '20', unit: 'UI', frequency: 'c/24h', route: 'SC', ges: true, formularioNacional: true, category: 'Insulina' },

  // B - Sangre y órganos hematopoyéticos
  { atcCode: 'B01AA03', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Warfarina', brandExamples: ['Coumadin'], dose: '5', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Anticoagulante' },
  { atcCode: 'B01AB01', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Heparina', brandExamples: ['Heparina sódica'], dose: '5000', unit: 'UI', frequency: 'c/12h', route: 'SC', ges: true, formularioNacional: true, category: 'Anticoagulante' },
  { atcCode: 'B01AB05', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Enoxaparina', brandExamples: ['Clexane'], dose: '40', unit: 'mg', frequency: 'c/24h', route: 'SC', ges: true, formularioNacional: true, category: 'HBPM' },
  { atcCode: 'B01AC06', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Ácido acetilsalicílico', brandExamples: ['Aspirina', 'Ecotrin'], dose: '100', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiagregante' },
  { atcCode: 'B01AC04', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Clopidogrel', brandExamples: ['Plavix'], dose: '75', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiagregante' },
  { atcCode: 'B03AA07', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Sulfato ferroso', brandExamples: ['Fer-In-Sol'], dose: '200', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antianémico' },
  { atcCode: 'B03BA01', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Cianocobalamina', brandExamples: ['Vitamina B12'], dose: '1000', unit: 'mcg', frequency: 'c/mes', route: 'IM', ges: false, formularioNacional: true, category: 'Vitamina' },
  { atcCode: 'B03BB01', atcLevel1: 'B', atcLevel1Name: 'Sangre', genericName: 'Ácido fólico', brandExamples: ['Acfol'], dose: '5', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Vitamina' },

  // C - Sistema cardiovascular
  { atcCode: 'C01AA05', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Digoxina', brandExamples: ['Lanoxin'], dose: '0.25', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Cardiotónico' },
  { atcCode: 'C01DA02', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Nitroglicerina', brandExamples: ['Nitrostat'], dose: '0.5', unit: 'mg', frequency: 'SOS', route: 'SL', ges: true, formularioNacional: true, category: 'Vasodilatador' },
  { atcCode: 'C03AA03', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Hidroclorotiazida', brandExamples: ['Diazide'], dose: '25', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Diurético' },
  { atcCode: 'C03CA01', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Furosemida', brandExamples: ['Lasix'], dose: '40', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Diurético' },
  { atcCode: 'C03DA01', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Espironolactona', brandExamples: ['Aldactone'], dose: '25', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Diurético' },
  { atcCode: 'C07AB02', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Metoprolol', brandExamples: ['Lopresor', 'Betaloc'], dose: '50', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Betabloqueador' },
  { atcCode: 'C07AB03', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Atenolol', brandExamples: ['Tenormin'], dose: '50', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Betabloqueador' },
  { atcCode: 'C07AB07', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Bisoprolol', brandExamples: ['Concor'], dose: '5', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Betabloqueador' },
  { atcCode: 'C07AG02', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Carvedilol', brandExamples: ['Dilatrend'], dose: '12.5', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Betabloqueador' },
  { atcCode: 'C08CA01', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Amlodipino', brandExamples: ['Norvasc'], dose: '5', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Calcioantagonista' },
  { atcCode: 'C08DA01', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Verapamilo', brandExamples: ['Isoptin'], dose: '80', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: false, formularioNacional: true, category: 'Calcioantagonista' },
  { atcCode: 'C09AA02', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Enalapril', brandExamples: ['Renitec'], dose: '10', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'IECA' },
  { atcCode: 'C09AA05', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Ramipril', brandExamples: ['Tritace'], dose: '5', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'IECA' },
  { atcCode: 'C09CA01', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Losartán', brandExamples: ['Cozaar'], dose: '50', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'ARA-II' },
  { atcCode: 'C09CA03', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Valsartán', brandExamples: ['Diovan'], dose: '80', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'ARA-II' },
  { atcCode: 'C10AA01', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Simvastatina', brandExamples: ['Zocor'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Estatina' },
  { atcCode: 'C10AA05', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Atorvastatina', brandExamples: ['Lipitor'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Estatina' },
  { atcCode: 'C10AA07', atcLevel1: 'C', atcLevel1Name: 'Cardiovascular', genericName: 'Rosuvastatina', brandExamples: ['Crestor'], dose: '10', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'Estatina' },

  // H - Hormonas sistémicas
  { atcCode: 'H02AB04', atcLevel1: 'H', atcLevel1Name: 'Hormonas', genericName: 'Metilprednisolona', brandExamples: ['Solu-Medrol'], dose: '40', unit: 'mg', frequency: 'c/24h', route: 'IV', ges: true, formularioNacional: true, category: 'Corticoide' },
  { atcCode: 'H02AB06', atcLevel1: 'H', atcLevel1Name: 'Hormonas', genericName: 'Prednisolona', brandExamples: ['Meticorten'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Corticoide' },
  { atcCode: 'H02AB07', atcLevel1: 'H', atcLevel1Name: 'Hormonas', genericName: 'Prednisona', brandExamples: ['Bersen'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Corticoide' },
  { atcCode: 'H02AB09', atcLevel1: 'H', atcLevel1Name: 'Hormonas', genericName: 'Hidrocortisona', brandExamples: ['Solu-Cortef'], dose: '100', unit: 'mg', frequency: 'c/8h', route: 'IV', ges: true, formularioNacional: true, category: 'Corticoide' },
  { atcCode: 'H03AA01', atcLevel1: 'H', atcLevel1Name: 'Hormonas', genericName: 'Levotiroxina', brandExamples: ['Eutirox', 'Eltroxin'], dose: '100', unit: 'mcg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Tiroideo' },
  { atcCode: 'H03BB01', atcLevel1: 'H', atcLevel1Name: 'Hormonas', genericName: 'Propiltiouracilo', brandExamples: ['PTU'], dose: '100', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Antitiroideo' },

  // J - Antiinfecciosos
  { atcCode: 'J01CA04', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Amoxicilina', brandExamples: ['Amoval', 'Trimoxal'], dose: '500', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Penicilina' },
  { atcCode: 'J01CR02', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Amoxicilina/Clavulánico', brandExamples: ['Augmentin', 'Clavinex'], dose: '875/125', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Penicilina' },
  { atcCode: 'J01DB01', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Cefalexina', brandExamples: ['Keflex'], dose: '500', unit: 'mg', frequency: 'c/6h', route: 'oral', ges: false, formularioNacional: true, category: 'Cefalosporina' },
  { atcCode: 'J01DD04', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Ceftriaxona', brandExamples: ['Rocephin'], dose: '1', unit: 'g', frequency: 'c/24h', route: 'IV', ges: true, formularioNacional: true, category: 'Cefalosporina' },
  { atcCode: 'J01FA01', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Eritromicina', brandExamples: ['Eritrocina'], dose: '500', unit: 'mg', frequency: 'c/6h', route: 'oral', ges: false, formularioNacional: true, category: 'Macrólido' },
  { atcCode: 'J01FA09', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Claritromicina', brandExamples: ['Klaricid'], dose: '500', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Macrólido' },
  { atcCode: 'J01FA10', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Azitromicina', brandExamples: ['Zithromax'], dose: '500', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Macrólido' },
  { atcCode: 'J01MA02', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Ciprofloxacino', brandExamples: ['Ciproval'], dose: '500', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Quinolona' },
  { atcCode: 'J01MA12', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Levofloxacino', brandExamples: ['Tavanic'], dose: '500', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Quinolona' },
  { atcCode: 'J01XD01', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Metronidazol', brandExamples: ['Flagyl'], dose: '500', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Nitroimidazol' },
  { atcCode: 'J01XX08', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Linezolid', brandExamples: ['Zyvox'], dose: '600', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Oxazolidinona' },
  { atcCode: 'J02AC01', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Fluconazol', brandExamples: ['Diflucan'], dose: '150', unit: 'mg', frequency: 'dosis única', route: 'oral', ges: true, formularioNacional: true, category: 'Antifúngico' },
  { atcCode: 'J05AB01', atcLevel1: 'J', atcLevel1Name: 'Antiinfecciosos', genericName: 'Aciclovir', brandExamples: ['Zovirax'], dose: '400', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiviral' },

  // M - Sistema musculoesquelético
  { atcCode: 'M01AE01', atcLevel1: 'M', atcLevel1Name: 'Musculoesquelético', genericName: 'Ibuprofeno', brandExamples: ['Motrin', 'Advil'], dose: '400', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: false, formularioNacional: true, category: 'AINE' },
  { atcCode: 'M01AE02', atcLevel1: 'M', atcLevel1Name: 'Musculoesquelético', genericName: 'Naproxeno', brandExamples: ['Naprosyn'], dose: '500', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: false, formularioNacional: true, category: 'AINE' },
  { atcCode: 'M01AB05', atcLevel1: 'M', atcLevel1Name: 'Musculoesquelético', genericName: 'Diclofenaco', brandExamples: ['Voltaren'], dose: '50', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: false, formularioNacional: true, category: 'AINE' },
  { atcCode: 'M01AH01', atcLevel1: 'M', atcLevel1Name: 'Musculoesquelético', genericName: 'Celecoxib', brandExamples: ['Celebrex'], dose: '200', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: false, category: 'AINE COX-2' },
  { atcCode: 'M04AA01', atcLevel1: 'M', atcLevel1Name: 'Musculoesquelético', genericName: 'Alopurinol', brandExamples: ['Zyloprim'], dose: '300', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'Antigotoso' },
  { atcCode: 'M04AC01', atcLevel1: 'M', atcLevel1Name: 'Musculoesquelético', genericName: 'Colchicina', brandExamples: ['Colchicina'], dose: '0.5', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: false, formularioNacional: true, category: 'Antigotoso' },
  { atcCode: 'M05BA04', atcLevel1: 'M', atcLevel1Name: 'Musculoesquelético', genericName: 'Alendronato', brandExamples: ['Fosamax'], dose: '70', unit: 'mg', frequency: 'c/semana', route: 'oral', ges: true, formularioNacional: true, category: 'Bifosfonato' },

  // N - Sistema nervioso
  { atcCode: 'N02AA01', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Morfina', brandExamples: ['MST'], dose: '10', unit: 'mg', frequency: 'c/4h', route: 'oral', ges: true, formularioNacional: true, category: 'Opioide' },
  { atcCode: 'N02AA05', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Oxicodona', brandExamples: ['OxyContin'], dose: '10', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Opioide' },
  { atcCode: 'N02AB03', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Fentanilo', brandExamples: ['Durogesic'], dose: '25', unit: 'mcg/h', frequency: 'c/72h', route: 'transdérmico', ges: true, formularioNacional: true, category: 'Opioide' },
  { atcCode: 'N02AX02', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Tramadol', brandExamples: ['Tramal'], dose: '50', unit: 'mg', frequency: 'c/6h', route: 'oral', ges: true, formularioNacional: true, category: 'Opioide débil' },
  { atcCode: 'N02BE01', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Paracetamol', brandExamples: ['Tapsin', 'Zolben'], dose: '500', unit: 'mg', frequency: 'c/6h', route: 'oral', ges: false, formularioNacional: true, category: 'Analgésico' },
  { atcCode: 'N03AE01', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Clonazepam', brandExamples: ['Rivotril'], dose: '0.5', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiepiléptico' },
  { atcCode: 'N03AF01', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Carbamazepina', brandExamples: ['Tegretol'], dose: '200', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiepiléptico' },
  { atcCode: 'N03AG01', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Ácido valproico', brandExamples: ['Depakene', 'Valcote'], dose: '500', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiepiléptico' },
  { atcCode: 'N03AX09', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Lamotrigina', brandExamples: ['Lamictal'], dose: '100', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiepiléptico' },
  { atcCode: 'N03AX11', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Topiramato', brandExamples: ['Topamax'], dose: '100', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiepiléptico' },
  { atcCode: 'N03AX16', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Pregabalina', brandExamples: ['Lyrica'], dose: '75', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiepiléptico' },
  { atcCode: 'N03AX12', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Gabapentina', brandExamples: ['Neurontin'], dose: '300', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Antiepiléptico' },
  { atcCode: 'N05AH03', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Olanzapina', brandExamples: ['Zyprexa'], dose: '10', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Antipsicótico' },
  { atcCode: 'N05AH04', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Quetiapina', brandExamples: ['Seroquel'], dose: '200', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antipsicótico' },
  { atcCode: 'N05AX08', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Risperidona', brandExamples: ['Risperdal'], dose: '2', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'Antipsicótico' },
  { atcCode: 'N05AD01', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Haloperidol', brandExamples: ['Haldol'], dose: '5', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Antipsicótico' },
  { atcCode: 'N05BA01', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Diazepam', brandExamples: ['Valium'], dose: '5', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Benzodiazepina' },
  { atcCode: 'N05BA06', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Lorazepam', brandExamples: ['Ativan', 'Amparax'], dose: '1', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: true, formularioNacional: true, category: 'Benzodiazepina' },
  { atcCode: 'N05BA12', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Alprazolam', brandExamples: ['Xanax'], dose: '0.5', unit: 'mg', frequency: 'c/8h', route: 'oral', ges: false, formularioNacional: true, category: 'Benzodiazepina' },
  { atcCode: 'N05CD08', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Midazolam', brandExamples: ['Dormonid'], dose: '7.5', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Benzodiazepina' },
  { atcCode: 'N06AA09', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Amitriptilina', brandExamples: ['Tryptanol'], dose: '25', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'Antidepresivo' },
  { atcCode: 'N06AB03', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Fluoxetina', brandExamples: ['Prozac'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'ISRS' },
  { atcCode: 'N06AB04', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Citalopram', brandExamples: ['Celexa'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'ISRS' },
  { atcCode: 'N06AB05', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Paroxetina', brandExamples: ['Paxil'], dose: '20', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'ISRS' },
  { atcCode: 'N06AB06', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Sertralina', brandExamples: ['Zoloft', 'Altruline'], dose: '50', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: true, formularioNacional: true, category: 'ISRS' },
  { atcCode: 'N06AB10', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Escitalopram', brandExamples: ['Lexapro'], dose: '10', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'ISRS' },
  { atcCode: 'N06AX16', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Venlafaxina', brandExamples: ['Effexor'], dose: '75', unit: 'mg', frequency: 'c/12h', route: 'oral', ges: true, formularioNacional: true, category: 'IRSN' },
  { atcCode: 'N06AX21', atcLevel1: 'N', atcLevel1Name: 'Sistema nervioso', genericName: 'Duloxetina', brandExamples: ['Cymbalta'], dose: '60', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'IRSN' },

  // R - Sistema respiratorio
  { atcCode: 'R03AC02', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Salbutamol', brandExamples: ['Ventolin'], dose: '100', unit: 'mcg', frequency: 'SOS', route: 'inhalado', ges: true, formularioNacional: true, category: 'Beta2 agonista' },
  { atcCode: 'R03AC13', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Formoterol', brandExamples: ['Foradil'], dose: '12', unit: 'mcg', frequency: 'c/12h', route: 'inhalado', ges: true, formularioNacional: true, category: 'Beta2 agonista' },
  { atcCode: 'R03AK06', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Salmeterol/Fluticasona', brandExamples: ['Seretide'], dose: '25/125', unit: 'mcg', frequency: 'c/12h', route: 'inhalado', ges: true, formularioNacional: true, category: 'Combinación' },
  { atcCode: 'R03AK07', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Budesonida/Formoterol', brandExamples: ['Symbicort'], dose: '160/4.5', unit: 'mcg', frequency: 'c/12h', route: 'inhalado', ges: true, formularioNacional: true, category: 'Combinación' },
  { atcCode: 'R03BA01', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Beclometasona', brandExamples: ['Beclovent'], dose: '200', unit: 'mcg', frequency: 'c/12h', route: 'inhalado', ges: true, formularioNacional: true, category: 'Corticoide inh' },
  { atcCode: 'R03BA02', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Budesonida', brandExamples: ['Pulmicort'], dose: '200', unit: 'mcg', frequency: 'c/12h', route: 'inhalado', ges: true, formularioNacional: true, category: 'Corticoide inh' },
  { atcCode: 'R03BB01', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Bromuro de ipratropio', brandExamples: ['Atrovent'], dose: '20', unit: 'mcg', frequency: 'c/6h', route: 'inhalado', ges: true, formularioNacional: true, category: 'Anticolinérgico' },
  { atcCode: 'R03BB04', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Tiotropio', brandExamples: ['Spiriva'], dose: '18', unit: 'mcg', frequency: 'c/24h', route: 'inhalado', ges: true, formularioNacional: true, category: 'Anticolinérgico' },
  { atcCode: 'R05CB01', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Acetilcisteína', brandExamples: ['Mucomyst', 'Fluimucil'], dose: '600', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'Mucolítico' },
  { atcCode: 'R06AE07', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Cetirizina', brandExamples: ['Zyrtec'], dose: '10', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'Antihistamínico' },
  { atcCode: 'R06AX13', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Loratadina', brandExamples: ['Claritin'], dose: '10', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: true, category: 'Antihistamínico' },
  { atcCode: 'R06AX27', atcLevel1: 'R', atcLevel1Name: 'Respiratorio', genericName: 'Desloratadina', brandExamples: ['Aerius'], dose: '5', unit: 'mg', frequency: 'c/24h', route: 'oral', ges: false, formularioNacional: false, category: 'Antihistamínico' },
]

// Helper function to get medication by ATC code
export const getMedicationByATC = (atcCode: string): Medication | undefined => {
  return medications.find(m => m.atcCode === atcCode)
}

// Helper function to get medications by category
export const getMedicationsByCategory = (category: string): Medication[] => {
  return medications.filter(m => m.category === category)
}

// Helper function to get medications by ATC level 1
export const getMedicationsByATCLevel1 = (level1: string): Medication[] => {
  return medications.filter(m => m.atcLevel1 === level1)
}

// Helper function to get GES medications only
export const getGESMedications = (): Medication[] => {
  return medications.filter(m => m.ges)
}

// Common medication categories for prescribing
export const medicationCategories = [
  'IBP', 'Procinético', 'Antiemético', 'Laxante', 'Antidiabético', 'Insulina',
  'Anticoagulante', 'HBPM', 'Antiagregante', 'Antianémico', 'Vitamina',
  'Cardiotónico', 'Vasodilatador', 'Diurético', 'Betabloqueador', 'Calcioantagonista',
  'IECA', 'ARA-II', 'Estatina', 'Corticoide', 'Tiroideo', 'Antitiroideo',
  'Penicilina', 'Cefalosporina', 'Macrólido', 'Quinolona', 'Nitroimidazol',
  'Oxazolidinona', 'Antifúngico', 'Antiviral', 'AINE', 'AINE COX-2',
  'Antigotoso', 'Bifosfonato', 'Opioide', 'Opioide débil', 'Analgésico',
  'Antiepiléptico', 'Antipsicótico', 'Benzodiazepina', 'Antidepresivo', 'ISRS', 'IRSN',
  'Beta2 agonista', 'Combinación', 'Corticoide inh', 'Anticolinérgico', 'Mucolítico', 'Antihistamínico'
]

// Routes of administration
export const medicationRoutes = ['oral', 'IV', 'IM', 'SC', 'SL', 'inhalado', 'transdérmico', 'tópico', 'rectal', 'oftálmico']

// Frequencies
export const medicationFrequencies = ['c/4h', 'c/6h', 'c/8h', 'c/12h', 'c/24h', 'c/48h', 'c/72h', 'c/semana', 'c/mes', 'SOS', 'dosis única']
