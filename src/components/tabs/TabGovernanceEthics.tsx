import React, { useState } from 'react';
import { DATA_DICTIONARY } from '../../data/dataDictionary';
import { 
  ShieldCheck, 
  Activity, 
  FileText, 
  AlertTriangle, 
  Lock, 
  CheckCircle, 
  Search
} from 'lucide-react';

export const TabGovernanceEthics: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('TODOS');
  const [dictionarySearch, setDictionarySearch] = useState<string>('');

  const filteredDictionary = DATA_DICTIONARY.filter(item => {
    if (selectedDomain !== 'TODOS' && item.dominio !== selectedDomain) return false;
    if (dictionarySearch.trim() !== '') {
      const q = dictionarySearch.toLowerCase();
      const matchVar = item.variable.toLowerCase().includes(q);
      const matchName = item.nombreDescriptivo.toLowerCase().includes(q);
      const matchDesc = item.descripcion.toLowerCase().includes(q);
      if (!matchVar && !matchName && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Top Header in DANE Black */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Gobernanza de Datos & Ética Pública • DANE SEN</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Monitoreo Continuo, Diccionario de Datos & IA Responsable
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Un sistema analítico al servicio del Estado debe ser rigurosamente auditable, transparente en sus 
            definiciones y respetar principios éticos inquebrantables de protección de los derechos de niños, 
            niñas y adolescentes.
          </p>
        </div>

        {/* Mandatory Responsible AI Banner in DANE Vinotinto & Gold */}
        <div className="bg-gradient-to-r from-zinc-950 via-[#8B1538]/50 to-black text-white rounded-xl p-4 sm:p-5 shadow-xl border border-[#8B1538]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8B1538] border border-amber-400/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-mono">
                Principio Rector de Decisión Pública
              </span>
              <p className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                "Risk predictions are decision-support signals, not determinations of student outcomes."
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-black/60 text-amber-300 border border-amber-500/40 self-start sm:self-auto shrink-0 font-mono">
            Humano en el Bucle (Human-in-the-Loop)
          </span>
        </div>
      </div>

      {/* Model Monitoring & Drift */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <span>Monitoreo de Desempeño & Detección de Deriva (Drift)</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Supervisión interanual de la capacidad predictiva y estabilidad de las distribuciones.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800 font-mono font-semibold">
            Ventana 2023 vs 2024
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Desempeño Año 2023</span>
            <p className="text-2xl font-black text-rose-400 font-mono">AUC = 0.81</p>
            <p className="text-xs text-zinc-400">
              Recall en alto riesgo: 0.76. Modelo base ajustado sobre panel pre-pandemia con rezagos estructurales.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono">Monitoreo Año 2024</span>
            <p className="text-2xl font-black text-amber-400 font-mono">AUC = 0.77</p>
            <p className="text-xs text-zinc-400">
              Recall en alto riesgo: 0.71. Caída de 0.04 puntos en discriminación interanual bajo observación.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-mono">Protocolo de Diagnóstico</span>
            <h4 className="text-xs font-bold text-white">Interpretación de Deriva</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              La reducción a AUC 0.77 <strong className="text-zinc-200">no desencadena un reentrenamiento ciego automático</strong>. El protocolo exige verificar primero si el desfase proviene de rezagos de reporte en el SIMAT de Secretarías específicas o de cambios en directivas de matrícula.
            </p>
          </div>
        </div>

        {/* Feature Drift Alerts */}
        <div className="pt-2 border-t border-zinc-800 space-y-2">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider font-mono">
            Alertas de Deriva de Características (Feature Drift Monitors)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-emerald-600/40 bg-emerald-950/30 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300 font-mono">MATRICULA_TOTAL & DESERCION_LAG1: Estables</strong>
                <p className="text-emerald-200/80 text-[11px]">Kolmogorov-Smirnov p-value &gt; 0.15 (distribución sin drift anómalo).</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-amber-600/40 bg-amber-950/30 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-mono">PUNTAJE_SABER11: Alerta de Disponibilidad</strong>
                <p className="text-amber-200/80 text-[11px]">Ligera reducción en el reporte oportuno. El sistema enruta al Lightweight Model sin interrupciones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Dictionary Integration Table */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Diccionario de Datos Integrado (Data_Dictionary.xlsx)</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Metadatos, fuentes oficiales, cobertura y rol de cada variable en los modelos estadísticos DANE.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Filtrar variable..."
                value={dictionarySearch}
                onChange={(e) => setDictionarySearch(e.target.value)}
                className="text-xs pl-8 pr-3 py-1.5 bg-black border border-zinc-800 text-zinc-100 rounded-lg focus:outline-none focus:border-[#8B1538]"
              />
            </div>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="text-xs p-1.5 bg-black border border-zinc-800 rounded-lg text-zinc-200 cursor-pointer"
            >
              <option value="TODOS">Todos los Dominios</option>
              <option value="Identificación">Identificación</option>
              <option value="Matrícula">Matrícula</option>
              <option value="Deserción">Deserción</option>
              <option value="Vulnerabilidad">Vulnerabilidad</option>
              <option value="Académico">Académico</option>
              <option value="Territorial & Conflicto">Territorial & Conflicto</option>
              <option value="Modelo">Modelo</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-950">
          <table className="w-full text-xs text-left">
            <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 font-mono">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Variable / Nombre</th>
                <th className="py-2.5 px-3 font-semibold">Dominio</th>
                <th className="py-2.5 px-3 font-semibold">Fuente Oficial</th>
                <th className="py-2.5 px-3 font-semibold">Disponibilidad</th>
                <th className="py-2.5 px-3 font-semibold">Rol en Modelado</th>
                <th className="py-2.5 px-3 font-semibold">Definición Operativa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredDictionary.map((item) => (
                <tr key={item.variable} className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white">
                    <span className="font-mono text-amber-300 text-[11px] block">{item.variable}</span>
                    <span className="text-zinc-400 text-[11px]">{item.nombreDescriptivo}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-mono">
                      {item.dominio}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-300 font-medium">
                    {item.fuente}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`font-mono font-bold text-[11px] ${
                      item.disponibilidad > 90 ? 'text-emerald-400' : item.disponibilidad > 40 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {item.disponibilidad}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-semibold text-zinc-300 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 font-mono">
                      {item.rolModelado}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-zinc-400 max-w-xs leading-relaxed text-[11px]">
                    {item.descripcion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ethical Safeguards & Responsible AI in Education */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <span>Salvaguardas Éticas & No Discriminación en Política Pública</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 space-y-1.5">
            <h4 className="font-bold text-white">1. Prohibición de Uso Punitivo o Sancionatorio</h4>
            <p className="text-zinc-400 leading-relaxed">
              El SAT predice probabilidades de riesgo, no determinaciones de destino escolar. 
              <strong className="text-zinc-200"> Está expresamente prohibido utilizar las alertas para penalizar la asignación presupuestal de los colegios</strong>, evaluar punitivamente a directivos o inducir exclusión selectiva de estudiantes con baja trayectoria académica.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 space-y-1.5">
            <h4 className="font-bold text-white">2. No Causalidad de Atribuciones SHAP</h4>
            <p className="text-zinc-400 leading-relaxed">
              Los valores SHAP reflejan correlaciones asociativas de discriminación predictiva. Una variable con SHAP positivo no es necesariamente la causa directa del abandono escolar. Cualquier intervención de política debe ser diagnosticada por los equipos territoriales de la Secretaría.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 space-y-1.5">
            <h4 className="font-bold text-white">3. Privacidad y Hábeas Data (Ley 1581 de 2012)</h4>
            <p className="text-zinc-400 leading-relaxed">
              El modelo opera en esta fase a escala agregada de <strong className="text-zinc-200">sede educativa física</strong>, evitando etiquetar individualmente a menores de edad como "desertores potenciales" para prevenir estigmatizaciones comunitarias o psicológicas en la infancia.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/90 space-y-1.5">
            <h4 className="font-bold text-white">4. Equidad Territorial y Enfoque Diferencial</h4>
            <p className="text-zinc-400 leading-relaxed">
              Las métricas del modelo son auditadas anualmente para garantizar que el rendimiento no penalice desproporcionadamente a municipios PDET, resguardos indígenas o territorios con brechas históricas de conectividad y censo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
