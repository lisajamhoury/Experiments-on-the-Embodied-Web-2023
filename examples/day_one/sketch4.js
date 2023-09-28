// peer to peer with mouse 

let p5lm;
let otherMouse = {x:0, y:0};

function setup() {
    createCanvas(500,500);
    p5lm = new p5LiveMedia(this, "DATA", null, "tacoEating");
    p5lm.on('data', gotData)
}

function gotData(data, id) { 
    otherMouse = JSON.parse(data);
}

function draw() {
    background(255);
    fill(0);
    ellipse(mouseX,mouseY, 50,50);
    fill(0,255,0);
    ellipse(otherMouse.x, otherMouse.y,30,30)   
}

function mouseMoved() {
    let dataToSend = {x:mouseX, y:mouseY};
    p5lm.send(JSON.stringify(dataToSend));
}