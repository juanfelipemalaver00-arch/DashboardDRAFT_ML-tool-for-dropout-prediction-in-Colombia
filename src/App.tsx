import React, { useState } from 'react';
import { Header } from './components/Header';
import { SYNTHETIC_SCHOOLS } from './data/syntheticDatabase';
import { SchoolRecord } from './types';

// Tab Components
import { TabContextProblem } from './components/tabs/TabContextProblem';
import { TabDataPipeline } from './components/tabs/TabDataPipeline';
import { TabModelValidation } from './components/tabs/TabModelValidation';
import { TabFinancialROI } from './components/tabs/TabFinancialROI';
import { TabNationalDashboard } from './components/tabs/TabNationalDashboard';
import { TabTerritorialAnalysis } from './components/tabs/TabTerritorialAnalysis';
import { TabSchoolAnalysis } from './components/tabs/TabSchoolAnalysis';
import { TabExplainability } from './components/tabs/TabExplainability';
import { TabRecommendations } from './components/tabs/TabRecommendations';
import { TabGovernanceEthics } from './components/tabs/TabGovernanceEthics';

// Architecture Modal
import { ArchitectureModal } from './components/ArchitectureModal';
import { AlertCircle, FileText } from 'lucide-react';
import { ColombiaBookLogo } from './components/ColombiaBookLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('context');
  const [selectedSchool, setSelectedSchool] = useState<SchoolRecord>(SYNTHETIC_SCHOOLS[0]);
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);

  const highRiskCount = SYNTHETIC_SCHOOLS.filter(s => s.riskCategory === 'ALTO').length;
  const totalSchoolsCount = SYNTHETIC_SCHOOLS.length;

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans text-zinc-100 antialiased selection:bg-[#8B1538] selection:text-white">
      {/* Top Header & Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenArchitectureModal={() => setIsArchModalOpen(true)}
        highRiskCount={highRiskCount}
        totalSchoolsCount={totalSchoolsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'context' && (
          <TabContextProblem onExploreClick={() => setActiveTab('pipeline')} />
        )}

        {activeTab === 'pipeline' && (
          <TabDataPipeline />
        )}

        {activeTab === 'model' && (
          <TabModelValidation />
        )}

        {activeTab === 'financials' && (
          <TabFinancialROI />
        )}

        {activeTab === 'national-dashboard' && (
          <TabNationalDashboard
            schools={SYNTHETIC_SCHOOLS}
            onSelectSchool={(school) => setSelectedSchool(school)}
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'territorial' && (
          <TabTerritorialAnalysis
            schools={SYNTHETIC_SCHOOLS}
            onSelectSchool={(school) => setSelectedSchool(school)}
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'school-analysis' && (
          <TabSchoolAnalysis
            selectedSchool={selectedSchool}
            schools={SYNTHETIC_SCHOOLS}
            onSelectSchool={setSelectedSchool}
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'explainability' && (
          <TabExplainability
            selectedSchool={selectedSchool}
            onNavigateToTab={(tabId) => setActiveTab(tabId)}
          />
        )}

        {activeTab === 'recommendations' && (
          <TabRecommendations
            schools={SYNTHETIC_SCHOOLS}
            selectedSchool={selectedSchool}
            onSelectSchool={setSelectedSchool}
          />
        )}

        {activeTab === 'governance' && (
          <TabGovernanceEthics />
        )}
      </main>

      {/* Footer with DANE GovTech Ethics & Architecture */}
      <footer className="bg-zinc-950 border-t border-zinc-800 mt-12 py-8 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center md:text-left">
              <ColombiaBookLogo size={42} showText={false} />
              <div className="space-y-0.5">
                <p className="font-extrabold text-white text-sm tracking-tight flex items-center gap-2">
                  <span>SAT Deserción Escolar Colombia</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#8B1538] text-white font-mono uppercase">
                    DANE • SEN
                  </span>
                </p>
                <p className="text-zinc-400 text-xs">
                  Departamento Administrativo Nacional de Estadística • Sistema de Alerta Temprana y Soporte a Decisiones
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsArchModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg border border-amber-500/40 hover:border-amber-400 bg-zinc-900 hover:bg-[#8B1538]/30 text-amber-300 font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Propuesta de Arquitectura & README</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl text-[11px] text-zinc-400 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-zinc-200">Aviso Institucional DANE / MEN:</strong> Este aplicativo utiliza datos sintéticos estructurados bajo la taxonomía del panel maestro (2018–2023) y no constituye una predicción oficial vinculante. Las probabilidades son señales analíticas para priorizar intervenciones socioeducativas preventivas (PAE, transporte escolar y apoyo psicosocial), prohibiéndose su uso punitivo o de desfinanciación.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-zinc-800 text-[11px] text-zinc-500">
            <span>© 2026 SAT Deserción Escolar Colombia • Licencia Apache 2.0 GovTech</span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Gobernanza Estadística DANE & Ley 1581 de 2012 (Hábeas Data)</span>
            </span>
          </div>
        </div>
      </footer>

      {/* GovTech Architecture Modal */}
      <ArchitectureModal
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </div>
  );
}
