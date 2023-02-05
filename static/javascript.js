console.log("js loaded")

// const pageCon = document.getElementById("page_con")
const gridHolder = document.getElementById("grid-holder_div")

const colorWheel = document.querySelector("input[type='color']");
colorWheel.addEventListener("change", changeSolidColor)
let currentSolidColor = colorWheel.value

let currentColor = currentSolidColor

const DrawingMode = { hover: "Hover", click: "Click" };
let currentDrawingMode = DrawingMode.hover;

const settingsBtns = document.querySelectorAll("#settings_div button");
let activeColorSettingsBtn = document.querySelector(".active-button");
const ColorSetting = {SolidColor: "SolidColor", Rainbow: "Rainbow", Erase: "Erase"}
let currentColorSetting = ColorSetting.SolidColor;
settingsBtns.forEach(button => button.addEventListener('click', settingsBtnClick))

function settingsBtnClick(e) {
    activeColorSettingsBtn.classList.toggle("active-button")
    e.target.classList.toggle("active-button")
    activeColorSettingsBtn = e.target
    currentColorSetting = ColorSetting[e.target.id]

    ChangeColorMode()
}

function ChangeColorMode(){
    if(currentColorSetting == ColorSetting.SolidColor){
        currentColor = currentSolidColor;
        return
    }
    if(currentColorSetting == ColorSetting.Rainbow){
        //hsl(0, 100%, 50%); increment the hue value
        currentColor = "hsl(0, 100%, 63%)";
    }
    if(currentColorSetting == ColorSetting.Erase){
        currentColor = "white";
        return
    }
}

let n = 0
function createGrid(width) {
    for (let i = 0; i < (width ** 2); i++) {
        let div = createDiv("div", "grid", gridHolder);
        div.addEventListener('mouseenter', (e) => {
            if (currentDrawingMode == DrawingMode.hover) {
                e.target.style.background = currentColor;
                if(currentColorSetting == ColorSetting.Rainbow){
                    currentColor = `hsl(${n<=360?n+=2:n=0}, 100%, 63%)`;
                }
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
        console.info("DrawingMode should be hover")
        gridHoverProperty.style.setProperty("transform", "scale(1.2)")
    }
    else {
        currentDrawingMode = DrawingMode.click;
        console.info("DrawingMode should be click")
        gridHoverProperty.style.setProperty("transform", "scale(1)")
    }
}

function changeSolidColor(e) {
    currentSolidColor = e.target.value;
    if(currentColorSetting == ColorSetting.SolidColor){
        currentColor = currentSolidColor
    }
}

function createDiv(elementTag, className, parent) {
    let div = document.createElement(elementTag);
    div.classList.add(className)
    parent.appendChild(div);
    return div
}