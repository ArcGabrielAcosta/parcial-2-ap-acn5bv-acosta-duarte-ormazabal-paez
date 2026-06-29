# Parcial 2 — Administración de Proyectos

**Proyecto:** Tradie — Plataforma de Oficios  
**Versión** v2.3.0
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
## 3. Metodología ágil

### Metodología elegida: Scrum + Kanban (híbrido)

El equipo adopta un enfoque **híbrido Scrum/Kanban** adaptado al contexto académico y a la arquitectura de tres capas (Backend, Frontend Web, Mobile).

| Característica | Implementación en Tradie |
|----------------|--------------------------|
| **Marco base** | **Scrum** para planificación por iteraciones (sprints de 3–4 semanas) y ceremonias; **Kanban** para visualizar flujo continuo en ClickUp |
| **Roles** | Product Owner rotativo (Duarte Agustina) · Scrum Master (Acosta Gabriel) · Development Team (los 4 integrantes por capa) |
| **Artefactos** | Product Backlog (29 HU) · Sprint Backlog · Incremento (código + PR) · Documento de alcance v2.0 |
| **Ceremonias** | Sprint Planning (inicio de sprint) · Daily async en ClickUp/Discord · Sprint Review · Retrospectiva |
| **Tablero** | ClickUp con columnas: `planning` → `in progress` → `in review` → `complete` |
| **Definición de Ready (DoR)** | HU redactada, criterios de aceptación, dependencias identificadas, estimación acordada |
| **Definición of Done (DoD)** | Criterios cumplidos, PR aprobado, CI verde, tarea en `complete` en ClickUp |
| **Criterios INVEST** | Historias independientes, negociables, valiosas, estimables, pequeñas y testeables |
| **Priorización** | Valor de negocio + dependencias técnicas (**Backend primero** cuando hay API) |
| **WIP limit** | Máximo 2 tareas `in progress` por integrante para evitar bloqueos entre capas |

### Justificación de la combinación

- **Scrum** aporta estructura temporal alineada a las entregas del seminario y al TF.
- **Kanban** permite visualizar el flujo entre tres espacios (Frontend, Backend, Mobile) sin forzar sincronización rígida cuando una capa depende del contrato API de otra.
- La regla **“Backend primero”** reduce retrabajo en Frontend y Mobile al tener endpoints definidos antes de integrar.

---
## 4. Análisis de requerimientos

### Requerimientos funcionales (resumen)

| ID | Historia de usuario | Prioridad | Capas |
|----|---------------------|-----------|-------|
| HU01 | Registro de usuario | Alta | Web, Mobile, Backend |
| HU02 | Inicio de sesión | Alta | Web, Mobile, Backend |
| HU03 | Recuperación de contraseña | Alta | Web, Mobile, Backend |
| HU04–10 | Búsqueda, solicitudes, chat, calificación | Media | Mobile, Backend |
| HU11–15 | Perfiles y validación profesional | Alta | Web, Mobile, Backend |
| HU16–19 | Admin: categorías, usuarios, reportes, devoluciones | Media | Web, Backend |
| HU20–22 | Geo, disponibilidad, push | Media | Mobile, Backend |
| HU23–28 | Dashboard, portfolio, landing, historial, suscripción | Media–Baja | Según capa |
| HU29 | Generar voucher del pedido | Media | Mobile |

### Requerimientos no funcionales

| ID | Requerimiento | Criterio |
|----|---------------|----------|
| RNF01 | Seguridad | OAuth 2.0 / JWT, contraseñas hasheadas, rate limiting |
| RNF02 | Rendimiento | Respuesta API < 500 ms en operaciones CRUD estándar |
| RNF03 | Disponibilidad | Despliegue en VPS Linux con backups de PostgreSQL |
| RNF04 | Usabilidad | Diseño responsive (Web) y flujos mobile probados en Android |
| RNF05 | Mantenibilidad | TypeScript en las tres capas, documentación Swagger en Backend |

### Ejemplo de historia de usuario refinada — HU01

> **Como** usuario nuevo, **quiero** registrarme indicando si soy cliente o profesional, **para** acceder a las funcionalidades de mi perfil.

**Criterios de aceptación (Backend):**

