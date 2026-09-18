import React from 'react';
import { SchoolRecord } from '../../types';
import { 
  School, 
  Sparkles, 
  CheckSquare, 
  Building2, 
  Bus, 
  Utensils, 
  Award
} from 'lucide-react';

interface TabSchoolAnalysisProps {
  selectedSchool: SchoolRecord;
  schools: SchoolRecord[];
  onSelectSchool: (school: SchoolRecord) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const TabSchoolAnalysis: React.FC<TabSchoolAnalysisProps> = ({
  selectedSchool,
  schools,
  onSelectSchool,
  onNavigateToTab
}) => {
  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Top Selector and Header in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <School className="w-3.5 h-3.5 text-rose-400" />
              <span>Ficha Técnica Institucional DANE / MEN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {selectedSchool.sedeNombre}
            </h2>
            <p className="text-xs text-zinc-400 font-mono mt-0.5">
              Código DANE: <strong className="text-amber-400">{selectedSchool.sedeCodigo}</strong> • {selectedSchool.municipio}, {selectedSchool.departamento}
            </p>
          </div>

          {/* Quick Switcher dropdown */}
          <div className="w-full sm:w-80 space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Cambiar Sede Educativa:</label>
            <select
              value={selectedSchool.sedeCodigo}
              onChange={(e) => {
                const found = schools.find(s => s.sedeCodigo === e.target.value);
                if (found) onSelectSchool(found);
              }}
              className="w-full text-xs p-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:outline-none focus:border-[#8B1538] cursor-pointer"
            >
              {schools.map(s => (
                <option key={s.sedeCodigo} value={s.sedeCodigo}>
                  {s.sedeNombre.slice(0, 38)}... ({(s.riskProbability * 100).toFixed(0)}%)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Risk Score Card & Core Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Score Highlight */}
        <div className="lg:col-span-4 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Diagnóstico Predictivo del SAT
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight font-mono ${
                selectedSchool.riskProbability > 0.65 ? 'text-rose-400' : selectedSchool.riskProbability > 0.4 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {(selectedSchool.riskProbability * 100).toFixed(0)}%
              </span>
              <span className="text-sm font-semibold text-zinc-400">Prob. Deserción</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                selectedSchool.riskCategory === 'ALTO'
                  ? 'bg-[#8B1538]/40 text-rose-300 border border-[#8B1538]'
                  : selectedSchool.riskCategory === 'MEDIO'
                  ? 'bg-amber-950/40 text-amber-300 border border-amber-600/50'
                  : 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/50'
              }`}>
                NIVEL DE RIESGO: {selectedSchool.riskCategory}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-zinc-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Percentil Departamental:</span>
              <span className="font-bold text-white font-mono">
                P{selectedSchool.departmentPercentile.toFixed(1)} ({selectedSchool.departamento})
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Arquitectura Utilizada:</span>
              <span className="font-mono text-[11px] font-semibold text-rose-300 bg-[#8B1538]/30 px-2 py-0.5 rounded border border-[#8B1538]/50">
                {selectedSchool.modelUsed === 'FULL_XGBOOST' ? 'Full Model (con Saber 11)' : 'Lightweight (Estructural)'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-400">Capacidad Operativa Requerida:</span>
              <span className="font-medium text-amber-300">
                {selectedSchool.riskCategory === 'ALTO' ? 'Intervención Focalizada Prioritaria' : 'Monitoreo Preventivo'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => onNavigateToTab('explainability')}
              className="w-full py-2.5 px-4 bg-[#8B1538] hover:bg-[#a31d42] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Ver Explicación Causal (SHAP)</span>
            </button>
            <button
              onClick={() => onNavigateToTab('recommendations')}
              className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>Generar Plan de Acción Prescriptivo</span>
            </button>
          </div>
        </div>

        {/* School Context & Physical Features */}
        <div className="lg:col-span-8 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-6">
          <h3 className="text-base font-extrabold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <School className="w-4 h-4 text-amber-400" />
            <span>Perfil Institucional & Entorno Territorial</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Matrícula Activa</span>
              <p className="text-base font-bold text-white mt-1 font-mono">{selectedSchool.matriculaTotal} estudiantes</p>
              <p className="text-[10px] text-zinc-500">Educación formal</p>
            </div>

            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Zona Territorial</span>
              <p className="text-base font-bold text-white mt-1">{selectedSchool.zona}</p>
              <p className="text-[10px] text-zinc-500">{selectedSchool.zona === 'RURAL' ? 'Rural dispersa' : 'Cabecera urbana'}</p>
            </div>

            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Vulnerabilidad (0-100)</span>
              <p className="text-base font-bold text-amber-400 mt-1 font-mono">{selectedSchool.indiceVulnerabilidad.toFixed(1)}</p>
              <p className="text-[10px] text-zinc-500">Sisbén / Habitabilidad</p>
            </div>

            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold">Deserción Lag 1 (t-1)</span>
              <p className="text-base font-bold text-rose-400 mt-1 font-mono">{selectedSchool.desercionLag1.toFixed(1)}%</p>
              <p className="text-[10px] text-zinc-500">Vigencia previa</p>
            </div>
          </div>

          {/* Contextual & Policy Badges */}
          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <span className="text-xs font-semibold text-zinc-300 block">Factores de Contexto Operativo:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900">
                <Utensils className={`w-4 h-4 ${selectedSchool.coberturaPae < 70 ? 'text-rose-400' : 'text-emerald-400'}`} />
                <div>
                  <span className="font-semibold text-zinc-200">Alimentación Escolar (PAE):</span>
                  <p className="text-zinc-400 text-[11px] font-mono">{selectedSchool.coberturaPae}% cobertura efectiva</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900">
                <Bus className={`w-4 h-4 ${selectedSchool.deficitTransporte ? 'text-rose-400' : 'text-emerald-400'}`} />
                <div>
                  <span className="font-semibold text-zinc-200">Transporte Escolar:</span>
                  <p className="text-zinc-400 text-[11px]">
                    {selectedSchool.deficitTransporte ? 'Carencia de ruta oficial / caminatas >45min' : 'Ruta escolar activa'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900">
                <Building2 className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="font-semibold text-zinc-200">Territorio PDET / ZOMAC:</span>
                  <p className="text-zinc-400 text-[11px]">
                    {selectedSchool.flagPdet ? 'Subregión PDET' : 'No PDET'} • {selectedSchool.flagZomac ? 'ZOMAC' : 'No ZOMAC'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-zinc-800 bg-zinc-900">
                <Award className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="font-semibold text-zinc-200">Desempeño Académico:</span>
                  <p className="text-zinc-400 text-[11px]">
                    {selectedSchool.icfesDisponible 
                      ? `Saber 11: ${selectedSchool.puntajeSaber11} pts (Reprobación: ${selectedSchool.tasaReprobacion}%)` 
                      : `Primaria pura (Reprobación: ${selectedSchool.tasaReprobacion}%)`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Trajectory 2018-2023 */}
          <div className="pt-2 border-t border-zinc-800 space-y-3">
            <span className="text-xs font-semibold text-zinc-300 block">
              Trayectoria Histórica de Matrícula y Riesgo (2018–2023)
            </span>
            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono">
                  <tr>
                    <th className="py-2 px-3">Año</th>
                    <th className="py-2 px-3">Matrícula Total</th>
                    <th className="py-2 px-3">Tasa Deserción</th>
                    <th className="py-2 px-3">Score SAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 font-mono">
                  {selectedSchool.history.map((h) => (
                    <tr key={h.year} className={h.year === 2023 ? 'bg-[#8B1538]/20 font-semibold' : 'hover:bg-zinc-900/60'}>
                      <td className="py-2 px-3 text-white font-bold">{h.year}</td>
                      <td className="py-2 px-3 text-zinc-300">{h.enrollment} alumnos</td>
                      <td className="py-2 px-3 text-zinc-300">{h.dropoutRate.toFixed(1)}%</td>
                      <td className="py-2 px-3">
                        <span className={h.riskScore > 0.65 ? 'text-rose-400 font-bold' : 'text-zinc-300'}>
                          {(h.riskScore * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
