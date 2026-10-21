export const EPS = 1e-8;
export const value = (r,p) => r.a*p.x+r.b*p.y;
export function feasible(s,p) { return p.x>=-EPS && p.y>=-EPS && s.constraints.every(r=>r.op==='ge'?value(r,p)>=r.t-EPS:value(r,p)<=r.t+EPS); }
export function deviation(g,p) { const v=value(g,p); const minus=Math.max(0,g.t-v),plus=Math.max(0,v-g.t); return {minus,plus,penalty:(g.op==='ge'?minus:g.op==='le'?plus:minus+plus)*(g.weight??1)}; }
export function vector(s,p) { const d=[0,0,0]; s.goals.forEach(g=>d[g.priority-1]+=deviation(g,p).penalty); return d; }
export function compare(a,b) { for(let i=0;i<3;i++) if(Math.abs(a[i]-b[i])>EPS) return a[i]<b[i]?-1:1; return 0; }
export function evaluate(s) { const points=s.points.map(p=>({...p,feasible:feasible(s,p),vector:vector(s,p),deviations:s.goals.map(g=>deviation(g,p))})); const ranked=points.filter(p=>p.feasible).sort((a,b)=>compare(a.vector,b.vector)); return {points,solutions:ranked.filter(p=>compare(p.vector,ranked[0].vector)===0).map(p=>p.id)}; }
export function polygon(s) { let poly=[{x:0,y:0},{x:s.max,y:0},{x:s.max,y:s.max},{x:0,y:s.max}]; for(const r of s.constraints){ const f=p=>(r.op==='ge'?-1:1)*(value(r,p)-r.t); const out=[]; for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=f(a),fb=f(b); if(fa<=EPS)out.push(a); if((fa<0&&fb>0)||(fa>0&&fb<0)){const t=fa/(fa-fb);out.push({x:a.x+t*(b.x-a.x),y:a.y+t*(b.y-a.y)});}} poly=out;} return poly; }
export function line(r,max) { const pts=[]; if(r.b)for(const x of [0,max]){const y=(r.t-r.a*x)/r.b;if(y>=0&&y<=max)pts.push({x,y});} if(r.a)for(const y of [0,max]){const x=(r.t-r.b*y)/r.a;if(x>=0&&x<=max)pts.push({x,y});} return pts.filter((p,i)=>!pts.slice(0,i).some(q=>Math.hypot(q.x-p.x,q.y-p.y)<EPS)).slice(0,2); }
