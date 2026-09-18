import React, { useState } from 'react';
import { 
  REFERENCE_METRICS, 
  CV_FOLDS, 
  ROC_CURVE_POINTS, 
  PR_CURVE_POINTS, 
  CALIBRATION_CURVE_POINTS, 
  REFERENCE_CONFUSION_MATRIX 
} from '../../services/modelSimulation';
import { 
  AlertTriangle, 
  Cpu
} from 'lucide-react';

export const TabModelValidation: React.FC = () => {
  const [icfesThreshold, setIcfesThreshold] = useState<number>(50);
  const [activeCurveTab, setActiveCurveTab] = useState<'ROC' | 'PR' | 'CALIBRATION'>('ROC');

  // Calculate CV summary stats
  const meanAuc = (CV_FOLDS.reduce((acc, f) => acc + f.aucRoc, 0) / CV_FOLDS.length).toFixed(3);
  const meanRecall = (CV_FOLDS.reduce((acc, f) => acc + f.recall, 0) / CV_FOLDS.length).toFixed(3);
  const meanPrecision = (CV_FOLDS.reduce((acc, f) => acc + f.precision, 0) / CV_FOLDS.length).toFixed(3);
  const meanF1 = (CV_FOLDS.reduce((acc, f) => acc + f.f1, 0) / CV_FOLDS.length).toFixed(3);

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Header & Core Model Architecture in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span>Machine Learning & Validación Empírica • DANE SEN</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Arquitectura del Modelo de Predicción: XGBoost & Dual-Model
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            El sistema implementa <strong>XGBoost (Extreme Gradient Boosting)</strong> optimizado con una función de pérdida 
            asimétrica que penaliza fuertemente los <strong>falsos negativos</strong> (estudiantes o sedes en riesgo no detectadas), 
            reconociendo que el costo social de omitir una alerta es inmensamente superior al de una verificación adicional.
          </p>
        </div>

        {/* Reference Metrics Highlight Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">AUC-ROC (Test 2023)</span>
            <p className="text-xl font-black text-rose-400 mt-1 font-mono">{REFERENCE_METRICS.aucRoc}</p>
            <p className="text-[10px] text-zinc-500">Capacidad discriminante</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">Recall Alto Riesgo</span>
            <p className="text-xl font-black text-amber-400 mt-1 font-mono">{REFERENCE_METRICS.recallHighRisk}</p>
            <p className="text-[10px] text-zinc-500">76% sedes críticas detectadas</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Precisión</span>
            <p className="text-xl font-black text-white mt-1 font-mono">{REFERENCE_METRICS.precisionHighRisk}</p>
            <p className="text-[10px] text-zinc-500">Acierto sobre alertas</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">F1-Score</span>
            <p className="text-xl font-black text-white mt-1 font-mono">{REFERENCE_METRICS.f1Score}</p>
            <p className="text-[10px] text-zinc-500">Balance armónico</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-zinc-400 font-mono">Accuracy Global</span>
            <p className="text-xl font-black text-white mt-1 font-mono">{REFERENCE_METRICS.accuracy}</p>
            <p className="text-[10px] text-zinc-500">Exactitud consolidada</p>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono">Brier Score</span>
            <p className="text-xl font-black text-emerald-400 mt-1 font-mono">{REFERENCE_METRICS.brierScore}</p>
            <p className="text-[10px] text-zinc-500">Excelente calibración</p>
          </div>
        </div>
      </div>

      {/* Dual-Model Architecture & Threshold Simulator */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#8B1538]" />
              Arquitectura Dual: Full Model vs. Lightweight Model
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Evita descartar sedes de primaria pura que carecen de exámenes estandarizados Saber 11 / ICFES.
            </p>
          </div>

          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 min-w-[280px]">
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className="text-zinc-300">Umbral Activación ICFES:</span>
              <span className="font-bold text-amber-400 font-mono">{icfesThreshold}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={icfesThreshold}
              onChange={(e) => setIcfesThreshold(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 mt-1 font-mono">
              <span>20% (Menor rigor)</span>
              <span>80% (Solo sedes con media)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                Modelo 1: Full Model
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8B1538]/40 text-rose-300 border border-[#8B1538] font-semibold font-mono">
                Sedes con Media / ICFES
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Incorpora puntajes Saber 11, tasas de reprobación, trayectoria académica institucional y variables de contexto territorial.
            </p>
            <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
              <strong className="text-zinc-300">Variables clave:</strong> <span className="font-mono text-amber-300 text-[10px]">PUNTAJE_SABER11_GLOBAL, REPROBACION, IPM, DESERCION_LAG1, MATRICULA</span>.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                Modelo 2: Lightweight Model
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-600/50 font-semibold font-mono">
                Sedes Primaria / Rurales
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Opera sin variables Saber 11. Se apoya en IPM municipal, rezagos de deserción, dinámica de matrícula, déficit de transporte y flags PDET/ZOMAC.
            </p>
            <div className="pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
              <strong className="text-zinc-300">Variables clave:</strong> <span className="font-mono text-amber-300 text-[10px]">IPM_MPIO, DEFICIT_TRANSPORTE, DESERCION_LAG1, PAE, DELTA_MATRICULA</span>.
            </div>
          </div>
        </div>
      </div>

      {/* Pandemic Bias Card */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl">
        <h3 className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Manejo del Sesgo de Pandemia (Pandemic Bias 2020–2021)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#8B1538]/20 border border-[#8B1538]/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 font-mono">Desafío (Challenge)</span>
            <h4 className="text-xs font-bold text-white mt-1">Distorsión de Métricas en COVID-19</h4>
            <p className="text-xs text-rose-200/80 mt-1 leading-relaxed">
              En 2020 y 2021 hubo directivas de promoción flexible y subsidios atípicos. Entrenar el árbol sin aislar este período provocaba que la dummy FLAG_PANDEMIA capturara correlación espuria.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">Solución (Solution)</span>
            <h4 className="text-xs font-bold text-white mt-1">Exclusión Temporal & Tendencia</h4>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
              Se excluyeron los años 2020 y 2021 del conjunto principal de ajuste del clasificador y se reentrenó modelando la tendencia estructural de mediano plazo antes y después del shock exógeno.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/50">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 font-mono">Impacto (Impact)</span>
            <h4 className="text-xs font-bold text-white mt-1">Generalización Robusta en 2023</h4>
            <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
              El modelo mantuvo un AUC-ROC de 0.81 en el año de prueba 2023 sin sobredimensionar la deserción en municipios con anomalías de confinamiento.
            </p>
          </div>
        </div>
      </div>

      {/* Stratified K-Fold Cross Validation Table & Model Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* K-Fold CV Table */}
        <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-white">
              Validación Cruzada Estratificada (5-Fold CV)
            </h3>
            <p className="text-xs text-zinc-400">
              Evaluada exclusivamente dentro del conjunto de entrenamiento con estratificación por departamento y riesgo.
            </p>
          </div>

          <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 bg-zinc-900 font-mono">
                  <th className="py-2 px-3 font-semibold">Partición</th>
                  <th className="py-2 px-3 font-semibold">AUC-ROC</th>
                  <th className="py-2 px-3 font-semibold">Recall</th>
                  <th className="py-2 px-3 font-semibold">Precisión</th>
                  <th className="py-2 px-3 font-semibold">F1-Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono">
                {CV_FOLDS.map((f) => (
                  <tr key={f.fold} className="hover:bg-zinc-900/60">
                    <td className="py-2 px-3 font-medium text-zinc-300">Fold {f.fold}</td>
                    <td className="py-2 px-3 text-rose-300">{f.aucRoc.toFixed(3)}</td>
                    <td className="py-2 px-3 text-amber-300">{f.recall.toFixed(3)}</td>
                    <td className="py-2 px-3 text-zinc-300">{f.precision.toFixed(3)}</td>
                    <td className="py-2 px-3 text-zinc-300">{f.f1.toFixed(3)}</td>
                  </tr>
                ))}
                <tr className="bg-zinc-900/80 font-bold border-t-2 border-zinc-800">
                  <td className="py-2.5 px-3 text-white">Media (Mean)</td>
                  <td className="py-2.5 px-3 text-rose-400">{meanAuc}</td>
                  <td className="py-2.5 px-3 text-amber-400">{meanRecall}</td>
                  <td className="py-2.5 px-3 text-white">{meanPrecision}</td>
                  <td className="py-2.5 px-3 text-white">{meanF1}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-zinc-500 italic font-mono">
            Desviación estándar de AUC entre folds: ±0.006 (alta estabilidad y generalización territorial).
          </p>
        </div>

        {/* Model Curves & Confusion Matrix */}
        <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">Curvas de Rendimiento & Calibración</h3>
            <div className="inline-flex rounded-lg bg-zinc-900 p-0.5 text-xs border border-zinc-800">
              <button
                onClick={() => setActiveCurveTab('ROC')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                  activeCurveTab === 'ROC' ? 'bg-[#8B1538] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                ROC (AUC 0.81)
              </button>
              <button
                onClick={() => setActiveCurveTab('PR')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                  activeCurveTab === 'PR' ? 'bg-[#8B1538] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Precision-Recall
              </button>
              <button
                onClick={() => setActiveCurveTab('CALIBRATION')}
                className={`px-2.5 py-1 rounded-md font-semibold cursor-pointer ${
                  activeCurveTab === 'CALIBRATION' ? 'bg-[#8B1538] text-white shadow-xs' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Calibración
              </button>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="h-48 w-full bg-black rounded-xl p-3 border border-zinc-800 flex flex-col justify-between">
            {activeCurveTab === 'ROC' && (
              <div className="relative w-full h-full flex flex-col justify-end">
                <svg viewBox="0 0 300 140" className="w-full h-32 overflow-visible">
                  <line x1="30" y1="10" x2="30" y2="120" stroke="#27272a" strokeDasharray="3 3" />
                  <line x1="30" y1="120" x2="280" y2="120" stroke="#3f3f46" />
                  <line x1="30" y1="10" x2="280" y2="10" stroke="#18181b" />
                  <line x1="30" y1="65" x2="280" y2="65" stroke="#18181b" />
                  <line x1="30" y1="120" x2="280" y2="10" stroke="#52525b" strokeDasharray="4 4" strokeWidth="1" />
                  <polyline
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    points={ROC_CURVE_POINTS.map(p => `${30 + p.fpr * 250},${120 - p.tpr * 110}`).join(' ')}
                  />
                  <text x="140" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold">AUC-ROC = 0.81</text>
                  <text x="35" y="20" fill="#a1a1aa" fontSize="8">TPR (Recall)</text>
                  <text x="240" y="115" fill="#a1a1aa" fontSize="8">FPR</text>
                </svg>
              </div>
            )}

            {activeCurveTab === 'PR' && (
              <div className="relative w-full h-full flex flex-col justify-end">
                <svg viewBox="0 0 300 140" className="w-full h-32 overflow-visible">
                  <line x1="30" y1="10" x2="30" y2="120" stroke="#27272a" strokeDasharray="3 3" />
                  <line x1="30" y1="120" x2="280" y2="120" stroke="#3f3f46" />
                  <polyline
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                    points={PR_CURVE_POINTS.map(p => `${30 + p.recall * 250},${120 - p.precision * 110}`).join(' ')}
                  />
                  <text x="130" y="65" fill="#fbbf24" fontSize="11" fontWeight="bold">Recall Crítico = 0.76</text>
                  <text x="35" y="20" fill="#a1a1aa" fontSize="8">Precisión</text>
                  <text x="240" y="115" fill="#a1a1aa" fontSize="8">Recall</text>
                </svg>
              </div>
            )}

            {activeCurveTab === 'CALIBRATION' && (
              <div className="relative w-full h-full flex flex-col justify-end">
                <svg viewBox="0 0 300 140" className="w-full h-32 overflow-visible">
                  <line x1="30" y1="10" x2="30" y2="120" stroke="#27272a" strokeDasharray="3 3" />
                  <line x1="30" y1="120" x2="280" y2="120" stroke="#3f3f46" />
                  <line x1="30" y1="120" x2="280" y2="10" stroke="#52525b" strokeDasharray="3 3" />
                  <polyline
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    points={CALIBRATION_CURVE_POINTS.map(p => `${30 + p.meanPred * 250},${120 - p.obsFreq * 110}`).join(' ')}
                  />
                  <text x="120" y="80" fill="#10b981" fontSize="11" fontWeight="bold">Brier Score = 0.12 (Calibrado)</text>
                  <text x="35" y="20" fill="#a1a1aa" fontSize="8">Observado</text>
                  <text x="230" y="115" fill="#a1a1aa" fontSize="8">Predicho</text>
                </svg>
              </div>
            )}

            <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-2 border-t border-zinc-800 font-mono">
              <span>{activeCurveTab === 'ROC' ? 'Evaluación de discriminación binaria' : activeCurveTab === 'PR' ? 'Compromiso Recall vs Precisión' : 'Fiabilidad probabilística de scores'}</span>
              <span className="font-semibold text-zinc-300">Muestra de Prueba 2023</span>
            </div>
          </div>

          {/* Mini Confusion Matrix */}
          <div className="pt-2 border-t border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-2 font-mono">
              Matriz de Confusión de Referencia (Panel 2023)
            </span>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-600/50">
                <span className="text-[10px] text-emerald-300">Verdaderos Positivos (TP)</span>
                <p className="font-bold text-emerald-400">{REFERENCE_CONFUSION_MATRIX.truePositive.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded bg-amber-950/40 border border-amber-600/50">
                <span className="text-[10px] text-amber-300">Falsos Positivos (FP)</span>
                <p className="font-bold text-amber-400">{REFERENCE_CONFUSION_MATRIX.falsePositive.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded bg-[#8B1538]/30 border border-[#8B1538]/60">
                <span className="text-[10px] text-rose-300">Falsos Negativos (FN)</span>
                <p className="font-bold text-rose-400">{REFERENCE_CONFUSION_MATRIX.falseNegative.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] text-zinc-400">Verdaderos Negativos (TN)</span>
                <p className="font-bold text-zinc-200">{REFERENCE_CONFUSION_MATRIX.trueNegative.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
