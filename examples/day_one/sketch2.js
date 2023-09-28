// cat image frame difference 

let myVid; 
let pastPixels = [];
let threshold = 100;
let thresholdSlider;
let secretImg;
let secretPixs = [];

function preload() {
    secretImg = loadImage('https://raw.githubusercontent.com/lisajamhoury/The-Body-Everywhere-and-Here-2021/main/examples/assets/cat.jpg');
}

function setup() {
  createCanvas(640, 480);
  myVid = createCapture(VIDEO);
  myVid.size(width, height);
  myVid.hide();

  thresholdSlider = createSlider(0,255,100);

  secretImg.loadPixels();
  secretPixs = secretImg.pixels;

}

function draw() {

  myVid.loadPixels();
  
  let currentPix = myVid.pixels;
  threshold = thresholdSlider.value();

  for (let y = 0; y < height; y++) { 
    for (let x = 0; x < width; x++) { 

      const i = (y*width +x) * 4; 

      const diffR = abs(currentPix[i+0] - pastPixels[i+0]);
      const diffG = abs(currentPix[i+1] - pastPixels[i+1]);
      const diffB = abs(currentPix[i+2] - pastPixels[i+2]);

      const avgDiff = (diffR+diffG+diffB)/3; // 0-255

      pastPixels[i+0] = currentPix[i+0];
      pastPixels[i+1] = currentPix[i+1];
      pastPixels[i+2] = currentPix[i+2];

      if (avgDiff > threshold) { 
        // currentPix[i+0] = 0;
        // currentPix[i+1] = 0;
        // currentPix[i+2] = 255;

        currentPix[i+0] = secretPixs[i+0];
        currentPix[i+1] = secretPixs[i+1];
        currentPix[i+2] = secretPixs[i+2];


      } else { 
        currentPix[i+0] = 0;
        currentPix[i+1] = 0;
        currentPix[i+2] = 0;
        currentPix[i+3] = 100;
      }

    }
  }
  
  myVid.updatePixels();
  

  push();
  translate(width,0);
  scale(-1,1);
  image(myVid, 0,0,width,height);
  pop();
}
