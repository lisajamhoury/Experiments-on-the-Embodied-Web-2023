// peer to peer with posenet (nose)
let p5lm;
let myNose = 'undefined';
let otherNose = 'undefined';
let myVideo;
function setup() {
    createCanvas(640,480);
    myVideo = createCapture(VIDEO);
    myVideo.size(640,480);
    myVideo.hide();

    p5lm = new p5LiveMedia(this, "DATA", null, "tacoEating");
    p5lm.on('data', gotData)

    const poseNet = ml5.poseNet(myVideo, modelLoaded);
    poseNet.on('pose', (results) => {
        myNose = results[0].pose.nose;
        let dataToSend = {x:myNose.x, y:myNose.y};
        p5lm.send(JSON.stringify(dataToSend));
    })
}
function modelLoaded() {
    console.log('model loaded');
}
function gotData(data, id) { 
    otherNose = JSON.parse(data);
}
function draw() {
    background(255);

    if (myNose !== 'undefined') { 
        fill(0);
        ellipse(myNose.x,myNose.y, 50,50);    
    }
    
    if (otherNose !== 'undefined') { 
        fill(0,255,0);
        ellipse(otherNose.x, otherNose.y,30,30)   
    } 
}