// kinect azure (via kinectron) raw depth to p5 -- 3d point cloud

const DEPTHWIDTH = 320;
const DEPTHHEIGHT = 288;
const NUMPARTICLES = DEPTHWIDTH * DEPTHHEIGHT;
let depthValues = 'undefined';
let particles = [];
let colors = [];

function preload() {
    createParticles();
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
  
    let kinectron = new Kinectron("10.23.10.44");
    kinectron.setKinectType("azure");
    kinectron.makeConnection();
    kinectron.startRawDepth(gotDepth);
  }
  
  function gotDepth(data){
    depthValues = data;
  }

  function draw() {
    background(0);
    orbitControl();

    if (depthValues === 'undefined') { 
        console.log('no depth');
        return;
    }

    const minRange = 0;
    const maxRange = 3000; 

    for ( let y = 0; y < DEPTHHEIGHT; y+=5) { 
        for (let x = 0; x < DEPTHWIDTH; x+=5) { 
    
          const i = (y*DEPTHWIDTH+x);

          const particle = particles[i];
          const particleClr = colors[i];

          let depth = depthValues[i];

          if (depth <=minRange || depth >= maxRange) { 
            depth = Number.MAX_VALUE;
          }

          push();
          translate(particle.x, (particle.y*-1)-150,depth/2);
          stroke(particleClr);
          fill(particleClr);
          point(0,0,0);
          pop();

        }
      }
  } 

function createParticles() {
    for ( let y = 0; y < DEPTHHEIGHT; y++ ) { 
        for (let x = 0; x < DEPTHWIDTH; x++) { 
    
          const i = (y*DEPTHWIDTH+x);

          const newX = x - DEPTHWIDTH/2;
          const newY = DEPTHHEIGHT - y;

          const vertex = {x:newX, y:newY, z:Math.random()};
          particles.push(vertex);

          const color1 = i/NUMPARTICLES * 100;
          const color2 = 100 - color1;
        //   const newColor = color(255);     
        const newColor = color('rgb(' + color2 +'%, ' + color1 + '%, ' + color1 + '%)');
          colors.push(newColor);  
        }
      }
}