function preload() {}

function setup() {
    console.log("Model Loading");
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("MoblieNet", modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function draw() {
    image(video,0,0,300,300);
    classifier.classify(video,gotResult);
}

preResult = ""

function gotResult(error,result) {
    if (error) {
        console.error(error);
    } else {
        if ((result[0].confidence > 0.5 ) && (preResult != result)) {
            console.log(result);
            preResult = result[0].label;
            var synth = window.speechSynthesis;
            speak_data= "Object detected is" + result[0].label;
            var utterThis = new SpeechSynthesisUtterance(speak_data);
            synth.speak();
            document.getElementById("object").innerHTML = result[0].label;
            document.getElementById("accuracy").innerHTML = result[0].confidence.toFixed(3);
        }
        
    }
}