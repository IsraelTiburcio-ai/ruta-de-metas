import {chromium} from '@playwright/test';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {scenarios,newRoute} from '../scenarios.js';
import {evaluate} from '../math.js';
const server=createServer(async(req,res)=>{try{const path=req.url==='/'?'index.html':req.url.slice(1);res.setHeader('Content-Type',path.endsWith('.js')?'text/javascript':path.endsWith('.css')?'text/css':'text/html');res.end(await readFile(new URL('../'+path,import.meta.url)));}catch{res.statusCode=404;res.end();}}).listen(4179);
const browser=await chromium.launch();
try{for(const [i,[width,height]] of [[375,812],[390,844],[820,1180],[1180,820],[1440,1000]].entries()){
 const context=await browser.newContext({viewport:{width,height},hasTouch:true,reducedMotion:i===0?'reduce':'no-preference'});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const seed=i/5;await page.addInitScript(seed=>{Math.random=()=>seed;},seed);await page.goto('http://localhost:4179');await page.getByRole('button',{name:'Comenzar la ruta'}).click();const route=newRoute(()=>seed);const began=Date.now();
 for(let round=0;round<5;round++){
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);const s=route[round],ev=evaluate(s);const id=i===1&&round===1?ev.points.find(p=>!ev.solutions.includes(p.id)).id:ev.solutions[0];
 const choice=page.locator(`#candidates [data-point="${id}"]`);assert.ok((await choice.boundingBox()).height>=44);
 if(i===0){await choice.focus();await page.keyboard.press('Enter');}else if(i===2){const point=page.locator(`#chart [data-point="${id}"]`);await point.focus();await page.keyboard.press(' ');}else {await choice.tap();}
 await page.locator('#feedback').waitFor({state:'visible'});assert.equal(await page.locator('#feedback tbody tr.best').count(),ev.solutions.length);await page.waitForTimeout(14000);await page.locator('#next').click();
 }
 await page.locator('#result').waitFor({state:'visible'});assert.ok((await page.locator('#result').innerText()).includes(i===1?'80%':'100%'));assert.equal(errors.length,0);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);console.log(`PASS ${width}×${height}: 5 rondas, ${((Date.now()-began)/1000).toFixed(1)} s, teclado/touch, resultado y sin overflow; errores JS: 0`);await page.screenshot({path:`test-results/viewport-${width}.png`,fullPage:true});await page.getByRole('button',{name:'Volver a jugar'}).click();assert.ok(await page.locator('#game').isVisible());await context.close();
} }finally{await browser.close();server.close();}
