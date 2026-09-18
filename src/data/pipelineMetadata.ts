import { PipelineStepInfo } from '../types';

export const PIPELINE_SOURCES: PipelineStepInfo[] = [
  {
    sourceName: 'Censo C-600',
    sourceType: 'DANE Educación Formal',
    geographicLevel: 'Sede Educativa Física',
    frequency: 'Anual',
    recordCount: '56,557 sedes / año',
    keyVariables: ['SEDE_CODIGO', 'FLAG_RURAL', 'DEFICIT_TRANSPORTE_RURAL', 'SERVICIOS_BASICOS', 'JORNADA'],
    integrationChallenge: 'Múltiples encodings (UTF-8, Latin-1, Windows-1252) y separadores cambiantes (punto y coma, coma, tabulaciones) entre vigencias 2018 a 2023.',
    solutionApplied: 'Pipeline de lectura adaptativa con autodetección de charset (chardet/charset_normalizer) y normalización tipológica con verificación sintáctica de cabeceras.',
    statusBadge: 'Integrado'
  },
  {
    sourceName: 'SIMAT / SINEB',
    sourceType: 'Ministerio de Educación Nacional (MEN)',
    geographicLevel: 'Estudiante / Sede / Grado',
    frequency: 'Mensual / Anual',
    recordCount: '319,609 registros sede-año',
    keyVariables: ['MATRICULA_TOTAL', 'DESERCION_LAG1', 'TASA_REPROBACION_ANTERIOR', 'COBERTURA_PAE_SEDE', 'PROPORCION_ETNICA'],
    integrationChallenge: 'SIMAT vs DIVIPOLA: Inicialmente 185 municipios sin coincidencia por cambios de codificación o nombres con tildes y caracteres especiales.',
    solutionApplied: 'Matching probabilístico mediante código DANE de 5 dígitos + regla de extracción de municipio desde los primeros 5 dígitos del código de sede (98.3% acierto frente a DIVIPOLA). Recuperados 161 municipios; 24 aislados y documentados.',
    statusBadge: 'Estandarizado'
  },
  {
    sourceName: 'Saber 11 (ICFES)',
    sourceType: 'ICFES Pruebas Estandarizadas',
    geographicLevel: 'Institución / Grado 11',
    frequency: 'Semestral / Anual',
    recordCount: '~27,500 sedes con media',
    keyVariables: ['PUNTAJE_SABER11_GLOBAL', 'PUNTAJE_LECTURA', 'PUNTAJE_MATEMATICAS', 'FLAG_ICFES_DISPONIBLE'],
    integrationChallenge: 'Disponibilidad parcial (48.7%). Las sedes primarias puras no presentan Saber 11, lo que causaría descarte masivo si fuera variable obligatoria.',
    solutionApplied: 'Arquitectura Dual: Modelo Completo (Full Model) para sedes con cobertura ICFES y Modelo Ligero (Lightweight Model) sin variables académicas para no excluir sedes primarias.',
    statusBadge: 'Integrado'
  },
  {
    sourceName: 'IPM / TerriData',
    sourceType: 'DNP / DANE',
    geographicLevel: 'Municipal (1,122 municipios)',
    frequency: 'Censal / Anualizado',
    recordCount: '1,122 municipios',
    keyVariables: ['IPM_MUNICIPAL', 'TASA_DESERCION_MPIO', 'TASA_DESPLAZAMIENTO_MPIO', 'INDICE_DESEMPLEO_MPIO'],
    integrationChallenge: 'Mapeo de métricas municipales agregadas hacia sedes con diferentes dinámicas micro-territoriales sin incurrir en falacia ecológica.',
    solutionApplied: 'Fusión jerárquica por código DANE 5 dígitos con ponderación por índice de vulnerabilidad interna de la sede educativa.',
    statusBadge: 'Estandarizado'
  },
  {
    sourceName: 'PDET & ZOMAC',
    sourceType: 'Agencia de Renovación del Territorio (ART)',
    geographicLevel: 'Subregión / Municipio',
    frequency: 'Fijo (Acuerdo de Paz)',
    recordCount: '170 municipios PDET, 344 ZOMAC',
    keyVariables: ['FLAG_PDET', 'FLAG_ZOMAC', 'SUBREGION_PDET_NOMBRE'],
    integrationChallenge: 'Cero coincidencias iniciales en merges directos por cadenas de texto debido a discrepancias en acrónimos y versiones de decreto.',
    solutionApplied: 'Estandarización estricta de códigos DIVIPOLA territoriales 5 dígitos cruzando los decretos de ley 893 de 2017 (PDET) y 1650 de 2017 (ZOMAC). 100% de cobertura lograda.',
    statusBadge: 'Estandarizado'
  }
];

export const PIPELINE_CHALLENGES = [
  {
    id: 'leakage',
    title: 'Data Leakage y Promedios Móviles',
    problema: 'En modelos retrospectivos previos, incluir promedios móviles que contenían el año objetivo generaba una precisión artificialmente inflada en validación que colapsaba en producción.',
    solucion: 'Política estricta de rezagos históricos exclusivamente (t-1, t-2). El conjunto de entrenamiento nunca observa información contemporánea del año evaluado.'
  },
  {
    id: 'missing-data',
    title: 'Estrategia de Tratamiento de Valores Faltantes (Missing Data)',
    problema: 'Heterogeneidad en la calidad de reporte entre Secretarías certificadas grandes (Bogotá, Medellín) vs Secretarías en zonas no certificadas o rurales dispersas.',
    solucion: 'Regla de tres niveles: (1) Disponibilidad > 90%: uso directo con imputación por mediana condicional. (2) Disponibilidad 40-70%: imputación estocástica + indicador binario de disponibilidad. (3) Disponibilidad < 40%: dummy de disponibilidad y canalización al Lightweight Model.'
  },
  {
    id: 'pandemic',
    title: 'Pandemic Bias (COVID-19 2020-2021)',
    problema: 'Durante la pandemia se decretó promoción automática y subsidios de emergencia atípicos. Entrenar el modelo con estos años hacía que la variable FLAG_PANDEMIA dominara la importancia del árbol.',
    solucion: 'Exclusión deliberada de los años 2020 y 2021 del entrenamiento principal del clasificador y ajuste por tendencia estructural de mediano plazo pre/post pandemia.'
  }
];
