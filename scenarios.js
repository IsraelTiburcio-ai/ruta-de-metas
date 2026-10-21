const r=(a,b,t,op='le')=>({a,b,t,op});
const g=(a,b,t,priority,op='ge',weight=1)=>({...r(a,b,t,op),priority,weight});
const make=(id,stage,title,max,constraints,goals,coords,feedback)=>({id,stage,title,max,constraints,goals,points:coords.map(([x,y],i)=>({id:'ABCD'[i],x,y})),feedback});
export const scenarios=[
make('s1',1,'El acceso al mapa',8,[r(1,1,6)],[],[[2,2],[5,3],[7,1]],'La región factible reúne los puntos que cumplen TODAS las restricciones estructurales. Las metas no cambian esta región.'),
make('s2',1,'Dos límites, una entrada',8,[r(2,1,8),r(0,1,5)],[],[[3,4],[2,3],[1,6]],'Un punto sobre una frontera también es factible. Comprueba cada límite antes de comparar metas.'),
make('s3',1,'Capacidad del taller',8,[r(1,2,10),r(1,0,4)],[],[[5,1],[2,5],[4,3]],'La frontera pertenece a la región: ≤ admite la igualdad. x e y siempre son no negativas.'),
make('s4',2,'Primero lo primero',8,[r(1,1,6)],[g(1,0,5,1)],[[5,1],[4,2],[3,3]],'P₁ se atiende primero: minimizar el faltante de x es la primera decisión.'),
make('s5',2,'La meta aún está lejos',8,[r(1,1,6),r(1,0,4)],[g(1,0,6,1)],[[2,3],[4,2],[3,2]],'Aunque la meta sea inalcanzable, elige el menor incumplimiento disponible.'),
make('s6',2,'Evita el exceso',8,[r(1,1,7)],[g(0,1,2,1,'le')],[[1,4],[3,3],[4,2]],'En una meta de máximo se penaliza d⁺: el exceso, no el faltante.'),
make('s7',3,'Dos metas compatibles',8,[r(1,1,7)],[g(1,0,3,1),g(0,1,3,2)],[[3,1],[3,3],[4,2]],'Cuando dos puntos empatan en P₁, puedes compararlos mediante P₂.'),
make('s8',3,'Conserva el avance',8,[r(1,1,8)],[g(1,0,4,1),g(0,1,4,2)],[[4,2],[3,5],[4,4]],'Mejora P₂ entre los puntos con el mejor P₁. Ambas metas son compatibles aquí.'),
make('s9',3,'Ni más ni menos',8,[r(1,1,8)],[g(1,0,3,1,'eq'),g(0,1,3,2,'eq')],[[3,1],[3,3],[4,3]],'Una meta exacta penaliza d⁻ + d⁺. Acercarse por cualquiera de los dos lados reduce la desviación.'),
make('s10',4,'La tentación del atajo',8,[r(1,1,6)],[g(1,0,5,1),g(0,1,3,2)],[[5,1],[4,2],[3,3]],'C mejora P₂, pero empeora P₁. A gana con (0, 2, 0): ninguna mejora inferior compensa sacrificar P₁.'),
make('s11',4,'Cambia la jerarquía',8,[r(1,1,6)],[g(0,1,3,1),g(1,0,5,2)],[[5,1],[4,2],[3,3]],'Las mismas metas con otro orden pueden conducir a otra solución. Ahora y tiene prioridad.'),
make('s12',4,'Capacidad y aspiraciones',8,[r(2,1,10)],[g(1,0,4,1),g(0,1,5,2)],[[3,4],[4,2],[5,5]],'Un punto fuera de la región se descarta, aunque parezca satisfacer todas las metas.'),
make('s13',5,'El tercer desempate',8,[r(1,1,8)],[g(1,0,3,1),g(0,1,2,2),g(1,1,7,3,'eq')],[[3,2],[3,4],[4,4]],'P₃ solo decide después de empatar en P₁ y P₂. El total exacto de 7 rompe el empate.'),
make('s14',5,'Dos destinos eficientes',8,[r(1,1,7)],[g(1,0,3,1),g(0,1,2,2),g(1,1,6,3,'eq')],[[3,3],[4,2],[3,2]],'A y B tienen el mismo vector (0, 0, 0). Ambos destinos se aceptan: la solución puede ser múltiple.'),
make('s15',5,'La última frontera',8,[r(1,1,7)],[g(1,0,4,1),g(0,1,2,2),g(1,1,7,3,'eq')],[[4,2],[4,3],[3,4],[6,3]],'Primero descarta lo no factible; después conserva P₁, conserva P₂ y minimiza P₃.')
];
export const stages=['Entra en la región','Protege P₁','Desempata con P₂','Resuelve el conflicto','Traza tu mejor ruta'];
export function newRoute(random=Math.random){return [1,2,3,4,5].map(stage=>{const pool=scenarios.filter(s=>s.stage===stage);return pool[Math.floor(random()*pool.length)];});}
