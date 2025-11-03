const endpoint =  "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=f52a5f5c8b219d8e85ec4b793f749952";

const long = document.querySelector("#long");
const lat = document.querySelector("#lat");
const btn1 = document.querySelector("#submit");
const locationInfo = document.querySelector("#location");
const btn2 = document.querySelector("#submit2")
const city = document.querySelector("#city")
const citySelector = document.querySelector("#ci")
const cordSelector = document.querySelector("#co")
const btn3 = document.querySelector(".privacy")
const temp = document.querySelector("#temp2")
const hum = document.querySelector("#hum2")
const cloud = document.querySelector("#cloud2")
const time = document.querySelector("#time2")
const wind = document.querySelector("#win2")



async function weatherByCords(){

    console.log(long.value)
    console.log(lat.value)
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${long.value}&appid=f52a5f5c8b219d8e85ec4b793f749952`);
        if (!response.ok) throw Error(response.statusText);

        const json = await response.json();
        temp.textContent = parseInt((parseFloat(json.main.temp)-273)*1.8 + 32)
        hum.textContent = `${json.main.humidity}%`
        time.textContent = json.weather[0].description
        cloud.textContent = `${json.clouds.all}%`
        wind.textContent = `${parseInt(parseFloat(json.wind.speed)*2.24)} mph, from ${json.wind.deg} degrees`
    } catch (err) {
        console.log(err);
        alert('Please enter valid cordinates between -90 and 90');
    }

    try {
        const response2 = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat.value}&lon=${long.value}&limit=1&appid=f52a5f5c8b219d8e85ec4b793f749952`);
        console.log(response2)
        if (!response2.ok) throw Error(response2.statusText);
        const json = await response2.json();
        locationInfo.textContent = `${json[0].name}, ${json[0].country}`;
    } catch (err) {
        console.log(err);
        locationInfo.textContent = "No Name Found";
    }
}


async function weatherByCity(){

    console.log(city.value)
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=f52a5f5c8b219d8e85ec4b793f749952`);
        if (!response.ok) throw Error(response.statusText);

        const json = await response.json();
        locationInfo.textContent = `${json.name}, ${json.sys.country}`;
        temp.textContent = parseInt((parseFloat(json.main.temp)-273)*1.8 + 32)
        hum.textContent = `${json.main.humidity}%`
        time.textContent = json.weather[0].description
        cloud.textContent = `${json.clouds.all}%`
        wind.textContent = `${parseInt(parseFloat(json.wind.speed)*2.24)} mph, from ${json.wind.deg} degrees`
    } catch (err) {
        console.log(err);
        alert('This city name is invalid');
    }
}

function selectCity(){
 const selectorNew = document.querySelector(".city-con")
 const selectorOld = document.querySelector(".cords-con")
 console.log(selectorOld)
 console.log(selectorNew)
 selectorNew.classList.remove("hidden")
 selectorOld.classList.add("hidden")
 citySelector.classList.add("selected")
 cordSelector.classList.remove("selected")
}

function selectCord(){
const selectorNew = document.querySelector(".cords-con")
 const selectorOld = document.querySelector(".city-con")
 console.log(selectorOld)
 console.log(selectorNew)
 selectorNew.classList.remove("hidden")
 selectorOld.classList.add("hidden")
 cordSelector.classList.add("selected")
 citySelector.classList.remove("selected")
}

function removeCords(){
    alert("You have clicked the privacy switch. You now cannot enter cordinate data because it is too revealing of where you are or what you might be doing!")
    cordSelector.classList.add("hidden")
    const selectorNew = document.querySelector(".city-con")
 const selectorOld = document.querySelector(".cords-con")
 selectorNew.classList.remove("hidden")
 selectorOld.classList.add("hidden")
 citySelector.classList.add("selected")
 cordSelector.classList.remove("selected")
}

btn1.addEventListener('click', weatherByCords)
btn2.addEventListener('click', weatherByCity)
citySelector.addEventListener('click', selectCity)
cordSelector.addEventListener('click', selectCord)
btn3.addEventListener('click', removeCords)

