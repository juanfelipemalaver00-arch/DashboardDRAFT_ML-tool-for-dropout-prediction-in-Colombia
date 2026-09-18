import React, { useState } from 'react';
import { PIPELINE_SOURCES, PIPELINE_CHALLENGES } from '../../data/pipelineMetadata';
import { 
  Database, 
  GitMerge, 
  ShieldCheck, 
  FileSpreadsheet
} from 'lucide-react';

export const TabDataPipeline: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<string>(PIPELINE_SOURCES[0].sourceName);

  const activeSource = PIPELINE_SOURCES.find(s => s.sourceName === selectedSource) || PIPELINE_SOURCES[0];

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Header intro in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider">
            <Database className="w-3.5 h-3.5 text-rose-400" />
            <span>Arquitectura de Datos Territorial • DANE & MEN</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Pipeline de Integración "Medusa": 5 Fuentes Sectoriales hacia el Panel Maestro
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Consolidar 319,609 registros sede-año requirió orquestar cinco fuentes oficiales con heterogeneidades 
            críticas en codificación, desagregación geográfica y periodicidad. Este pipeline unifica la información 
            bajo el código DANE de 12 dígitos de sede educativa física.
          </p>
        </div>

        {/* Visual Medusa Flow */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-zinc-900/90 p-6 rounded-xl border border-zinc-800">
            {/* 5 Input Sources */}
            <div className="w-full lg:w-5/12 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2 font-mono">
                Fuentes Primarias Sectoriales
              </span>
              <div className="space-y-2">
                {PIPELINE_SOURCES.map((source) => {
                  const isSelected = selectedSource === source.sourceName;
                  return (
                    <button
                      key={source.sourceName}
                      onClick={() => setSelectedSource(source.sourceName)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#8B1538] text-white border-[#a31d42] shadow-md'
                          : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-[#8B1538]/70 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-rose-400'}`} />
                        <span className="font-semibold">{source.sourceName}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isSelected ? 'bg-black/40 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {source.geographicLevel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Central Convergence Icon & Rules */}
            <div className="flex flex-col items-center justify-center text-center px-4 py-2">
              <div className="w-12 h-12 rounded-full bg-[#8B1538]/30 border border-[#8B1538] text-rose-300 flex items-center justify-center shadow-lg">
                <GitMerge className="w-6 h-6 text-amber-400" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mt-2 font-mono">
                Join Jerárquico DANE
              </span>
              <span className="text-[11px] font-semibold text-zinc-200 font-mono">
                12 dígitos (Sede) + 5 dígitos (Mpio)
              </span>
            </div>

            {/* Output: Master Panel */}
            <div className="w-full lg:w-5/12 bg-zinc-950 p-5 rounded-xl border border-zinc-800 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-mono">
                  <Database className="w-4 h-4" />
                  Panel Maestro Consolidado
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-600/50 font-mono font-bold">
                  319,609 filas
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Estructura longitudinal balanceada 2018–2023 con ~70 variables socioeconómicas, 
                educativas, territoriales e índices sintéticos para las 56,557 sedes educativas del país.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-zinc-800">
                <div>
                  <span className="text-zinc-500">Sedes Únicas:</span>
                  <p className="font-semibold text-white font-mono">56,557 sedes</p>
                </div>
                <div>
                  <span className="text-zinc-500">Ventana Temporal:</span>
                  <p className="font-semibold text-white font-mono">2018–2023 (6 años)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Source Deep Dive */}
        <div className="mt-8 bg-zinc-900/90 rounded-xl p-5 border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">Ficha Técnica de Fuente</span>
              <h3 className="text-base font-extrabold text-white">{activeSource.sourceName} ({activeSource.sourceType})</h3>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-xs text-zinc-400">Periodicidad: <strong className="text-white">{activeSource.frequency}</strong></span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs text-zinc-400">Volumen: <strong className="text-amber-400">{activeSource.recordCount}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-zinc-300 block mb-1">Variables Clave Integradas:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSource.keyVariables.map((v) => (
                    <span key={v} className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 font-mono text-[10px] text-amber-300">
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-rose-300 block mb-1">Desafío Crítico de Integración:</span>
                <p className="text-rose-200/90 bg-[#8B1538]/20 p-2.5 rounded-lg border border-[#8B1538]/40">
                  {activeSource.integrationChallenge}
                </p>
              </div>
            </div>

            <div>
              <span className="font-semibold text-emerald-300 block mb-1">Solución Metodológica Aplicada:</span>
              <p className="text-emerald-200/90 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-600/40 leading-relaxed">
                {activeSource.solutionApplied}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Methodological Safeguards: Leakage, Missing Data, and Pandemia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PIPELINE_CHALLENGES.map((challenge) => (
          <div key={challenge.id} className="bg-zinc-950 rounded-xl p-5 border border-zinc-800 shadow-md flex flex-col justify-between hover:border-zinc-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-950/50 border border-amber-600/50 text-amber-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-sm font-bold text-white">{challenge.title}</h4>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 font-mono">Riesgo Metodológico</span>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{challenge.problema}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">Solución del SAT</span>
                <p className="text-xs text-zinc-300 bg-zinc-900 p-2.5 rounded-lg border border-zinc-800 mt-0.5 leading-relaxed">
                  {challenge.solucion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Missing Data Policy Table */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-3">
        <h3 className="text-base font-extrabold text-white">
          Protocolo de Tratamiento de Valores Faltantes (Missing Data Policy)
        </h3>
        <p className="text-xs text-zinc-400 mb-4">
          Garantiza que la heterogeneidad territorial en el reporte de datos no introduzca sesgos de selección ni excluya a las sedes más vulnerables.
        </p>

        <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 font-mono">
                <th className="py-2.5 px-3 font-semibold">Rango de Disponibilidad</th>
                <th className="py-2.5 px-3 font-semibold">Estrategia de Imputación</th>
                <th className="py-2.5 px-3 font-semibold">Canalización en el Modelo</th>
                <th className="py-2.5 px-3 font-semibold">Ejemplo de Variables</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              <tr className="hover:bg-zinc-900/60">
                <td className="py-2.5 px-3 font-semibold text-emerald-400 font-mono">&gt; 90% Disponibilidad</td>
                <td className="py-2.5 px-3 text-zinc-300">Uso directo con imputación condicional por mediana municipal/departamental</td>
                <td className="py-2.5 px-3 text-zinc-300">Predictor estructural en ambos modelos (Full & Light)</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-amber-300">MATRICULA_TOTAL, IPM_MPIO, FLAG_RURAL</td>
              </tr>
              <tr className="hover:bg-zinc-900/60">
                <td className="py-2.5 px-3 font-semibold text-amber-400 font-mono">40% – 70% Disponibilidad</td>
                <td className="py-2.5 px-3 text-zinc-300">Imputación + generación obligatoria de dummy binaria de disponibilidad</td>
                <td className="py-2.5 px-3 text-zinc-300">El árbol aprende patrones sistemáticos de omisión</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-amber-300">COBERTURA_PAE, DEFICIT_TRANSPORTE</td>
              </tr>
              <tr className="hover:bg-zinc-900/60">
                <td className="py-2.5 px-3 font-semibold text-rose-400 font-mono">&lt; 40% Disponibilidad</td>
                <td className="py-2.5 px-3 text-zinc-300">No se imputa directamente a sedes primarias puras</td>
                <td className="py-2.5 px-3 text-zinc-300">Desactiva el Full Model y activa automáticamente el Lightweight Model</td>
                <td className="py-2.5 px-3 font-mono text-[11px] text-amber-300">PUNTAJE_SABER11_GLOBAL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
