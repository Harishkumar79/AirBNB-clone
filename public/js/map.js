document.addEventListener("DOMContentLoaded", () => {
    const post = window.postData;

    const [lng, lat] = post.geolocation.coordinates;
    // let lat = 24.6333;
    // let lng = 72.65;

    const map = L.map('map').setView([lat, lng], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(post.title)
});
