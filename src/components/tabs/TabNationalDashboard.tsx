import React, { useState, useMemo } from 'react';
import { SchoolRecord } from '../../types';
import { COLOMBIA_DEPARTMENTS, DepartmentGeo } from '../../data/colombiaGeo';
import { COLOMBIA_DEPARTMENT_PATHS, COLOMBIA_CONTOUR_OUTLINE, DepartmentSvgPath } from '../../data/colombiaDeptPaths';
import { 
  Filter, 
  MapPin, 
  School, 
  AlertTriangle, 
  Search, 
  Eye, 
  Sparkles,
  Layers,
  RotateCcw,
  ShieldAlert,
  Info
} from 'lucide-react';

interface TabNationalDashboardProps {
  schools: SchoolRecord[];
  onSelectSchool: (school: SchoolRecord) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const TabNationalDashboard: React.FC<TabNationalDashboardProps> = ({
  schools,
  onSelectSchool,
  onNavigateToTab
}) => {
  // Filter States
  const [selectedDept, setSelectedDept] = useState<string>('TODOS');
  const [selectedZone, setSelectedZone] = useState<string>('TODAS');
  const [selectedRisk, setSelectedRisk] = useState<string>('TODOS');
  const [selectedTerritory, setSelectedTerritory] = useState<string>('TODAS');
  const [thresholdMode, setThresholdMode] = useState<'NATIONAL_FIXED' | 'DEPARTMENT_RELATIVE'>('NATIONAL_FIXED');
  const [percentileThreshold, setPercentileThreshold] = useState<number>(80);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredDept, setHoveredDept] = useState<{ geo: DepartmentGeo; path: DepartmentSvgPath } | null>(null);
  const [showSchoolPoints, setShowSchoolPoints] = useState<boolean>(true);
  const [showDeptBorders, setShowDeptBorders] = useState<boolean>(true);

