song = "";
left_Wrist_x = 0;
left_Wrist_y = 0;
right_Wrist_x = 0;
right_Wrist_y = 0;
score_left_wrist = 0;
score_right_wrist = 0;

function preload() {
    song = loadSound("music.mp3");
}
function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("poseNet_is_initialized");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("score_left_wrist = " + score_left_wrist);
        left_Wrist_x = results[0].pose.leftWrist.x;
        left_Wrist_y = results[0].pose.leftWrist.y;
        console.log("left_wrist_x" + left_Wrist_x + " left_wrist_y = " + left_Wrist_y);

        right_Wrist_x = results[0].pose.rightWrist.x;
        right_Wrist_y = results[0].pose.rightWrist.y;
        console.log("right_wrist_x" + right_Wrist_x + " right_wrist_y = " + right_Wrist_y);
    }
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#aabfd1");
    stroke("#aabfd1");
    if(score_left_wrist > 0.2) {
        circle(left_Wrist_x, left_Wrist_y, 20);
        left_Wrist_y_number = Number(left_Wrist_y);
        remove_decimals = floor(left_Wrist_y_number);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}