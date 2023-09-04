const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".size-options");
const BGColor = document.getElementById("BGColor");
let QR_Code;
let sizeChoice, BGColorChoice;

// Set Size
sizeOptions.addEventListener("change", () => {
    sizeChoice = sizeOptions.value;
});

// Set Background Color
BGColor.addEventListener("input", () => {
    BGColorChoice = BGColor.value;
});

// Format Input
const inputFormat = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
  return value;
};
submitBtn.addEventListener("click", async () => {
    container.innerHTML = "";

//QR Code Genertion
QR_Code = await new QRCode(container, {
    text: userInput.value,
    width: sizeChoice /1.5,
    height: sizeChoice /1.5,
    colorLight: BGColorChoice,
  });

//Set URL for Download
const src = container.firstChild.toDataURL("image/png");
downloadBtn.href = src;
let userValue = userInput.value;
try {
  userValue = new URL(userValue).hostname;
} catch (_) {
  userValue = inputFormat(userValue);
  downloadBtn.download = `${userValue}QR`;
  downloadBtn.classList.remove("hide");
  userInput.value = "";
}
});
userInput.addEventListener("input", () => {
if (userInput.value.trim().length < 1) {
  submitBtn.disabled = true;
  downloadBtn.href = "";
  downloadBtn.classList.add("hide");
 } else {
  submitBtn.disabled = false;
}
});

window.onload = () => {
container.innerHTML = "";
sizeChoice = 100;
sizeOptions.value = 100;

BGColorChoice = "#ffffff";
downloadBtn.classList.add("hide");
submitBtn.disabled = true;
};