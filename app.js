var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var score = 0;

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
    c.r = Math.floor(Math.random() * 11) + 35; // radius in the range of 35->45

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    c.dx = Math.floor(Math.random() * 10) * plusOrMinus + 1;

    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    c.dy = Math.floor(Math.random() * 10) * plusOrMinus + 1;

  }



document.addEventListener("click", clickedcircle);

// pause function
function pause() {

  document.querySelector(".pause").classList.add("disabled");
  document.querySelector(".resume").classList.remove("disabled");
  clearInterval(interval);

}

// resume function
function resume() {

  document.querySelector(".pause").classList.remove("disabled");
  document.querySelector(".resume").classList.add("disabled");
  interval = setInterval(drawC, 100);
}

//to draw score

function drawS() {

  ctx.font = "16 Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score : " + score, canvas.width - 50, 20);



}

//Variables and timer to aid in every increasing generation

var d = 0;
var n = 1;
var inc = 0;

setInterval(function() {
  n = n + inc;
  inc++;
  console.log(n);
}, 2000);


// function to Remove bubbles that are clicked once.
function clickedcircle(e) {

  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++) {
      var c = circ[i][j];

      if (Math.sqrt(Math.pow((c.x - e.clientX), 2) + Math.pow((c.y - e.clientY), 2)) <= c.r) {


        c.status = 0;
        score++; // score increments by one for each bubble rightly clicked.
        break;
      }

    }



}

// 10 sec timer

var o = 0; //to recird if there is a change in the value stored in inter1
var t = 10;
var inter1;

area_limit = (0.75 * canvas.height * canvas.width);

//html timer control function
function timerdisplay() {

  var i = setInterval(function() {
    document.querySelector(".timer").innerhtml = t;
    t--;
  }, 1000)

}

//function to check if area of circles is more than condition
function checka() {

  // return type function to calculate area
  var c_area = 0;

  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++) {
      var c = circ[i][j];
      if (c.status == 1)
        c_area = c_area + (3.14 * c.r ** 2);

    }

  if (c_area >= area_limit) {

    if (o == 0) {
      inter1 = setTimeout(function() {
        alert("GAME OVER")
        timerdisplay();
      }, 10000);
      o = 1;


    }
  } else {

    clearTimeout(inter1);
    clearInterval(i);

    t = 10;
    document.querySelector(".timer").innerhtml = t;

    o = 0;
  }


}

var p;
var q;
var r;

//main function
function drawC() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);



  for (var i = 0; i < 3; i++)
    for (var j = 0; j < 3; j++) {
      var c;
      c = circ[i][j];
      if (c.status == 1) {
        
        if(d<n)
        {

        c.r = Math.floor(Math.random() * 21) + 50;

        if (c.x + c.dx > canvas.width - c.r || c.x + c.dx < c.r)
          c.dx = -c.dx;
        if (c.y + c.dy > canvas.height - c.r || c.y + c.dy < c.r)
          c.dy = -c.dy;

        collisiondetect();
        c.x = c.x + c.dx;
        c.y = c.y + c.dy;


        p = Math.floor((Math.random() * 256));
        q = Math.floor((Math.random() * 256));
        r = Math.floor((Math.random() * 256));



          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
          ctx.fillStyle = "rgb(" + p + "," + q + "," + r + ")"; //dynamically chahne the colours
          ctx.fill();
          ctx.closePath();



      }

    }

  drawS();
  checka();
//  requestAnimationFrame(drawC);


}

}



var interval=setInterval(drawC,100);
