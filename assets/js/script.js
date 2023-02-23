const customTipEl = document.getElementById("custom-tip")
const tipButtonEl = document.getElementById("tip-buttons").children

const totalBill = document.getElementById("bill-amount")
const totalPerson = document.getElementById("people-amount")
const errorPeople = document.getElementById("error-people")

const totalTipPersonEl = document.getElementById("total-tip")
const grandTotalPersonEl = document.getElementById("total-grand")

const resetBtn = document.getElementById("btn-reset")

let billValue = 0
let tipValue = 0
let totalPersonValue = 0

let totalTipPerson = 0
let GrandTotalPerson = 0

const inputs = document.querySelectorAll("input[type='text']");

window.onload = function () {
    resetAll()
    getTipValue()
}

inputs.forEach(input => {
    input.addEventListener("input", function() {
      validateInputs(inputs);
    });
});

const validateInputs = function(inputs) {
    const errorDivs = document.querySelectorAll(".error-message");
    errorDivs.forEach(div => div.remove());

    inputs.forEach(input => {
        if (input.value === "0") {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error-message");
            errorDiv.innerHTML = `Can't be zero`;

            const formContainer = input.closest(".calculated-section__body");
            formContainer.appendChild(errorDiv);
        }
    });
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

totalBill.addEventListener("input", function() {
    billValue = Number(totalBill.value)
    calculateGrandTotalPerson()
})

const getTipValue = function () {
    for (let i=0; i < tipButtonEl.length; i++ ) {
        tipButtonEl[i].addEventListener("click", function() {
            customTipEl.value = ""
            tipValue = Number(tipButtonEl[i].textContent) * 0.01
            calculateGrandTotalPerson()
            for (j = 0; j < tipButtonEl.length; j++) {
                tipButtonEl[j].classList.remove("active");
            }
            tipButtonEl[i].classList.add("active");
        })
    }
    customTipEl.addEventListener("input", function() { 
        tipValue = Number(customTipEl.value) * 0.01
        calculateGrandTotalPerson()
    })
}

totalPerson.addEventListener("input", function() {
    totalPersonValue = Number(totalPerson.value)
    calculateGrandTotalPerson()
})

const calculateGrandTotalPerson =  function () {
    if (billValue !== 0 && totalPersonValue !== 0) {
        let totalTip = billValue*tipValue 
        totalTipPerson = totalTip / totalPersonValue
        GrandTotalPerson = (totalTip+billValue) / totalPersonValue

        totalTipPersonEl.textContent = formatter.format(totalTipPerson)
        grandTotalPersonEl.textContent = formatter.format(GrandTotalPerson)
    }
}

const resetAll = function () {
    totalBill.value = ""
    customTipEl.value = ""
    totalPerson.value = ""
    totalTipPersonEl.textContent = "$0.00"
    grandTotalPersonEl.textContent = "$0.00"

    billValue = 0
    tipValue = 0
    totalPersonValue = 0

    totalTipPerson = 0
    GrandTotalPerson = 0
}

resetBtn.addEventListener("click", function() {
    resetAll()
})
