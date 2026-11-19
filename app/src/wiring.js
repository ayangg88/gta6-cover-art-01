import { drawCover,formats } from './layout.js';
import { stageScene,readImage } from './scenes.js';
import { connectPanZoom } from './pan-zoom.js';
const $=id=>document.getElementById(id);
const state={size:'wide',title:'NEON COAST',tagline:'A SUNSET HEIST STORY',titleSize:110,spacing:0,color:'#fff4db',grade:'sunset',vignette:true,texture:true,panels:[]};
let selected=0;
const canvas=$('preview');
function redraw(){drawCover(canvas,state);$('dimensions').textContent=formats[state.size].join(' × ')+' PX';document.querySelectorAll('[data-size]').forEach(b=>b.classList.toggle('active',b.dataset.size===state.size));}
function select(i){selected=i;document.querySelectorAll('[data-panel]').forEach(b=>b.classList.toggle('active',+b.dataset.panel===i));$('zoom').value=state.panels[i].zoom;$('zoomValue').value=state.panels[i].zoom.toFixed(2)+'×';}
function assign(image,all){(all?state.panels:[state.panels[selected]]).forEach(p=>Object.assign(p,{image,zoom:1,panX:0,panY:0}));select(selected);redraw();}
async function load(file,all=$('fill').checked){if(!file)return;const url=URL.createObjectURL(file);try{assign(await readImage(url),all);$('status').textContent='Photo loaded. Drag your frame to find the perfect crop.';}catch(e){$('status').textContent=e.message;}finally{URL.revokeObjectURL(url);}}
try{
 const samples=await stageScene(state);redraw();
 document.querySelectorAll('[data-panel]').forEach(b=>b.onclick=()=>select(+b.dataset.panel));
 for(const name of ['boulevard','pier'])$(name).onclick=()=>assign(samples[name],$('fill').checked);
 $('upload').onchange=e=>load(e.target.files[0]);
 $('zoom').oninput=e=>{state.panels[selected].zoom=+e.target.value;$('zoomValue').value=(+e.target.value).toFixed(2)+'×';redraw();};
 for(const id of ['title','tagline','titleSize','spacing','color','vignette','texture'])$(id).oninput=e=>{state[id]=e.target.type==='checkbox'?e.target.checked:e.target.type==='range'?+e.target.value:e.target.value;redraw();};
 document.querySelectorAll('[data-grade]').forEach(b=>b.onclick=()=>{state.grade=b.dataset.grade;document.querySelectorAll('[data-grade]').forEach(x=>x.classList.toggle('active',x===b));redraw();});
 document.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>{state.size=b.dataset.size;redraw();});
 connectPanZoom(canvas,state,select,redraw,load);
 $('export').onclick=()=>{const output=document.createElement('canvas');drawCover(output,state);output.toBlob(blob=>{if(!blob){$('status').textContent='Export failed. Please try again.';return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='sunset-cover-'+state.size+'.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);$('status').textContent='Exported '+formats[state.size].join(' × ')+' PNG. Make it your cover.';},'image/png');};
 document.documentElement.dataset.ready='true';
}catch(e){$('status').textContent=e.message;console.error(e);}
