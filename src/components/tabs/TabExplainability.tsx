import React from 'react';
import { SchoolRecord } from '../../types';
import { getShapDriversForSchool } from '../../data/syntheticDatabase';
import { 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle
} from 'lucide-react';

interface TabExplainabilityProps {
  selectedSchool: SchoolRecord;
  onNavigateToTab: (tabId: string) => void;
}

export const TabExplainability: React.FC<TabExplainabilityProps> = ({
  selectedSchool,
  onNavigateToTab
}) => {
  const drivers = getShapDriversForSchool(selectedSchool);
  const baseValue = 0.28; // national base expected risk E[f(x)]

  const positiveDrivers = drivers.filter(d => d.shapValue > 0);
  const negativeDrivers = drivers.filter(d => d.shapValue < 0);

  // Generate natural language synthesis
  const topRiskFactors = positiveDrivers.slice(0, 3).map(d => d.featureLabel.toLowerCase());
  const narrativeSynthesis = `El riesgo predicho del ${(selectedSchool.riskProbability * 100).toFixed(0)}% para ${selectedSchool.sedeNombre} en ${selectedSchool.municipio} se encuentra principalmente asociado a ${topRiskFactors.join(', ')}. ${negativeDrivers.length > 0 ? `Como contraparte, ${negativeDrivers[0].featureLabel.toLowerCase()} actúa como factor amortiguador de retención.` : ''}`;

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Top Header in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Explainable AI (XAI) • Descomposición TreeSHAP</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ¿Por qué esta sede está en riesgo? Factores Causal-Correlacionales
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Explicabilidad local aditiva de Shapley aplicada a árboles de gradiente (TreeSHAP) sobre el registro maestro.
            </p>
          </div>

          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">Sede Analizada:</span>
            <strong className="block text-white font-medium truncate max-w-xs">{selectedSchool.sedeNombre}</strong>
            <span className="text-zinc-500 font-mono text-[10px]">Score Final: {(selectedSchool.riskProbability * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Ethical Warning: Model explanation != causal effect */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-300 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-semibold block text-white">Aviso Metodológico DANE: Explicabilidad Estadística ≠ Causalidad Mecánica</strong>
            <p className="text-zinc-400 leading-relaxed">
              Los valores SHAP reflejan la <strong className="text-zinc-200">contribución marginal de una variable a la predicción del modelo</strong> dado el histórico de datos. <em>No deben interpretarse como un efecto causal unívoco ni garantizan que intervenir aisladamente esa variable erradique la deserción</em>. Sirven para orientar el diagnóstico territorial integral y el direccionamiento oportuno de programas PAE y transporte.
            </p>
          </div>
        </div>
      </div>

      {/* Natural Language Operational Translation Card in DANE Vinotinto & Gold */}
      <div className="bg-gradient-to-r from-zinc-950 via-[#8B1538]/40 to-black rounded-2xl p-6 sm:p-8 text-white border border-[#8B1538]/60 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
            Síntesis Interpretativa en Lenguaje Operativo
          </h3>
        </div>
        <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed italic border-l-2 border-amber-400 pl-4">
          "{narrativeSynthesis}"
        </p>
        <div className="flex items-center gap-4 text-xs text-zinc-400 pt-2 border-t border-zinc-800 font-mono">
          <span>Predicción Base Nacional: <strong className="text-zinc-300">{(baseValue * 100).toFixed(0)}%</strong></span>
          <span>→</span>
          <span>Predicción Específica Sede: <strong className="text-rose-400 font-bold">{(selectedSchool.riskProbability * 100).toFixed(0)}%</strong></span>
        </div>
      </div>

      {/* SHAP Waterfall / Driver Decomposition Grid */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-extrabold text-white">
            Descomposición de Factores: Impulsores de Riesgo vs. Factores Protectores
          </h3>
          <span className="text-xs text-zinc-400 font-mono">Ordenado por magnitud absoluta de impacto (|SHAP|)</span>
        </div>

        <div className="space-y-3">
          {drivers.map((driver) => {
            const isPositive = driver.shapValue > 0;
            const barWidth = Math.min(100, Math.abs(driver.shapValue) * 220);

            return (
              <div 
                key={driver.feature}
                className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/70 hover:bg-zinc-900 transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    {isPositive ? (
                      <div className="w-6 h-6 rounded-md bg-[#8B1538]/40 border border-[#8B1538] text-rose-300 flex items-center justify-center shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-md bg-emerald-950/50 border border-emerald-600/50 text-emerald-300 flex items-center justify-center shrink-0">
                        <ArrowDownRight className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-white">{driver.featureLabel}</span>
                      <span className="text-[10px] text-zinc-500 font-mono ml-2">({driver.feature})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400">
                      Valor Sede: <strong className="text-zinc-200 font-mono">{driver.featureValue}</strong>
                    </span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isPositive 
                        ? 'bg-[#8B1538]/40 text-rose-300 border border-[#8B1538]' 
                        : 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/50'
                    }`}>
                      {isPositive ? '+' : ''}{driver.shapValue.toFixed(3)} SHAP
                    </span>
                  </div>
                </div>

                {/* Progress bar visual */}
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden flex">
                  {isPositive ? (
                    <div 
                      className="bg-[#f43f5e] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${barWidth}%` }} 
                    />
                  ) : (
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${barWidth}%` }} 
                    />
                  )}
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {driver.impactDescription}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button to Prescriptive Plan */}
        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <button
            onClick={() => onNavigateToTab('recommendations')}
            className="px-5 py-2.5 bg-[#8B1538] hover:bg-[#a31d42] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <span>Continuar a Recomendaciones Prescriptivas & Plan de Acción</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
