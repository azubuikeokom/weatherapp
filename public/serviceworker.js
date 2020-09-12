const staticWeather = "weather-app-v1";
const assets = [
  "/pulic",
  "/index.html",
  "/style.css",
  "/apiCall.js",
  "/location.js",
];
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticWeather).then((cache) => {
      cache.addAll(assets);
    })
  );
});
self.fetch("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
