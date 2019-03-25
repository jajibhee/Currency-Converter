let selectList = document.querySelectorAll(".js-select");

//load the DOM
document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "http://apilayer.net/api/list?access_key=85eda7cc97b3de54e694509d538bfc48"
  )
    .then(res => res.json())
    .then(data => {
      //using object destructuring
      let { currencies } = data;

      //we access the value of currencies
      //WE WANT TO POPULATE THE SELECT TAGS
      currencies = [...Object.keys(currencies)];

      //Select the iterables and loop through so we can populate the select tag.
      selectList.forEach(select => {
        currencies.forEach(currency => {
          let option = document.createElement("option");
          option.setAttribute("value", currency);
          option.innerHTML = currency;

          select.appendChild(option);

          //This way, the select tag gets populated thanks to the keys of currencies gotten from the API.
        });
      });
    });
});

//WE WANT TO TRACK THE CHANGES MADE TO THE SELECT TAG
let optionFrom;
let optionTo;

selectList.forEach(select => {
  select.addEventListener("change", e => {
    if (e.target.attributes.name.value === "TO") {
      optionTo = e.target.value;
    }
    if (e.target.attributes.name.value === "FROM") {
      optionFrom = e.target.value;
    }
  });
});

//CONVERT BUTTON
const convertBtn = document.querySelector("#convert-btn");
convertBtn.addEventListener("click", () => {
  let amount = document.querySelector("#currency-value");
  amount = amount.value;
  console.log(amount);

  if (!optionFrom) {
    // let myOptions = Array.from(selectList[0].options);
    let myOptions = selectList[0];
    optionFrom = myOptions[0].value;
  }
  if (!optionTo) {
    let myOptions = selectList[1];
    optionTo = myOptions[0].value;
  }

  //OUTPUT
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
        console.log(converted);

        converted.innerText = total.toFixed(2);

        //or
        let newTotal =
          (data.rates[optionTo] * parseFloat(amount)) / data.rates[optionFrom];
        console.log(newTotal);
      }
    });
});
