function setup(){
    canvas = createCanvas(280, 280); //280,280 //320,320
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clear_canvas(){
    background("white");
}

function preload(){
    classifier = ml5.imageClassifier("doodlenet");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotresult);
}

function gotresult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    }
    document.getElementById("label").innerHTML = "Name of the object is "+ results[0].label;
    document.getElementById("confidence").innerHTML = "The accuracy is "+ Math.round(results[0].confidence*100)+ "%";
    utter_this = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utter_this);
}



