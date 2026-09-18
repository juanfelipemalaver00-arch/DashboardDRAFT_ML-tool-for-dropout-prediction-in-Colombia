export type RiskLevel = 'BAJO' | 'MEDIO' | 'ALTO';

export interface SchoolRecord {
  sedeCodigo: string;
  sedeNombre: string;
  institucionNombre: string;
  municipioCodigo: string;
  municipio: string;
  departamento: string;
  secretaria: string;
  lat: number;
  lng: number;
  zona: 'RURAL' | 'URBANO';
  flagPdet: boolean;
  flagZomac: boolean;
  periodoAnio: number;
  matriculaTotal: number;
  desercionHistorica: number; // e.g. 4.2%
  desercionLag1: number;
  tasaDesercionMpio: number;
  indiceVulnerabilidad: number; // 0-100
  ipmMunicipal: number; // 0-100
  tasaDesplazamiento: number; // por 1000 hab
  puntajeSaber11?: number; // 0-500
  icfesDisponible: boolean;
  tasaReprobacion: number; // %
  proporcionEtnica: number; // %
  deficitTransporte: boolean;
  coberturaPae: number; // %
  // Model prediction outputs
  riskProbability: number; // 0 to 1
  riskCategory: RiskLevel;
  departmentPercentile: number; // 0-100%
  modelUsed: 'FULL_XGBOOST' | 'LIGHTWEIGHT_XGBOOST';
  // Historical trend (2018-2023)
  history: {
    year: number;
    enrollment: number;
    dropoutRate: number;
    riskScore: number;
  }[];
}

export interface ShapDriver {
  feature: string;
  featureLabel: string;
  domain: string;
  shapValue: number; // positive increases risk, negative decreases risk
  featureValue: string | number;
  impactDescription: string;
}

export interface OperationalRecommendation {
  id: string;
  sedeCodigo: string;
  sedeNombre: string;
  municipio: string;
  departamento: string;
  secretaria: string;
  riskProbability: number;
  riskCategory: RiskLevel;
  primaryDriver: string;
  driverDetails: string;
  actionTitle: string;
  actionDescription: string;
  priority: 'ALTA' | 'MEDIA' | 'CRÍTICA';
  timeHorizon: 'Inmediato (0-30 días)' | 'Corto Plazo (1-3 meses)' | 'Plan Anual';
  responsibleArea: 'Secretaría / PAE' | 'Transporte Escolar' | 'Bienestar / Psicosocial' | 'Calidad Educativa / Tutorías' | 'Mesa Territorial de Víctimas';
  status: 'No iniciado' | 'En progreso' | 'Completado' | 'No aplica';
  assignedTo?: string;
  notes?: string;
  dueDate?: string;
}

export interface DataDictionaryEntry {
  variable: string;
  nombreDescriptivo: string;
  dominio: 'Identificación' | 'Matrícula' | 'Deserción' | 'Vulnerabilidad' | 'Académico' | 'Territorial & Conflicto' | 'Modelo';
  fuente: 'C-600' | 'SIMAT/SINEB' | 'Saber 11 (ICFES)' | 'IPM / TerriData' | 'ART / MinInterior' | 'Pipeline ML';
  tipo: 'Numérico' | 'Categórico' | 'Booleano' | 'Identificador';
  disponibilidad: number; // %
  descripcion: string;
  rolModelado: 'Identificador' | 'Predictor Full & Light' | 'Predictor Full Only' | 'Target' | 'Metadato Operativo';
}

export interface PipelineStepInfo {
  sourceName: string;
  sourceType: string;
  geographicLevel: string;
  frequency: string;
  recordCount: string;
  keyVariables: string[];
  integrationChallenge: string;
  solutionApplied: string;
  statusBadge: 'Integrado' | 'Estandarizado' | 'Filtrado';
}

export interface RoiSimulationParams {
  studentsAtRiskCount: number;
  annualCostPerDropoutStudentCop: number; // e.g. 5,200,000 COP
  annualProgramCostCop: number; // e.g. 12,000,000,000 COP
  retentionScenarioRate: number; // percentage (e.g. 5% or 9%)
  interventionCostPerStudentCop: number; // e.g. 850,000 COP
  coverageRate: number; // percentage of high-risk schools covered (e.g. 80%)
}

export interface RoiSimulationResult {
  totalTargetStudents: number;
  coveredStudents: number;
  preventedDropouts: number;
  grossAvoidedLossCop: number;
  interventionExpenditureCop: number;
  totalProgramCostCop: number;
  netEconomicBenefitCop: number;
  benefitCostRatio: number;
  roiPercentage: number;
}
