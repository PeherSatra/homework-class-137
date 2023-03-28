objects = [];
object_name = "";
status1 = "";
video = "";

function preload()
{
    video = createCapture(VIDEO);
    video.hide();
}
function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    } else 
    {
        console.log(results);
        objects = results;
    }
}
function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    object_name = document.getElementById("name_of_object").value;
}
function modelLoaded()
{
    console.log("Model loaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == object_name)
    {
        video.stop(); 
        objectDetector.detect(gotResult);
        document.getElementById("number_of_objects").innerHTML = object_name + " found"
    } else 
    {
        document.getElementById("number_of_objects").innerHTML = object_name + " not found"
    }
        }
    }
}