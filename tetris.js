const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20, 20);

var my_gradient = context.createLinearGradient(0, 0, 0, 150);
my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(1, "white");













function sudar(arena, igrac) {
    const [m, o] = [igrac.matrica, igrac.pos];                                              //proverava oblik figure i poziciju u areni
    for(let y=0 ; y< m.length ; ++y){                                                       //za broj redova u areni
        for(let x=0 ; x< m[y].length; ++x){                                                 //za broj kolona u areni
            if(m[y][x] !== 0 && (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {        //ako je vrednost u matrici razlicita od nule i ako su u areni na tim isitim
                return true;                                                                //mestima vrednosti razlicite od nule onda imamo sudar
            }
        }
    }
    return false;
}

function pravljenjeMatrice(w, h){
    const matrica = [];
    while(h--) {
        matrica.push(new Array(w).fill(0));
    }
    return matrica;
}

function pravljenjeFigure(tip){
    if(tip === 'T'){
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    }
    else if(tip === 'O'){
        return [
            [2, 2],
            [2, 2],
        ];
    }
    else if(tip === 'L'){
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    }
    else if(tip === 'J'){
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    }
    else if(tip === 'I'){
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    }
    else if(tip === 'S'){
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    }
    else if(tip === 'Z'){
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }

}

function rusenje() {
    let brojacRedova = 1;
    labela: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue labela;
            }
        }

        const red = arena.splice(y, 1)[0].fill(0);
        arena.unshift(red);
        ++y;

        igrac.poeni += brojacRedova * 10;
        brojacRedova *= 2;
    }
}


function crtanje() {
    context.fillStyle = my_gradient;
    context.fillRect(0, 0, canvas.width, canvas.height );

    crtanjeMatrice(arena, {x:0, y:0});
    crtanjeMatrice(igrac.matrica, igrac.pos);
}

function crtanjeMatrice(matrica, pomeraj) {
matrica.forEach((red , y) => {                  //svaki red u matrici za onoliko redova koliko ih ima
    red.forEach((vrednost , x) => {             //za svai red proverava svaku vrednost po x za onoliko kolona koliko ima
        if(vrednost !== 0 ){
            context.fillStyle = boje[vrednost];
            context.fillRect(x + pomeraj.x, y + pomeraj.y, 1, 1);
        }
    });
});
}

function upisivanje(arena, igrac) {                                             //upisivanje u arenu poziciju figure i njen oblik
    igrac.matrica.forEach((red, y) => {
        red.forEach((vrednost, x) => {
            if (vrednost !== 0) {
                arena[y + igrac.pos.y][x + igrac.pos.x] = vrednost;
            }
        });
    });
}

function pomeranje(pravac) {
    igrac.pos.x += pravac;
    if (sudar(arena, igrac)){
        igrac.pos.x -= pravac;
    }
}

function padanje(){
    igrac.pos.y++;
    if(sudar(arena, igrac)){
        igrac.pos.y--;
        upisivanje(arena, igrac);
        rusenje();
        crtanjeFigura();
        updatePoena();
        
    }
    brojacPadanja = 0;
}

function rotiranje(matrica, pravac){
    for(let y = 0 ; y< matrica.length ; ++y){
        for(let x = 0 ; x < y ; ++x){
            [ matrica[x][y],matrica[y][x], ] = [matrica[y][x],matrica[x][y],];                                          
        }
    }
    if(pravac > 0){
        matrica.forEach(red  => red.reverse());
    }
    else{
        matrica.reverse();
    }
}

function rotiranjeFigure(pravac){
    const pos = igrac.pos.x;
    let pomeraj = 1;
    rotiranje(igrac.matrica, pravac);
    while(sudar(arena, igrac)){                                      //u slucaju da se rotira uz ivicu da figura ne bi zavrsila van granica arene
        igrac.pos.x += pomeraj;
        pomeraj = -(pomeraj + (pomeraj > 0 ? 1:-1));
        if (pomeraj> igrac.matrica[0].length){
            rotiranje(igrac.matrica, -pravac);
            igrac.pos.x = pos;
            return;
        }
    }
}

function crtanjeFigura(){
    const figure = 'TJLOSZI';
    igrac.matrica = pravljenjeFigure(figure[figure.length * Math.random() | 0]);
    igrac.pos.y = 0;
    igrac.pos.x = (arena[0].length / 2 | 0) -
                   (igrac.matrica[0].length / 2 | 0);
    if (sudar(arena, igrac)) {
        arena.forEach(red => red.fill(0));
        igrac.poeni = 0;
        updatePoena();

    }
}


let brojacPadanja = 0;
let intervalPadanja = 1000;

let prosliInterval = 0;

function update(interval = 0) {
    const razlika = interval - prosliInterval;
    prosliInterval = interval;
    brojacPadanja += razlika;
    if (brojacPadanja > intervalPadanja){
        padanje();
    }

    crtanje();
    requestAnimationFrame(update);
}

function updatePoena(){
    document.getElementById('poeni').innerHTML = "Score:" +igrac.poeni;
}

const arena = pravljenjeMatrice(12 ,20);

const igrac = {
    pos: {x:0, y:0},
    matrica: null,
    poeni: 0,
};

const boje = [null,'red', 'green', 'seashell', 'maroon', 'indigo', 'royalblue', 'yellow'];

document.addEventListener('keydown', event => {
    if (event.keyCode === 37){
        pomeranje(-1);
    }
    else if (event.keyCode === 39){
        pomeranje(1);
    }
    else if (event.keyCode === 40) {
        padanje();
    }
    else if (event.keyCode === 81){
        rotiranjeFigure(-1);
    }
    else if (event.keyCode === 87){
        rotiranjeFigure(1);
    }
    
});

crtanjeFigura();
update();
updatePoena();
