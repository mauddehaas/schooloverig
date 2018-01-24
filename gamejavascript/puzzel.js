var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Create gradient
var grd=ctx.createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");

ctx.fillStyle=grd;
ctx.fillRect(0,0,200,100);

ctx.fillStyle = "#0000FF";
ctx.fillRect(55,10,80,80);

ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);
ctx.stroke();