const colorSelectorBtn = document.querySelector("button");
const colorPicker = document.querySelector("input");
const schemeSelector = document.querySelector("select");
const colorsContainer = document.getElementById("colors");
let colorsArray = [];

// color generator btn handler
colorSelectorBtn.addEventListener("click", () => {
  let schemaMode = schemeSelector.value;
  let color = colorPicker.value.substring(1);

  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${schemaMode}`)
    .then((res) => res.json())
    .then((data) => {
      colorsArray = [];
      colorsArray = data.colors;
      render();
    });
});

// fetching default color scheme
fetch("https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome")
  .then((res) => res.json())
  .then((data) => {
    colorsArray = data.colors;
    render();
  });

// render color schemes on html
function render() {
  let html = "";

  for (let color of colorsArray) {
    html += `
         <div class="single-color tooltip" id="singleColor"  style="background-color: ${color.hex.value}"  data-hex="${color.hex.value}"  >
              <span class="tooltiptext" id="myTooltip">Copy to clipboard</span>
              <div class="color-hex" id="colorHex" data-hex="${color.hex.value}"  >${color.hex.value}</div>
         </div>`;
  }

  colorsContainer.innerHTML = html;

  // copy single color hex value to clipboard and tooltip
  const singleColors = document.getElementsByClassName("single-color");
  Array.from(singleColors).forEach((singleColor) => {
    singleColor.addEventListener("click", () => {
      let hexValue = singleColor.dataset.hex;
      let tooltipText = singleColor.children[0];
      tooltipText.innerHTML = "Copied: " + hexValue;
      navigator.clipboard.writeText(hexValue);
    });
  });
}
