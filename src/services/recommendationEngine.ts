import { OperationalRecommendation, SchoolRecord } from '../types';
import { getShapDriversForSchool } from '../data/syntheticDatabase';

export function generateRecommendationsForSchool(school: SchoolRecord): OperationalRecommendation[] {
  const drivers = getShapDriversForSchool(school);
  const recs: OperationalRecommendation[] = [];

  // Rule 1: High Vulnerability / Low PAE
  if (school.indiceVulnerabilidad > 70 || school.coberturaPae < 75) {
    recs.push({
      id: `rec-pae-${school.sedeCodigo}`,
      sedeCodigo: school.sedeCodigo,
      sedeNombre: school.sedeNombre,
      municipio: school.municipio,
      departamento: school.departamento,
      secretaria: school.secretaria,
      riskProbability: school.riskProbability,
      riskCategory: school.riskCategory,
      primaryDriver: 'Vulnerabilidad socioeconómica y déficit de seguridad alimentaria',
      driverDetails: `Índice de vulnerabilidad de ${school.indiceVulnerabilidad.toFixed(1)}/100 y cobertura PAE en ${school.coberturaPae.toFixed(0)}%.`,
      actionTitle: 'Priorizar y Focalizar Ampliación de Cobertura PAE',
      actionDescription: 'Garantizar el 100% de raciones preparadas en sitio para primaria e implementar seguimiento quincenal a la entrega efectiva de complementos alimentarios como ancla de permanencia.',
      priority: school.riskCategory === 'ALTO' ? 'CRÍTICA' : 'ALTA',
      timeHorizon: 'Inmediato (0-30 días)',
      responsibleArea: 'Secretaría / PAE',
      status: 'No iniciado'
    });
  }

  // Rule 2: Rurality & Transport Deficit
  if (school.zona === 'RURAL' && school.deficitTransporte) {
    recs.push({
      id: `rec-trans-${school.sedeCodigo}`,
      sedeCodigo: school.sedeCodigo,
      sedeNombre: school.sedeNombre,
      municipio: school.municipio,
      departamento: school.departamento,
      secretaria: school.secretaria,
      riskProbability: school.riskProbability,
      riskCategory: school.riskCategory,
      primaryDriver: 'Barreras de movilidad y dispersión geográfica rural',
      driverDetails: 'Más del 30% de estudiantes con tiempos de caminata superiores a 45 min sin transporte escolar garantizado.',
      actionTitle: 'Habilitar Subsidio o Ruta de Transporte Escolar Rural',
      actionDescription: 'Evaluar apertura o reactivación de ruta veredal con operador local o asignación de subsidio condicionado de transporte para estudiantes en riesgo identificados.',
      priority: 'CRÍTICA',
      timeHorizon: 'Inmediato (0-30 días)',
      responsibleArea: 'Transporte Escolar',
      status: 'No iniciado'
    });
  }

  // Rule 3: High Historical Dropout / Enrollment Decline
  if (school.desercionLag1 > 5.0 || school.riskProbability > 0.65) {
    recs.push({
      id: `rec-psico-${school.sedeCodigo}`,
      sedeCodigo: school.sedeCodigo,
      sedeNombre: school.sedeNombre,
      municipio: school.municipio,
      departamento: school.departamento,
      secretaria: school.secretaria,
      riskProbability: school.riskProbability,
      riskCategory: school.riskCategory,
      primaryDriver: 'Inercia de abandono escolar y desvinculación activa',
      driverDetails: `Tasa de deserción en ciclo previo de ${school.desercionLag1.toFixed(1)}% y probabilidad de riesgo del ${(school.riskProbability * 100).toFixed(0)}%.`,
      actionTitle: 'Activación de Dupla Psicosocial y Búsqueda Activa Territorial',
      actionDescription: 'Desplegar equipo psicosocial de la Secretaría para contactar a familias con inasistencias reiteradas (>3 días continuos) y prevenir el retiro definitivo antes del corte oficial.',
      priority: 'ALTA',
      timeHorizon: 'Corto Plazo (1-3 meses)',
      responsibleArea: 'Bienestar / Psicosocial',
      status: 'No iniciado'
    });
  }

  // Rule 4: Academic Failure / Repetition
  if (school.tasaReprobacion > 10.0) {
    recs.push({
      id: `rec-acad-${school.sedeCodigo}`,
      sedeCodigo: school.sedeCodigo,
      sedeNombre: school.sedeNombre,
      municipio: school.municipio,
      departamento: school.departamento,
      secretaria: school.secretaria,
      riskProbability: school.riskProbability,
      riskCategory: school.riskCategory,
      primaryDriver: 'Rezago académico acumulado y alta tasa de reprobación',
      driverDetails: `Tasa de reprobación de ${school.tasaReprobacion.toFixed(1)}%, generando desmotivación y desfase etario.`,
      actionTitle: 'Plan de Nivelación y Refuerzo Pedagógico Focalizado',
      actionDescription: 'Implementar tutorías entre pares y módulos de recuperación de aprendizajes fundamentales en lectura inicial y matemáticas para mitigar la frustración académica.',
      priority: 'ALTA',
      timeHorizon: 'Corto Plazo (1-3 meses)',
      responsibleArea: 'Calidad Educativa / Tutorías',
      status: 'No iniciado'
    });
  }

  // Rule 5: Conflict / PDET / Forced Displacement
  if (school.flagPdet || school.tasaDesplazamiento > 20.0) {
    recs.push({
      id: `rec-vict-${school.sedeCodigo}`,
      sedeCodigo: school.sedeCodigo,
      sedeNombre: school.sedeNombre,
      municipio: school.municipio,
      departamento: school.departamento,
      secretaria: school.secretaria,
      riskProbability: school.riskProbability,
      riskCategory: school.riskCategory,
      primaryDriver: 'Afectación por dinámicas de conflicto y desplazamiento forzado',
      driverDetails: `Tasa de desplazamiento municipal de ${school.tasaDesplazamiento.toFixed(1)}/1000 hab y clasificación PDET/ZOMAC.`,
      actionTitle: 'Coordinación con Mesa Municipal de Víctimas y Ruta de Protección',
      actionDescription: 'Articular con el Comité de Justicia Transicional y Personería para asegurar que los niños víctimas cuenten con kits escolares completos, exención de cobros y ruta escolar segura.',
      priority: 'CRÍTICA',
      timeHorizon: 'Plan Anual',
      responsibleArea: 'Mesa Territorial de Víctimas',
      status: 'No iniciado'
    });
  }

  return recs;
}

export function getAllInitialRecommendations(schools: SchoolRecord[]): OperationalRecommendation[] {
  const all: OperationalRecommendation[] = [];
  schools.forEach(school => {
    if (school.riskCategory === 'ALTO' || school.riskCategory === 'MEDIO') {
      const recs = generateRecommendationsForSchool(school);
      all.push(...recs);
    }
  });
  return all;
}

const STORAGE_KEY = 'sat_colombia_operational_actions';

export function loadSavedActions(): Record<string, Partial<OperationalRecommendation>> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function saveActionUpdate(recId: string, update: Partial<OperationalRecommendation>) {
  try {
    const current = loadSavedActions();
    current[recId] = { ...(current[recId] || {}), ...update };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save action to localStorage', e);
  }
}
