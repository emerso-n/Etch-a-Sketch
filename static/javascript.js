console.log("js loaded")

const pageCon = document.getElementById("page_con")
const gridHolder = document.getElementById("grid-holder_div")

const colorWheel = document.querySelector("input[type='color']");
colorWheel.addEventListener("change", changeSolidColor)
let currentSolidColor = colorWheel.value

let currentColor = currentSolidColor

const DrawingMode = { hover: "Hover", click: "Click" };
let currentDrawingMode = DrawingMode.hover;
const settingsDiv = document.querySelector("#settings_div");
const settingsBtns = document.querySelectorAll("#settings-toggle_btns button");
let activeColorSettingsBtn = document.querySelector(".active-button");
const ColorSetting = { SolidColor: "SolidColor", Rainbow: "Rainbow", Shading: "Shading", Lighten: "Lighten", Erase: "Erase" }
let currentColorSetting = ColorSetting.SolidColor;
settingsBtns.forEach(button => button.addEventListener('click', settingsBtnClick))


//color mode change functionality
function settingsBtnClick(e) {
    activeColorSettingsBtn.classList.toggle("active-button")
    e.target.classList.toggle("active-button")
    activeColorSettingsBtn = e.target
    currentColorSetting = ColorSetting[e.target.id]

    ChangeColorMode()
}

function ChangeColorMode() {
    if (currentColorSetting == ColorSetting.SolidColor) {
        currentColor = currentSolidColor;
        return
    }
    if (currentColorSetting == ColorSetting.Rainbow) {
        //hsl(0, 100%, 50%); increment the hue value
        currentColor = "hsl(0, 100%, 63%)";
        return
    }
    if (currentColorSetting == ColorSetting.Shading) {
        currentColor = "white";
        return
    }
    if (currentColorSetting == ColorSetting.Lighten) {
        currentColor = "white";
        return
    }
    if (currentColorSetting == ColorSetting.Erase) {
        currentColor = "white";
        return
    }
}

//grid creation functionality
let n = 0
let gridArray = []
function createGrid(width) {
    for (let i = 0; i < (width ** 2); i++) {
        let div = createDiv("div", "grid", gridHolder);
        div.addEventListener('mouseenter', (e) => {
            if (colorPickerActive == true) return
            if (currentDrawingMode == DrawingMode.hover) {
                e.target.style.background = currentColor;
                if (currentColorSetting == ColorSetting.Rainbow) {
                    currentColor = `hsl(${n <= 360 ? n += 2 : n = 0}, 100%, 63%)`;
                }
            };
        });
        div.addEventListener('click', (e) => {
            if (colorPickerActive == true) {
                pickColor(e.target.style.backgroundColor);
                return;
            }
            if (currentDrawingMode == DrawingMode.click) {
                e.target.style.background = currentColor;
            };
        });
        gridArray.push(div);
    }
    gridHolder.style.gridTemplate = `repeat(${width}, 1fr) / repeat(${width}, 1fr)`;
}
createGrid(16)

function destroyGrid() {
    gridArray.forEach(grid => grid.remove())
}

//drawing mode change functionality
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

//solid color functionality
function changeSolidColor(e) {
    currentSolidColor = e.target.value;
    if (currentColorSetting == ColorSetting.SolidColor) {
        currentColor = currentSolidColor
    }
}

//grid slider functionality
const gridSlider = document.getElementById("grid-slider");
const gridSliderText = document.getElementById("grid-slider-text");
gridSliderText.innerText = `${gridSlider.value} x ${gridSlider.value}`;

gridSlider.oninput = function () {
    gridSliderText.innerText = `${this.value} x ${this.value}`;
}
gridSlider.onchange = function () {
    destroyGrid();
    createGrid(this.value);
}

//color picker functionality
const colorPickerBtn = document.getElementById("ColorPicker");
let colorPickerActive = false;
colorPickerBtn.onclick = function () {
    colorPickerActive = true;
    settingsDiv.style.pointerEvents = "none";
    pageCon.style.cursor = "crosshair"
    colorPickerBtn.classList.add("active-button")
}
function pickColor(color) {
    if (!color) color = "#FFFFFF";

    else {
        color = color.replace(/[^,\d]+/g, "")
        let rgb = color.split(",");
        color = rgbToHex(+rgb[0], +rgb[1], +rgb[2]);
    }

    currentSolidColor = color;
    colorWheel.value = color;
    if (currentColorSetting == ColorSetting.SolidColor) currentColor = color;
    cancelColorPicker()
    settingsBtns[0].click()
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
document.addEventListener('contextmenu', function (e) { //this is right click btw
    if (colorPickerActive == true) {
        e.preventDefault();
        cancelColorPicker()
    }
})
function cancelColorPicker() {
    colorPickerActive = false;
    settingsDiv.style.pointerEvents = "all";
    pageCon.style.cursor = "default"
    colorPickerBtn.classList.remove("active-button")
}

//clear button functionality
const clearBtn = document.getElementById("ClearBtn");
clearBtn.onclick = function () {
    gridArray.forEach(grid => grid.style.background = "white");
}

function createDiv(elementTag, className, parent) {
    let div = document.createElement(elementTag);
    div.classList.add(className)
    parent.appendChild(div);
    return div
}