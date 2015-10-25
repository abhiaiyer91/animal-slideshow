/**
 * Establish a point class
 * @param x
 * @param y
 * @constructor
 */
Point = class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

/**
 * Slide show api
 * @type {{lastMousePos: Point, mouseVelocity: Point, breakability: number}}
 */
AnimalSlideShow = {
  lastMousePos: new Point(window.innerWidth * .5, window.innerHeight * .5), // assume the mouse starts at the center
  mouseVelocity: new Point(Math.random() * (window.innerWidth * .4), Math.random() * (window.innerHeight * .4)), // base the initial mouse velocity off screensize
  breakability: .9 // decimal between 0-1, closer to 1 the further polygons push away from eachother
};

/**
 * Rendering Function
 */
var step = () => { // onEnterFrame
  var superCoolLion = document.getElementById('super-cool-lion');
  Meteor.startup(() => {
    React.render(<SuperCoolLion />, superCoolLion); // trigger a repaint
  });
  window.requestAnimationFrame(step); // keep the clock ticking

  // apply friction to mouse
  AnimalSlideShow.mouseVelocity.x *= 0.86;
  AnimalSlideShow.mouseVelocity.y *= 0.86;
};

window.requestAnimationFrame(step);


