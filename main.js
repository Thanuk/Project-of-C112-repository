prediction = "";

Webcam.set({
    width: 300,
    height: 300,
    img_format: "jpeg",
    jpeg_quality: 100
});

camera = document.getElementById("camera"); 
Webcam.attach('#camera');

function TakeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "image_taken" src="'+data_uri+'"/>';
    })
}

console.log("Model Version : ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/j60zy1VoE/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "Your Hand Gesture is " + prediction;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}

function Check(){
    img = document.getElementById("image_taken");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if(results[0].label == "Amazing"){
            document.getElementById("update_gesture").innerHTML = "&#128076;";
        }

        if(results[0].label == "Best"){
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }

        if(results[0].label == "Victory"){
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }

        if(results[0].label == "Dislike"){
            document.getElementById("update_gesture").innerHTML = "&#128078;";
        }
    }   
}