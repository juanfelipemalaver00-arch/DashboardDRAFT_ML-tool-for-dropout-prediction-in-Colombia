import React, { useState } from 'react';
import { 
  TrendingDown, 
  Users, 
  Building2, 
  Award, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  DollarSign,
  Target
} from 'lucide-react';

interface TabContextProblemProps {
  onExploreClick?: () => void;
}

export const TabContextProblem: React.FC<TabContextProblemProps> = ({ onExploreClick }) => {
  const [activeDataSource, setActiveDataSource] = useState<'PROJECT_BENCHMARK' | 'DEMO_SYNTHETIC'>('PROJECT_BENCHMARK');

  return (
    <div className="space-y-6 animate-fadeIn text-zinc-100">
      {/* Hero Section: Policy Problem Statement in DANE Vinotinto & Black */}
      <div className="bg-gradient-to-br from-zinc-950 via-black to-zinc-950 rounded-2xl p-6 sm:p-8 text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#8B1538]/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1538]/30 text-rose-300 border border-[#8B1538]/60 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Política Pública Educativa en Colombia • DANE & MEN</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            De la Reacción Retrospectiva a la Anticipación Prescriptiva
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Históricamente, los sistemas de información educativa en Colombia han operado como registros 
            <strong className="text-amber-400"> ex-post</strong>: cuando el reporte consolidado de matrícula o auditoría del MEN detecta la deserción, 
            el estudiante ya lleva meses fuera del aula y el vínculo comunitario se ha quebrado.
          </p>
          
          <p className="text-sm text-zinc-400 leading-relaxed">
            Este sistema de soporte a la decisión transforma la gestión de las <strong className="text-zinc-200">97 Secretarías de Educación certificadas</strong> 
            mediante analítica predictiva a nivel de sede escolar física, identificando anomalías tempranas en matrícula, rezagos históricos 
            y vulnerabilidad territorial para activar intervenciones antes de que la desescolarización sea irreversible.
          </p>
        </div>

        {/* Transition flow: Reactive to SAT */}
        <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#8B1538]/20 border border-[#8B1538]/50 rounded-xl p-4 flex gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#8B1538]/50 flex items-center justify-center shrink-0">
              <TrendingDown className="w-4 h-4 text-rose-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider font-mono">Enfoque Tradicional Reactivo</h4>
              <p className="text-xs text-rose-200/80 mt-1">
                Decisiones basadas en cierres lectivos pasados. Pérdida acumulada de capital humano y desfinanciamiento del Sistema General de Participaciones (SGP).
              </p>
            </div>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-600/50 rounded-xl p-4 flex gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">Sistema de Alerta Temprana (SAT)</h4>
              <p className="text-xs text-emerald-200/80 mt-1">
                Anticipación preventiva continua: alertas tempranas a escala de sede física, explicación del factor causal dominante y prescripción de acciones operativas inmediatas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Double Objective Diagram: PREDICT -> EXPLAIN -> PRESCRIBE */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <h3 className="text-lg font-extrabold text-white">
            Arquitectura de Decisión Pública: El Enfoque Integral
          </h3>
          <p className="text-xs text-zinc-400">
            Un modelo predictivo no genera valor público si no explica sus causas y prescribe rutas concretas para las secretarías de educación y rectores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Card 1: Predict */}
          <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 relative flex flex-col justify-between hover:border-[#8B1538] transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#8B1538]/30 border border-[#8B1538] text-rose-300 flex items-center justify-center font-bold text-sm mb-3 font-mono">
                1
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 font-mono">Capa Predictiva</span>
              <h4 className="text-base font-bold text-white mt-1">¿Dónde existe riesgo?</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Predicción de probabilidad de riesgo futuro para cada sede educativa anualizada, utilizando clasificadores XGBoost calibrados y umbrales relativos por departamento.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 font-medium flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-rose-400" />
              <span>Score de Riesgo (0% a 100%)</span>
            </div>
          </div>

          {/* Card 2: Explain */}
          <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 relative flex flex-col justify-between hover:border-amber-500 transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-600/60 text-amber-300 flex items-center justify-center font-bold text-sm mb-3 font-mono">
                2
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">Capa Explicativa (XAI)</span>
              <h4 className="text-base font-bold text-white mt-1">¿Qué factores explican ese riesgo?</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Descomposición aditiva local mediante SHAP (SHapley Additive exPlanations). Identifica si el riesgo proviene de deserción previa, transporte, déficit PAE o rezago académico.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Contribución SHAP desagregada</span>
            </div>
          </div>

          {/* Card 3: Prescribe */}
          <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 relative flex flex-col justify-between hover:border-emerald-500 transition-all">
            <div>
              <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-600/60 text-emerald-300 flex items-center justify-center font-bold text-sm mb-3 font-mono">
                3
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">Capa Prescriptiva</span>
              <h4 className="text-base font-bold text-white mt-1">¿Qué acciones priorizar?</h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Traducción automática del perfil de riesgo a paquetes de intervención operativos: focalización de raciones PAE, rutas de transporte rural, tutorías de nivelación o apoyo psicosocial.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Plan de acción operativo trazable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key National KPIs with Benchmark vs Synthetic Toggle */}
      <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-white">
              Métricas Clave & Dimensión del Sistema Estadístico
            </h3>
            <p className="text-xs text-zinc-400">
              Compara los parámetros metodológicos de referencia con el entorno demo interactivo.
            </p>
          </div>

          <div className="inline-flex rounded-lg bg-zinc-900 p-1 border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveDataSource('PROJECT_BENCHMARK')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeDataSource === 'PROJECT_BENCHMARK'
                  ? 'bg-[#8B1538] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Resultados de Referencia (Panel Maestro)
            </button>
            <button
              onClick={() => setActiveDataSource('DEMO_SYNTHETIC')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeDataSource === 'DEMO_SYNTHETIC'
                  ? 'bg-[#8B1538] text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Muestra Demo Sintética Activa
            </button>
          </div>
        </div>

        {activeDataSource === 'PROJECT_BENCHMARK' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-rose-400" />
                Secretarías
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono">97</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Certificadas en Colombia</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Sedes Físicas
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono">56,557</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Panel nacional consolidado</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-rose-400" />
                Observaciones
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono">319,609</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Registros sede-año</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                AUC-ROC Ref.
              </span>
              <p className="text-xl font-black text-emerald-400 mt-1 font-mono">0.81</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">XGBoost test set 2023</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Recall Ref.
              </span>
              <p className="text-xl font-black text-amber-400 mt-1 font-mono">0.76</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">En sedes de alto riesgo</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Impacto Potencial
              </span>
              <p className="text-xl font-black text-emerald-400 mt-1 font-mono">$140B+</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">COP/año (esc. 5% retención)</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Secretarías Demo
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono">12</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Muestra representativa</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                Sedes en Demo
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono">12</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Exploración exhaustiva</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Años Históricos
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono">2018–2023</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Trayectorias anuales</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-rose-400" />
                Variables Base
              </span>
              <p className="text-xl font-black text-white mt-1 font-mono">20+</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Diccionario interactivo</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                SHAP Local
              </span>
              <p className="text-xl font-black text-purple-400 mt-1 font-mono">100%</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Cálculo aditivo individual</p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Modo Prescriptivo
              </span>
              <p className="text-xl font-black text-emerald-400 mt-1 font-mono">Activo</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">Con persistencia local</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
