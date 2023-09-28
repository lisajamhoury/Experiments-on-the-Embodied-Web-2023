// kinect azure (via kinectron) depth to p5

function setup() {
  createCanvas(640, 576);
  pixelDensity(1);

  let kinectron = new Kinectron("10.23.10.44");
  kinectron.setKinectType("azure");
  kinectron.makeConnection();
  kinectron.startDepth(gotDepth);
}

function gotDepth(img){
  loadImage(img.src, drawDepth);  
}

function drawDepth(depthImg) { 
  // image(depthImg,0,0,width,height );
  depthImg.loadPixels();
  loadPixels();
  const depthValues = depthImg.pixels; // 0-255
  for ( let y = 0; y < height; y++ ) { 
    for (let x = 0; x < width; x++) { 

      const i = (y*width+x)*4;
      const depthVal = depthValues[i];
      const mappedVal = map(depthVal, 0,255,0,1);
      const newClr = HSVtoRGB(mappedVal, 1.0,1.0);

      pixels[i+0] = newClr.r;
      pixels[i+1] = newClr.g;
      pixels[i+2] = newClr.b;
      pixels[i+3] = 255;      

    }
  }
  updatePixels();
}


/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
  };
}
