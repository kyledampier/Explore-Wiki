let isDragging = false;

// when window is resized return the defualt sizes
function resetColumnSizes() {
    let mainArea = document.getElementById("main-area");
    mainArea.style.gridTemplateColumns = "1fr 2px 4fr";
}

function setCursor(cursor) {
    let mainArea = document.getElementById("main-area");
    mainArea.style.cursor = cursor;
}

function startDrag() {
    isDragging = true;
    console.log("dragging")
    setCursor("ew-resize");
}

function endDrag() {
    isDragging = false;
    setCursor("auto");
}

function onDrag(event) {
    if(isDragging) {
        let mainArea = document.getElementById("main-area");
        let sideInfo = document.getElementById("side-info");
        let graphArea = document.getElementById("graph-area");

        let sideInfoWidth = event.clientX;
        let dragBarWidth = 2;
        let graphAreaWidth = mainArea.clientWidth - sideInfoWidth - dragBarWidth;

        let cols = [sideInfoWidth, dragBarWidth, graphAreaWidth];
        let newWidths = cols.map(c => c.toString() + "px").join(" ");
        mainArea.style.gridTemplateColumns = newWidths;

        event.preventDefault();
    }
}