  // Filter logic
  const filteredSchools = useMemo(() => {
    return schools.filter(s => {
      // Dept filter
      if (selectedDept !== 'TODOS' && s.departamento !== selectedDept) return false;
      // Zone filter
      if (selectedZone !== 'TODAS' && s.zona !== selectedZone) return false;
      // Territory filter (PDET / ZOMAC)
      if (selectedTerritory === 'PDET' && !s.flagPdet) return false;
      if (selectedTerritory === 'ZOMAC' && !s.flagZomac) return false;
      // Risk filter
      if (selectedRisk !== 'TODOS' && s.riskCategory !== selectedRisk) return false;
      // Search
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = s.sedeNombre.toLowerCase().includes(query);
        const matchesCode = s.sedeCodigo.includes(query);
        const matchesMpio = s.municipio.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesMpio) return false;
      }
      return true;
    });
  }, [schools, selectedDept, selectedZone, selectedTerritory, selectedRisk, searchQuery]);

  // Aggregated KPIs for filtered schools
  const totalStudents = filteredSchools.reduce((acc, s) => acc + s.matriculaTotal, 0);
  const highRiskCount = filteredSchools.filter(s => s.riskCategory === 'ALTO').length;
  const medRiskCount = filteredSchools.filter(s => s.riskCategory === 'MEDIO').length;
  const lowRiskCount = filteredSchools.filter(s => s.riskCategory === 'BAJO').length;

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Top Banner and Summary with DANE Styling */}
      <div className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Geovisor DANE • Alerta Temprana Territorial</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Dashboard Nacional: Georreferenciación y Deserción Escolar
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Contornos departamentales oficiales con visualización coroplética de riesgo, puntos de sedes educativas y filtros cruzados.
            </p>
          </div>

          {/* Threshold Mode Switcher (National vs Dept Relative) */}
          <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-xs space-y-2">
            <span className="font-semibold text-zinc-300 block">Capacidad Operativa & Umbrales:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setThresholdMode('NATIONAL_FIXED')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold text-xs ${
                  thresholdMode === 'NATIONAL_FIXED'
                    ? 'bg-[#8B1538] text-white shadow-md border border-[#a31d42]'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
                }`}
              >
                Umbral Nacional Fijo (5.0%)
              </button>
              <button
                onClick={() => setThresholdMode('DEPARTMENT_RELATIVE')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer font-semibold text-xs ${
                  thresholdMode === 'DEPARTMENT_RELATIVE'
                    ? 'bg-[#8B1538] text-white shadow-md border border-[#a31d42]'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
                }`}
              >
                Percentil Relativo Dpto.
              </button>
            </div>
            {thresholdMode === 'DEPARTMENT_RELATIVE' && (
              <div className="pt-2 border-t border-zinc-800 space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Focalización:</span>
                  <span className="font-bold text-amber-400">Top {100 - percentileThreshold}% crítico</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  step="5"
                  value={percentileThreshold}
                  onChange={(e) => setPercentileThreshold(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#8B1538]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Dynamic KPI Cards in DANE Dark Palette */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-zinc-800">
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Sedes Filtradas</span>
            <p className="text-2xl font-black text-white mt-0.5 font-mono">{filteredSchools.length}</p>
            <p className="text-[10px] text-zinc-500">En territorio seleccionado</p>
          </div>

          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Estudiantes</span>
            <p className="text-2xl font-black text-white mt-0.5 font-mono">{totalStudents.toLocaleString()}</p>
            <p className="text-[10px] text-zinc-500">Matrícula acumulada</p>
          </div>

          <div className="p-3 bg-[#8B1538]/20 rounded-xl border border-[#8B1538]/60">
            <span className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">Riesgo Alto</span>
            <p className="text-2xl font-black text-rose-400 mt-0.5 font-mono">{highRiskCount}</p>
            <p className="text-[10px] text-rose-300/80">Prioridad DANE inmediata</p>
          </div>

          <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-600/50">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Riesgo Medio</span>
            <p className="text-2xl font-black text-amber-400 mt-0.5 font-mono">{medRiskCount}</p>
            <p className="text-[10px] text-amber-300/80">Alerta preventiva</p>
          </div>

          <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-600/50">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Riesgo Bajo</span>
            <p className="text-2xl font-black text-emerald-400 mt-0.5 font-mono">{lowRiskCount}</p>
            <p className="text-[10px] text-emerald-300/80">Retención estable</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters & Interactive Map with Outlines & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Filters Sidebar in Black / Zinc */}
        <div className="lg:col-span-3 bg-zinc-950 rounded-2xl p-5 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#f43f5e]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Filtros Territoriales</h3>
            </div>
            {selectedDept !== 'TODOS' && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#8B1538] text-white font-mono font-bold">
                {selectedDept}
              </span>
            )}
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar por sede, municipio o DANE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#8B1538]"
            />
          </div>

          {/* Department Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300">Departamento:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#8B1538] cursor-pointer"
            >
              <option value="TODOS">Todos los Departamentos (32)</option>
              {COLOMBIA_DEPARTMENTS.map(d => (
                <option key={d.id} value={d.name}>{d.name} ({d.highRiskPercentage}% riesgo)</option>
              ))}
            </select>
          </div>

          {/* Zone Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300">Zona Geográfica:</label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#8B1538] cursor-pointer"
            >
              <option value="TODAS">Urbana y Rural</option>
              <option value="RURAL">Solo Rural / Dispersa</option>
              <option value="URBANA">Solo Urbana</option>
            </select>
          </div>

          {/* Risk Category Select */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300">Nivel de Riesgo:</label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#8B1538] cursor-pointer"
            >
              <option value="TODOS">Todos los Niveles</option>
              <option value="ALTO">Alto Riesgo (Prioritario)</option>
              <option value="MEDIO">Riesgo Medio</option>
              <option value="BAJO">Bajo Riesgo</option>
            </select>
          </div>

          {/* Conflict status filter */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-zinc-300">Focalización Especial:</label>
            <select
              value={selectedTerritory}
              onChange={(e) => setSelectedTerritory(e.target.value)}
              className="w-full text-xs p-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-[#8B1538] cursor-pointer"
            >
              <option value="TODAS">Todos los Municipios</option>
              <option value="PDET">Municipios PDET (Acuerdo de Paz)</option>
              <option value="ZOMAC">ZOMAC (Zonas Afectadas)</option>
            </select>
          </div>

          {/* Map display toggles */}
          <div className="pt-2 border-t border-zinc-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Capas del Geovisor</span>
            <div className="flex flex-col gap-1.5 text-xs text-zinc-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showDeptBorders}
                  onChange={(e) => setShowDeptBorders(e.target.checked)}
                  className="rounded bg-zinc-900 border-zinc-700 text-[#8B1538] focus:ring-0 cursor-pointer"
                />
                <span>Límites Departamentales DANE</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSchoolPoints}
                  onChange={(e) => setShowSchoolPoints(e.target.checked)}
                  className="rounded bg-zinc-900 border-zinc-700 text-[#8B1538] focus:ring-0 cursor-pointer"
                />
                <span>Puntos de Sedes Educativas</span>
              </label>
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setSelectedDept('TODOS');
              setSelectedZone('TODAS');
              setSelectedRisk('TODOS');
              setSelectedTerritory('TODAS');
              setSearchQuery('');
            }}
            className="w-full text-xs py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl font-medium border border-zinc-700 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restablecer Filtros</span>
          </button>
        </div>

        {/* Interactive Colombia Geospatial Map with Real Department Outlines */}
        <div className="lg:col-span-9 bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#f43f5e]" />
                Geovisor Nacional: Contornos de Departamentos de Colombia
              </h3>
              <p className="text-[11px] text-zinc-400">
                Pasa el cursor o haz clic sobre cualquier departamento para filtrar sus instituciones educativas.
              </p>
            </div>
            {/* Color Legend (DANE Palette) */}
            <div className="flex items-center gap-3 text-[11px] bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#8B1538] border border-rose-500" />
                <span className="text-zinc-300 font-mono">Alto (&gt;25%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#b45309] border border-amber-400" />
                <span className="text-zinc-300 font-mono">Medio (15-25%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-[#065f46] border border-emerald-400" />
                <span className="text-zinc-300 font-mono">Bajo (&lt;15%)</span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Projection Map showing Full Department Outlines */}
          <div className="relative w-full h-[460px] bg-black rounded-xl overflow-hidden p-2 flex items-center justify-center border border-zinc-800 shadow-2xl">
            <svg 
              viewBox="80 30 680 870" 
              className="w-full h-full max-h-[460px] select-none"
            >
              {/* Background ambient grid in dark DANE style */}
              <defs>
                <pattern id="daneGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#18181b" strokeWidth="0.6" />
                </pattern>
                
                {/* Glow filter for highlighted departments */}
                <filter id="deptGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.8" />
                </filter>
                <filter id="highRiskGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#8B1538" floodOpacity="0.7" />
                </filter>
              </defs>

              <rect width="100%" height="100%" fill="url(#daneGrid)" />

              {/* Master Colombia boundary silhouette glow */}
              <path
                d={COLOMBIA_CONTOUR_OUTLINE}
                fill="#09090b"
                stroke="#8B1538"
                strokeWidth="4"
                strokeOpacity="0.4"
                strokeLinejoin="round"
                className="pointer-events-none"
              />

              {/* Render all 32 Colombia Department Outlines (SVG Polygons) */}
              {COLOMBIA_DEPARTMENT_PATHS.map((deptPath) => {
                const deptGeo = COLOMBIA_DEPARTMENTS.find(d => d.name.toLowerCase() === deptPath.name.toLowerCase() || d.id === deptPath.id);
                const isSelected = selectedDept === deptPath.name;
                const isHovered = hoveredDept?.path.id === deptPath.id;
                
                const highRisk = deptGeo ? deptGeo.highRiskPercentage >= 25 : false;
                const medRisk = deptGeo ? deptGeo.highRiskPercentage >= 15 && deptGeo.highRiskPercentage < 25 : false;

                // DANE Choropleth Fills
                let fillColor = '#09090b';
                let strokeColor = '#27272a';
                let fillOpacity = 0.55;

                if (highRisk) {
                  fillColor = '#8B1538';
                  strokeColor = '#a31d42';
                  fillOpacity = isSelected ? 0.95 : isHovered ? 0.85 : 0.65;
                } else if (medRisk) {
                  fillColor = '#b45309';
                  strokeColor = '#d97706';
                  fillOpacity = isSelected ? 0.95 : isHovered ? 0.85 : 0.60;
                } else {
                  fillColor = '#065f46';
                  strokeColor = '#059669';
                  fillOpacity = isSelected ? 0.95 : isHovered ? 0.85 : 0.55;
                }

                if (isSelected) {
                  strokeColor = '#f59e0b';
                } else if (isHovered) {
                  strokeColor = '#fbbf24';
                }

                return (
                  <g 
                    key={deptPath.id}
                    className="cursor-pointer transition-all duration-150 group"
                    onClick={() => setSelectedDept(deptPath.name === selectedDept ? 'TODOS' : deptPath.name)}
                    onMouseEnter={() => {
                      if (deptGeo) setHoveredDept({ geo: deptGeo, path: deptPath });
                    }}
                    onMouseLeave={() => setHoveredDept(null)}
                  >
                    {/* Department Polygon Path Outline */}
                    <path
                      d={deptPath.d}
                      fill={fillColor}
                      fillOpacity={fillOpacity}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 2.8 : isHovered ? 2.2 : showDeptBorders ? 1.2 : 0.5}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      filter={isSelected ? 'url(#deptGlow)' : highRisk && isHovered ? 'url(#highRiskGlow)' : undefined}
                      className="transition-all duration-200"
                    />

                    {/* Department ID Code Label */}
                    <text
                      x={deptPath.labelX}
                      y={deptPath.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isSelected ? '#ffffff' : isHovered ? '#fbbf24' : '#e4e4e7'}
                      fontSize={isSelected ? '10' : '8.5'}
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                    >
                      {deptPath.id}
                    </text>

                    {/* High Risk pulsing beacon dot */}
                    {highRisk && (
                      <circle
                        cx={deptPath.labelX}
                        cy={deptPath.labelY - 11}
                        r="2.5"
                        fill="#f43f5e"
                        stroke="#ffffff"
                        strokeWidth="0.8"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}

              {/* San Andrés y Providencia Inset Boundary Box */}
              <g className="pointer-events-none">
                <rect x="120" y="60" width="65" height="65" rx="6" fill="#09090b" fillOpacity="0.8" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
                <text x="152" y="72" textAnchor="middle" fill="#a1a1aa" fontSize="6.5" fontWeight="bold">San Andrés</text>
                <circle cx="148" cy="92" r="3" fill="#065f46" stroke="#10b981" strokeWidth="1" />
                <circle cx="158" cy="85" r="2" fill="#065f46" stroke="#10b981" strokeWidth="1" />
              </g>

              {/* Render actual schools as points on the map over the department outlines */}
              {showSchoolPoints && filteredSchools.map((school) => {
                // approximate mapping from lat/lng to svg coordinates matching the department boundaries
                // Colombia range: lat 12.5 to -4.5, lng -79.2 to -66.8
                const normX = 140 + ((school.lng - (-79.2)) / ((-66.8) - (-79.2))) * 530;
                const normY = 60 + ((12.5 - school.lat) / (12.5 - (-4.5))) * 780;

                const isSchoolHighRisk = school.riskCategory === 'ALTO';
                const isSchoolMedRisk = school.riskCategory === 'MEDIO';

                const schoolColor = isSchoolHighRisk 
                  ? '#f43f5e' 
                  : isSchoolMedRisk 
                  ? '#f59e0b' 
                  : '#10b981';

                return (
                  <g 
                    key={school.sedeCodigo} 
                    className="cursor-pointer group"
                    onClick={() => {
                      onSelectSchool(school);
                      onNavigateToTab('school-analysis');
                    }}
                  >
                    {/* Ring for high risk school */}
                    {isSchoolHighRisk && (
                      <circle
                        cx={normX}
                        cy={normY}
                        r="6.5"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                    )}
                    <circle
                      cx={normX}
                      cy={normY}
                      r="4"
                      fill="#ffffff"
                      stroke={schoolColor}
                      strokeWidth="2"
                      className="transition-transform group-hover:scale-150"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip for Department */}
            {hoveredDept && (
              <div className="absolute bottom-4 left-4 bg-zinc-900/95 border border-zinc-700 text-white p-3.5 rounded-xl shadow-2xl text-xs space-y-1.5 pointer-events-none backdrop-blur-md max-w-xs z-20">
                <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-1.5">
                  <span className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8B1538]" />
                    {hoveredDept.geo.name}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 font-bold">
                    DANE: {hoveredDept.geo.code}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Tasa Alto Riesgo:</span>
                    <strong className={hoveredDept.geo.highRiskPercentage >= 25 ? 'text-rose-400 font-mono text-sm' : 'text-amber-400 font-mono text-sm'}>
                      {hoveredDept.geo.highRiskPercentage}%
                    </strong>
                  </div>
                  <div>
                    <span className="text-zinc-400 block text-[10px]">Deserción Media:</span>
                    <strong className="text-zinc-200 font-mono text-sm">{hoveredDept.geo.avgDropoutRate}%</strong>
                  </div>
                </div>
                <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-800 flex justify-between">
                  <span>Sedes: <strong className="text-zinc-200">{hoveredDept.geo.totalSchools.toLocaleString()}</strong></span>
                  <span>Secretarías: <strong className="text-zinc-200">{hoveredDept.geo.secretariasCount}</strong></span>
                </div>
                <div className="text-[9px] text-amber-400 font-semibold text-center pt-0.5">
                  Haz clic para filtrar sedes de {hoveredDept.geo.name}
                </div>
              </div>
            )}

            {/* Inset Helper Badge */}
            <div className="absolute top-3 right-3 bg-zinc-950/80 border border-zinc-800 px-3 py-1.5 rounded-lg text-[10px] text-zinc-400 flex items-center gap-2 backdrop-blur-xs">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>Contornos: 32 Departamentos DANE</span>
            </div>
          </div>

          {/* School list table with drill-down actions in DANE Black Palette */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <School className="w-4 h-4 text-amber-400" />
                Sedes Educativas en Territorio Seleccionado ({filteredSchools.length})
              </span>
              <span className="text-[11px] text-zinc-400">Haz clic en una sede para ver ficha técnica y SHAP</span>
            </div>

            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
              <table className="w-full text-xs text-left">
                <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Sede Educativa</th>
                    <th className="py-2.5 px-3 font-semibold">Municipio / Dpto</th>
                    <th className="py-2.5 px-3 font-semibold">Zona</th>
                    <th className="py-2.5 px-3 font-semibold">Matrícula</th>
                    <th className="py-2.5 px-3 font-semibold">Score Riesgo</th>
                    <th className="py-2.5 px-3 font-semibold">Categoría</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {filteredSchools.map((s) => (
                    <tr key={s.sedeCodigo} className="hover:bg-zinc-900/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-white max-w-[200px] truncate" title={s.sedeNombre}>
                        {s.sedeNombre}
                        <span className="block text-[10px] text-zinc-500 font-mono">DANE: {s.sedeCodigo}</span>
                      </td>
                      <td className="py-2.5 px-3 text-zinc-300">
                        {s.municipio}, <span className="text-amber-400/90 font-medium">{s.departamento}</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium font-mono ${
                          s.zona === 'RURAL' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60' : 'bg-zinc-800 text-zinc-300'
                        }`}>
                          {s.zona}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-zinc-200 font-mono">
                        {s.matriculaTotal} alumnos
                      </td>
                      <td className="py-2.5 px-3 font-bold font-mono">
                        <span className={s.riskProbability > 0.65 ? 'text-rose-400' : s.riskProbability > 0.4 ? 'text-amber-400' : 'text-emerald-400'}>
                          {(s.riskProbability * 100).toFixed(0)}%
                        </span>
                        <span className="text-[10px] text-zinc-500 block">P{s.departmentPercentile.toFixed(0)} Dpto</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                          s.riskCategory === 'ALTO'
                            ? 'bg-[#8B1538]/40 text-rose-300 border border-[#8B1538]'
                            : s.riskCategory === 'MEDIO'
                            ? 'bg-amber-950/40 text-amber-300 border border-amber-600/50'
                            : 'bg-emerald-950/40 text-emerald-300 border border-emerald-600/50'
                        }`}>
                          {s.riskCategory}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => {
                              onSelectSchool(s);
                              onNavigateToTab('school-analysis');
                            }}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-[#8B1538] text-zinc-300 hover:text-white border border-zinc-700 transition-all cursor-pointer"
                            title="Ver Ficha de Sede"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              onSelectSchool(s);
                              onNavigateToTab('explainability');
                            }}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-zinc-700 transition-all cursor-pointer"
                            title="Explicar con SHAP"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
