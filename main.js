status = "";
objects = [];

function draw()
{
    image(video, 0, 0, 480, 380);

    if(status != "")
    {
        for(i = 0; i > objects.length; i++)
        {
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            var synth = window.speechSynthesis;
            speak_data = objects[i].label;

            if(objects[i].label == objects_name)
            {
                object_name.webcamLiveView.stop();
                document.getElementById("status").innerHTML = mentioned_object + "Found";
                new SpeechSynthesisUtterance(speak_data);
                speak_data.speak(utterThis);
            } else {
                document.getElementById("status").innerHTML = mentioned_object + "Found";
            }
        }
    }
}

function setup()
{
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    document.getElementById("mentioned_object").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}