- [ ] `POST /auth/register` documentado
- [ ] Roles `client` \| `professional`; email único → `409`
- [ ] Contraseña hasheada; respuesta `201` sin exponer secretos
- [ ] Rate limit y validación de campos → `400`

**Dependencias:** ninguna (base del Sprint 1). **Consumido por:** HU01 Frontend, HU01 Mobile.

### Tipificación del backlog

| Tipo | Cantidad aprox. | Ejemplos |
|------|-----------------|----------|
| Lógica de negocio | 18 | HU01–10, HU19, HU25, HU28–29 |
| ABM | 7 | HU11–12, HU16–17, HU21, HU24, HU27 |
| Reporte | 4 | HU13, HU18, HU23, HU26 |

---

---

## 5. Tablero de seguimiento

### Herramienta elegida: ClickUp

| Requisito | Cumplimiento |
|-----------|--------------|
| **a. Incluir a cada miembro** | Acosta Gabriel, Duarte Agustina, Ormazábal Marcelo y Páez Melina son miembros del workspace |
| **b. Invitar al docente** | Invitado `sergiod.medina@davinci.edu.ar` con permisos de visualización |
| **c. Tablero público** | Workspace configurado con enlace público de lectura |

### Enlaces al tablero

| Space | Descripción | Enlace |
|-------|-------------|--------|
| **Frontend** | HU Web (onboarding, admin, landing) | https://app.clickup.com/90171230962/v/s/90175653216 |
| **Backend** | APIs y lógica de negocio | https://app.clickup.com/90171230962/v/s/90175653229 |
| **Mobile** | Operación en campo | https://app.clickup.com/90171230962/v/s/90175653223 |

### Flujo de estados

```
to do → planning → in progress → in review → complete
                               → at risk → in review → complete
                               → in review → update required → in review → complete
                               → on hold → in review → complete
```

---

### Agregado 1 — Milestones (mínimo 3, ≥ 4 HU cada uno)

| Milestone | Objetivo | Fecha objetivo | Historias de usuario |
|-----------|----------|----------------|----------------------|
| **M1 — Fundación e identidad** | Usuarios pueden registrarse, iniciar sesión y administrar categorías | Semana 4 | HU01, HU02, HU03, HU16 |
| **M2 — Perfiles y validación** | Profesionales completan perfil; admin valida credenciales | Semana 8 | HU11, HU12, HU15, HU24 |
| **M3 — Descubrimiento y geo** | Clientes buscan y visualizan profesionales en mapa | Semana 12 | HU04, HU05, HU06, HU20, HU21 |

Cada milestone está modelado como **carpeta Sprint** en ClickUp (Sprint 1, 2 y 3 en los tres spaces).

---
### Agregado 2 — Estimaciones

Estimación en **puntos de historia** (escala Fibonacci: 1, 2, 3, 5, 8). Esfuerzo por capa para el **Milestone 1**:

| HU | Título | Backend | Frontend | Mobile | Total | Notas |
|----|--------|---------|----------|--------|-------|-------|
| HU01 | Registro de usuario | 5 | 3 | 3 | **11** | Piloto refinado; base del proyecto |
| HU02 | Inicio de sesión | 3 | 2 | 2 | **7** | Depende de HU01 Backend |
| HU03 | Recuperación de contraseña | 5 | 2 | 2 | **9** | Email/token; puede usar servicio mock en dev |
| HU16 | Gestionar categorías de oficios | 3 | 3 | — | **6** | Solo Web + Backend |
| | **Total Sprint 1** | **16** | **10** | **7** | **33** | Capacidad equipo ~30–35 pts/sprint |

**Velocidad estimada del equipo:** 30 puntos por sprint (4 devs × ~8 pts efectivos, descontando documentación y clases).
---
### Agregado 3 — Asignación de miembros (Sprint 1 / M1)

| Integrante | Rol principal | Tareas asignadas en ClickUp |
|------------|---------------|----------------------------|
| **Acosta Gabriel** | Backend / arquitectura | HU01, HU02, HU03, HU16 (capa Backend) |
| **Ormazábal Marcelo** | Frontend Web | HU01, HU02, HU03, HU16 (capa Frontend) |
| **Duarte Agustina** | QA / gestión / documentación | DoR/DoD, pruebas HU01–03, actualización README y ClickUp |
| **Páez Melina** | UX/UI | Mockups registro/login, validación de flujos mobile HU01–03 |
