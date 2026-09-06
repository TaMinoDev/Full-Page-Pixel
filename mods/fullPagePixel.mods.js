// Mods file for fullPagePixel — can be included or omitted
// Provides image import and pixel-mapping functionality

(function(window){
    'use strict';
    document.getElementById('menu').innerHTML += `
    <br>
    <input type="file" id="imageInput" accept="image/*"><button onclick="loadImage()">Bild laden</button>
    `;

    function loadImage() {
        const input = document.getElementById('imageInput');
        if (!input.files || !input.files[0]) return alert('Bitte eine Bilddatei auswählen');
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = new Image();
            img.onload = () => importImageToGrid(img);
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }

    function importImageToGrid(img) {
        // Determine max grid size based on current multiplier and viewport
        const maxCols = Math.floor(window.innerWidth / multiplier) || 1;
        const maxRows = Math.floor(window.innerHeight / multiplier) || 1;

        // Preserve aspect ratio while fitting into maxCols x maxRows
        let cols = maxCols;
        let rows = Math.round(cols * (img.height / img.width));
        if (rows > maxRows) {
            rows = maxRows;
            cols = Math.round(rows * (img.width / img.height));
        }
        cols = Math.max(1, cols);
        rows = Math.max(1, rows);

        // draw image to offscreen canvas at size cols x rows (one canvas pixel = one cell)
        const canvas = document.getElementById('offscreen');
        canvas.width = cols;
        canvas.height = rows;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,cols,rows);
        ctx.drawImage(img, 0, 0, cols, rows);

        // read pixel data
        const imageData = ctx.getImageData(0,0,cols,rows).data;

        // generate grid matching cols x rows
        generateGrid(cols, rows);

        // apply pixels to table cells
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const i = (r * cols + c) * 4;
                const rCol = imageData[i];
                const gCol = imageData[i+1];
                const bCol = imageData[i+2];
                const aCol = imageData[i+3] / 255;
                const css = `rgba(${rCol},${gCol},${bCol},${aCol})`;
                const cell = document.getElementById(`${r+1}x${c+1}`);
                if (cell) {
                    cell.style.backgroundColor = css;
                }
            }
        }
    }

    function generateGrid(cols, rows) {
        table.innerHTML = '';
        for (let r = 1; r <= rows; r++) {
            const tr = document.createElement('tr');
            for (let c = 1; c <= cols; c++) {
                const td = document.createElement('td');
                td.style.width = multiplier + 'px';
                td.style.height = multiplier + 'px';
                td.id = `${r}x${c}`;
                td.style.border = raster ? '1px solid black' : 'none';
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        oneRow = cols;
        eventListener();
    }

    // expose functions globally so inline handlers work (or user can call them)
    window.loadImage = loadImage;
    window.importImageToGrid = importImageToGrid;
    window.generateGrid = generateGrid;

})(window);
// SRY but this isn't my work so props to Gemini
