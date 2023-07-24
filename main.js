song = "";
song2 = "";

function preload()
{
	song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet está inicializado');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 20, 600, 500);

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY); 
		volume2 = floor(InNumberleftWristY)/500;
		document.getElementById("volume2").innerHTML = "Volumen de harry potter = " + volume2;		
		song2.setVolume(volume);	
	}

	if(scorerightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,20);
		InNumberrightWristY = Number(rightWristY); 
		volume = floor(InNumberrightWristY)/500;
		document.getElementById("volume").innerHTML = "Volumen de peter pan = " + volume;		
		song.setVolume(volume);	
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
    song2.play();
	song2.setVolume(1);
	song2.rate(1);
}

