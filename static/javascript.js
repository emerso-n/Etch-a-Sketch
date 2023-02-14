console.log("js loaded")

const pageCon = document.getElementById("page_con")
const gridHolder = document.getElementById("grid-holder_div")

const colorWheels = document.querySelectorAll("input[type='color']");
colorWheels[0].addEventListener("change", changeSolidColor);
colorWheels[1].addEventListener("change", changeFillColor)
let currentSolidColor = colorWheels[0].value;
let currentFillColor = colorWheels[1].value;

let currentColor = currentSolidColor

const DrawingMode = { hover: "Hover", click: "Click" };
let currentDrawingMode = DrawingMode.hover;
const settingsDiv = document.querySelector("#settings_div");
const settingsBtns = document.querySelectorAll("#settings-toggle_btns button");
let activeColorSettingsBtn = document.querySelector(".active-button");
const ColorSetting = { SolidColor: "SolidColor", CanvasFill: "CanvasFill", Rainbow: "Rainbow", Shading: "Shading", Lighten: "Lighten", Erase: "Erase" }
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
        currentColor = colorWheels[0].value;
        return
    }
    if (currentColorSetting == ColorSetting.CanvasFill) {
        currentColor = colorWheels[1].value;
        return
    }
    if (currentColorSetting == ColorSetting.Rainbow) {
        //hsl(0, 100%, 50%); increment the hue value
        currentColor = "hsl(0, 100%, 63%)";
        return
    }
    if (currentColorSetting == ColorSetting.Shading) {
        return
    }
    if (currentColorSetting == ColorSetting.Lighten) {
        return
    }
    if (currentColorSetting == ColorSetting.Erase) {
        currentColor = "white";
        return
    }
}

//grid creation functionality
let gridArray = []
let mouseClicked = false
function createGrid(width) {
    for (let i = 0; i < (width ** 2); i++) {
        let div = createDiv("div", "grid", gridHolder);
        div.set
        div.addEventListener('mousemove', (e) => {
            if (colorPickerActive == true || currentColorSetting == ColorSetting.CanvasFill) return

            if (currentDrawingMode == DrawingMode.hover || mouseClicked == true) {
                draw(e);
            };
        });
        div.addEventListener('click', (e) => {
            if (colorPickerActive == true) {
                pickColor(e.target.style.backgroundColor);
                return;
            }
            if (currentColorSetting == ColorSetting.CanvasFill) {
                gridArray.forEach(grid => grid.style.backgroundColor = currentColor)
                return
            }
        });
        div.addEventListener('mousedown', (e) => {
            e.preventDefault()
            if (currentDrawingMode == DrawingMode.click) {
                draw(e);
                mouseClicked = true;
            };
        })
        
        gridArray.push(div);
    }
    gridHolder.style.gridTemplate = `repeat(${width}, 1fr) / repeat(${width}, 1fr)`;
}
pageCon.addEventListener('mouseup', () => mouseClicked = false)
createGrid(16)

function destroyGrid() {
    gridArray.forEach(grid => grid.remove())
}

//color mode functionality
let n = 0
function draw(e) {
    if (currentColorSetting != ColorSetting.Shading && currentColorSetting != ColorSetting.Lighten) {
        e.target.style.background = currentColor;
    }

    if (currentColorSetting == ColorSetting.Rainbow) {
        currentColor = `hsl(${n <= 360 ? n += 2 : n = 0}, 100%, 63%)`;
        return
    }

    if (currentColorSetting == ColorSetting.Shading) {
        if (e.target.style.backgroundColor) {
            rgb = rgbSplit(e.target.style.backgroundColor)
        }
        else {
            rgb = [255, 255, 255]
        }

        let shade_factor = .1
        let newRgb = [(+rgb[0] * (1 - shade_factor)), (+rgb[1] * (1 - shade_factor)), (+rgb[2] * (1 - shade_factor))]

        e.target.style.backgroundColor = `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`
        return
    }

    if (currentColorSetting == ColorSetting.Lighten) {
        if (e.target.style.backgroundColor) {
            rgb = rgbSplit(e.target.style.backgroundColor)
        }
        else {
            // rgb = [255, 255, 255] //if its already white it cant be tinted
            return
        }

        let tint_factor = .1
        let newRgb = [
            (+rgb[0] + (255 - +rgb[0]) * tint_factor),
            (+rgb[1] + (255 - +rgb[1]) * tint_factor),
            (+rgb[2] + (255 - +rgb[2]) * tint_factor)]

        e.target.style.backgroundColor = `rgb(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]})`
    }
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

//fill color functionality
function changeFillColor(e) {
    currentFillColor = e.target.value;
    if (currentColorSetting == ColorSetting.CanvasFill) {
        currentColor = currentFillColor
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
        rgb = rgbSplit(color);
        color = rgbToHex(+rgb[0], +rgb[1], +rgb[2]);
    }

    if (currentColorSetting == ColorSetting.SolidColor) currentColor = color;

    if (currentColorSetting == ColorSetting.CanvasFill) {
        colorWheels[1].value = color;
        currentColor = color;
    }
    else {
        currentSolidColor = color;
        colorWheels[0].value = color;
        settingsBtns[0].click()
    }
    cancelColorPicker()
}
function rgbSplit(rgbString) {
    rgbString = rgbString.replace(/[^,\d]+/g, "");
    return rgbString.split(",");
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