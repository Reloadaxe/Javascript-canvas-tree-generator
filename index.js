var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
var context = canvas.getContext("2d");
canvas.style.backgroundColor = "whitesmoke";
var id = 0;
var arbreLastModified = {};
var arbreFillPos = {};

window.addEventListener("click", (e) => {
    arbreLastModified[id] = Date.now();
    arbreFillPos[id] = [];
    let firstBranch = new Branch(id, {x: e.clientX, y: e.clientY}, 30, 0, "#8b5a2b", {fill: "green", stroke: "darkgreen"});
    setTimeout(update, 100, id);
    id++;
    firstBranch.draw();
});

update = (id) => {
    if (Date.now() - arbreLastModified[id] > 800) {
        delete arbreLastModified[id];
        arbreFillPos[id].forEach(pos => {
            fillTree(pos[0], pos[1], pos[2], pos[3]);
        });
        delete arbreFillPos[id];
    } else {
        setTimeout(update, 100, id);
    }
}