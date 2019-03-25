// let selectList = document.getElementsByClassName("js-select");
// selectList = Array.from(selectList); //converts selectList into an array

let selectList = document.querySelectorAll(".js-select");
// let options = Array.from(selectList[0].options);

document.addEventListener("DOMContentLoaded", () => {
  //Fetch currency list
  fetch(
    "http://apilayer.net/api/list?access_key=85eda7cc97b3de54e694509d538bfc48"
  )
    .then(res => res.json())
    .then(data => {
      // Destructure 'currencies' property from data object
      let { currencies } = data;

      // Convert currencies object keys into an array
      currencies = [...Object.keys(currencies)];

      // For each select, loop through
      selectList.forEach(select => {
        currencies.forEach(currency => {
          let option = document.createElement("option");

          // set the value of the option
          option.setAttribute("value", currency);
          option.innerHTML = currency;

          // Add newly created option containing currency to the select element
          select.appendChild(option);
        });
      });
    });
});

//adding event listener to the option tag
let optionFrom;
let optionTo;

selectList.forEach(select => {
  select.addEventListener("change", e => {
    if (e.target.attributes.name.value === "TO") {
      optionTo = e.target.value;
    }
    if (e.target.attributes.name.value === "FROM") {
      optionFrom = e.target.value;
      console.log(typeof optionFrom);
    }
  });
});

const convertBtn = document.getElementById("convert-btn");

//conversions with base value EUR
convertBtn.addEventListener("click", () => {
  let amount = document.querySelector("#currency-value");
  amount = amount.value;

  if (!optionFrom) {
    let myOptions = selectList[0];
    optionFrom = myOptions[0].value;
  }
  if (!optionTo) {
    let myOptions = selectList[1];
    optionTo = myOptions[0].value;
  }
  console.log(optionTo, optionFrom);

  //fetch currency conversion rate
  fetch(
    `http://data.fixer.io/api/latest?access_key=264638f6ddb2a1883906d56323495210&symbols=${optionFrom},${optionTo}`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);

      if (data.success) {
        let rate = data.rates[optionTo] / data.rates[optionFrom];
        let total = rate * parseFloat(amount);
        let converted = document.querySelector(".output");
        converted.innerText = total.toFixed(2);

        //OR
        let newTotal =
          (data.rates[optionTo] * parseFloat(amount)) / data.rates[optionFrom];
        console.log(newTotal);
      }
    });
});
