import { RoiSimulationParams, RoiSimulationResult } from '../types';

export const DEFAULT_ROI_PARAMS: RoiSimulationParams = {
  studentsAtRiskCount: 500000,
  annualCostPerDropoutStudentCop: 5600000, // Costo integral anual de deserción por alumno (pérdida de capital humano, costo de atención social y desfinanciación SGP)
  annualProgramCostCop: 15000000000, // 15 mil millones COP (costo operativo nacional del sistema, infraestructura analítica y equipos de campo)
  retentionScenarioRate: 5.0, // 5% escenario conservador
  interventionCostPerStudentCop: 450000, // 450.000 COP por estudiante intervenido (transporte, PAE focalizado, refuerzo)
  coverageRate: 75.0 // 75% de cobertura de sedes en alerta
};

export const PRESET_SCENARIOS = {
  conservative: {
    label: 'Escenario Conservador (5% Retención)',
    retentionRate: 5.0,
    expectedAvoidedLossText: '~ $140.000 Millones COP / año',
    expectedBcRatio: 1.2,
    description: 'Supone una efectividad modesta de las alertas tempranas donde solo 1 de cada 20 estudiantes en riesgo inminente logra ser retenido mediante intervención oportuna.'
  },
  optimistic: {
    label: 'Escenario Optimista (9% Retención)',
    retentionRate: 9.0,
    expectedAvoidedLossText: '~ $252.000 Millones COP / año',
    expectedBcRatio: 2.1,
    description: 'Supone un despliegue articulado de Secretarías con focalización prioritaria de rutas de transporte y complementos alimentarios PAE.'
  }
};

export function calculateRoi(params: RoiSimulationParams): RoiSimulationResult {
  const coveredStudents = Math.round(params.studentsAtRiskCount * (params.coverageRate / 100));
  const preventedDropouts = Math.round(coveredStudents * (params.retentionScenarioRate / 100));
  
  // Gross loss avoided by keeping students in the educational system
  const grossAvoidedLossCop = preventedDropouts * params.annualCostPerDropoutStudentCop;
  
  // Variable cost of operational interventions across covered target population
  const interventionExpenditureCop = coveredStudents * params.interventionCostPerStudentCop;
  
  // Total cost: fixed program infrastructure + variable field interventions
  const totalProgramCostCop = params.annualProgramCostCop + interventionExpenditureCop;
  
  const netEconomicBenefitCop = grossAvoidedLossCop - totalProgramCostCop;
  const benefitCostRatio = totalProgramCostCop > 0 ? Number((grossAvoidedLossCop / totalProgramCostCop).toFixed(2)) : 0;
  const roiPercentage = totalProgramCostCop > 0 ? Number(((netEconomicBenefitCop / totalProgramCostCop) * 100).toFixed(1)) : 0;

  return {
    totalTargetStudents: params.studentsAtRiskCount,
    coveredStudents,
    preventedDropouts,
    grossAvoidedLossCop,
    interventionExpenditureCop,
    totalProgramCostCop,
    netEconomicBenefitCop,
    benefitCostRatio,
    roiPercentage
  };
}

export function formatCopCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000_000_000) {
    return `$ ${(value / 1_000_000_000_000).toFixed(2)} Billones COP`;
  }
  if (Math.abs(value) >= 1_000_000_000) {
    return `$ ${(value / 1_000_000_000).toFixed(1)} Mil Millones COP`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$ ${(value / 1_000_000).toFixed(1)} Millones COP`;
  }
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
}
