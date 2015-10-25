/**
 * Create a random range between numbers
 * @param min
 * @param max
 * @returns {*}
 */
var randomRange = (min, max) => {
  return min + (Math.random() * max - min);
};

Meteor.setInterval(() => { // wait 4 seconds then start listening to mouse move
  document.body.onmousemove = function (e) {
    var mousePos = new Point(e.screenX, e.screenY); // current mouse position
    // calculate moues velocity based on distance between frames, breakability, and window size
    AnimalSlideshow.mouseVelocity = new Point((mousePos.x - AnimalSlideshow.lastMousePos.x) / (window.innerWidth * (1 - AnimalSlideshow.breakability)), (mousePos.y - AnimalSlideshow.lastMousePos.y) / (window.innerHeight * (1 - AnimalSlideshow.breakability)));
    AnimalSlideshow.lastMousePos = mousePos;
  }
}, 4000);

Polygon = class Polygon extends React.Component {
  constructor(props) {
    super();
    this.state = {
      origFill: props.fill, // store the original fill color
      origPoints: props.points, // store the original positions that the polygon should be attracted to
      darkAmnt: 0, // a number we will continue to increment and that then take the Math.sin() value of
      colorVelocity: randomRange(0.04, 0.13), // how quickly to change the colors
      colorReach: randomRange(8, 24), // how much the hue should be aloud to shift
      transform: 'translate(0 0)', // transform amount, initially nothing. used to move the peices
      movable: (Math.random() <= .75), // whether or not the polygon is movable
      movability: new Point(randomRange(0.86, 1), randomRange(0.86, 1)), // how "movable" each polygon is
      polarity: new Point(Math.random() <= .5, Math.random() <= .5) // mouse polarity (which way to go when the mouse is moved)
    };
  }

  render() {
    // some otherwise unnecessary pointer variables to make things more legible
    var destColor = this.state.origFill;
    var colorVelocity = this.state.colorVelocity;
    var colorReach = this.state.colorReach;
    var movable = this.state.movable;
    var polarity = this.state.polarity;
    var movability = this.state.movability;

    // increment the darken amount. this number keeps getting bigger forever, but we take the sin of it so it fluctuates gradually between -1 and 1
    this.state.darkAmnt += colorVelocity;

    var getTransform = (movable, polarX, polarY) => {
      if (!movable) return ('translate(0,0)');

      var x = AnimalSlideShow.mouseVelocity.x;
      var y = AnimalSlideShow.mouseVelocity.y;

      if (polarX) x = 0 - x;
      if (polarY) y = 0 - y;

      x *= movability.x;
      y *= movability.y;

      return ('translate(' + x + ' ' + y + ')');
    };

    var LightenDarkenColor = (col, amt) => { //https://css-tricks.com/snippets/javascript/lighten-darken-color/
      var usePound = false;

      if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
      }

      var num = parseInt(col, 16);

      var r = (num >> 16) + amt;

      if (r > 255) {
        r = 255;
      } else if (r < 0) {
        r = 0;
      }

      var b = ((num >> 8) & 0x00FF) + amt;

      if (b > 255) {
        b = 255;
      } else if (b < 0) {
        b = 0;
      }

      var g = (num & 0x0000FF) + amt;

      if (g > 255) {
        g = 255;
      } else if (g < 0) {
        g = 0;
      }
      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    };

    // calculate the destination color
    destColor = LightenDarkenColor(destColor, (Math.sin(this.state.darkAmnt) * colorReach));

    // let React do its thing
    return <polygon fill={destColor} transform={getTransform(movable,polarity.x,polarity.y)}
                    points={this.state.origPoints}></polygon>;
  }
};