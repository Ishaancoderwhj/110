
prediction_1="";


Webcam.set({
    width:350,
    height:300,
    image_format:"png",
png_quality:90

});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';

    });


}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NUf_Zxjlt/model.json",modelloaded);

function modelloaded(){
    console.log("model loaded");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The prediction is "+prediction_1;
    var utterthis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}

function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,results){
    if(error){
        console.error(error);

    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        document.getElementById("result_emotion_name").innerHTML=prediction_1;
        speak();

        if(prediction_1=="best"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }

        if(prediction_1=="victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }

        if(prediction_1=="amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
    }

}