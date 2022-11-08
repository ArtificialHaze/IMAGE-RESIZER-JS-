const fileInput = document.querySelector(".resizer-container__file");
const widthInput = document.querySelector(
  ".resizer-container__dimensions--input-width"
);
const heightInput = document.querySelector(
  ".resizer-container__dimensions--input-height"
);
const aspectToggle = document.querySelector(
  ".resizer-container__dimesions-aspect"
);
const canvas = document.querySelector(".resizer-container__canvas");
const ctx = canvas.getContext("2d");

let currentImage;
let originalWidthToHeightRatio;

fileInput.addEventListener("change", (e) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    openImage(reader.result);
  });

  reader.readAsDataURL(e.target.files[0]);
});

function openImage(imageSrc) {
  currentImage = new Image();

  currentImage.addEventListener("load", () => {
    originalWidthToHeightRatio = currentImage.width / currentImage.height;
    resizer(currentImage.width, currentImage.height);
  });

  currentImage.src = imageSrc;
}

widthInput.addEventListener("change", () => {
  if (!currentImage) return;
  const heightValue = aspectToggle.checked
    ? widthInput.value / originalWidthToHeightRatio
    : heightInput.value;
  resizer(widthInput.value, heightValue);
});

heightInput.addEventListener("change", () => {
  if (!currentImage) return;
  const widthtValue = aspectToggle.checked
    ? heightInput.value * originalWidthToHeightRatio
    : widthInput.value;
  resizer(widthtValue, heightInput.value);
});

function resizer(width, height) {
  canvas.width = width;
  canvas.height = height;
  widthInput.value = width;
  heightInput.value = height;

  ctx.drawImage(currentImage, 0, 0, Math.floor(width), Math.floor(height));
}
