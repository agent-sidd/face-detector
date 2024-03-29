let video = document.getElementById('video');
let canavas  =  document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let model ;
const getVideoFeed=()=>{
navigator.mediaDevices.getUserMedia({
    video:{width:600,height:400}  ,
    audio:false
}).then((stream)=>{
   video.srcObject = stream;
})
}
const detectFaces = async()=>{
const prediction = await model.estimateFaces(video,false)
console.log(prediction);
ctx.drawImage(video,0,0,600,400)
prediction.forEach((pred)=>{
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle= "blue";
    ctx.rect(
    pred.topLeft[0],
    pred.topLeft[1],
    pred.bottomRight[0] - pred.topLeft[0],
    pred.bottomRight[1] - pred.topLeft[1]
    );
    ctx.stroke();
    ctx.fillStyle = "red";
    pred.landmarks.forEach((landmark)=>{
        ctx.fillRect(landmark[0],landmark[1],5,5)
    })
})

}
getVideoFeed();
video.addEventListener("loadeddata",async()=>{
    model = await blazeface.load();
    setInterval(detectFaces, 40);
})
