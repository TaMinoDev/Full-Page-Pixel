/*
COLOR ... MEANS ...

lime = ground
grey = wall
red = player
*/
// Lag-Lamp
const lamp = document.createElement('div');
lamp.style = `z-index: 999999999; transition: 0.5s; position: fixed; top: 10px; left: 10px; border: 1px solid black; border-radius: 50%; width: 15px; height: 15px; background-color: red`;
lamp.id = 'lagLamp';
document.body.appendChild(lamp);

const switchingLamp = () => {
    const lagLamp = document.getElementById('lagLamp');
    let color = lagLamp.style.backgroundColor;
    color === 'red' ? color = 'blue' : color = 'red';
    lagLamp.style.backgroundColor = color;

    let position = lagLamp.style.left;
    position === '10px' ? position = '20px' : position = '10px';
    lagLamp.style.left = position;

    setTimeout(switchingLamp,1000);
}

switchingLamp();

eval(generate.toString().replace(`confirm('Fortfahren?')`,'1 === 1'));
eval(fillArea.toString().replaceAll('console.log',''))

let pos = [5,5];
let background = 'white';
let jumpMultiplier = 6;
let fallMultiplier = 1;
let jumping = false;
let arena = [
    [
        "27x26",
        "27x36"
    ],
    [
        "28x40",
        "28x30"
    ],
    [
        "32x28",
        "32x35"
    ],
    [
        "23x25",
        "23x17"
    ],
    [
        "25x25",
        "25x28"
    ],
    [
        "29x46",
        "29x49"
    ],
    [
        "28x47",
        "28x50"
    ],
    [
        "27x48",
        "27x51"
    ],
    [
        "26x49",
        "26x52"
    ],
    [
        "25x50",
        "25x53"
    ],
    [
        "24x51",
        "24x54"
    ],
    [
        "25x54",
        "29x50"
    ],
    [
        "24x57",
        "24x61"
    ],
    [
        "27x55",
        "27x66"
    ],
    [
        "23x16",
        "19x16"
    ],
    [
        "19x15",
        "19x12"
    ],
    [
        "19x11",
        "13x11"
    ],
    [
        "38x13",
        "38x30"
    ],
    [
        "37x26",
        "37x16"
    ],
    [
        "36x19",
        "36x25"
    ],
    [
        "33x21",
        "33x26"
    ],
    [
        "31x35",
        "31x54"
    ],
    [
        "1x1",
        "1x77"
    ],
    [
        "1x77",
        "39x77"
    ],
    [
        "39x77",
        "39x1"
    ],
    [
        "37x1",
        "1x1"
    ],
];
let buffer = 100;
let play = true;
let climbing = false;

$$('td').forEach(e => {
    e.style.backgroundColor = background;
});

toggleMenu();
generate();
colors[7] = 'brown';

window.addEventListener('keydown',checkKey);

function checkKey(event) {
    const key = event.key;
    event.preventDefault();
    if(key === 'ArrowLeft') {
        move('l');
        console.log('MOVE LEFT');
    } else if(key === 'ArrowRight') {
        move('r');
        console.log('MOVE RIGHT');
    } else if(key === 'ArrowUp') {
        move('u');
        console.log('MOVE UP');
    } else if(key === ' ') {
        play === true ? play = false : play = true;
        draw();
        console.log('STOP... WAIT A MINUETE');
    }
}

function getPixel(x,y) {
    return document.getElementById(`${x}x${y}`);
}


function updateHeight() {
    if(getPixel(pos[0]+1,pos[1]) && getPixel(pos[0]+1,pos[1]).style.backgroundColor === background && climbing === false) {
        pos[0] += 1*fallMultiplier;
    } else if(getPixel(pos[0]+1,pos[1]) && getPixel(pos[0]+1,pos[1]).style.backgroundColor !== background) {
        jumping = false;
    }
}

function move(d = 'u') {
    updateHeight();
    if(d === 'u') {
        if(climbing === false) {
            jump();
        } else {
            climb();
        }
    } else if(d === 'l' && getPixel(pos[0],pos[1]-1).style.backgroundColor === background) {
        pos[1]--;
    } else if(d === 'r' && getPixel(pos[0],pos[1]+1).style.backgroundColor === background) {
        pos[1]++;
    } else if(d === 'd' && climbing === true && getPixel(pos[0],pos[1]+1).style.backgroundColor === background) {
        pos[0]++;
    }
}

function jump() {
    if(jumping === false) {
        let blocked = 0;
        for(let jh = 1; jh <= jumpMultiplier; jh++) {
            if(blocked === 0 && getPixel(pos[0]-jh,pos[1]).style.backgroundColor !== background) {
                blocked = jh;
                console.log('blocked');
            }
            console.log(getPixel(pos[0]-jh,pos[1]).style.backgroundColor !== background);
        }
        blocked === 0 ? pos[0] -= jumpMultiplier : pos[0] -= blocked;
        jumping = true;
        console.log('JUMP');
    }
}

function climb() {
    if(getPixel(pos[0]-1,pos[1]).style.backgroundColor === background) {
        climbing = true;
        pos[0]--;
        console.log('CLIMBING UP');
        if(getPixel(pos[0]-1,pos[1]-1).style.backgroundColor === 'brown') {
            pos[1]--;
            pos[0]--;
        } else if(getPixel(pos[0]-1,pos[1]+1).style.backgroundColor === 'brown') {
            pos[1]++;
            pos[0]--;
        }
    }
}

function draw() {
    updateHeight();
    let userColor = choosen;
    choosen = 8;

    document.querySelectorAll('td').forEach(e => {
        e.style.backgroundColor = background;
    });
    
    arena.forEach(l => {
        let a = l[0];
        let b = l[1];
        fillArea(a,b);
    });

    // Ledders:
    choosen = 7;
    fillArea('13x11','18x11');
    
    choosen = userColor;

    if(pos[0] > 38 || pos[0] < 2 || pos[1] > 76 || pos[1] < 2) {
        pos[0] = 5;
        pos[1] = 5;
    };

    if(pos[0] === 38 && pos[1] === 1) {
        arena === arenen[1];
    }

    if([getPixel(pos[0],pos[1]+1).style.backgroundColor,getPixel(pos[0],pos[1]-1).style.backgroundColor].includes('brown')) {
        climbing = true;
    } else {
        climbing = false;
    }

    setColor([pos[0],pos[1]],'red');

    if(play === true) {
        setTimeout(draw,buffer);
    }
}

draw();
// WIP
// Props TaMinoDev
