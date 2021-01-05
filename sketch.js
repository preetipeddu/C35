var ball;
var database;
var position;

function setup(){

    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


    var ballPositionRef = database.ref('ball/position');
    //{x: 200, y:200}
    //listener 
    ballPositionRef.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){

    database.ref('ball/position').update({
            x: position.x + x, //200 + -1 = 200-1 = 199
            y: position.y + y

    })

}


function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;

    console.log(position);

    //{x: 200, y: 200}
}


function showError(){
    console.log("Error is there")
}