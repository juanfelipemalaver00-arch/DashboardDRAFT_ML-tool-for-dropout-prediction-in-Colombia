import { SchoolRecord, ShapDriver } from '../types';

export const SYNTHETIC_SCHOOLS: SchoolRecord[] = [
  {
    sedeCodigo: '227001000142',
    sedeNombre: 'Institución Educativa Manuel Saturio Valencia - Sede Principal',
    institucionNombre: 'I.E. Manuel Saturio Valencia',
    municipioCodigo: '27001',
    municipio: 'Quibdó',
    departamento: 'Chocó',
    secretaria: 'Secretaría de Educación de Quibdó',
    lat: 5.6919,
    lng: -76.6583,
    zona: 'URBANO',
    flagPdet: true,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 485,
    desercionHistorica: 8.9,
    desercionLag1: 8.4,
    tasaDesercionMpio: 7.8,
    indiceVulnerabilidad: 88.5,
    ipmMunicipal: 74.2,
    tasaDesplazamiento: 28.4,
    puntajeSaber11: 215,
    icfesDisponible: true,
    tasaReprobacion: 14.2,
    proporcionEtnica: 92.5,
    deficitTransporte: true,
    coberturaPae: 65.0,
    riskProbability: 0.84,
    riskCategory: 'ALTO',
    departmentPercentile: 94.2,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 540, dropoutRate: 6.8, riskScore: 0.72 },
      { year: 2019, enrollment: 525, dropoutRate: 7.2, riskScore: 0.75 },
      { year: 2020, enrollment: 510, dropoutRate: 5.4, riskScore: 0.65 },
      { year: 2021, enrollment: 505, dropoutRate: 6.1, riskScore: 0.70 },
      { year: 2022, enrollment: 495, dropoutRate: 8.4, riskScore: 0.81 },
      { year: 2023, enrollment: 485, dropoutRate: 8.9, riskScore: 0.84 }
    ]
  },
  {
    sedeCodigo: '244001001890',
    sedeNombre: 'Centro Educativo Rural Wayuu El Paraíso',
    institucionNombre: 'C.E.R. Wayuu El Paraíso',
    municipioCodigo: '44001',
    municipio: 'Riohacha',
    departamento: 'La Guajira',
    secretaria: 'Secretaría de Educación de La Guajira',
    lat: 11.3548,
    lng: -72.5205,
    zona: 'RURAL',
    flagPdet: false,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 142,
    desercionHistorica: 11.5,
    desercionLag1: 10.8,
    tasaDesercionMpio: 7.1,
    indiceVulnerabilidad: 94.2,
    ipmMunicipal: 68.9,
    tasaDesplazamiento: 14.1,
    icfesDisponible: false,
    tasaReprobacion: 11.8,
    proporcionEtnica: 98.2,
    deficitTransporte: true,
    coberturaPae: 52.0,
    riskProbability: 0.88,
    riskCategory: 'ALTO',
    departmentPercentile: 97.6,
    modelUsed: 'LIGHTWEIGHT_XGBOOST',
    history: [
      { year: 2018, enrollment: 175, dropoutRate: 9.1, riskScore: 0.79 },
      { year: 2019, enrollment: 168, dropoutRate: 9.8, riskScore: 0.82 },
      { year: 2020, enrollment: 160, dropoutRate: 7.5, riskScore: 0.71 },
      { year: 2021, enrollment: 154, dropoutRate: 8.6, riskScore: 0.78 },
      { year: 2022, enrollment: 148, dropoutRate: 10.8, riskScore: 0.85 },
      { year: 2023, enrollment: 142, dropoutRate: 11.5, riskScore: 0.88 }
    ]
  },
  {
    sedeCodigo: '219001004521',
    sedeNombre: 'I.E. Técnico Agropecuario Los Andes - Sede La Esperanza',
    institucionNombre: 'I.E. Técnico Agropecuario Los Andes',
    municipioCodigo: '19001',
    municipio: 'Popayán',
    departamento: 'Cauca',
    secretaria: 'Secretaría de Educación de Popayán',
    lat: 2.4419,
    lng: -76.6063,
    zona: 'RURAL',
    flagPdet: true,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 230,
    desercionHistorica: 7.4,
    desercionLag1: 6.9,
    tasaDesercionMpio: 5.9,
    indiceVulnerabilidad: 82.1,
    ipmMunicipal: 59.3,
    tasaDesplazamiento: 22.0,
    puntajeSaber11: 228,
    icfesDisponible: true,
    tasaReprobacion: 13.5,
    proporcionEtnica: 64.0,
    deficitTransporte: true,
    coberturaPae: 72.0,
    riskProbability: 0.76,
    riskCategory: 'ALTO',
    departmentPercentile: 88.4,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 260, dropoutRate: 5.8, riskScore: 0.65 },
      { year: 2019, enrollment: 252, dropoutRate: 6.1, riskScore: 0.68 },
      { year: 2020, enrollment: 248, dropoutRate: 4.9, riskScore: 0.58 },
      { year: 2021, enrollment: 242, dropoutRate: 5.7, riskScore: 0.64 },
      { year: 2022, enrollment: 236, dropoutRate: 6.9, riskScore: 0.72 },
      { year: 2023, enrollment: 230, dropoutRate: 7.4, riskScore: 0.76 }
    ]
  },
  {
    sedeCodigo: '252001007812',
    sedeNombre: 'Institución Educativa Ciudadela de Tumaco - Sede Viento Libre',
    institucionNombre: 'I.E. Ciudadela de Tumaco',
    municipioCodigo: '52835',
    municipio: 'Tumaco',
    departamento: 'Nariño',
    secretaria: 'Secretaría de Educación de Tumaco',
    lat: 1.7986,
    lng: -78.8156,
    zona: 'URBANO',
    flagPdet: true,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 620,
    desercionHistorica: 8.1,
    desercionLag1: 7.8,
    tasaDesercionMpio: 7.2,
    indiceVulnerabilidad: 86.4,
    ipmMunicipal: 72.0,
    tasaDesplazamiento: 34.5,
    puntajeSaber11: 220,
    icfesDisponible: true,
    tasaReprobacion: 16.0,
    proporcionEtnica: 88.0,
    deficitTransporte: false,
    coberturaPae: 68.0,
    riskProbability: 0.81,
    riskCategory: 'ALTO',
    departmentPercentile: 91.0,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 710, dropoutRate: 6.5, riskScore: 0.68 },
      { year: 2019, enrollment: 690, dropoutRate: 7.0, riskScore: 0.72 },
      { year: 2020, enrollment: 675, dropoutRate: 5.5, riskScore: 0.62 },
      { year: 2021, enrollment: 660, dropoutRate: 6.8, riskScore: 0.71 },
      { year: 2022, enrollment: 640, dropoutRate: 7.8, riskScore: 0.78 },
      { year: 2023, enrollment: 620, dropoutRate: 8.1, riskScore: 0.81 }
    ]
  },
  {
    sedeCodigo: '213001003410',
    sedeNombre: 'Institución Educativa San José del Carmen - Sede El Salado',
    institucionNombre: 'I.E. San José del Carmen',
    municipioCodigo: '13244',
    municipio: 'Carmen de Bolívar',
    departamento: 'Bolívar',
    secretaria: 'Secretaría de Educación de Bolívar',
    lat: 9.7183,
    lng: -75.1211,
    zona: 'RURAL',
    flagPdet: true,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 185,
    desercionHistorica: 7.9,
    desercionLag1: 7.3,
    tasaDesercionMpio: 6.2,
    indiceVulnerabilidad: 81.0,
    ipmMunicipal: 64.5,
    tasaDesplazamiento: 26.8,
    icfesDisponible: false,
    tasaReprobacion: 12.4,
    proporcionEtnica: 42.0,
    deficitTransporte: true,
    coberturaPae: 70.0,
    riskProbability: 0.75,
    riskCategory: 'ALTO',
    departmentPercentile: 85.9,
    modelUsed: 'LIGHTWEIGHT_XGBOOST',
    history: [
      { year: 2018, enrollment: 210, dropoutRate: 6.1, riskScore: 0.66 },
      { year: 2019, enrollment: 204, dropoutRate: 6.4, riskScore: 0.68 },
      { year: 2020, enrollment: 200, dropoutRate: 5.0, riskScore: 0.59 },
      { year: 2021, enrollment: 195, dropoutRate: 6.0, riskScore: 0.67 },
      { year: 2022, enrollment: 190, dropoutRate: 7.3, riskScore: 0.72 },
      { year: 2023, enrollment: 185, dropoutRate: 7.9, riskScore: 0.75 }
    ]
  },
  {
    sedeCodigo: '205001009123',
    sedeNombre: 'Colegio Marco Fidel Suárez - Sede San Cayetano',
    institucionNombre: 'Colegio Marco Fidel Suárez',
    municipioCodigo: '05001',
    municipio: 'Medellín',
    departamento: 'Antioquia',
    secretaria: 'Secretaría de Educación de Medellín',
    lat: 6.2442,
    lng: -75.5812,
    zona: 'URBANO',
    flagPdet: false,
    flagZomac: false,
    periodoAnio: 2023,
    matriculaTotal: 980,
    desercionHistorica: 3.4,
    desercionLag1: 3.2,
    tasaDesercionMpio: 3.1,
    indiceVulnerabilidad: 42.0,
    ipmMunicipal: 18.5,
    tasaDesplazamiento: 5.2,
    puntajeSaber11: 278,
    icfesDisponible: true,
    tasaReprobacion: 6.8,
    proporcionEtnica: 8.5,
    deficitTransporte: false,
    coberturaPae: 90.0,
    riskProbability: 0.28,
    riskCategory: 'BAJO',
    departmentPercentile: 32.5,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 1020, dropoutRate: 3.8, riskScore: 0.32 },
      { year: 2019, enrollment: 1010, dropoutRate: 3.6, riskScore: 0.30 },
      { year: 2020, enrollment: 1005, dropoutRate: 2.5, riskScore: 0.22 },
      { year: 2021, enrollment: 995, dropoutRate: 2.9, riskScore: 0.25 },
      { year: 2022, enrollment: 990, dropoutRate: 3.2, riskScore: 0.27 },
      { year: 2023, enrollment: 980, dropoutRate: 3.4, riskScore: 0.28 }
    ]
  },
  {
    sedeCodigo: '205001008741',
    sedeNombre: 'I.E. Rural El Salto de San Carlos',
    institucionNombre: 'I.E. Rural El Salto',
    municipioCodigo: '05649',
    municipio: 'San Carlos',
    departamento: 'Antioquia',
    secretaria: 'Secretaría de Educación de Antioquia',
    lat: 6.1914,
    lng: -74.9964,
    zona: 'RURAL',
    flagPdet: true,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 160,
    desercionHistorica: 5.8,
    desercionLag1: 5.5,
    tasaDesercionMpio: 4.8,
    indiceVulnerabilidad: 68.5,
    ipmMunicipal: 46.2,
    tasaDesplazamiento: 18.2,
    puntajeSaber11: 235,
    icfesDisponible: true,
    tasaReprobacion: 9.5,
    proporcionEtnica: 6.0,
    deficitTransporte: true,
    coberturaPae: 80.0,
    riskProbability: 0.58,
    riskCategory: 'MEDIO',
    departmentPercentile: 64.0,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 180, dropoutRate: 5.2, riskScore: 0.54 },
      { year: 2019, enrollment: 175, dropoutRate: 5.3, riskScore: 0.55 },
      { year: 2020, enrollment: 170, dropoutRate: 4.0, riskScore: 0.45 },
      { year: 2021, enrollment: 168, dropoutRate: 4.8, riskScore: 0.50 },
      { year: 2022, enrollment: 164, dropoutRate: 5.5, riskScore: 0.56 },
      { year: 2023, enrollment: 160, dropoutRate: 5.8, riskScore: 0.58 }
    ]
  },
  {
    sedeCodigo: '111001002345',
    sedeNombre: 'Colegio República de Colombia - Sede B',
    institucionNombre: 'Colegio República de Colombia',
    municipioCodigo: '11001',
    municipio: 'Bogotá D.C.',
    departamento: 'Bogotá D.C.',
    secretaria: 'Secretaría de Educación del Distrito (SED)',
    lat: 4.6097,
    lng: -74.0817,
    zona: 'URBANO',
    flagPdet: false,
    flagZomac: false,
    periodoAnio: 2023,
    matriculaTotal: 1250,
    desercionHistorica: 2.1,
    desercionLag1: 1.9,
    tasaDesercionMpio: 2.1,
    indiceVulnerabilidad: 35.0,
    ipmMunicipal: 11.2,
    tasaDesplazamiento: 3.1,
    puntajeSaber11: 295,
    icfesDisponible: true,
    tasaReprobacion: 4.5,
    proporcionEtnica: 4.2,
    deficitTransporte: false,
    coberturaPae: 95.0,
    riskProbability: 0.16,
    riskCategory: 'BAJO',
    departmentPercentile: 18.2,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 1300, dropoutRate: 2.4, riskScore: 0.19 },
      { year: 2019, enrollment: 1280, dropoutRate: 2.2, riskScore: 0.18 },
      { year: 2020, enrollment: 1270, dropoutRate: 1.6, riskScore: 0.14 },
      { year: 2021, enrollment: 1265, dropoutRate: 1.8, riskScore: 0.15 },
      { year: 2022, enrollment: 1255, dropoutRate: 1.9, riskScore: 0.16 },
      { year: 2023, enrollment: 1250, dropoutRate: 2.1, riskScore: 0.16 }
    ]
  },
  {
    sedeCodigo: '111001009871',
    sedeNombre: 'Colegio Vista Hermosa - Sede Primaria Ciudad Bolívar',
    institucionNombre: 'Colegio Vista Hermosa',
    municipioCodigo: '11001',
    municipio: 'Bogotá D.C.',
    departamento: 'Bogotá D.C.',
    secretaria: 'Secretaría de Educación del Distrito (SED)',
    lat: 4.5612,
    lng: -74.1524,
    zona: 'URBANO',
    flagPdet: false,
    flagZomac: false,
    periodoAnio: 2023,
    matriculaTotal: 580,
    desercionHistorica: 4.8,
    desercionLag1: 4.5,
    tasaDesercionMpio: 2.1,
    indiceVulnerabilidad: 72.0,
    ipmMunicipal: 22.0,
    tasaDesplazamiento: 12.5,
    icfesDisponible: false,
    tasaReprobacion: 8.9,
    proporcionEtnica: 14.0,
    deficitTransporte: true,
    coberturaPae: 88.0,
    riskProbability: 0.49,
    riskCategory: 'MEDIO',
    departmentPercentile: 78.5,
    modelUsed: 'LIGHTWEIGHT_XGBOOST',
    history: [
      { year: 2018, enrollment: 610, dropoutRate: 4.2, riskScore: 0.44 },
      { year: 2019, enrollment: 600, dropoutRate: 4.3, riskScore: 0.45 },
      { year: 2020, enrollment: 595, dropoutRate: 3.2, riskScore: 0.36 },
      { year: 2021, enrollment: 590, dropoutRate: 3.9, riskScore: 0.41 },
      { year: 2022, enrollment: 585, dropoutRate: 4.5, riskScore: 0.47 },
      { year: 2023, enrollment: 580, dropoutRate: 4.8, riskScore: 0.49 }
    ]
  },
  {
    sedeCodigo: '276001004312',
    sedeNombre: 'I.E. Técnico Comercial San Bartolomé - Sede Buenaventura Bajamar',
    institucionNombre: 'I.E. San Bartolomé',
    municipioCodigo: '76109',
    municipio: 'Buenaventura',
    departamento: 'Valle del Cauca',
    secretaria: 'Secretaría de Educación de Buenaventura',
    lat: 3.8833,
    lng: -77.0333,
    zona: 'URBANO',
    flagPdet: true,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 510,
    desercionHistorica: 7.2,
    desercionLag1: 6.8,
    tasaDesercionMpio: 5.6,
    indiceVulnerabilidad: 83.2,
    ipmMunicipal: 61.4,
    tasaDesplazamiento: 29.1,
    puntajeSaber11: 224,
    icfesDisponible: true,
    tasaReprobacion: 13.8,
    proporcionEtnica: 91.0,
    deficitTransporte: false,
    coberturaPae: 64.0,
    riskProbability: 0.78,
    riskCategory: 'ALTO',
    departmentPercentile: 89.2,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 560, dropoutRate: 5.9, riskScore: 0.67 },
      { year: 2019, enrollment: 545, dropoutRate: 6.2, riskScore: 0.70 },
      { year: 2020, enrollment: 535, dropoutRate: 4.8, riskScore: 0.60 },
      { year: 2021, enrollment: 525, dropoutRate: 5.8, riskScore: 0.68 },
      { year: 2022, enrollment: 518, dropoutRate: 6.8, riskScore: 0.74 },
      { year: 2023, enrollment: 510, dropoutRate: 7.2, riskScore: 0.78 }
    ]
  },
  {
    sedeCodigo: '268001001290',
    sedeNombre: 'Colegio Santander de Bucaramanga - Sede Principal',
    institucionNombre: 'Colegio Santander',
    municipioCodigo: '68001',
    municipio: 'Bucaramanga',
    departamento: 'Santander',
    secretaria: 'Secretaría de Educación de Bucaramanga',
    lat: 7.1254,
    lng: -73.1198,
    zona: 'URBANO',
    flagPdet: false,
    flagZomac: false,
    periodoAnio: 2023,
    matriculaTotal: 890,
    desercionHistorica: 2.8,
    desercionLag1: 2.6,
    tasaDesercionMpio: 2.9,
    indiceVulnerabilidad: 41.5,
    ipmMunicipal: 19.8,
    tasaDesplazamiento: 6.1,
    puntajeSaber11: 282,
    icfesDisponible: true,
    tasaReprobacion: 5.9,
    proporcionEtnica: 3.8,
    deficitTransporte: false,
    coberturaPae: 92.0,
    riskProbability: 0.22,
    riskCategory: 'BAJO',
    departmentPercentile: 26.0,
    modelUsed: 'FULL_XGBOOST',
    history: [
      { year: 2018, enrollment: 930, dropoutRate: 3.1, riskScore: 0.26 },
      { year: 2019, enrollment: 915, dropoutRate: 3.0, riskScore: 0.25 },
      { year: 2020, enrollment: 910, dropoutRate: 2.0, riskScore: 0.18 },
      { year: 2021, enrollment: 905, dropoutRate: 2.4, riskScore: 0.21 },
      { year: 2022, enrollment: 895, dropoutRate: 2.6, riskScore: 0.22 },
      { year: 2023, enrollment: 890, dropoutRate: 2.8, riskScore: 0.22 }
    ]
  },
  {
    sedeCodigo: '218001005612',
    sedeNombre: 'Centro Educativo Rural Puerto Rico - Sede Florencia Selva',
    institucionNombre: 'C.E.R. Puerto Rico',
    municipioCodigo: '18001',
    municipio: 'Florencia',
    departamento: 'Caquetá',
    secretaria: 'Secretaría de Educación de Florencia',
    lat: 1.6144,
    lng: -75.6062,
    zona: 'RURAL',
    flagPdet: true,
    flagZomac: true,
    periodoAnio: 2023,
    matriculaTotal: 175,
    desercionHistorica: 8.5,
    desercionLag1: 8.0,
    tasaDesercionMpio: 6.4,
    indiceVulnerabilidad: 87.2,
    ipmMunicipal: 62.8,
    tasaDesplazamiento: 31.0,
    icfesDisponible: false,
    tasaReprobacion: 13.9,
    proporcionEtnica: 22.0,
    deficitTransporte: true,
    coberturaPae: 60.0,
    riskProbability: 0.83,
    riskCategory: 'ALTO',
    departmentPercentile: 92.5,
    modelUsed: 'LIGHTWEIGHT_XGBOOST',
    history: [
      { year: 2018, enrollment: 215, dropoutRate: 6.9, riskScore: 0.72 },
      { year: 2019, enrollment: 205, dropoutRate: 7.2, riskScore: 0.75 },
      { year: 2020, enrollment: 198, dropoutRate: 5.6, riskScore: 0.63 },
      { year: 2021, enrollment: 190, dropoutRate: 6.8, riskScore: 0.73 },
      { year: 2022, enrollment: 182, dropoutRate: 8.0, riskScore: 0.80 },
      { year: 2023, enrollment: 175, dropoutRate: 8.5, riskScore: 0.83 }
    ]
  }
];

