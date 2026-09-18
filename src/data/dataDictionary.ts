import { DataDictionaryEntry } from '../types';

export const DATA_DICTIONARY: DataDictionaryEntry[] = [
  {
    variable: 'SEDE_CODIGO',
    nombreDescriptivo: 'Código DANE de la Sede Educativa',
    dominio: 'Identificación',
    fuente: 'C-600',
    tipo: 'Identificador',
    disponibilidad: 100,
    descripcion: 'Código único de 12 dígitos asignado por el DANE para identificar inequívocamente cada sede educativa física en Colombia.',
    rolModelado: 'Identificador'
  },
  {
    variable: 'PERIODO_ANIO',
    nombreDescriptivo: 'Año Calendario de Operación',
    dominio: 'Identificación',
    fuente: 'SIMAT/SINEB',
    tipo: 'Numérico',
    disponibilidad: 100,
    descripcion: 'Año lectivo de recolección de los datos escolares (2018 a 2023). Clave para evitar data leakage mediante rezagos históricos.',
    rolModelado: 'Identificador'
  },
  {
    variable: 'FLAG_DESERCION / FLAG_ALTO_RIESGO',
    nombreDescriptivo: 'Variable Objetivo: Alto Riesgo o Deserción Crítica',
    dominio: 'Modelo',
    fuente: 'Pipeline ML',
    tipo: 'Booleano',
    disponibilidad: 100,
    descripcion: 'Target binario del modelo. Indica si la sede superó el umbral crítico de deserción intra-anual (> percentil 75 departamental o > 6.5% de matrícula desertada).',
    rolModelado: 'Target'
  },
  {
    variable: 'DESERCION_LAG1',
    nombreDescriptivo: 'Tasa de Deserción Escolar en Año Anterior (t-1)',
    dominio: 'Deserción',
    fuente: 'SIMAT/SINEB',
    tipo: 'Numérico',
    disponibilidad: 98.4,
    descripcion: 'Porcentaje de estudiantes de la sede que desertaron en el ciclo anterior. Es el predictor estructural inercial más fuerte.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'TASA_DESERCION_MPIO',
    nombreDescriptivo: 'Tasa Promedio de Deserción del Municipio',
    dominio: 'Deserción',
    fuente: 'IPM / TerriData',
    tipo: 'Numérico',
    disponibilidad: 99.1,
    descripcion: 'Tasa general agregada de deserción municipal consolidada en años previos. Refleja dinámicas de expulsión territorial.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'MATRICULA_TOTAL',
    nombreDescriptivo: 'Volumen Total de Estudiantes Matriculados',
    dominio: 'Matrícula',
    fuente: 'SIMAT/SINEB',
    tipo: 'Numérico',
    disponibilidad: 100,
    descripcion: 'Conteo total de estudiantes registrados al corte de matrícula inicial del año en curso.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'DELTA_MATRICULA_PCT',
    nombreDescriptivo: 'Variación Porcentual Interanual de Matrícula',
    dominio: 'Matrícula',
    fuente: 'SIMAT/SINEB',
    tipo: 'Numérico',
    disponibilidad: 97.2,
    descripcion: 'Tasa de crecimiento o contracción de matrícula respecto al año t-1. Caídas abruptas son señales de alerta de migración o deserción.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'INDICE_VULNERABILIDAD',
    nombreDescriptivo: 'Índice Sintético de Vulnerabilidad Estudiantil',
    dominio: 'Vulnerabilidad',
    fuente: 'Pipeline ML',
    tipo: 'Numérico',
    disponibilidad: 96.8,
    descripcion: 'Índice compuesto (0 a 100) que combina estrato socioeconómico familiar, Sisbén IV, condiciones de habitabilidad y jefatura femenina.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'IPM_MUNICIPAL',
    nombreDescriptivo: 'Índice de Pobreza Multidimensional del Municipio',
    dominio: 'Vulnerabilidad',
    fuente: 'IPM / TerriData',
    tipo: 'Numérico',
    disponibilidad: 99.5,
    descripcion: 'Medida del DANE que evalúa 5 dimensiones: condiciones educativas del hogar, niñez/juventud, trabajo, salud, y vivienda/servicios públicos.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'FLAG_RURAL',
    nombreDescriptivo: 'Ubicación en Área Rural Dispersa o Centro Poblado',
    dominio: 'Territorial & Conflicto',
    fuente: 'C-600',
    tipo: 'Booleano',
    disponibilidad: 100,
    descripcion: 'Marca binaria de sede rural. Factor crítico asociado a distancias de desplazamiento, clima y trabajo infantil estacional.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'FLAG_PDET',
    nombreDescriptivo: 'Programa de Desarrollo con Enfoque Territorial',
    dominio: 'Territorial & Conflicto',
    fuente: 'ART / MinInterior',
    tipo: 'Booleano',
    disponibilidad: 100,
    descripcion: 'Indica si el municipio forma parte de las 16 subregiones PDET priorizadas por el Acuerdo de Paz debido a conflicto armado y pobreza.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'FLAG_ZOMAC',
    nombreDescriptivo: 'Zona Más Afectada por el Conflicto Armado',
    dominio: 'Territorial & Conflicto',
    fuente: 'ART / MinInterior',
    tipo: 'Booleano',
    disponibilidad: 100,
    descripcion: 'Identifica sedes ubicadas en los 344 municipios ZOMAC receptores de incentivos tributarios de postconflicto.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'TASA_DESPLAZAMIENTO_MPIO',
    nombreDescriptivo: 'Tasa de Población Víctima de Desplazamiento Forzado',
    dominio: 'Territorial & Conflicto',
    fuente: 'IPM / TerriData',
    tipo: 'Numérico',
    disponibilidad: 95.3,
    descripcion: 'Número de personas en situación de desplazamiento forzado por cada 1,000 habitantes en el municipio.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'PUNTAJE_SABER11_GLOBAL',
    nombreDescriptivo: 'Puntaje Promedio Global Pruebas Saber 11 / ICFES',
    dominio: 'Académico',
    fuente: 'Saber 11 (ICFES)',
    tipo: 'Numérico',
    disponibilidad: 48.7,
    descripcion: 'Puntaje medio institucional de la prueba estandarizada Saber 11. Disponible mayoritariamente en sedes con grados completos de secundaria y media.',
    rolModelado: 'Predictor Full Only'
  },
  {
    variable: 'FLAG_ICFES_DISPONIBLE',
    nombreDescriptivo: 'Indicador de Disponibilidad de Datos ICFES',
    dominio: 'Académico',
    fuente: 'Pipeline ML',
    tipo: 'Booleano',
    disponibilidad: 100,
    descripcion: 'Dummy explicativo: 1 si la sede cuenta con pruebas Saber estandarizadas; 0 si es sede primaria pura o carece de reporte.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'TASA_REPROBACION_ANTERIOR',
    nombreDescriptivo: 'Tasa de Reprobación Académica en t-1',
    dominio: 'Académico',
    fuente: 'SIMAT/SINEB',
    tipo: 'Numérico',
    disponibilidad: 93.6,
    descripcion: 'Proporción de estudiantes no promovidos de grado al cierre lectivo anterior. Fuertemente correlacionada con desmotivación y abandono.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'COBERTURA_PAE_SEDE',
    nombreDescriptivo: 'Tasa de Cobertura Efectiva de Alimentación Escolar (PAE)',
    dominio: 'Vulnerabilidad',
    fuente: 'SIMAT/SINEB',
    tipo: 'Numérico',
    disponibilidad: 88.9,
    descripcion: 'Porcentaje de estudiantes de la sede cubiertos con ración complementaria diaria del Programa de Alimentación Escolar.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'DEFICIT_TRANSPORTE_RURAL',
    nombreDescriptivo: 'Carencia de Ruta o Subsidio de Transporte Escolar',
    dominio: 'Territorial & Conflicto',
    fuente: 'C-600',
    tipo: 'Booleano',
    disponibilidad: 86.4,
    descripcion: 'Marca si más del 30% de los estudiantes recorre más de 45 minutos a pie para llegar a la sede sin apoyo de transporte oficial.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'PROPORCION_ETNICA',
    nombreDescriptivo: 'Porcentaje de Matrícula Afrocolombiana e Indígena',
    dominio: 'Identificación',
    fuente: 'SIMAT/SINEB',
    tipo: 'Numérico',
    disponibilidad: 94.1,
    descripcion: 'Proporción de estudiantes autorreconocidos en etnias de protección especial constitucional.',
    rolModelado: 'Predictor Full & Light'
  },
  {
    variable: 'FLAG_PANDEMIA',
    nombreDescriptivo: 'Indicador de Período de Pandemia COVID-19 (2020-2021)',
    dominio: 'Modelo',
    fuente: 'Pipeline ML',
    tipo: 'Booleano',
    disponibilidad: 100,
    descripcion: 'Marca temporal para aislar el shock exógeno 2020-2021 del entrenamiento para que no distorsione las dinámicas estructurales de deserción.',
    rolModelado: 'Metadato Operativo'
  }
];
