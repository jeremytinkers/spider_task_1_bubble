var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var circ = []; //array of circles

for (var i = 0; i < 10; i++) {
  circ[i] = [];
  for (var j = 0; j < 10; j++)
    circ[i][j] = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: 2,
      dy: 2,
      r: 30,
      status: 1
    };
}



//function to detect other balls and move accordingly
function collisiondetect() {
  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++) {

      for (var k = 0; k < 3; k++)
        for (var l = 0; l < 3; l++) {

          var temp1 = Math.pow(circ[i][j].x - circ[k][l].x, 2) + Math.pow(circ[i][j].y - circ[k][l].y, 2);
          temp1 = Math.sqrt(temp1);

          var temp2 = circ[i][j].r + circ[k][l].r;


          if (temp1 < temp2) {
            circ[i][j].dx = -circ[i][j].dx;
            circ[k][l].dx = -circ[k][l].dx;


          }
        }
    }

}

//Assigning the random variables initially
for (var i = 0; i < 3; i++)
  for (var j = 0; j < 3; j++) {
    c = circ[i][j];
    c.r = Math.floor(Math.random() * 11) + 20; // radius in the range of 15->30

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    c.dx = Math.floor(Math.random() * 10) * plusOrMinus + 1;

    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    c.dy = Math.floor(Math.random() * 10) * plusOrMinus + 1;

  }

document.addEventListener("click", clickedcircle);

function clickedcircle(e) {

  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++) {
    var c = circ[i][j];
console.log(c.x);

      if (Math.sqrt(Math.pow((c.x - e.clientX), 2) + Math.pow((c.y - e.clientY), 2)) <= c.r)
{
        console.log(c.x);

        c.status = 0;
        break;
}

      }



    }
  //main fucntion
  function drawC() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++) {
        var c;
        c = circ[i][j];
        if (c.status == 1) {



          if (c.x + c.dx > canvas.width - c.r || c.x + c.dx < c.r)
            c.dx = -c.dx;
          if (c.y + c.dy > canvas.height - c.r || c.y + c.dy < c.r)
            c.dy = -c.dy;

          collisiondetect();
          c.x = c.x + c.dx;
          c.y = c.y + c.dy;



          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
          ctx.fillStyle = "cyan";
          ctx.fill();
          ctx.closePath();



        }

      }



  }



  var interval = setInterval(drawC, 100);
