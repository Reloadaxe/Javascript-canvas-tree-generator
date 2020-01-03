var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
var context = canvas.getContext("2d");
canvas.style.backgroundColor = "whitesmoke";
context.lineWidth = 2;
var id = 0;
var treeLastModified = {};

window.addEventListener("click", (e) => {
    treeLastModified[id] = Date.now();
    let firstBranch = new Branch(id, {x: e.clientX, y: e.clientY}, 30, 0, "#8b5a2b", {fill: "green", stroke: "darkgreen"}, true);
    setTimeout(update, 100, id);
    id++;
    firstBranch.draw();
});

update = (id) => {
    if (Date.now() - treeLastModified[id] > 800) {
        delete treeLastModified[id];
    } else {
        setTimeout(update, 100, id);
    }
}

let grass = new Grass();
grass.draw();