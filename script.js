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

onStart();

function onStart(){
    chrome.storage.local.get("date", function(lastDate){
        const minute = 1000 * 60;
        const d = new Date();
        let now = Math.round(d.getTime() / minute);
        console.log(lastDate.date)
        if (lastDate.date == undefined){
            lastDate.date = 0
        }
        if (now - lastDate.date > 10){
            chrome.storage.local.set({ "date": now });
            var url = "https://source.unsplash.com/random/1920x1080"
            fetch(url).then(data=>{
                chrome.storage.local.set({ "pictureurl": data.url });
                console.log(data)
            });
            document.getElementById('bg').style.backgroundImage = `url(${url})`
            fetch("https://quotable.io/random/")
                .then(res => res.json())
                .then(data => {
                    document.querySelector('#quote').innerHTML = data.content;
                    document.querySelector('#author').innerHTML = data.author;
                    chrome.storage.local.set({ "phrase": [data.content, data.author] });
                })
        } 
        else {
            chrome.storage.local.get("pictureurl", function(url){
                document.getElementById('bg').style.backgroundImage = `url(${url.pictureurl})`
            });
            chrome.storage.local.get("phrase", function(url){
                document.querySelector('#quote').innerHTML = url.phrase[0];
                document.querySelector('#author').innerHTML = url.phrase[1];
            });
        }
    });
}

    