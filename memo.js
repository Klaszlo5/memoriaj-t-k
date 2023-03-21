/*Szorgalmi feladatokkal*/

const kepeklista = [
  "kepek/kep1.jpg",
  "kepek/kep2.jpg",
  "kepek/kep3.jpg",
  "kepek/kep4.jpg",
  "kepek/kep5.jpg",
  "kepek/kep6.jpg",
  "kepek/kep1.jpg",
  "kepek/kep2.jpg",
  "kepek/kep3.jpg",
  "kepek/kep4.jpg",
  "kepek/kep5.jpg",
  "kepek/kep6.jpg",
];

let jelenlegikep = [];
let visszamegy = false;
let megtalalt = [];
let stp = 0;


function kartyaMegkeveres(){
  for (let KEPID = kepeklista.length - 1; KEPID > 0; KEPID--) {
      const RANDOMID = Math.floor(Math.random() * (KEPID+1));
      [kepeklista[KEPID], kepeklista[RANDOMID]] = [kepeklista[RANDOMID], kepeklista[KEPID]]
  }
}


let ido = new Date().getTime();
$(function () {
  kartyaMegkeveres();
  const elemekfelso = $("#felso");
  let tartalom = osszeAllit();
  elemekfelso.append(tartalom);
  const flskpk = $("#felso img");
  //esemenykezelo..
  flskpk.on("click", kepreKattintas);

  const ujrainditas = $("#ujraindit");
  ujrainditas.on('click', jatekUjrainditasa);
});

function jatekUjrainditasa(){
  location.reload();
}

function kepreKattintas() {
  if(visszamegy){
    return;
  }

  const aktKep = event.target;
  //irasd ki a konzolra az aktuális elem src attributumát!
  console.log(aktKep.id);
  console.log($(aktKep).attr("id"));
  /**hányadik kép  */
  if(megtalalt.indexOf(aktKep.id) > -1){
    return
  }

  aktKep.src = kepeklista[aktKep.id];
  jelenlegikep.push($(aktKep).attr("id"));
  if (jelenlegikep.length == 2) {
    stp++;
    const KEP1 = $('#' + jelenlegikep[0]);
    const KEP2 = $("#" + jelenlegikep[1]);

    if(KEP1.attr("src") == KEP2.attr("src")){
      console.log(">>>", KEP1)
      KEP1.css("visibility","hidden");
      KEP2.css("visibility","hidden");
      megtalalt.push(jelenlegikep[0]);
      megtalalt.push(jelenlegikep[1]);
      jelenlegikep = [];

      if(megtalalt.length == kepeklista.length) {
        let tolt = (new Date().getTime() - ido) / 1000;
        alert(`${stp} db lépésből, ${tolt} mp alatt oldottad meg a játékot.`);
      }
      return;
    }
    
    visszafordit();
  }
}

function visszafordit() {
  //visszaallit
  console.log(jelenlegikep);

  visszamegy = true;
  setTimeout(function () {
    const sorfelso = $("#felso img");
    let aktkep = sorfelso.eq(jelenlegikep[0]);
    console.log(aktkep);
    $(aktkep).attr("src", "kepek/hatter.jpg");
    aktkep = sorfelso.eq(jelenlegikep[1]);
    $(aktkep).attr("src", "kepek/hatter.jpg");
    jelenlegikep.pop();
    jelenlegikep.pop();
    visszamegy = false;
  }, 1000);
}

function osszeAllit() {
  //**szöveg-kép */
  let txt = "";
  for (let index = 0; index < kepeklista.length; index++) {
    txt += `<div><img src="kepek/hatter.jpg" alt="" id="${index}"></div>`;
  }
  console.log(txt);
  return txt;
}
