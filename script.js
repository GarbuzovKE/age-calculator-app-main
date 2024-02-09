let maxValue;
let minValue;
const daysInMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};
const curDate = new Date();
let curYear = curDate.getFullYear();
let curMon = curDate.getMonth() + 1;
let curDay = curDate.getDate();
const animSpeed = 50;


inputs = document.getElementsByClassName("date-inputs__input");
outputs = document.getElementsByClassName("date-outputs__output");

function addErrorColor(elem) {
  if (!elem.parentElement.classList.contains("error-color")) {
    elem.parentElement.classList.add("error-color");
  }
}

function addErrorText(elem) {
  if (elem.nextElementSibling.hasAttribute("hidden")) {
    elem.nextElementSibling.removeAttribute("hidden");
  }
}

function clearOutput() {
  for (let i = 0; i < 3; i++) {
    outputs[i].textContent = `--`;
  }
}

function animNum(i, end, elem){
  console.log(i, end, elem);
  if (i <= end){
    elem.textContent = `${i}`;
    setTimeout(function(){
      animNum(i+1, end, elem)
    }, animSpeed);
  }
}

function validation(inputs) {
  for (let i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        maxValue = 31;
        minValue = 0;
        break;
      case 1:
        maxValue = 12;
        minValue = 0;
        break;
      case 2:
        maxValue = curYear;
        minValue = 1800;
        break;
    }

    if (new Date(inputs[2].value, inputs[1].value-1, inputs[0].value) - curDate>=0){
      console.log(new Date(inputs[2].value, inputs[1].value-1, inputs[0].value));
      addErrorColor(inputs[i]);
      addErrorText(inputs[i]);
      inputs[i].nextElementSibling.textContent = "Must be a valid date";
      continue
    }

    if (!inputs[i].value) {
      addErrorColor(inputs[i]);
      addErrorText(inputs[i]);
      inputs[i].nextElementSibling.textContent = "This field is required";
    } else {
      if (
        !/^\d+$/.test(inputs[i].value) ||
        Number(inputs[i].value) < minValue ||
        Number(inputs[i].value) > maxValue ||
        (i == 0 && Number(inputs[i].value) > daysInMonth[Number(inputs[i+1].value)])
      ) {
        addErrorColor(inputs[i]);
        addErrorText(inputs[i]);
        inputs[i].nextElementSibling.textContent = "Must be a valid date";
      } else {
        inputs[i].nextElementSibling.setAttribute("hidden", "");
        inputs[i].parentElement.classList.remove("error-color");
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      inputs[i].parentElement.classList.contains("error-color") ||
      !inputs[i].nextElementSibling.hasAttribute("hidden")
    ) {
      clearOutput();
      return 0;
    }
  }

  return 1;
}


function calcAgeAfterVal(inputs) {
  curYear = curDate.getFullYear();
  curMon = curDate.getMonth() + 1;
  curDay = curDate.getDate();
  if (curDay - Number(inputs[0].value) < 0) {
    if (curMon-1) {
      curDay += daysInMonth[Number(curMon)-1];
      curMon--;
      ansDays = curDay - Number(inputs[0].value);
    } else {
      curYear--;
      curMon += 12;
    }
  } 
  ansDays = curDay - Number(inputs[0].value);
  
  if (curMon - Number(inputs[1].value)< 0){
    curYear--;
    curMon += 12;
  }
  ansMon = curMon - Number(inputs[1].value);
  ansYear = curYear - Number(inputs[2].value);

animNum(0, ansYear, outputs[0]);
animNum(0, ansMon, outputs[1]);
animNum(0, ansDays, outputs[2]);

/*   outputs[0].textContent = `${ansYear}`; */
  /* outputs[1].textContent = `${ansMon}`; */
  /* outputs[2].textContent = `${ansDays}`; */
}

function calcAge() {
  if (validation(inputs)) calcAgeAfterVal(inputs);
}

button = document.getElementsByClassName("calcBtn")[0];
button.addEventListener("click", calcAge, false);
