// I think I invented a new Noise Type and I call it STRIPE Noise
let points = [];
let index = 0;
let colorList = [
    "#d92626",
    "#d93026",
    "#d93a26",
    "#d94326",
    "#d94d26",
    "#d95726",
    "#d96126",
    "#d96a26",
    "#d97426",
    "#d97e26",
    "#d98826",
    "#d99126",
    "#d99b26",
    "#d9a526",
    "#d9af26",
    "#d9b826",
    "#d9c226",
    "#d9cc26",
    "#d9d626",
    "#d2d926",
    "#c9d926",
    "#bfd926",
    "#b5d926",
    "#abd926",
    "#a2d926",
    "#98d926",
    "#8ed926",
    "#84d926",
    "#7bd926",
    "#71d926",
    "#67d926",
    "#5dd926",
    "#54d926",
    "#4ad926",
    "#40d926",
    "#36d926",
    "#2dd926",
    "#26d929",
    "#26d933",
    "#26d93d",
    "#26d947",
    "#26d950",
    "#26d95a",
    "#26d964",
    "#26d96e",
    "#26d977",
    "#26d981",
    "#26d98b",
    "#26d995",
    "#26d99e",
    "#26d9a8",
    "#26d9b2",
    "#26d9bc",
    "#26d9c5",
    "#26d9cf",
    "#26d9d9",
    "#26cfd9",
    "#26c5d9",
    "#26bcd9",
    "#26b2d9",
    "#26a8d9",
    "#269ed9",
    "#2695d9",
    "#268bd9",
    "#2681d9",
    "#2677d9",
    "#266ed9",
    "#2664d9",
    "#265ad9",
    "#2650d9",
    "#2647d9",
    "#263dd9",
    "#2633d9",
    "#2629d9",
    "#2d26d9",
    "#3626d9",
    "#4026d9",
    "#4a26d9",
    "#5426d9",
    "#5d26d9",
    "#6726d9",
    "#7126d9",
    "#7b26d9",
    "#8426d9",
    "#8e26d9",
    "#9826d9",
    "#a226d9",
    "#ab26d9",
    "#b526d9",
    "#bf26d9",
    "#c926d9",
    "#d226d9",
    "#d926d6",
    "#d926cc",
    "#d926c2",
    "#d926b8",
    "#d926af",
    "#d926a5",
    "#d9269b",
    "#d92691",
    "#d92688",
    "#d9267e",
    "#d92674",
    "#d9266a",
    "#d92661",
    "#d92657",
    "#d9264d",
    "#d92643",
    "#d9263a",
    "#d92630"
];
toggleMenu();

function setPoints() {
    for(let r = 1; r <= table.rows.length; r += 3) {
        for(let c = 1; c <= table.rows[0].cells.length; c += 3) {
            getCell(r,c).dataset.noise = Math.random().toFixed(2);
            points.push(getCell(r,c).id);
            getCell(r,c).style.backgroundColor = 'red';
        }
    }
    console.log(points);
}

function noising() {
    for(let r = 1; r <= table.rows.length; r++) {
        for(let c = 1; c <= table.rows[0].cells.length; c++) {
            let e = getCell(r,c);
            if(!e.dataset.noise) {
                let lastP = Number(document.getElementById(points[index]).dataset.noise);
                let nextP;
                
                if(document.getElementById(points[index+1])) {
                    nextP = Number(document.getElementById(points[index+1]).dataset.noise);
                } else {
                    nextP = lastP + 0.10;
                }

                e.dataset.noise = (nextP/2 + lastP/2).toFixed(2);
            } else {
                if(points[index+1]) {
                    index++;
                } else {
                    return console.log('ende')
                }
            }
        }
    }
}

function getCell(x,y) {
    return document.getElementById(`${x}x${y}`);
}

function decRandom(min,max) {
    return Math.random() * (max - min) + min;
}

function final() {
    $$('td').forEach(e => {
        if(e.dataset.noise) {
            let val = e.dataset.noise;
            e.style.backgroundColor = `rgba(0,0,0,${val})`;
        }
    })
}
