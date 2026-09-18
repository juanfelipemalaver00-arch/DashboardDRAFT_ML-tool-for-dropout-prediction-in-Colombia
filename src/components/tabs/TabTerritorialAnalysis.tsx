import React, { useState } from 'react';
import { SchoolRecord } from '../../types';
import { COLOMBIA_DEPARTMENTS } from '../../data/colombiaGeo';
import { 
  Building2, 
  AlertCircle, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface TabTerritorialAnalysisProps {
  schools: SchoolRecord[];
  onSelectSchool: (school: SchoolRecord) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const TabTerritorialAnalysis: React.FC<TabTerritorialAnalysisProps> = ({
  schools,
  onSelectSchool,
  onNavigateToTab
}) => {
  const [selectedDeptName, setSelectedDeptName] = useState<string>('Chocó');

  // Filter schools for selected department
  const deptSchools = schools.filter(s => s.departamento === selectedDeptName);
  const deptGeo = COLOMBIA_DEPARTMENTS.find(d => d.name === selectedDeptName) || COLOMBIA_DEPARTMENTS[0];

  const totalMatricula = deptSchools.reduce((acc, s) => acc + s.matriculaTotal, 0);
  const avgRisk = deptSchools.length > 0
    ? (deptSchools.reduce((acc, s) => acc + s.riskProbability, 0) / deptSchools.length) * 100
    : deptGeo.highRiskPercentage;
  const avgVulnerability = deptSchools.length > 0
    ? (deptSchools.reduce((acc, s) => acc + s.indiceVulnerabilidad, 0) / deptSchools.length)
    : 75;

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Header and selector in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              <span>Drill-Down DANE • Cobertura Territorial</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Análisis Territorial: Departamento → Municipio → Secretaría
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Disparidades micro-territoriales, vulnerabilidad socioeconómica y focalización operativa de campo.
            </p>
          </div>

          {/* Department selector */}
          <div className="w-full sm:w-80 space-y-1">
            <label className="text-xs font-semibold text-zinc-300">Seleccionar Departamento:</label>
            <select
              value={selectedDeptName}
              onChange={(e) => setSelectedDeptName(e.target.value)}
              className="w-full text-xs p-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white font-medium focus:outline-none focus:border-[#8B1538] cursor-pointer"
            >
              {COLOMBIA_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.name}>{d.name} (Riesgo Ref: {d.highRiskPercentage}%)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Operational Disclaimer */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-zinc-200">Principio Estadístico DANE:</strong> Las alertas territoriales se generan exclusivamente con fines de logística y asignación presupuestal de equipos de campo, <em>nunca para emitir juicios de valor sobre territorios ni estigmatizar a sus comunidades</em>.
          </span>
        </div>
      </div>

      {/* Department Dashboard Profile */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Sedes en el Departamento</span>
          <p className="text-2xl font-black text-white mt-1 font-mono">{deptGeo.totalSchools.toLocaleString()}</p>
          <p className="text-[10px] text-zinc-500 mt-1">{deptSchools.length} sedes en muestra demo</p>
        </div>

        <div className="p-4 bg-zinc-950 rounded-xl border border-[#8B1538]/50 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">Tasa en Alto Riesgo (Ref.)</span>
          <p className="text-2xl font-black text-rose-400 mt-1 font-mono">{deptGeo.highRiskPercentage}%</p>
          <p className="text-[10px] text-zinc-500 mt-1">Deserción media: {deptGeo.avgDropoutRate}%</p>
        </div>

        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">Vulnerabilidad Promedio</span>
          <p className="text-2xl font-black text-amber-400 mt-1 font-mono">{avgVulnerability.toFixed(1)} / 100</p>
          <p className="text-[10px] text-zinc-500 mt-1">Índice multidimensional IPM</p>
        </div>

        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Secretarías Certificadas</span>
          <p className="text-2xl font-black text-cyan-400 mt-1 font-mono">{deptGeo.secretariasCount}</p>
          <p className="text-[10px] text-zinc-500 mt-1">Instancias ETC ejecutoras</p>
        </div>
      </div>

      {/* Schools in the Selected Department */}
      <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            Sedes Educativas Priorizadas en {selectedDeptName}
          </h3>
          <span className="text-xs text-zinc-400 font-mono">
            {deptSchools.length > 0 ? `${deptSchools.length} sedes analizadas en demo` : 'Sedes adicionales disponibles en panel maestro'}
          </span>
        </div>

        {deptSchools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {deptSchools.map((school) => (
              <div 
                key={school.sedeCodigo} 
                className="p-4 rounded-xl border border-zinc-800 hover:border-[#8B1538] transition-all bg-zinc-900/90 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-white">{school.sedeNombre}</h4>
                    <p className="text-[10px] text-zinc-400 font-mono">
                      {school.municipio} • {school.secretaria} • DANE: {school.sedeCodigo}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono shrink-0 ${
                    school.riskCategory === 'ALTO' 
                      ? 'bg-[#8B1538]/40 text-rose-300 border border-[#8B1538]' 
                      : 'bg-amber-950/40 text-amber-300 border border-amber-600/50'
                  }`}>
                    {school.riskCategory} ({(school.riskProbability * 100).toFixed(0)}%)
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-zinc-800">
                  <div>
                    <span className="text-zinc-500 text-[10px]">Matrícula:</span>
                    <p className="font-semibold text-zinc-200 font-mono">{school.matriculaTotal} alumnos</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px]">Zona:</span>
                    <p className="font-semibold text-zinc-200">{school.zona}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[10px]">Deserción Lag1:</span>
                    <p className="font-semibold text-zinc-200 font-mono">{school.desercionLag1}%</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-zinc-800">
                  <button
                    onClick={() => {
                      onSelectSchool(school);
                      onNavigateToTab('school-analysis');
                    }}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-[#8B1538] hover:bg-[#a31d42] text-white text-xs font-semibold transition-all text-center cursor-pointer shadow-md"
                  >
                    Ver Ficha de Sede
                  </button>
                  <button
                    onClick={() => {
                      onSelectSchool(school);
                      onNavigateToTab('explainability');
                    }}
                    className="py-1.5 px-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-300 text-xs font-semibold border border-zinc-700 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>SHAP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-zinc-500 text-xs bg-zinc-900 rounded-xl border border-zinc-800">
            No hay sedes demo cargadas para {selectedDeptName}. Selecciona departamentos como <strong className="text-zinc-200">Chocó, La Guajira, Cauca, Nariño, Antioquia o Bogotá</strong> en esta muestra representativa.
          </div>
        )}
      </div>

      {/* Comparative Department Rankings for Operational Resource Allocation */}
      <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white">
          Priorización Comparativa por Departamento (Muestra Nacional de Referencia)
        </h3>
        <p className="text-xs text-zinc-400">
          Proporción de sedes en alto riesgo según el modelo XGBoost calibrado sobre el panel maestro nacional DANE/MEN.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {COLOMBIA_DEPARTMENTS.slice(0, 9).map((d) => (
            <div 
              key={d.id} 
              onClick={() => setSelectedDeptName(d.name)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedDeptName === d.name 
                  ? 'border-[#8B1538] bg-[#8B1538]/20 shadow-md' 
                  : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">{d.name}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  d.highRiskPercentage > 25 ? 'bg-[#8B1538] text-white' : 'bg-amber-950/60 text-amber-300 border border-amber-800'
                }`}>
                  {d.highRiskPercentage}% riesgo
                </span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2">
                <div 
                  className={`h-1.5 rounded-full ${d.highRiskPercentage > 25 ? 'bg-[#f43f5e]' : 'bg-amber-400'}`}
                  style={{ width: `${Math.min(100, d.highRiskPercentage * 2.5)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1.5 font-mono">
                <span>{d.totalSchools.toLocaleString()} sedes</span>
                <span>{d.secretariasCount} secretarías</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
