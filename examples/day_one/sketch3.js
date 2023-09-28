// background subtraction 

let myVid; 
let threshold = 100;
let thresholdSlider;
let bgPixs = [];

function setup() {
  createCanvas(640, 480);
  myVid = createCapture(VIDEO);
  myVid.size(width, height);
//   myVid.hide();

  thresholdSlider = createSlider(0,255,100);
  const bgButton = createButton('Set BG');
  bgButton.mousePressed(setBG);

}

function setBG() { 
    myVid.loadPixels();
    bgPixs = myVid.pixels;
}

function draw() {

    push();
      translate(width,0);
      scale(-1,1);
      image(myVid, 0,0,width,height);
      pop();

  loadPixels();
  
  let currentPix = pixels;
  threshold = thresholdSlider.value();

  if (bgPixs.length < 5) { 
    console.log('returning')
    return; 
  }

  for (let y = 0; y < height; y++) { 
    for (let x = 0; x < width; x++) { 

      const i = (y*width +x) * 4; 

      const diffR = abs(currentPix[i+0] - bgPixs[i+0]);
      const diffG = abs(currentPix[i+1] - bgPixs[i+1]);
      const diffB = abs(currentPix[i+2] - bgPixs[i+2]);

      const avgDiff = (diffR+diffG+diffB)/3; // 0-255

    //   pastPixels[i+0] = currentPix[i+0];
    //   pastPixels[i+1] = currentPix[i+1];
    //   pastPixels[i+2] = currentPix[i+2];

      if (avgDiff > threshold) { 
        // currentPix[i+0] = 0;
        // currentPix[i+1] = 0;
        // currentPix[i+2] = 255;

        // currentPix[i+0] = secretPixs[i+0];
        // currentPix[i+1] = secretPixs[i+1];
        // currentPix[i+2] = secretPixs[i+2];


      } else { 
        currentPix[i+0] = 0;
        currentPix[i+1] = 0;
        currentPix[i+2] = 0;
        currentPix[i+3] = 0;
      }

    }
  }
  
  updatePixels();
  

// 
}
