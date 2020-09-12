const API_KEY = "bdef24f7680a8262d6df87265bcf205d";
const pane = document.getElementById("list-pane");
const li = document.createElement("li");
li.classList.add("list-item");

var netStatus = {
  online: true,
};
// check if connection is lost
// window.addEventListener("offline", () => {
//   netStatus.online = false;
//   alert("connection offline!");
// });
// window.addEventListener("online", () => {
//   netStatus.online = true;
//   alert("connection online!");
// });

// fetch weather data
function fetchData() {
  if (netStatus.online) {
    apiCall();
  } else {
    const markup = `
    <figure class="weather-class">
    <img src=${window.localStorage.getItem("icon")}" >
    <figcaption>${window.localStorage.getItem("description")}</figcaption>
    </figure>
    <h4 class="temp">Temp:<span>${window.localStorage.getItem(
      "temp"
    )}</span><sup>°C</sup></h4>
    `;
    li.innerHTML = markup;
    pane.appendChild(li);
  }
}
function apiCall() {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.innerHTML}&lon=${long.innerHTML}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp, weather } = data.current;
      const markup = `<figure class="weather-class">
      <div class="img-class">
      <img  src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" >
      </div>
      <figcaption>${weather[0].description}</figcaption>
      </figure>
      <h4 class="temp">Temp:<span>${temp}</span><sup>°C</sup></h4>
      `;
      window.localStorage.setItem("temp", temp);
      window.localStorage.setItem("icon", weather[0].icon);
      window.localStorage.setItem("description", weather[0].description);

      li.innerHTML = markup;
      pane.appendChild(li);
    })
    .catch((err) => {
      console.log(err);
    });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceworker")
      .then((res) => console.log("Serviceworker registered"))
      .catch((err) => console.log("Serviceworker not registered", err));
  });
}
