# SAT-Deserción Escolar Colombia: Sistema de Alerta Temprana y Soporte a Decisiones para Educación Básica y Media

[![GovTech Colombia](https://img.shields.io/badge/Sector-Educaci%C3%B3n%20P%C3%BAblica%20Colombia-003366.svg)](https://www.mineducacion.gov.co)
[![React 19](https://img.shields.io/badge/React-19.0.1-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6.svg)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.3.3-38B2AC.svg)](https://tailwindcss.com)
[![Machine Learning](https://img.shields.io/badge/Modelos-Dual%20XGBoost%20%2B%20TreeSHAP-FF6600.svg)](https://xgboost.readthedocs.io)

> **Nota de Gobernanza y Alcance:** Esta aplicación es un entorno demostrativo y prototipo funcional para las **97 Secretarías de Educación Certificadas (ETC)** y el **Ministerio de Educación Nacional (MEN)**. Utiliza datos sintéticos estructurados bajo la taxonomía del panel maestro 2018–2023 y no constituye una predicción vinculante oficial.

---

## 1. Visión General del Proyecto

La deserción escolar en Colombia, especialmente en contextos rurales, municipios PDET y zonas con alta vulnerabilidad socioeconómica, se ha gestionado históricamente mediante **auditorías ex-post**. Cuando el corte anual del SIMAT consolida las cifras de desvinculación, el estudiante ya lleva meses desescolarizado, rompiendo los vínculos de protección comunitaria y mermando el capital humano del país.

**SAT-Deserción** es un sistema analítico interactivo GovTech de soporte a decisiones diseñado bajo un paradigma en tres niveles:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 1. PREDECIR   ¿Dónde y en qué sedes se concentra el riesgo crítico?    │
│      ↓                                                                  │
│ 2. EXPLICAR   ¿Qué factores estructurales o coyunturales lo explican?   │
│      ↓        (Descomposición aditiva local TreeSHAP)                   │
│ 3. PRESCRIBIR ¿Qué intervenciones preventivas priorizadas desplegar?    │
│               (PAE, transporte rural, equipos psicosociales, tutorías)  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Estructura de las 10 Pestañas Operativas

La aplicación integra 10 módulos funcionales para analistas de datos, directores de cobertura y Secretarios de Educación:

1. **Contexto del Problema (`TabContextProblem`):**
   - Diagnóstico del ciclo de deserción en Colombia, magnitud fiscal del problema (pérdida de inversión pública por alumno desvinculado) y transición de políticas reactivas a alertas tempranas preventivas.

2. **Pipeline de Datos "Medusa" (`TabDataPipeline`):**
   - Arquitectura de ingesta y armonización de 5 fuentes oficiales: **DANE C-600**, **SIMAT/SINEB (MEN)**, **ICFES Saber 11**, **IPM/TerriData (DNP)** y **Registros PDET/ZOMAC**.
   - Resuelve el matching DIVIPOLA (98.3%), manejo de valores atípicos, políticas de imputación en 3 niveles y blindaje contra *data leakage* temporal.

3. **Validación de Modelos (`TabModelValidation`):**
   - Comparativa de métricas de desempeño entre modelos (Regresión Logística, Random Forest, XGBoost Full y XGBoost Ligero).
   - Matrices de confusión interactivas, curvas ROC y curvas de Precisión-Recall, evaluando el *trade-off* entre falsos positivos y falsos negativos según costo de intervención.

4. **Retorno de Inversión Fiscal (`TabFinancialROI`):**
   - Simulador paramétrico de impacto socioeconómico: tasa de éxito de retención (5% a 9%), costo per cápita de intervención y cálculo de pérdida fiscal evitada (entre \$140B y \$252B COP anuales con relación B/C de 1.2x a 2.1x).

5. **Tablero de Control Nacional (`TabNationalDashboard`):**
   - Monitoreo macro de 56.557 sedes educativas a nivel país: tasa nacional de deserción proyectada, sedes en alerta roja/naranja/amarilla/verde, distribución urbana/rural y concentración de riesgo en municipios PDET.

6. **Análisis Territorial (`TabTerritorialAnalysis`):**
   - Mapa coroplético interactivo de los 32 departamentos de Colombia con gradiente de riesgo.
   - Selector comparativo entre **umbral fijo nacional (5.0%)** y **percentiles relativos por departamento (Top 10% / Top 15%)**, ajustando el volumen de alertas a la capacidad operativa de los equipos de campo de cada Secretaría.

7. **Análisis Detallado por Sede (`TabSchoolAnalysis`):**
   - Ficha técnica a nivel de establecimiento y sede educativa (código DANE 12 dígitos).
   - KPIs de matrícula, tendencia interanual, dotación de servicios básicos, cobertura del PAE, déficit de transporte escolar y nivel de riesgo estimado.

8. **Explicabilidad TreeSHAP (`TabExplainability`):**
   - Descomposición aditiva local del vector de riesgo de la sede seleccionada en relación con el valor base poblacional (*base value* $E[f(x)]$).
   - Gráfico tipo *force plot* / cascada separando factores aceleradores de riesgo (rojo) y amortiguadores protectores (azul), con narrativa en lenguaje natural para funcionarios no técnicos.

9. **Plan de Acción Prescriptivo (`TabRecommendations`):**
   - Motor de reglas que traduce factores de riesgo identificados en acciones concretas: cupos alimentarios PAE, rutas de transporte escolar rural, comités psicosociales o refuerzo pedagógico.
   - Tablero de seguimiento con estados (Pendiente, En Gestión, Desplegado), asignación de responsable, notas de bitácora, persistencia en `localStorage` y **exportación a CSV**.

10. **Gobernanza y Ética de la IA (`TabGovernanceEthics`):**
    - Monitor de *concept drift* interanual (caso de estudio: caída de AUC 0.81 en 2023 a 0.77 en 2024 tras shock migratorio/económico regional).
    - Explorador interactivo del Diccionario de Datos del Panel Maestro con tooltips explicativos.
    - Matriz de salvaguardas éticas y cumplimiento de la **Ley 1581 de 2012 (Hábeas Data)** y principios de no discriminación y no punitividad en escuelas vulnerables.

---

## 3. Modelo Dual XGBoost

Para garantizar cobertura sin sesgos de exclusión, el sistema implementa una arquitectura de dos modelos:

| Dimensión | Modelo Full (Secundaria y Media) | Modelo Ligero (Primaria Pura) |
|---|---|---|
| **Población Objetivo** | Sedes con grados 9° a 11° y registro en pruebas Saber 11 | Sedes rurales o urbanas de básica primaria (grados 1° a 5°) |
| **Variables Clave** | Puntaje global y percentiles Saber 11, tasa de repitencia histórica, trayectorias académicas | IPM municipal, tiempo de desplazamiento a pie, cobertura PAE, contracción de matrícula, ruralidad |
| **Métrica AUC** | 0.842 | 0.798 |
| **Justificación** | Maximiza la precisión aprovechando el rendimiento académico estandarizado | Evita excluir miles de sedes rurales que no presentan Saber 11 pero tienen alto riesgo de desescolarización |

---

## 4. Panel Maestro de Datos (Variables Principales)

El panel consolida **319.609 observaciones sede-año** sobre **56.557 sedes educativas**:

- `SEDE_CODIGO`: Identificador único DANE de 12 dígitos.
- `PERIODO_ANIO`: Año escolar (2018–2023).
- `FLAG_DESERCION` / `FLAG_ALTO_RIESGO`: Variable objetivo binaria de riesgo crítico.
- `DESERCION_LAG1`: Tasa de deserción observada en el periodo inmediatamente anterior ($t-1$).
- `MATRICULA_TOTAL`: Alumnos matriculados en el corte oficial.
- `DELTA_MATRICULA_PCT`: Tasa de variación porcentual interanual de la matrícula.
- `INDICE_VULNERABILIDAD`: Índice sintético de vulnerabilidad socioeconómica estudiantil (0–100).
- `IPM_MUNICIPAL`: Índice de Pobreza Multidimensional DNP/DANE del municipio.
- `FLAG_RURAL`: Indicador booleano de sede rural o dispersa.
- `FLAG_PDET` / `FLAG_ZOMAC`: Indicador de municipio prioritario para el posconflicto.
- `DEFICIT_TRANSPORTE_RURAL`: Indicador de distancia de caminata >45 min sin ruta escolar pública.
- `COBERTURA_PAE_SEDE`: Porcentaje efectivo de estudiantes beneficiarios del Programa de Alimentación Escolar.
- `PUNTAJE_SABER11_GLOBAL`: Puntaje promedio estandarizado ICFES Saber 11 (200–400).
- `FLAG_PANDEMIA`: Flag de contingencia COVID-19 2020–2021 (aislado del entrenamiento central para evitar sesgo de choque).

---

## 5. Instalación y Ejecución Local

### Prerrequisitos
- **Node.js**: v18.0 o superior (recomendado v20+)
- **npm**: v9.0 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-organizacion/sat-desercion-colombia.git
cd sat-desercion-colombia

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo (puerto 3000)
npm run dev

# 4. Compilar para producción
npm run build

# 5. Ejecutar verificación de linter
npm run lint
```

El servidor local se ejecutará en:
`http://localhost:3000`

---

## 6. Pila Tecnológica

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Motion (animaciones de interfaz y transiciones de pestañas).
- **Iconografía:** Lucide React.
- **Visualización y Mapas:** Choropleth vectorial SVG con geometrías de los 32 departamentos de Colombia, barras de distribución, matrices de confusión y gráficos de fuerza SHAP.
- **Persistencia:** `localStorage` para planes de acción y estados de intervención por sede; generación nativa de reportes CSV.
- **Herramientas de Build:** Vite 8, esbuild.

---

## 7. Principios de IA Responsable y Gobernanza Pública

1. **Uso Exclusivamente Preventivo:** Los modelos predictivos están vetados para recortar presupuestos, calificar punitivamente el desempeño docente o desincentivar la matrícula de estudiantes de bajo rendimiento.
2. **Soporte a la Decisión Humana (*Human-in-the-loop*):** La predicción es una señal probabilística; las visitas domiciliarias y la verificación en terreno por parte de la Secretaría de Educación prevalecen sobre el algoritmo.
3. **Privacidad y Hábeas Data (Ley 1581 de 2012):** El análisis se realiza a nivel agregado de sede educativa e indicadores contextuales, evitando la estigmatización de estudiantes individuales y protegiendo los datos de menores de edad.
4. **Monitoreo Continuo de Deriva (*Drift*):** Auditorías periódicas ante cambios estructurales en el sistema educativo, migraciones territoriales o reformas en programas sociales.

---

## 8. Licencia y Créditos

Este proyecto se distribuye bajo la licencia **Apache 2.0**. Desarrollado como contribución al fortalecimiento de las capacidades analíticas del sector educativo público colombiano.