export function getShapDriversForSchool(school: SchoolRecord): ShapDriver[] {
  // Deterministic calculation based on school's actual values to represent real TreeSHAP additive decomposition
  const drivers: ShapDriver[] = [];

  // Vulnerability driver
  const vulnShap = ((school.indiceVulnerabilidad - 50) / 100) * 0.42;
  drivers.push({
    feature: 'INDICE_VULNERABILIDAD',
    featureLabel: 'Índice de Vulnerabilidad Estudiantil',
    domain: 'Vulnerabilidad',
    shapValue: Number(vulnShap.toFixed(3)),
    featureValue: `${school.indiceVulnerabilidad.toFixed(1)} / 100`,
    impactDescription: vulnShap > 0 
      ? 'Aumenta marcadamente el riesgo predicho debido a condiciones socioeconómicas críticas' 
      : 'Reduce el riesgo predicho por mejor estabilidad socioeconómica familiar'
  });

  // Historical dropout lag1
  const lagShap = ((school.desercionLag1 - 4.5) / 10) * 0.38;
  drivers.push({
    feature: 'DESERCION_LAG1',
    featureLabel: 'Deserción Histórica Inmediata (t-1)',
    domain: 'Deserción',
    shapValue: Number(lagShap.toFixed(3)),
    featureValue: `${school.desercionLag1.toFixed(1)}%`,
    impactDescription: lagShap > 0
      ? 'Inercia de abandono escolar en vigencia previa eleva fuertemente la probabilidad'
      : 'Historial previo de baja deserción actúa como amortiguador predictivo'
  });

  // Enrollment change (drop vs growth)
  const enrollChange = school.history.length >= 2 
    ? ((school.matriculaTotal - school.history[school.history.length - 2].enrollment) / school.history[school.history.length - 2].enrollment) * 100
    : -3.5;
  const enrollShap = enrollChange < 0 ? Math.min(0.25, Math.abs(enrollChange) * 0.035) : -0.12;
  drivers.push({
    feature: 'DELTA_MATRICULA',
    featureLabel: 'Contracción Interanual de Matrícula',
    domain: 'Matrícula',
    shapValue: Number(enrollShap.toFixed(3)),
    featureValue: `${enrollChange >= 0 ? '+' : ''}${enrollChange.toFixed(1)}%`,
    impactDescription: enrollShap > 0
      ? 'La pérdida sistemática de matrícula alerta sobre posible desvinculación activa de alumnos'
      : 'Matrícula estable o en expansión reduce la propensión de desescolarización'
  });

  // Rurality & Transport deficit
  if (school.zona === 'RURAL' || school.deficitTransporte) {
    const geoShap = school.deficitTransporte ? 0.18 : 0.09;
    drivers.push({
      feature: 'DEFICIT_TRANSPORTE_RURAL',
      featureLabel: 'Déficit de Transporte y Ruralidad Dispersa',
      domain: 'Territorial & Conflicto',
      shapValue: geoShap,
      featureValue: school.deficitTransporte ? 'Carencia de Ruta' : 'Rural con Ruta',
      impactDescription: 'Barreras físicas de acceso y tiempos de traslado a pie incrementan el riesgo'
    });
  } else {
    drivers.push({
      feature: 'ACCESO_URBANO',
      featureLabel: 'Accesibilidad Urbana',
      domain: 'Territorial & Conflicto',
      shapValue: -0.11,
      featureValue: 'Urbano Consolidado',
      impactDescription: 'Menor tiempo de desplazamiento y cercanía a la sede favorecen la retención'
    });
  }

  // PAE Coverage
  const paeShap = ((75 - school.coberturaPae) / 100) * 0.22;
  drivers.push({
    feature: 'COBERTURA_PAE',
    featureLabel: 'Cobertura Efectiva de Alimentación Escolar (PAE)',
    domain: 'Vulnerabilidad',
    shapValue: Number(paeShap.toFixed(3)),
    featureValue: `${school.coberturaPae.toFixed(0)}%`,
    impactDescription: paeShap > 0
      ? 'Déficit en cobertura de ración alimentaria debilita incentivo clave de permanencia'
      : 'Alta cobertura PAE actúa como factor protector ante la deserción'
  });

  // Conflict / PDET
  if (school.flagPdet || school.flagZomac) {
    drivers.push({
      feature: 'FLAG_PDET_ZOMAC',
      featureLabel: 'Contexto de Conflicto (PDET / ZOMAC)',
      domain: 'Territorial & Conflicto',
      shapValue: 0.14,
      featureValue: `${school.flagPdet ? 'PDET' : ''} ${school.flagZomac ? 'ZOMAC' : ''}`.trim(),
      impactDescription: 'Dinámicas territoriales de conflicto y vulnerabilidad institucional agregada'
    });
  }

  // Academic Repetition / ICFES
  if (school.tasaReprobacion > 10) {
    drivers.push({
      feature: 'TASA_REPROBACION',
      featureLabel: 'Tasa de Reprobación y Rezago Escolar',
      domain: 'Académico',
      shapValue: 0.12,
      featureValue: `${school.tasaReprobacion.toFixed(1)}%`,
      impactDescription: 'Fracaso escolar temprano y extraedad generan desincentivos que preceden al retiro'
    });
  }

  // Sort by absolute SHAP magnitude descending
  return drivers.sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));
}
