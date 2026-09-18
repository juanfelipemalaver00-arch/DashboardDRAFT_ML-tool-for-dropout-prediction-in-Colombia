import React from 'react';
import { 
  BookOpen, 
  Layers, 
  BrainCircuit, 
  TrendingUp, 
  MapPin, 
  Globe2, 
  School, 
  Sparkles, 
  CheckSquare, 
  ShieldCheck, 
  FileCode,
  AlertTriangle
} from 'lucide-react';
import { ColombiaBookLogo } from './ColombiaBookLogo';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onOpenArchitectureModal: () => void;
  highRiskCount: number;
  totalSchoolsCount: number;
}

export const TABS = [
  { id: 'context', label: '1. Contexto & Problema', icon: BookOpen },
  { id: 'pipeline', label: '2. Pipeline "Medusa"', icon: Layers },
  { id: 'model', label: '3. Modelos & Validación', icon: BrainCircuit },
  { id: 'financials', label: '4. Finanzas & ROI', icon: TrendingUp },
  { id: 'national-dashboard', label: '5. Dashboard Nacional', icon: Globe2 },
  { id: 'territorial', label: '6. Análisis Territorial', icon: MapPin },
  { id: 'school-analysis', label: '7. Ficha de Sede', icon: School },
  { id: 'explainability', label: '8. Explicabilidad SHAP', icon: Sparkles },
  { id: 'recommendations', label: '9. Plan de Acción', icon: CheckSquare },
  { id: 'governance', label: '10. Monitoreo & Ética', icon: ShieldCheck },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenArchitectureModal,
  highRiskCount,
  totalSchoolsCount
}) => {
  return (
    <header className="bg-black border-b border-zinc-800 text-white sticky top-0 z-40 shadow-xl">
      {/* Official DANE Top Institutional Ribbon */}
      <div className="bg-[#8B1538] text-white px-4 py-1.5 text-[11px] font-semibold tracking-wide flex flex-col sm:flex-row items-center justify-between gap-1 border-b border-[#6d0f2b]">
        <div className="flex items-center gap-2">
          <span className="bg-black/30 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider">
            DANE • SEN
          </span>
          <span className="truncate">
            DEPARTAMENTO ADMINISTRATIVO NACIONAL DE ESTADÍSTICA — INFORMACIÓN PARA TODOS
          </span>
        </div>
        <div className="flex items-center gap-3 text-zinc-200 text-[10px]">
          <span className="hidden md:inline font-mono">Panel Maestro 2018–2023</span>
          <span className="hidden md:inline">•</span>
          <span className="text-amber-300 font-semibold">97 Secretarías Certificadas (ETC)</span>
        </div>
      </div>

      {/* GovTech Disclaimer Strip */}
      <div className="bg-zinc-950 border-b border-zinc-900 px-4 py-1.5 text-[11px] text-zinc-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-zinc-200">Aviso Estadístico Oficial:</strong> Prototipo funcional analítico para soporte a decisiones preventivas. Datos estructurados de acuerdo con taxonomía DANE/MEN.
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-zinc-500 text-[10px]">
          <span>DIVIPOLA: 98.3%</span>
          <span>•</span>
          <span className="text-emerald-400 font-mono">XGBoost AUC: 0.81</span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* App Logo: Outline of Colombia with open book inside */}
            <ColombiaBookLogo size={46} showText={false} />
            
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white font-sans flex items-center gap-1.5">
                  <span>SAT-Deserción</span>
                  <span className="text-[#f43f5e] font-light">|</span>
                  <span className="text-amber-400 text-xs sm:text-sm font-medium">Colombia</span>
                </h1>
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#8B1538] text-white border border-[#a31d42]">
                  DANE GovTech
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Sistema de Alerta Temprana y Soporte a Decisiones para la Retención Escolar
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons & KPIs */}
        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-zinc-400">Alerta Crítica:</span>
            <span className="font-bold text-rose-400 font-mono">{highRiskCount}</span>
            <span className="text-zinc-500 text-[10px]">/ {totalSchoolsCount} sedes</span>
          </div>

          <button
            onClick={onOpenArchitectureModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-amber-300 border border-amber-500/40 hover:bg-[#8B1538]/30 hover:border-amber-400 transition-all text-xs font-semibold cursor-pointer shadow-xs"
            title="Ver documentación técnica de producto GovTech, arquitectura y README"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span>Doc & Arquitectura</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs with DANE Vinotinto and sleek black accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-zinc-900 overflow-x-auto scrollbar-thin">
        <nav className="flex space-x-1 py-1.5 min-w-max">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#8B1538] text-white font-semibold shadow-md shadow-[#8B1538]/40 border border-[#a31d42]'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
