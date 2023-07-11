setInterval(showTime, 1000);

function showTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();

    m = (m < 10) ? "0" + m : m;

    var time = h + ":" + m;
    document.getElementById("Clocken").innerText = time;
    document.getElementById("Clocken").textContent = time;

}
showTime();

document.getElementById('bg').style.backgroundImage = 'url(https://picsum.photos/1920/1080)'

fetch("https://quotable.io/random/")
    .then(res => res.json())
    .then(data => {
        document.querySelector('#quote').innerHTML = data.content;
        document.querySelector('#author').innerHTML = data.author;
    })