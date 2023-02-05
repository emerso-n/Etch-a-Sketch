console.log("js loaded")

//get stylesheet property
// const stylesheet = document.styleSheets[1]
// console.log(stylesheet)
// let gridHoverProperty = stylesheet.cssRules[-1].selectorText
// console.log(gridHoverProperty)
const array = [1, 2, 3, 4, 5]
console.log(array.slice(-1))

// const pageCon = document.getElementById("page_con")
const gridHolder = document.getElementById("grid-holder_div")

let currentColor = "green"

const DrawingMode = { hover: "Hover", click: "Click" };
currentDrawingMode = DrawingMode.hover;

function createGrid(width) {
    for (let i = 0; i < (width ** 2); i++) {
        let div = createDiv("div", "grid", gridHolder);
        div.addEventListener('mouseenter', (e) => {
            if (currentDrawingMode == DrawingMode.hover) {
                e.target.style.background = currentColor;
            };
        });
        div.addEventListener('click', (e) => {
            if (currentDrawingMode == DrawingMode.click) {
                e.target.style.background = currentColor;
            };
        });
    }
    gridHolder.style.gridTemplate = `repeat(${width}, 1fr) / repeat(${width}, 1fr)`;
}
createGrid(18)

function changeDrawingMode(checked) {
    if (checked == false) {
        currentDrawingMode = DrawingMode.hover
        gridHoverProperty.selectorText = ".grid:hover"
    }
    else {
        currentDrawingMode = DrawingMode.click;
        gridHoverProperty.selectorText = ".gridd:hover"
    }
}

function createDiv(elementTag, className, parent) {
    let div = document.createElement(elementTag);
    div.classList.add(className)
    parent.appendChild(div);
    return div
}