const mock = [
  {
    cx: 75,
    cy: 250,
    spikes: 5,
    outerRadius: 30,
    innerRadius: 15,
    color: 'red'
  },
  {
    cx: 175,
    cy: 250,
    spikes: 5,
    outerRadius: 30,
    innerRadius: 15,
    color: 'blue'
  },
  {
    cx: 275,
    cy: 250,
    spikes: 5,
    outerRadius: 30,
    innerRadius: 15,
    color: 'green'
  },
  {
    cx: 375,
    cy: 250,
    spikes: 5,
    outerRadius: 30,
    innerRadius: 15,
    color: 'yellow'
  },
  {
    cx: 475,
    cy: 250,
    spikes: 5,
    outerRadius: 30,
    innerRadius: 15,
    color: 'black'
  },
]

document.addEventListener('DOMContentLoaded', function () {

  const canvasTop = document.getElementById("top-box");
  const canvasBottom = document.getElementById("bottom-box");
  const contextTop = canvasTop.getContext("2d");
  const contextBottom = canvasBottom.getContext("2d");

  function createBottomCanvas(color = 'white') {
    contextBottom.rect(0, 0, canvasBottom.width, canvasBottom.height);
    contextBottom.closePath();
    contextBottom.fillStyle = color;
    contextBottom.fill();
  }

  function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    contextTop.beginPath();
    contextTop.moveTo(cx, cy - outerRadius)
    for (i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      contextTop.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      contextTop.lineTo(x, y)
      rot += step
    }
    contextTop.lineTo(cx, cy - outerRadius)
    contextTop.closePath();
    contextTop.fillStyle = color;
    contextTop.fill();
  }

  createBottomCanvas();

  mock.forEach(({ cx, cy, spikes, outerRadius, innerRadius, color }) => {
    drawStar(cx, cy, spikes, outerRadius, innerRadius, color)
  })

  canvasTop.addEventListener('click', (e) => {
    const targetCoords = e.target.getBoundingClientRect();
    const x = e.clientX - targetCoords.left;
    const y = e.clientY - targetCoords.top;

    let BottomCalvasColor = 'white';

    mock.forEach(({cx, cy, outerRadius, color}) => {
      if(x > cx - outerRadius && x < cx + outerRadius && y > cy - outerRadius && y < cy + outerRadius) {
        BottomCalvasColor = color;
      }
    })

    createBottomCanvas(BottomCalvasColor);
  })

});

