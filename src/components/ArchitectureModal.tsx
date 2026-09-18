import React, { useState } from 'react';
import { X, Copy, Check, FileCode, BookOpen, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'A_VISION' | 'B_STACK' | 'C_ARCH' | 'D_DB' | 'F_ML' | 'O_README' | 'ROADMAP'>('A_VISION');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const copyReadme = () => {
    navigator.clipboard.writeText(README_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-zinc-950 rounded-2xl w-full max-w-5xl h-[88vh] flex flex-col shadow-2xl border border-zinc-800 overflow-hidden text-zinc-100">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-black text-white">
          <div className="flex items-center gap-2.5">
            <FileCode className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-extrabold text-white">
                Documento de Arquitectura de Producto GovTech & README Oficial
              </h2>
              <p className="text-[11px] text-zinc-400">
                Especificación técnica integral según Secciones 36 (A–S) del requerimiento • DANE SEN
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subnav */}
        <div className="px-6 py-2 border-b border-zinc-800 bg-zinc-900 flex space-x-2 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveSection('A_VISION')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              activeSection === 'A_VISION' ? 'bg-[#8B1538] text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            A. Visión de Producto
          </button>
          <button
            onClick={() => setActiveSection('B_STACK')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              activeSection === 'B_STACK' ? 'bg-[#8B1538] text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            B. Stack Tecnológico
          </button>
          <button
            onClick={() => setActiveSection('C_ARCH')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              activeSection === 'C_ARCH' ? 'bg-[#8B1538] text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            C. Arquitectura del Sistema
          </button>
          <button
            onClick={() => setActiveSection('D_DB')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              activeSection === 'D_DB' ? 'bg-[#8B1538] text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            D. Esquema de Base de Datos
          </button>
          <button
            onClick={() => setActiveSection('F_ML')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              activeSection === 'F_ML' ? 'bg-[#8B1538] text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            F. Metodología ML & SHAP
          </button>
          <button
            onClick={() => setActiveSection('O_README')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              activeSection === 'O_README' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            O. GitHub README.md (EN)
          </button>
          <button
            onClick={() => setActiveSection('ROADMAP')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold ${
              activeSection === 'ROADMAP' ? 'bg-[#8B1538] text-white font-bold shadow-xs' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            P–S. Roadmap & Testing
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-6 overflow-y-auto text-xs text-zinc-300 space-y-6">
          {activeSection === 'A_VISION' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">A. Visión de Producto: De la Reacción a la Prescripción</h3>
              <p className="leading-relaxed">
                El <strong>Sistema de Alerta Temprana (SAT) de Deserción Escolar en Educación Primaria en Colombia</strong> es un 
                Decision Support System concebido para los despachos de las <strong>97 Secretarías de Educación certificadas</strong>, 
                directores de núcleo, rectores y el Ministerio de Educación Nacional (MEN).
              </p>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                <span className="font-bold text-blue-900 block">Problema Público Resuelto:</span>
                <p className="text-blue-800">
                  Las decisiones de política educativa se han tomado históricamente de forma retrospectiva: cuando se consolida la estadística anual de deserción, el alumno lleva meses desvinculado del sistema. Este producto anticipa el riesgo a escala de <em>sede educativa física</em> (código DANE 12 dígitos) y traduce las probabilidades en tres respuestas operativas inmediatas:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-blue-950 font-medium">
                  <li><strong>PREDICT:</strong> ¿Dónde existe mayor propensión al abandono?</li>
                  <li><strong>EXPLAIN:</strong> ¿Qué factores estructurales o coyunturales explican la alerta (vía SHAP)?</li>
                  <li><strong>PRESCRIBE:</strong> ¿Qué intervención concreta (transporte, PAE, refuerzo, psicosocial) debe priorizar la Secretaría?</li>
                </ol>
              </div>
            </div>
          )}

          {activeSection === 'B_STACK' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">B. Stack Tecnológico Seleccionado & Evaluación Comparativa</h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                    <tr>
                      <th className="p-2.5">Capa</th>
                      <th className="p-2.5">Tecnología Elegida</th>
                      <th className="p-2.5">Alternativas Evaluadas</th>
                      <th className="p-2.5">Justificación de Decisión</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">ML & Analítica</td>
                      <td className="p-2.5 font-mono text-blue-700">Python 3.11, XGBoost, SHAP, scikit-learn</td>
                      <td className="p-2.5">LightGBM, Random Forest, PyTorch</td>
                      <td className="p-2.5 text-slate-600">XGBoost ofrece óptima calibración con funciones de costo asimétricas y soporte nativo TreeSHAP para explicabilidad instantánea.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">Geospatial</td>
                      <td className="p-2.5 font-mono text-blue-700">GeoPandas + SVG / TopoJSON / Folium</td>
                      <td className="p-2.5">Kepler.gl, PostGIS, Mapbox GL</td>
                      <td className="p-2.5 text-slate-600">Permite renderizar mapas coropléticos departamentales y puntos de sedes sin sobrecargar el navegador de funcionarios públicos.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">Frontend / App</td>
                      <td className="p-2.5 font-mono text-blue-700">React 19 + TypeScript + Tailwind CSS</td>
                      <td className="p-2.5">Streamlit, Dash, Gradio</td>
                      <td className="p-2.5 text-slate-600">Streamlit y Dash sufren de re-ejecución completa en dashboards complejos con 10 pestañas y persistencia de estados. React garantiza rendimiento fluido, filtros reactivos y experiencia de usuario moderna de clase GovTech.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">Almacenamiento MVP</td>
                      <td className="p-2.5 font-mono text-blue-700">DuckDB / SQLite / Local Engine</td>
                      <td className="p-2.5">PostgreSQL + PostGIS, BigQuery</td>
                      <td className="p-2.5 text-slate-600">DuckDB permite consultar columnarmente millones de filas sede-año con latencia inferior a 50ms sin infraestructura pesada de servidores para el MVP.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === 'C_ARCH' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">C. Arquitectura Modular del Sistema</h3>
              <pre className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed">
{`Fuentes Primarias (C-600, SIMAT, Saber 11, TerriData/IPM, PDET/ZOMAC)
                         ↓
             Pipeline de Ingesta & Adaptación
 (Detección de Encodings, Matching DIVIPOLA 98.3%, Exclusión Pandemia 2020-21)
                         ↓
            Panel Maestro Sintético / Demo DB
                         ↓
              Feature Engineering Layer
 (Rezagos t-1, Deltas de Matrícula, Imputación Estocástica con Dummies)
                         ↓
         Motor de Predicción Dual (XGBoost)
        ├── Full Model (con Saber 11 / Media)
        └── Lightweight Model (Sedes Primaria / Sin ICFES)
                         ↓
           Score de Riesgo & Clasificación
    (Umbral Nacional Fijo vs Percentil Relativo Departamental)
                         ↓
           Capa de Explicabilidad (TreeSHAP)
   (Decomposición Aditiva + Traducción a Narrativa Operativa)
                         ↓
       Motor de Prescripción Basado en Reglas
 (PAE, Rutas Rurales, Tutorías Pedagógicas, Duplas Psicosociales)
                         ↓
         Decision Support System Dashboard
 (10 Pestañas: Contexto, Medusa, Modelo, ROI, Mapa, Ficha, XAI, Acciones)
                         ↓
    Exportación de Plan de Acción / Integración Local`}
              </pre>
            </div>
          )}

          {activeSection === 'D_DB' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">D. Esquema de Base de Datos Relacional y Analítica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Tabla: schools</span>
                  <ul className="text-[11px] space-y-0.5 text-slate-600 font-mono">
                    <li>• school_id (PK, DANE 12 dígitos)</li>
                    <li>• school_name (TEXT)</li>
                    <li>• municipality_code (DANE 5 dígitos)</li>
                    <li>• municipality (TEXT)</li>
                    <li>• department (TEXT)</li>
                    <li>• secretary (TEXT)</li>
                    <li>• latitude (FLOAT), longitude (FLOAT)</li>
                    <li>• rural_flag (BOOLEAN)</li>
                    <li>• pdet_flag (BOOLEAN), zomac_flag (BOOLEAN)</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Tabla: school_year (Panel Longitudinal)</span>
                  <ul className="text-[11px] space-y-0.5 text-slate-600 font-mono">
                    <li>• school_id (FK), year (INT) [Composite PK]</li>
                    <li>• enrollment (INT), dropout_rate (FLOAT)</li>
                    <li>• dropout_lag1 (FLOAT), delta_enrollment (FLOAT)</li>
                    <li>• vulnerability_index (FLOAT 0-100)</li>
                    <li>• ipm_municipal (FLOAT)</li>
                    <li>• displacement_rate (FLOAT)</li>
                    <li>• saber11_score (FLOAT, NULLABLE)</li>
                    <li>• icfes_available (BOOLEAN)</li>
                    <li>• pae_coverage (FLOAT), transport_deficit (BOOL)</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Tabla: predictions</span>
                  <ul className="text-[11px] space-y-0.5 text-slate-600 font-mono">
                    <li>• prediction_id (PK), school_id (FK)</li>
                    <li>• prediction_year (INT)</li>
                    <li>• risk_probability (FLOAT 0.0 - 1.0)</li>
                    <li>• risk_category (ENUM: BAJO, MEDIO, ALTO)</li>
                    <li>• model_used (ENUM: FULL, LIGHTWEIGHT)</li>
                    <li>• department_percentile (FLOAT 0 - 100)</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-900 block font-mono text-[11px]">Tabla: explanations & recommendations</span>
                  <ul className="text-[11px] space-y-0.5 text-slate-600 font-mono">
                    <li>• action_id (PK), school_id (FK)</li>
                    <li>• primary_driver (TEXT), shap_values (JSON)</li>
                    <li>• action_title (TEXT), priority (ENUM)</li>
                    <li>• time_horizon (TEXT), responsible_area (TEXT)</li>
                    <li>• status (ENUM: No iniciado, En progreso, etc.)</li>
                    <li>• assigned_to (TEXT), notes (TEXT)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'F_ML' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">F. Metodología de Machine Learning, XGBoost y SHAP</h3>
              <p className="leading-relaxed">
                El sistema utiliza <strong>XGBoost con objetivo binary:logistic</strong> y optimización por validación cruzada estratificada por departamento. Los resultados de referencia del proyecto demuestran:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">AUC-ROC (Test 2023)</span>
                  <p className="text-lg font-bold text-indigo-700">0.81</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Recall Alto Riesgo</span>
                  <p className="text-lg font-bold text-amber-700">0.76</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Precisión</span>
                  <p className="text-lg font-bold text-slate-800">0.68</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Brier Score</span>
                  <p className="text-lg font-bold text-emerald-700">0.12</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                <strong>TreeSHAP:</strong> Cada predicción individual se descompone en la suma del valor base de partida \(E[f(x)] = 0.28\) y las contribuciones marginales locales de cada predictor. Estas contribuciones se transforman automáticamente en una narrativa operativa en lenguaje natural para funcionarios que no son especialistas en ciencia de datos.
              </p>
            </div>
          )}

          {activeSection === 'O_README' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">O. Official GitHub README.md (Ready to Copy)</h3>
                <button
                  onClick={copyReadme}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar README.md'}</span>
                </button>
              </div>
              <pre className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] overflow-x-auto whitespace-pre-wrap max-h-96">
                {README_CONTENT}
              </pre>
            </div>
          )}

          {activeSection === 'ROADMAP' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">P–S. Hoja de Ruta de Producto & Batería de Pruebas</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900">MVP (Fase 1 - Actual):</h4>
                  <p className="text-slate-600 mt-1">
                    Base de datos sintética estructurada, 10 pestañas operativas, modelo dual XGBoost, descomposición SHAP, mapas territoriales, simulador de ROI fiscal, plan de acción con persistencia local y exportación a CSV.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900">Versión 2 (Despliegue Institucional):</h4>
                  <p className="text-slate-600 mt-1">
                    Conectores directos al SIMAT mediante SFTP/API oficial del MEN, base de datos analítica en Cloud SQL / PostgreSQL con PostGIS, autenticación de funcionarios con roles RBAC por Secretaría, reentrenamiento anual automatizado.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900">Versión 3 (Evaluación de Impacto Causal):</h4>
                  <p className="text-slate-600 mt-1">
                    Modelado causal cuasi-experimental (diferencias en diferencias / control sintético) para medir la efectividad real de las intervenciones desplegadas, predicción a nivel de ciclo escolar con salvaguardas reforzadas de hábeas data para menores.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const README_CONTENT = `# SAT-Deserción Colombia: Early Warning Decision Support System for Primary Education

> **Disclaimer:** This demo application uses synthetic data structured in accordance with the national master panel architecture (2018–2023) and is not an official binding prediction from the Ministry of National Education of Colombia.

---

## 1. Project Overview & Public Policy Problem

School dropout in Colombia, especially in rural, PDET (Development Programs with a Territorial Focus), and vulnerable municipal settings, has traditionally been addressed through **reactive ex-post measures**. When annual audits or matricula closure reports identify that a student has discontinued attendance, the child has already been away from the classroom for months, severing community ties and degrading human capital.

**SAT-Deserción** is an interactive GovTech analytical decision-support system designed for the **97 certified Secretarías de Educación of Colombia**. It implements an integrated three-layer paradigm:

\`\`\`
PREDICT  (Where is dropout risk concentrated across educational campuses?)
   ↓
EXPLAIN  (What structural or situational factors explain this risk via TreeSHAP?)
   ↓
PRESCRIBE (What prioritized operational interventions should the Secretaría deploy?)
\`\`\`

---

## 2. Key Features

- **Master Panel Integration ("Medusa Pipeline"):** 
  - Standardizes 5 foundational data streams: C-600 (DANE), SIMAT/SINEB (MEN), Saber 11 (ICFES), IPM/TerriData (DNP), and PDET/ZOMAC registries.
  - Resolves encoding anomalies, 98.3% DIVIPOLA municipality matching, strict elimination of temporal data leakage, and a three-tier missing data handling policy.
- **Dual-Model XGBoost Architecture:**
  - **Full Model:** Leverages standardized Saber 11 scores and academic trajectory metrics for campuses with secondary/high school levels.
  - **Lightweight Model:** Operates on structural socioeconomic vulnerability (IPM, displacement, transport barriers, PAE coverage, enrollment contractions) to ensure pure primary schools are never excluded.
- **Explainable AI (TreeSHAP):**
  - Additive local attribution decomposing campus risk into positive drivers (risk escalators) and negative drivers (protective buffers), translated into accessible natural language narratives for education officials.
  - Transparent distinction: *Predictive Association ≠ Causal Effect*.
- **Department-Relative Capacity Thresholds:**
  - Simulates fixed national cutoff thresholds vs. department-relative percentiles to adapt alerting volumes directly to local field team operational capacity.
- **Prescriptive Recommendation Engine:**
  - Rule-based operational dispatch linking school risk profiles to actionable interventions: PAE food supplementation, rural school bus routes, psychosocial teams, and peer tutoring.
  - In-browser action tracking (statuses, assigned coordinators, follow-up notes) with one-click CSV export.
- **Fiscal ROI & Economic Impact Simulator:**
  - Interactive scenario models evaluating avoided loss, net economic benefit, and benefit/cost ratios (Conservative: 5% retention, ~$140B COP/year, 1.2x B/C; Optimistic: 9% retention, ~$252B COP/year, 2.1x B/C).
- **Responsible AI & Governance:**
  - Interannual drift detection (2023 AUC 0.81 vs. 2024 AUC 0.77 monitoring case), integrated data dictionary browser with tooltips, and strict anti-stigmatization safeguards under Colombian Law 1581 of 2012.

---

## 3. Technology Stack

- **Machine Learning & Analytics:** Python 3.11, XGBoost, SHAP, scikit-learn, NumPy, Pandas.
- **Frontend & Visualization:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Geospatial Analytics:** GeoPandas, TopoJSON / SVG vector choropleth coordinates for all 32 Colombian departments and school campus geocoding.
- **Data Layer:** Columnar in-memory demo database / DuckDB / SQLite architecture.

---

## 4. Master Panel Schema (Summary)

The master panel encompasses **319,609 campus-year observations** across **56,557 unique physical school campuses** (2018–2023) covering ~70 variables:

1. \`SEDE_CODIGO\`: 12-digit unique DANE educational campus identifier.
2. \`PERIODO_ANIO\`: Academic school year.
3. \`FLAG_ALTO_RIESGO\` / \`FLAG_DESERCION\`: Target binary risk label.
4. \`DESERCION_LAG1\`: Lagged dropout rate from preceding year (\(t-1\)).
5. \`MATRICULA_TOTAL\`: Total student enrollment.
6. \`DELTA_MATRICULA_PCT\`: Interannual enrollment growth or contraction rate.
7. \`INDICE_VULNERABILIDAD\`: Synthetic socioeconomic student vulnerability index (0–100).
8. \`IPM_MUNICIPAL\`: Multidimensional Poverty Index of the municipality.
9. \`FLAG_RURAL\`: Rural / dispersed campus indicator.
10. \`FLAG_PDET\` / \`FLAG_ZOMAC\`: Post-conflict peace territory priority markers.
11. \`DEFICIT_TRANSPORTE_RURAL\`: Indicator of student walking times >45 mins without school transit.
12. \`COBERTURA_PAE_SEDE\`: School Food Program (PAE) effective coverage rate.
13. \`PUNTAJE_SABER11_GLOBAL\`: ICFES Saber 11 standardized testing performance.
14. \`FLAG_PANDEMIA\`: COVID-19 2020–2021 shock flag (excluded from core classifier fitting to prevent pandemic bias).

---

## 5. Local Execution & Quickstart

\`\`\`bash
# 1. Clone repository
git clone https://github.com/your-org/sat-desercion-colombia.git
cd sat-desercion-colombia

# 2. Install dependencies
npm install

# 3. Launch development server (default port 3000)
npm run dev

# 4. Build production bundle
npm run build
\`\`\`

---

## 6. Responsible AI & Public Policy Principles

1. **Non-Punitive Deployment:** Predictions must never be used to penalize school budgets, rank teachers punitively, or incentivize schools to dismiss lower-performing students.
2. **Actionable Decision Support:** Risk scores are decision-support signals designed to inform preventive human judgment, not definitive verdicts on a student's destiny.
3. **Data Protection:** Operating at the educational campus level preserves child privacy while providing sufficient geographic granularity to mobilize territorial welfare resources.

---

## 7. License

Licensed under the Apache License, Version 2.0. Built for the public education community and Colombian educational authorities.
`;
