# RUTA DE METAS

**Encuentra el camino de las prioridades.** Microjuego para Optimización I, Gimnasio 5: Programación de Metas.

Puzzle SVG con 15 escenarios y cinco rondas aleatorias con progresión fija: factibilidad → P₁ → P₂ → conflicto → integración con P₃. Selección directa en el plano y botones equivalentes, teclado, movimiento reducido y audio opcional (apagado inicialmente). Sin temporizador de expulsión.

## Fundamento

Revisión de `GYM 5_251128_083844.pdf`, páginas 22–26: región estructural, rectas obtenidas haciendo cero las desviaciones, atención secuencial y conservación de prioridades superiores. Los escenarios son originales y de escala compacta, inspirados en el procedimiento, no transcripciones de los ejercicios. Las cotas derivadas de omitir una desviación deben tratarse como límites duros; aquí se distinguen explícitamente restricciones y metas blandas.

- `scenarios.js`: restricciones, metas, prioridades, coordenadas y feedback.
- `math.js`: factibilidad, d⁻/d⁺, vectores, clasificación lexicográfica, clipping de la región e intersecciones de rectas. `evaluate(s)` materializa desviaciones, evaluación y todas las soluciones sin respuestas codificadas a mano.
- `app.js`: partida, gráfico, selección y resultados. Cada reto admite todos los mínimos empatados. Se busca el mejor candidato mostrado, no se afirma resolver globalmente todo el plano continuo.

## Ejecución y QA

Servir la carpeta con cualquier servidor estático. No hay compilación ni dependencias de producción. Las fuentes web son opcionales y tienen fallback local.

```sh
npm ci
npm test
npx playwright install chromium
npm run qa
```

El QA de navegador usa servidor local propio, cinco partidas con 14 s de lectura por ronda, tamaños 375×812, 390×844, 820×1180, 1180×820 y 1440×1000. Incluye selección touch, teclado HTML y SVG, fallo deliberado, precisión, replay, overflow y errores JS. Capturas locales en `test-results/`. La duración automatizada no sustituye una medición con alumnos.

Despliegue: GitHub Actions publica únicamente los cinco archivos de producción en Pages con cada push a `main`.
