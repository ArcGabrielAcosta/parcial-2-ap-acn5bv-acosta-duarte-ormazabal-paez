# Parcial 2 — Administración de Proyectos

**Proyecto:** Tradie — Plataforma de Oficios  
**Versión** v1.1.0
**Materia:** Administración de Proyectos — Prof. Sergio Medina  
**Carrera:** Analista de Sistemas — Escuela Da Vinci  
**Equipo:** Acosta Gabriel · Duarte Agustina · Ormazábal Marcelo · Páez Melina  

| Recurso | Enlace |
|---------|--------|
| Repositorio GitHub | `https://github.com/[usuario]/parcial-2-ap-acn5bv-acosta-duarte-ormazabal-paez` |
| Tablero ClickUp (público) | [Workspace Tradie](https://app.clickup.com/90171230962/v/s/90175653229) |

> **Formato del repositorio:** `parcial-2-ap-acn5bv-acosta-duarte-ormazabal-paez` (apellidos en orden alfabético, minúsculas, guión medio).  
> **Colaboradores invitados:** `sergiomedinaio` (GitHub) · `sergiod.medina@davinci.edu.ar` (ClickUp).

---

## 1. Objetivo general del proyecto (SMART / OKR)

### Visión

**Tradie** es una plataforma digital que conecta clientes con profesionales del hogar (plomeros, electricistas, gasistas, etc.) de forma segura, trazable y profesional, reemplazando la búsqueda informal por un ecosistema verificable con reputación, presupuestos y comprobante digital del servicio.

### Objetivo SMART

| Criterio | Definición |
|----------|------------|
| **S** — Específico | Desarrollar una plataforma web, mobile y backend que permita registrar usuarios, buscar profesionales, gestionar solicitudes/presupuestos y ofrecer trazabilidad del servicio con voucher digital. |
| **M** — Medible | Entregar al menos **29 historias de usuario (HU01–HU29)** priorizadas en **7 sprints** (Backend/Mobile) y **5 sprints** (Frontend), con criterios de aceptación verificables y tablero actualizado en ClickUp. |
| **A** — Alcanzable | Equipo de 4 integrantes con competencias en backend, frontend, UX y gestión; stack definido (Nest.js, Next.js, React Native, PostgreSQL). |
| **R** — Relevante | Responde a la problemática real de desconfianza y falta de trazabilidad al contratar oficios en Argentina; alineado al Trabajo Final de Carrera. |
| **T** — Temporal | MVP funcional del **Sprint 1** (fundación e identidad: HU01–03, HU16) durante el cuatrimestre del Seminario de Sistemas; hitos intermedios cada 3–4 semanas. |

### OKR del proyecto

| Objetivo | Resultados clave (KR) |
|----------|----------------------|
| **O1 — Lanzar el núcleo de identidad y acceso** | KR1: API de registro y login operativa · KR2: Registro funcional en Web y Mobile · KR3: 100 % de criterios de aceptación de HU01–03 cumplidos |
| **O2 — Profesionalizar la contratación de oficios** | KR1: Perfiles profesionales validados (HU11–15) · KR2: Flujo solicitud → presupuesto → voucher (HU07–08, HU29) · KR3: ≥ 80 % de usuarios piloto califican la experiencia como “confiable” |
| **O3 — Gestionar el proyecto con transparencia** | KR1: Tablero ClickUp actualizado semanalmente · KR2: 0 secretos en repositorio · KR3: Documentación de alcance y README al día en cada entrega |

---

## 2. Análisis de interesados

### Matriz de interesados

| Interesado | Tipo | Interés | Influencia | Expectativa principal |
|------------|------|---------|------------|----------------------|
| Clientes (usuarios finales) | Externo / usuario | Alta | Media | Encontrar profesionales confiables, comparar, contratar con seguridad |
| Profesionales del hogar | Externo / usuario | Alta | Media | Obtener trabajos constantes, mostrar credenciales, gestionar presupuestos |
| Equipo de desarrollo Tradie | Interno | Alta | Alta | Entregar el TF con calidad, en tiempo y con buena nota académica |
| Escuela Da Vinci / docentes | Externo / patrocinador | Media | Alta | Cumplir consignas, metodología ágil, documentación y prototipos |
| Competidores (Manno, Timbrit, etc.) | Externo | Media | Baja | Mantener cuota de mercado; Tradie compite con validación y trazabilidad |
| Pasarelas de pago (Mercado Pago / Stripe) | Externo / proveedor | Media | Baja | Integración correcta de suscripciones (HU27–28) |

### Perfiles de stakeholders (mínimo 3)

#### Stakeholder 1 — Cliente (usuario de la app)

| Atributo | Descripción |
|----------|-------------|
| **Nombre representativo** | Laura, 34 años, propietaria de departamento en CABA |
| **Rol** | Usuario cliente |
| **Necesidades** | Resolver urgencias del hogar (pérdida de agua, electricidad) sin depender solo del boca a boca |
| **Dolores** | Desconfianza, precios poco claros, imposibilidad de comparar profesionales |
| **Criterio de éxito** | Contratar en menos de 24 h con perfil verificado, presupuesto claro y voucher del servicio |
| **Historias relacionadas** | HU04–08, HU10, HU26, HU29 |

#### Stakeholder 2 — Profesional del hogar

| Atributo | Descripción |
|----------|-------------|
| **Nombre representativo** | Carlos, 42 años, plomero matriculado |
| **Rol** | Usuario profesional |
| **Necesidades** | Flujo constante de trabajos, visibilidad de su reputación, herramientas de gestión |
| **Dolores** | Depender del boca a boca, competencia desleal sin matrícula, falta de organización |
| **Criterio de éxito** | Recibir solicitudes cercanas, enviar presupuestos desde la app y ver métricas en dashboard |
| **Historias relacionadas** | HU11–14, HU20–23, HU27 |

#### Stakeholder 3 — Administrador de la plataforma

| Atributo | Descripción |
|----------|-------------|
| **Nombre representativo** | Equipo Tradie / moderador |
| **Rol** | Admin interno |
| **Necesidades** | Validar documentación de profesionales, moderar reportes, gestionar categorías y usuarios |
| **Dolores** | Riesgo de perfiles falsos, reportes de mala conducta, categorías desactualizadas |
| **Criterio de éxito** | Panel admin con validación de matrículas, ABM de usuarios y gestión de reportes |
| **Historias relacionadas** | HU15–19, HU16–17–18 |

---

