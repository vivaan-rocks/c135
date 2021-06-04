song="";
wristXleft=0;
wristYleft=0;
wristXright=0;
wristYright=0;
scoreOfLeftWrist=0;
scoreOfRightWrist=0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        scoreOfRightWrist=results[0].pose.keypoints[10].score;
        scoreOfLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score"+scoreOfLeftWrist);
        wristXleft=results[0].pose.leftWrist.x;
        wristYleft=results[0].pose.leftWrist.y;
        //console.log(wristXleft+wristYleft);

        wristXright=results[0].pose.rightWrist.x;
        wristYright=results[0].pose.rightWrist.y;
    }
}
function draw(){
    image(video,0,0,500,400);

    fill("#4dff4d");
    stroke("#4dff4d");





if (scoreOfRightWrist > 0.2){
    circle(wristXright,wristYright,20);

    if(wristYright > 0 && wristYright <=100){
        document.getElementById("speedlabel").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }else if(wristYright > 100 && wristYright <=200){
        document.getElementById("speedlabel").innerHTML="speed = 1x";
        song.rate(1);
    }
    else if(wristYright > 200 && wristYright <=300){
        document.getElementById("speedlabel").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }
    else if(wristYright > 300 && wristYright <=400){
        document.getElementById("speedlabel").innerHTML="speed = 2x";
        song.rate(2);
    }
    else if(wristYright > 400 && wristYright <=500){
        document.getElementById("speedlabel").innerHTML="speed = 2.5x";
        song.rate(2.5);
    }
}
















    if (scoreOfLeftWrist > 0.2){
        circle(wristXleft,wristYright,20);
        InNumberwristYleft=Number(wristYleft);
        remove_decemals=floor(InNumberwristYleft);
        volume=remove_decemals/1000;
        document.getElementById("vollabel").innerHTML="volume " + volume;
        song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("POSENET IS INITIALIZED !!");
}