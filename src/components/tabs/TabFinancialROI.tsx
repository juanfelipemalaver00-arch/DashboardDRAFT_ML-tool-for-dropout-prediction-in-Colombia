import React, { useState } from 'react';
import { 
  DEFAULT_ROI_PARAMS, 
  PRESET_SCENARIOS, 
  calculateRoi, 
  formatCopCurrency 
} from '../../services/roiCalculator';
import { 
  Sliders, 
  Info,
  DollarSign
} from 'lucide-react';

export const TabFinancialROI: React.FC = () => {
  const [params, setParams] = useState(DEFAULT_ROI_PARAMS);

  const results = calculateRoi(params);

  const applyPreset = (presetKey: 'conservative' | 'optimistic') => {
    const preset = PRESET_SCENARIOS[presetKey];
    setParams({
      ...params,
      retentionScenarioRate: preset.retentionRate
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Header and Economic Justification in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Evaluación Económica & Caso de Negocio Público • DANE & SGP</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Retorno de Inversión (ROI) y Costo de Oportunidad de la Deserción
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Cada niño que abandona la escuela primaria no solo representa una pérdida irreparable de capital 
            humano y movilidad social futura; genera además una desfinanciación inmediata de la entidad territorial 
            vía asignaciones del <strong>Sistema General de Participaciones (SGP)</strong> y eleva los costos 
            asociados a informalidad, criminalidad y asistencia social asistencial.
          </p>
        </div>

        {/* Preset Scenarios Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div 
            onClick={() => applyPreset('conservative')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              params.retentionScenarioRate === 5.0
                ? 'bg-[#8B1538]/20 border-[#8B1538] ring-2 ring-[#8B1538]/30 shadow-md'
                : 'bg-zinc-900 border-zinc-800 hover:border-[#8B1538]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-white">{PRESET_SCENARIOS.conservative.label}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-600/50 font-mono">
                B/C: {PRESET_SCENARIOS.conservative.expectedBcRatio}x
              </span>
            </div>
            <p className="text-lg font-black text-emerald-400 font-mono">
              {PRESET_SCENARIOS.conservative.expectedAvoidedLossText}
            </p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {PRESET_SCENARIOS.conservative.description}
            </p>
          </div>

          <div 
            onClick={() => applyPreset('optimistic')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              params.retentionScenarioRate === 9.0
                ? 'bg-[#8B1538]/20 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                : 'bg-zinc-900 border-zinc-800 hover:border-amber-500/60'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-white">{PRESET_SCENARIOS.optimistic.label}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-600/50 font-mono">
                B/C: {PRESET_SCENARIOS.optimistic.expectedBcRatio}x
              </span>
            </div>
            <p className="text-lg font-black text-amber-400 font-mono">
              {PRESET_SCENARIOS.optimistic.expectedAvoidedLossText}
            </p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {PRESET_SCENARIOS.optimistic.description}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Simulator: Inputs & Outputs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls / Inputs */}
        <div className="lg:col-span-5 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              Parámetros de Simulación Fiscal
            </h3>
            <span className="text-[10px] text-zinc-500 font-mono">Ajuste Dinámico</span>
          </div>

          {/* Retention rate slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-zinc-300">
              <span>Tasa de Retención Lograda:</span>
              <span className="font-bold text-emerald-400 font-mono">{params.retentionScenarioRate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={params.retentionScenarioRate}
              onChange={(e) => setParams({ ...params, retentionScenarioRate: Number(e.target.value) })}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>1% (Mínima)</span>
              <span>5% (Conservador)</span>
              <span>9% (Optimista)</span>
              <span>15%</span>
            </div>
          </div>

          {/* Target students count */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-zinc-300">
              <span>Población Objetivo en Riesgo (Estudiantes):</span>
              <span className="font-bold text-white font-mono">{params.studentsAtRiskCount.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="100000"
              max="1000000"
              step="25000"
              value={params.studentsAtRiskCount}
              onChange={(e) => setParams({ ...params, studentsAtRiskCount: Number(e.target.value) })}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
            />
          </div>

          {/* Annual cost per dropout */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-zinc-300">
              <span>Costo Anual por Alumno Desertado:</span>
              <span className="font-bold text-amber-400 font-mono">{formatCopCurrency(params.annualCostPerDropoutStudentCop)}</span>
            </div>
            <input
              type="range"
              min="3000000"
              max="10000000"
              step="200000"
              value={params.annualCostPerDropoutStudentCop}
              onChange={(e) => setParams({ ...params, annualCostPerDropoutStudentCop: Number(e.target.value) })}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
            />
            <span className="text-[10px] text-zinc-500 block">
              Incluye SGP asignación per cápita, infraestructura ociosa y costo de reinserción.
            </span>
          </div>

          {/* Coverage rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-zinc-300">
              <span>Cobertura Territorial de Sedes en Alerta:</span>
              <span className="font-bold text-white font-mono">{params.coverageRate}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={params.coverageRate}
              onChange={(e) => setParams({ ...params, coverageRate: Number(e.target.value) })}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
            />
          </div>

          {/* Program annual operational expenditure */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-zinc-300">
              <span>Presupuesto Operativo Anual SAT:</span>
              <span className="font-bold text-white font-mono">{formatCopCurrency(params.annualProgramCostCop)}</span>
            </div>
            <input
              type="range"
              min="5000000000"
              max="30000000000"
              step="1000000000"
              value={params.annualProgramCostCop}
              onChange={(e) => setParams({ ...params, annualProgramCostCop: Number(e.target.value) })}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
            />
          </div>
        </div>

        {/* Results & Economic KPI Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-6">
            <h3 className="text-base font-extrabold text-white flex items-center justify-between">
              <span>Balance Económico del Escenario Simulado</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-600/50 font-mono font-bold">
                Relación B/C: {results.benefitCostRatio}x
              </span>
            </h3>

            {/* Big KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono">Pérdida Evitada Bruta</span>
                <p className="text-xl font-black text-emerald-400 mt-1 font-mono">
                  {formatCopCurrency(results.grossAvoidedLossCop)}
                </p>
                <p className="text-[10px] text-zinc-500 mt-1">Ahorro fiscal y social</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">Beneficio Neto Estimado</span>
                <p className="text-xl font-black text-amber-400 mt-1 font-mono">
                  {formatCopCurrency(results.netEconomicBenefitCop)}
                </p>
                <p className="text-[10px] text-zinc-500 mt-1">Descontando costos del SAT</p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Alumnos Retenidos</span>
                <p className="text-xl font-black text-white mt-1 font-mono">
                  {results.preventedDropouts.toLocaleString()}
                </p>
                <p className="text-[10px] text-zinc-500 mt-1">Permanecen en el aula</p>
              </div>
            </div>

            {/* Breakdown table */}
            <div className="border border-zinc-800 rounded-xl overflow-hidden text-xs bg-zinc-950">
              <div className="bg-zinc-900 px-4 py-2.5 border-b border-zinc-800 font-bold text-zinc-300 font-mono">
                Desglose de Costos e Impacto Fiscal
              </div>
              <div className="divide-y divide-zinc-800/60 px-4 font-mono">
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Estudiantes Cubiertos por Intervención:</span>
                  <span className="font-semibold text-white">{results.coveredStudents.toLocaleString()}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Gasto Variable en Intervenciones de Campo:</span>
                  <span className="font-semibold text-white">{formatCopCurrency(results.interventionExpenditureCop)}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Costo Fijo de Operación & Plataforma SAT:</span>
                  <span className="font-semibold text-white">{formatCopCurrency(params.annualProgramCostCop)}</span>
                </div>
                <div className="py-2.5 flex justify-between bg-zinc-900/50">
                  <span className="font-semibold text-zinc-300">Costo Total del Programa:</span>
                  <span className="font-bold text-white">{formatCopCurrency(results.totalProgramCostCop)}</span>
                </div>
                <div className="py-2.5 flex justify-between bg-emerald-950/30">
                  <span className="font-bold text-emerald-300">Retorno de Inversión (ROI %):</span>
                  <span className="font-black text-emerald-400">+{results.roiPercentage}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Public Policy Warning */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-300 flex gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-semibold text-white">Distinción Epistemológica y Causal (Estándar DANE)</strong>
              <p className="text-zinc-400 leading-relaxed">
                Este simulador representa un <em>análisis de escenarios contrafactuales</em> y <strong className="text-zinc-200">no debe interpretarse como una garantía causal del modelo de machine learning</strong>. El modelo detecta correlaciones de riesgo predictivo; la retención efectiva depende de la fidelidad operativa y pertinencia de las intervenciones desplegadas por cada Secretaría de Educación en territorio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
