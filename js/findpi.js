var pi = 0;
var piText;
var points = [];
var inCircle = 0;
var myInterval;
var running = false;
function start(){
    myArea.start();
    piArea.start();
    piText = new TextComponent("30px", "Consolas", "black", 10, 35, piArea);
    piText.text = "Pi = " + pi;
    piText.update();

}

function drawCircle(){
    var ctx=myArea.canvas.getContext("2d");
    var l = myArea.canvas.width;
    ctx.beginPath();
    ctx.arc(l/2,l/2,l/2,0,2*Math.PI);
    ctx.stroke();
}

function addPoint(p, color){
    var ctx=myArea.canvas.getContext("2d");
    var l = myArea.canvas.width;
    ctx.fillStyle=color;
    ctx.fillRect(p.x,p.y,4,4);
}

var factor = 0.5
var myArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.style.margin = "0 auto";
        this.canvas.style.display = "block";
        this.canvas.width = Math.min(1080 * factor, screen.width*0.8);
        this.canvas.height = Math.min(1080 * factor, screen.height*0.8);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        drawCircle();
        // this.interval = setInterval(updateArea, 15)
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    update : function() {
        drawCircle();
        drawPoints();
        pi = Circle.estimatePi(inCircle, points.length);
        piText.text = "Pi = " + pi;
        piText.update();
    }

}

var piArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.style.margin = "0 auto";
        this.canvas.style.display = "block";
        this.canvas.width = Math.min(1080 * factor, screen.width*0.8);
        this.canvas.height = Math.min(100 * factor, screen.height*0.8);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // update : function() {
    //     pi = Circle.estimatePi(inCircle, points.length);
    //     piText.text = "Pi = " + pi;
    //     piText.update();
    // }
}

function newPoint(){
    makePoint();
    update();
}

function makePoint(){
    var l = myArea.canvas.width;
    var p = Circle.getPoint(l);
    p.status = Circle.checkPoint(p, l, l/2);
    if(p.status){
        inCircle++;
    }
    points.push(p);
    

}

function update(){
    piArea.clear();
    myArea.clear();
    myArea.update();
}

function drawPoints(){
    function pointAdder(p){
        if(p.status){
            addPoint(p, "Blue");
        }else{
            addPoint(p, "Red");
        }
    }
    points.forEach(pointAdder);
}

function continuous(){
    myInterval = setInterval(newPoint,document.getElementById("speedtext").value);
    running = true;
}

function stop(){
    if(running){
        clearInterval(myInterval);
        running = false;
    }
}

function updateSpeed(){
    if(running){
        stop();
        continuous();
    }
}

function instantPlace(){
    var n = document.getElementById("instantplacementtext").value;
    if(n < 10000000){
        for(var i = 0; i < n; i++){
            makePoint();
        }
        update();
    }else{
         alert("Too High");
    }
}


