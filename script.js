let maxLength;
let maxValue;
let minValue;
const date = new Date();
let curDay = date.getDate();
let curMonth = date.getMonth();
let curYear = date.getFullYear();

inputs = document.getElementsByClassName("date-inputs__input");
for (let i = 0; i < 3; i++) {
  inputs[i].addEventListener("change", (event) => {
    switch (i) {
      case 0:
        maxLength = 2;
        maxValue = 31;
        minValue = 1;
        break;
      case 1:
        maxLength = 2;
        maxValue = 12;
        minValue = 1;
        break;
      case 2:
        maxLength = 4;
        maxValue = curYear - 1;
        minValue = 1800;
        break;
    }
    let value = event.target.value;
    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }
    if (value > maxValue) {
      event.target.value = maxValue;
    }
    if (value < minValue) {
      event.target.value = minValue;
    }
  });
}

/* function calcAge() {

}

button = document.getElementsByClassName("calcBtn");
button.addEventListener("click", calcAge());
 */
