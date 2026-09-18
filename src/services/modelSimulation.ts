import { SchoolRecord, RiskLevel } from '../types';

export interface ModelMetrics {
  aucRoc: number;
  recallHighRisk: number;
  precisionHighRisk: number;
  f1Score: number;
  accuracy: number;
  brierScore: number;
}

export const REFERENCE_METRICS: ModelMetrics = {
  aucRoc: 0.81,
  recallHighRisk: 0.76,
  precisionHighRisk: 0.68,
  f1Score: 0.72,
  accuracy: 0.84,
  brierScore: 0.12
};

export interface CrossValidationFold {
  fold: number;
  aucRoc: number;
  recall: number;
  precision: number;
  f1: number;
}

export const CV_FOLDS: CrossValidationFold[] = [
  { fold: 1, aucRoc: 0.815, recall: 0.768, precision: 0.685, f1: 0.724 },
  { fold: 2, aucRoc: 0.808, recall: 0.752, precision: 0.672, f1: 0.710 },
  { fold: 3, aucRoc: 0.819, recall: 0.774, precision: 0.691, f1: 0.730 },
  { fold: 4, aucRoc: 0.804, recall: 0.748, precision: 0.669, f1: 0.706 },
  { fold: 5, aucRoc: 0.814, recall: 0.762, precision: 0.684, f1: 0.721 }
];

export const ROC_CURVE_POINTS = [
  { fpr: 0.00, tpr: 0.00 },
  { fpr: 0.03, tpr: 0.22 },
  { fpr: 0.07, tpr: 0.44 },
  { fpr: 0.12, tpr: 0.61 },
  { fpr: 0.18, tpr: 0.74 },
  { fpr: 0.25, tpr: 0.82 },
  { fpr: 0.35, tpr: 0.89 },
  { fpr: 0.50, tpr: 0.94 },
  { fpr: 0.70, tpr: 0.97 },
  { fpr: 1.00, tpr: 1.00 }
];

export const PR_CURVE_POINTS = [
  { recall: 0.00, precision: 0.92 },
  { recall: 0.20, precision: 0.88 },
  { recall: 0.40, precision: 0.81 },
  { recall: 0.60, precision: 0.75 },
  { recall: 0.76, precision: 0.68 },
  { recall: 0.85, precision: 0.56 },
  { recall: 0.92, precision: 0.42 },
  { recall: 1.00, precision: 0.28 }
];

export const CALIBRATION_CURVE_POINTS = [
  { bin: '0.0 - 0.1', meanPred: 0.05, obsFreq: 0.04 },
  { bin: '0.1 - 0.2', meanPred: 0.15, obsFreq: 0.14 },
  { bin: '0.2 - 0.3', meanPred: 0.25, obsFreq: 0.26 },
  { bin: '0.3 - 0.4', meanPred: 0.35, obsFreq: 0.33 },
  { bin: '0.4 - 0.5', meanPred: 0.45, obsFreq: 0.47 },
  { bin: '0.5 - 0.6', meanPred: 0.55, obsFreq: 0.56 },
  { bin: '0.6 - 0.7', meanPred: 0.65, obsFreq: 0.64 },
  { bin: '0.7 - 0.8', meanPred: 0.75, obsFreq: 0.76 },
  { bin: '0.8 - 0.9', meanPred: 0.85, obsFreq: 0.84 },
  { bin: '0.9 - 1.0', meanPred: 0.95, obsFreq: 0.93 }
];

export interface ConfusionMatrixData {
  truePositive: number;
  falsePositive: number;
  falseNegative: number;
  trueNegative: number;
}

export const REFERENCE_CONFUSION_MATRIX: ConfusionMatrixData = {
  truePositive: 6420,
  falsePositive: 3020,
  falseNegative: 2030,
  trueNegative: 45087
};

export function classifySchoolRisk(
  school: SchoolRecord,
  mode: 'NATIONAL_FIXED' | 'DEPARTMENT_RELATIVE',
  nationalThreshold: number = 0.65,
  departmentPercentileThreshold: number = 80 // e.g. top 20%
): RiskLevel {
  if (mode === 'NATIONAL_FIXED') {
    if (school.riskProbability >= nationalThreshold) return 'ALTO';
    if (school.riskProbability >= nationalThreshold - 0.25) return 'MEDIO';
    return 'BAJO';
  } else {
    // Relative to department distribution
    if (school.departmentPercentile >= departmentPercentileThreshold) return 'ALTO';
    if (school.departmentPercentile >= departmentPercentileThreshold - 30) return 'MEDIO';
    return 'BAJO';
  }
}
