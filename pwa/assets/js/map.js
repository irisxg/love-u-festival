// script.js

const mapContent = document.getElementById("map-content");

let scale = 1;
let posX = 0;
let posY = 0;

function updateTransform() {
  mapContent.style.transform =
    `translate(${posX}px, ${posY}px) scale(${scale})`;

  updateMarkerScale();
}

function updateMarkerScale() {

  const markers = document.querySelectorAll(".marker");

  markers.forEach(marker => {

    marker.style.transform =
      `translate(-50%, -50%) scale(${1 / scale})`;

  });

}

const hammer = new Hammer(document.getElementById("map-container"));

hammer.get('pinch').set({ enable: true });
hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

let lastScale = scale;

hammer.on("pinch", (e) => {

  scale = Math.max(1, Math.min(lastScale * e.scale, 4));

  updateTransform();

});

hammer.on("pinchend", () => {

  lastScale = scale;

});

hammer.on("panmove", (e) => {

  posX += e.deltaX * 0.01;
  posY += e.deltaY * 0.01;

  updateTransform();

});

/* BUTTON ZOOM */

document.getElementById("zoom-in")
  .addEventListener("click", () => {

    scale += 0.2;

    updateTransform();

});

document.getElementById("zoom-out")
  .addEventListener("click", () => {

    scale -= 0.2;

    if (scale < 1) scale = 1;

    updateTransform();

});

/* MARKER POPUP */

const popup = document.getElementById("popup-card");

document.querySelectorAll(".marker")
  .forEach(marker => {

    marker.addEventListener("click", () => {

      document.getElementById("popup-title")
        .innerText = marker.dataset.title;

      document.getElementById("popup-current")
        .innerText = marker.dataset.current;

      document.getElementById("popup-next")
        .innerText = marker.dataset.next;

      popup.classList.remove("hidden");

    });

});

/* USER LOCATION */

if (navigator.geolocation) {

  navigator.geolocation.getCurrentPosition((position) => {

    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

  });

}

updateTransform();