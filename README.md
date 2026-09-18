# SAT-School Dropout Colombia: Early Warning and Decision Support System for Basic and Secondary Education

[![GovTech Colombia](https://img.shields.io/badge/Sector-Colombia%20Public%20Education-003366.svg)](https://www.mineducacion.gov.co)
[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3.3-38B2AC.svg)](https://tailwindcss.com)
[![Machine Learning](https://img.shields.io/badge/Models-Dual%20XGBoost%20%2B%20TreeSHAP-FF6600.svg)](https://xgboost.readthedocs.io)

> **Governance and Scope Note:** This application is a demonstrative environment and functional prototype for Colombia's **97 Certified Education Authorities (ETC)** and the **Ministry of National Education (MEN)**. It uses synthetic data structured under the taxonomy of the 2018–2023 master panel and does not constitute an official, binding prediction.

---

## 1. Project Overview

School dropout in Colombia — especially in rural contexts, PDET municipalities, and areas of high socioeconomic vulnerability — has historically been managed through **ex-post audits**. By the time the annual SIMAT cutoff consolidates disengagement figures, the student has already been out of school for months, breaking community protection ties and eroding the country's human capital.

**SAT-Dropout** is an interactive GovTech decision-support analytics system designed under a three-tier paradigm:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. PREDICT    Where and in which school sites is critical risk         │
│               concentrated?                                             │
│      ↓                                                                  │
│ 2. EXPLAIN    What structural or contextual factors explain it?         │
│      ↓        (Local additive decomposition via TreeSHAP)               │
│ 3. PRESCRIBE  Which preventive interventions should be prioritized?     │
│               (School meals, rural transport, psychosocial teams,       │
│               tutoring)                                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Structure of the 10 Operational Tabs

The application integrates 10 functional modules for data analysts, coverage directors, and Education Secretaries:

1. **Problem Context (`TabContextProblem`):**
   - Diagnosis of the dropout cycle in Colombia, the fiscal magnitude of the problem (public investment lost per disengaged student), and the shift from reactive policies to preventive early warnings.

2. **"Medusa" Data Pipeline (`TabDataPipeline`):**
   - Ingestion and harmonization architecture for 5 official sources: **DANE C-600**, **SIMAT/SINEB (MEN)**, **ICFES Saber 11**, **IPM/TerriData (DNP)**, and **PDET/ZOMAC Records**.
   - Resolves DIVIPOLA matching (98.3%), outlier handling, 3-tier imputation policies, and safeguards against temporal *data leakage*.

3. **Model Validation (`TabModelValidation`):**
   - Performance comparison across models (Logistic Regression, Random Forest, Full XGBoost, and Light XGBoost).
   - Interactive confusion matrices, ROC curves, and Precision-Recall curves, evaluating the trade-off between false positives and false negatives based on intervention cost.

4. **Fiscal Return on Investment (`TabFinancialROI`):**
   - Parametric simulator of socioeconomic impact: retention success rate (5% to 9%), per-capita intervention cost, and calculation of avoided fiscal loss (between \$140B and \$252B COP annually, with a B/C ratio of 1.2x to 2.1x).

5. **National Control Dashboard (`TabNationalDashboard`):**
   - Macro-level monitoring of 56,557 school sites nationwide: projected national dropout rate, sites in red/orange/yellow/green alert, urban/rural distribution, and risk concentration in PDET municipalities.

6. **Territorial Analysis (`TabTerritorialAnalysis`):**
   - Interactive choropleth map of Colombia's 32 departments with a risk gradient.
   - Comparative selector between a **fixed national threshold (5.0%)** and **relative percentiles by department (Top 10% / Top 15%)**, adjusting alert volume to each Education Authority's field-team operating capacity.

7. **Detailed School Site Analysis (`TabSchoolAnalysis`):**
   - Technical profile at the institution and school-site level (12-digit DANE code).
   - KPIs for enrollment, year-over-year trend, basic services provisioning, school meal (PAE) coverage, rural transport deficit, and estimated risk level.

8. **TreeSHAP Explainability (`TabExplainability`):**
   - Local additive decomposition of the selected site's risk vector relative to the population base value ($E[f(x)]$).
   - Force-plot / waterfall chart separating risk-accelerating factors (red) from protective, risk-dampening factors (blue), with natural-language narrative for non-technical officials.

9. **Prescriptive Action Plan (`TabRecommendations`):**
   - Rule engine that translates identified risk factors into concrete actions: school meal (PAE) slots, rural school transport routes, psychosocial committees, or pedagogical reinforcement.
   - Tracking board with statuses (Pending, In Progress, Deployed), owner assignment, logbook notes, `localStorage` persistence, and **CSV export**.

10. **AI Governance and Ethics (`TabGovernanceEthics`):**
    - Year-over-year *concept drift* monitor (case study: AUC drop from 0.81 in 2023 to 0.77 in 2024 following a regional migration/economic shock).
    - Interactive explorer of the Master Panel Data Dictionary with explanatory tooltips.
    - Matrix of ethical safeguards and compliance with **Law 1581 of 2012 (Habeas Data)** and principles of non-discrimination and non-punitiveness toward vulnerable schools.

---

## 3. Dual XGBoost Model

To ensure coverage without exclusion bias, the system implements a two-model architecture:

| Dimension | Full Model (Secondary & Upper Secondary) | Light Model (Primary Only) |
|---|---|---|
| **Target Population** | Sites with grades 9–11 and Saber 11 exam records | Rural or urban primary school sites (grades 1–5) |
| **Key Variables** | Saber 11 global score and percentiles, historical repetition rate, academic trajectories | Municipal IPM, walking commute time, PAE coverage, enrollment contraction, rurality |
| **AUC Metric** | 0.842 | 0.798 |
| **Rationale** | Maximizes precision by leveraging standardized academic performance | Avoids excluding thousands of rural sites that don't administer Saber 11 but carry high dropout risk |

---

## 4. Master Data Panel (Main Variables)

The panel consolidates **319,609 school-site-year observations** across **56,557 school sites**:

- `SEDE_CODIGO`: Unique 12-digit DANE school-site identifier.
- `PERIODO_ANIO`: School year (2018–2023).
- `FLAG_DESERCION` / `FLAG_ALTO_RIESGO`: Binary critical-risk target variable.
- `DESERCION_LAG1`: Dropout rate observed in the immediately preceding period ($t-1$).
- `MATRICULA_TOTAL`: Enrolled students at the official cutoff.
- `DELTA_MATRICULA_PCT`: Year-over-year percentage change in enrollment.
- `INDICE_VULNERABILIDAD`: Synthetic student socioeconomic vulnerability index (0–100).
- `IPM_MUNICIPAL`: Municipal DNP/DANE Multidimensional Poverty Index.
- `FLAG_RURAL`: Boolean indicator for rural or dispersed school site.
- `FLAG_PDET` / `FLAG_ZOMAC`: Indicator for post-conflict priority municipality.
- `DEFICIT_TRANSPORTE_RURAL`: Indicator of a >45-minute walking commute with no public school transport route.
- `COBERTURA_PAE_SEDE`: Effective percentage of students benefiting from the School Meal Program (PAE).
- `PUNTAJE_SABER11_GLOBAL`: Average standardized ICFES Saber 11 score (200–400).
- `FLAG_PANDEMIA`: COVID-19 2020–2021 contingency flag (isolated from core training to avoid shock bias).

---

## 5. Local Installation and Setup

### Prerequisites
- **Node.js**: v18.0 or higher (v20+ recommended)
- **npm**: v9.0 or higher

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-organization/sat-desercion-colombia.git
cd sat-desercion-colombia

# 2. Install dependencies
npm install

# 3. Start the development server (port 3000)
npm run dev

# 4. Build for production
npm run build

# 5. Run linter checks
npm run lint
```

The local server will run at:
`http://localhost:3000`

---

## 6. Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion (UI animations and tab transitions).
- **Iconography:** Lucide React.
- **Visualization and Maps:** Vector SVG choropleth with the geometries of Colombia's 32 departments, distribution bar charts, confusion matrices, and SHAP force-plot charts.
- **Persistence:** `localStorage` for action plans and per-site intervention statuses; native CSV report generation.
- **Build Tools:** Vite 8, esbuild.

---

## 7. Responsible AI and Public Governance Principles

1. **Strictly Preventive Use:** Predictive models are barred from cutting budgets, punitively rating teacher performance, or discouraging the enrollment of lower-performing students.
2. **Human-in-the-Loop Decision Support:** The prediction is a probabilistic signal; home visits and on-the-ground verification by the Education Authority take precedence over the algorithm.
3. **Privacy and Habeas Data (Law 1581 of 2012):** Analysis is conducted at the aggregated school-site and contextual-indicator level, avoiding the stigmatization of individual students and protecting minors' data.
4. **Continuous Drift Monitoring:** Periodic audits in response to structural changes in the education system, territorial migration, or reforms to social programs.

---

## 8. License and Credits

This project is distributed under the **Apache 2.0** license. Developed as a contribution to strengthening the analytical capabilities of Colombia's public education sector.
