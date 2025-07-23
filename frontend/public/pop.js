import  fs  from 'fs'
const path='.';
const toc=JSON.parse(fs.readFileSync(`${path}/cs_toc.json`,'utf8'));
const html=fs.readFileSync(`${path}/CS2023-converted.html`,'utf8');
const body=html.slice(html.indexOf('<body'), html.indexOf('</body>'));

function clean(str){
  return str
    .replace(/\s+(class|style|id|data-[^=\s]+|width|height|align)="[^"]*"/g,'')
    .replace(/\s+>/g,'>')
    .replace(/\s+/g,' ');
}

function escape(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
function findAnchorByTitle(title){
  const re=new RegExp(`<a href=\\"#bookmark(\\d+)\\" class=\\"a\\">`+escape(title));
  const m=body.match(re); return m?parseInt(m[1],10):null;
}

// collect items
const items=[];
toc.forEach((ch,ci)=>{
  items.push({ref:[ci], node:ch});
  (ch.units||[]).forEach((u,ui)=>items.push({ref:[ci,'units',ui], node:u}));
});

items.forEach(it=>{
  const m=it.node.html&&it.node.html.match(/bookmark(\d+)/);
  it.anchor=m?parseInt(m[1],10):findAnchorByTitle(it.node.title);
});

// filter items with anchors
const sorted=items.filter(it=>it.anchor!=null).sort((a,b)=>a.anchor-b.anchor);
for(let i=0;i<sorted.length;i++){
  const start=sorted[i].anchor;
  const end=i+1<sorted.length?sorted[i+1].anchor:null;
  const startTag=`<a name="bookmark${start}">`;
  const s=body.indexOf(startTag);
  if(s===-1) continue;
  let e=body.length;
  if(end!=null){
    const endTag=`<a name="bookmark${end}">`;
    const f=body.indexOf(endTag,s+1);
    if(f!==-1) e=f;
  }
  const raw=body.slice(s,e);
  sorted[i].snippet=clean(raw);
}

sorted.forEach(it=>{
  if(it.snippet){
    // assign snippet back into toc structure using ref path
    let target=toc[it.ref[0]];
    if(it.ref.length>1){
      target=target[it.ref[1]][it.ref[2]];
    }
    target.html=it.snippet;
  }
});

fs.writeFileSync(`${path}/cs_toc.json`, JSON.stringify(toc, null, 2));