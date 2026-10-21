# QA — Ruta de Metas

## Fuente y matemática — PASS

Revisadas páginas 22–26 del Gimnasio 5. 15 escenarios originales, 3 por etapa. Cuatro pruebas automatizadas verifican todos los candidatos, no negatividad, límites, desviaciones mediante cálculo independiente, comparación lexicográfica, admisión de todos los empates, vértices de región e intersecciones de rectas meta.

Ejemplo solicitado: A=(0,2,0), B=(1,1,0), C=(2,0,0); gana A. La prueba adicional (0,10000,0) frente a (1,0,0) garantiza no compensación. Escenario s14 acepta A y B. Las respuestas se derivan al evaluar los datos.

## Navegador — PASS

Chromium / Playwright, cinco partidas completas (25 rondas), cada una con 14 segundos de lectura por ronda:

| Pantalla | Duración | Resultado |
|---|---:|---|
| 375 × 812 | 70,2 s | PASS |
| 390 × 844 | 70,4 s | PASS |
| 820 × 1180 | 70,2 s | PASS |
| 1180 × 820 | 70,4 s | PASS |
| 1440 × 1000 | 70,4 s | PASS |

Verificados: cero errores JS, cero overflow horizontal en cada ronda y resultado, botones de candidatos de al menos 44 px de alto, touch emulado, Enter en botones HTML, Espacio en puntos SVG, feedback, todos los ganadores indicados, precisión 100% y 80% con error deliberado, resultado y nueva partida. Una partida con preferencia de movimiento reducido. Revisión visual de captura móvil del resultado.

## Alcance de la medición

Duración automatizada con pausas de lectura controladas, no estudio con estudiantes. Móvil e iPad corresponden a sus viewports emulados en Chromium; no se hicieron pruebas en hardware iOS/Safari ni con lector de pantalla real. Accesibilidad implementada: nombres de controles, alternativas textuales, teclado, foco visible, región viva, movimiento reducido y audio voluntario. La interfaz puede desplazarse verticalmente y no requiere zoom.

## Reproducción

`npm test` y `npm run qa` (requiere Chromium de Playwright). Capturas generadas localmente en `test-results/`, excluidas de Git.
