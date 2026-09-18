import React, { useState, useMemo } from 'react';
import { SchoolRecord, OperationalRecommendation } from '../../types';
import { 
  getAllInitialRecommendations, 
  loadSavedActions, 
  saveActionUpdate 
} from '../../services/recommendationEngine';
import { 
  Download, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Search,
  Edit3,
  Save,
  CheckSquare
} from 'lucide-react';

interface TabRecommendationsProps {
  schools: SchoolRecord[];
  selectedSchool: SchoolRecord;
  onSelectSchool: (school: SchoolRecord) => void;
}

export const TabRecommendations: React.FC<TabRecommendationsProps> = ({
  schools
}) => {
  // Load initial recommendations
  const initialRecs = useMemo(() => getAllInitialRecommendations(schools), [schools]);
  const [recommendations, setRecommendations] = useState<OperationalRecommendation[]>(() => {
    const saved = loadSavedActions();
    return initialRecs.map(r => ({
      ...r,
      ...(saved[r.id] || {})
    }));
  });

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');
  const [priorityFilter, setPriorityFilter] = useState<string>('TODAS');
  const [areaFilter, setAreaFilter] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');
  const [tempAssigned, setTempAssigned] = useState<string>('');

  // Handle status update
  const handleStatusChange = (recId: string, newStatus: OperationalRecommendation['status']) => {
    const updated = recommendations.map(r => r.id === recId ? { ...r, status: newStatus } : r);
    setRecommendations(updated);
    saveActionUpdate(recId, { status: newStatus });
  };

  // Handle notes save
  const handleSaveNotes = (recId: string) => {
    const updated = recommendations.map(r => r.id === recId ? { 
      ...r, 
      notes: tempNotes,
      assignedTo: tempAssigned
    } : r);
    setRecommendations(updated);
    saveActionUpdate(recId, { notes: tempNotes, assignedTo: tempAssigned });
    setEditingId(null);
  };

  // Filtered list
  const filteredRecs = useMemo(() => {
    return recommendations.filter(r => {
      if (statusFilter !== 'TODOS' && r.status !== statusFilter) return false;
      if (priorityFilter !== 'TODAS' && r.priority !== priorityFilter) return false;
      if (areaFilter !== 'TODAS' && r.responsibleArea !== areaFilter) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesSchool = r.sedeNombre.toLowerCase().includes(query);
        const matchesMpio = r.municipio.toLowerCase().includes(query);
        const matchesAction = r.actionTitle.toLowerCase().includes(query);
        if (!matchesSchool && !matchesMpio && !matchesAction) return false;
      }
      return true;
    });
  }, [recommendations, statusFilter, priorityFilter, areaFilter, searchQuery]);

  // CSV Export
  const exportToCsv = () => {
    const headers = [
      'ID_ACCION',
      'CODIGO_DANE',
      'SEDE_EDUCATIVA',
      'MUNICIPIO',
      'DEPARTAMENTO',
      'SECRETARIA',
      'PROBABILIDAD_RIESGO',
      'CATEGORIA_RIESGO',
      'DRIVER_PRINCIPAL',
      'TITULO_ACCION',
      'DESCRIPCION_ACCION',
      'PRIORIDAD',
      'HORIZONTE_TIEMPO',
      'AREA_RESPONSABLE',
      'ESTADO_OPERATIVO',
      'RESPONSABLE_ASIGNADO',
      'NOTAS_DE_SEGUIMIENTO'
    ];

    const rows = filteredRecs.map(r => [
      `"${r.id}"`,
      `"${r.sedeCodigo}"`,
      `"${r.sedeNombre.replace(/"/g, '""')}"`,
      `"${r.municipio}"`,
      `"${r.departamento}"`,
      `"${r.secretaria}"`,
      `"${(r.riskProbability * 100).toFixed(1)}%"`,
      `"${r.riskCategory}"`,
      `"${r.primaryDriver.replace(/"/g, '""')}"`,
      `"${r.actionTitle.replace(/"/g, '""')}"`,
      `"${r.actionDescription.replace(/"/g, '""')}"`,
      `"${r.priority}"`,
      `"${r.timeHorizon}"`,
      `"${r.responsibleArea}"`,
      `"${r.status}"`,
      `"${(r.assignedTo || '').replace(/"/g, '""')}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SAT_DANE_Plan_Accion_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Top Header in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider mb-2">
              <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Capa Prescriptiva & Gestión Territorial • DANE SEN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Plan de Acción Prescriptivo & Recomendaciones Operativas
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Transformación de señales de riesgo y valores SHAP en intervenciones coordinadas para Secretarías y directivos.
            </p>
          </div>

          <button
            onClick={exportToCsv}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#8B1538] hover:bg-[#a31d42] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>Exportar Plan a CSV ({filteredRecs.length} acciones)</span>
          </button>
        </div>

        {/* Public Policy Operational Language Disclaimer */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 text-xs text-zinc-300 flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white">Enfoque Prescriptivo Orientador:</strong> Las acciones se formulan como <em>"Respuestas operativas recomendadas según el perfil de riesgo predictivo"</em>. No se presentan como soluciones causalmente garantizadas, sino como insumos para la toma de decisión humana de los secretarios de educación y comités de permanencia.
          </span>
        </div>
      </div>

      {/* Filter and Stats Bar */}
      <div className="bg-zinc-950 rounded-2xl p-5 border border-zinc-800 shadow-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar sede, municipio o acción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 bg-black border border-zinc-800 text-zinc-100 rounded-lg focus:outline-none focus:border-[#8B1538]"
            />
          </div>

          {/* Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs p-2 bg-black border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="TODOS">Todos los Estados</option>
              <option value="No iniciado">No iniciado</option>
              <option value="En progreso">En progreso</option>
              <option value="Completado">Completado</option>
              <option value="No aplica">No aplica</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full text-xs p-2 bg-black border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="TODAS">Todas las Prioridades</option>
              <option value="CRÍTICA">Prioridad Crítica</option>
              <option value="ALTA">Prioridad Alta</option>
              <option value="MEDIA">Prioridad Media</option>
            </select>
          </div>

          {/* Area */}
          <div>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full text-xs p-2 bg-black border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none cursor-pointer"
            >
              <option value="TODAS">Todas las Áreas</option>
              <option value="Secretaría / PAE">Secretaría / PAE</option>
              <option value="Transporte Escolar">Transporte Escolar</option>
              <option value="Bienestar / Psicosocial">Bienestar / Psicosocial</option>
              <option value="Calidad Educativa / Tutorías">Calidad Educativa / Tutorías</option>
              <option value="Mesa Territorial de Víctimas">Mesa Territorial de Víctimas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-4">
        {filteredRecs.map((rec) => {
          const isEditing = editingId === rec.id;

          return (
            <div 
              key={rec.id}
              className="bg-zinc-950 rounded-2xl p-6 border border-zinc-800 shadow-xl space-y-4 transition-all hover:border-[#8B1538]/70"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    rec.priority === 'CRÍTICA' 
                      ? 'bg-[#8B1538]/40 text-rose-300 border border-[#8B1538]' 
                      : 'bg-amber-950/40 text-amber-300 border border-amber-600/50'
                  }`}>
                    {rec.priority}
                  </span>
                  <span className="text-xs font-semibold text-zinc-400">
                    Área: <strong className="text-white">{rec.responsibleArea}</strong>
                  </span>
                  <span className="text-xs text-zinc-600">•</span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {rec.timeHorizon}
                  </span>
                </div>

                {/* Status selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-400">Estado:</span>
                  <select
                    value={rec.status}
                    onChange={(e) => handleStatusChange(rec.id, e.target.value as any)}
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer font-mono ${
                      rec.status === 'Completado' 
                        ? 'bg-emerald-950/50 text-emerald-300 border-emerald-600/50' 
                        : rec.status === 'En progreso'
                        ? 'bg-[#8B1538]/40 text-rose-300 border-[#8B1538]'
                        : rec.status === 'No aplica'
                        ? 'bg-zinc-900 text-zinc-400 border-zinc-800'
                        : 'bg-amber-950/40 text-amber-300 border-amber-600/50'
                    }`}
                  >
                    <option value="No iniciado">No iniciado</option>
                    <option value="En progreso">En progreso</option>
                    <option value="Completado">Completado</option>
                    <option value="No aplica">No aplica</option>
                  </select>
                </div>
              </div>

              {/* School and Action Description */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-4 space-y-1 bg-zinc-900 p-3.5 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">Sede Educativa</span>
                  <h4 className="text-xs font-bold text-white leading-snug">{rec.sedeNombre}</h4>
                  <p className="text-[11px] text-zinc-400">
                    {rec.municipio}, {rec.departamento} • {rec.secretaria}
                  </p>
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-800 text-[11px] font-mono">
                    <span className="text-zinc-500">Riesgo:</span>
                    <strong className="text-rose-400">{(rec.riskProbability * 100).toFixed(0)}% ({rec.riskCategory})</strong>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    <span className="text-zinc-500">Causa:</span> <span className="text-amber-300 font-medium">{rec.primaryDriver}</span>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-2">
                  <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    {rec.actionTitle}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {rec.actionDescription}
                  </p>
                  <p className="text-[11px] text-zinc-400 italic bg-black p-2.5 rounded-lg border border-zinc-800">
                    <strong className="text-amber-400">Fundamento de alerta:</strong> {rec.driverDetails}
                  </p>

                  {/* Notes & Team assignment field */}
                  <div className="pt-2 border-t border-zinc-800">
                    {isEditing ? (
                      <div className="space-y-2 bg-black p-3 rounded-xl border border-zinc-800">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] font-semibold text-zinc-400">Equipo o Funcionario Responsable:</label>
                            <input
                              type="text"
                              value={tempAssigned}
                              onChange={(e) => setTempAssigned(e.target.value)}
                              placeholder="Ej: Lic. Nohora Gómez / Dupla 4"
                              className="w-full text-xs p-1.5 bg-zinc-900 border border-zinc-800 rounded text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-semibold text-zinc-400">Notas de Seguimiento y Hallazgos:</label>
                            <input
                              type="text"
                              value={tempNotes}
                              onChange={(e) => setTempNotes(e.target.value)}
                              placeholder="Ej: Contactado rector. Ruta escolar programada para el lunes."
                              className="w-full text-xs p-1.5 bg-zinc-900 border border-zinc-800 rounded text-white"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleSaveNotes(rec.id)}
                            className="px-3 py-1 bg-[#8B1538] hover:bg-[#a31d42] text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Save className="w-3 h-3 text-amber-300" />
                            <span>Guardar</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <div className="flex items-center gap-4">
                          <span>
                            Asignado: <strong className="text-white font-medium">{rec.assignedTo || 'Sin asignar'}</strong>
                          </span>
                          <span>•</span>
                          <span className="truncate max-w-xs">
                            Notas: <em className="text-zinc-300">{rec.notes || 'Sin notas registradas'}</em>
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setEditingId(rec.id);
                            setTempNotes(rec.notes || '');
                            setTempAssigned(rec.assignedTo || '');
                          }}
                          className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold cursor-pointer text-xs"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Editar seguimiento</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredRecs.length === 0 && (
          <div className="text-center py-12 bg-zinc-950 rounded-2xl border border-zinc-800 text-zinc-500 text-xs">
            No se encontraron acciones que coincidan con los filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};
