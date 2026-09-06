let debugList = [];
let points = [];
let präzision = 0.25;

async function setPoints() {
    table.innerHTML = '';
    await genearte3(100,100);
    for(let x = 0; x <= 100; x++) {
        for(let y = 0; y <= 100; y++) {
            if(x % 5 === 0 && y % 5 === 0) {
                getPixel(x,y).dataset.noise = decRandom(0,1).toFixed(2);
                getPixel(x,y).style.backgroundColor = `hsl(0deg,0%,${Number(getPixel(x,y).dataset.noise)*100}%)`;
                points.push([x,y]);
            }
        }
    }
    noising();
}

function nearestPoint(x, y, gridSpacing) {
    const xLow = Math.floor(x / gridSpacing) * gridSpacing;
    const xHigh = xLow + gridSpacing;

    const yLow = Math.floor(y / gridSpacing) * gridSpacing;
    const yHigh = yLow + gridSpacing;

    const getClosestAxisVal = (val, low, high) => {
        const distToLow = Math.abs(val - low);
        const distToHigh = Math.abs(val - high);

        if (Math.abs(distToLow - distToHigh) < 0.000001) {
            return Math.random() < 0.5 ? low : high;
        }
        
        return distToLow < distToHigh ? low : high;
    };

    const targetX = Math.round(getClosestAxisVal(x, xLow, xHigh));
    const targetY = Math.round(getClosestAxisVal(y, yLow, yHigh));

    const deltaX = x - targetX;
    const deltaY = y - targetY;
    const distance = Math.round(Math.hypot(deltaX, deltaY));

    return {
        x: targetX,
        y: targetY,
        distance: distance
    };
}


function noising() {
    for(let x = 0; x <= 100; x++) {
        for(let y = 0; y <= 100; y++) {
            const parrentCoo = nearestPoint(x,y,5);
            const parentPixel = getPixel(parrentCoo.x,parrentCoo.y);
            const noiseValue = (Number(parentPixel.dataset.noise)) + decRandom(-0.25,0.25);
            getPixel(x,y).dataset.noise = noiseValue;
            debugList.push(noiseValue);
            getPixel(x,y).style.backgroundColor = `hsl(0deg,0%,${Number(getPixel(x,y).dataset.noise)*100}%)`;
        }
    }
    toggleRaster();
}

function decRandom(min,max) {
    return Math.random() * (max - min) + min;
}

setPoints();
toggleMenu();

// Nearest Point Logic and Komplex Math: Gemini
// Anything else: TaMinoDev
