const customTipEl = document.getElementById("custom-tip")
const tipButtonEl = document.getElementById("tip-buttons").children

const totalBill = document.getElementById("bill-amount")
const totalPerson = document.getElementById("people-amount")
const errorPeople = document.getElementById("error-people")

const totalTipPersonEl = document.getElementById("total-tip")
const grandTotalPersonEl = document.getElementById("total-grand")

const resetBtn = document.getElementById("btn-reset")

const inputs = document.querySelectorAll("input[type='text']");

let billValue = 0
let tipValue = 0
let totalPersonValue = 0

let totalTipPerson = 0
let grandTotalPerson = 0

window.onload = function () {
    resetAll()
    getTipValue()
}

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", function() {
      validateInputs(inputs);
      console.log(inputs)
    });
}

const validateInputs = function(inputs) {
    deleteErrorMessage()
    for (let i=0; i < inputs.length; i++){
        if (inputs[i].value === "0") {
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("error-message");
            errorDiv.innerHTML = `Can't be zero`;

            const formContainer = inputs[i].closest(".calculated-section__body");
            formContainer.appendChild(errorDiv);
        }
    }
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
            const errorMessage = tipButtonEl[i].closest('.calculated-section__body').querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
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
    if (billValue !== 0 && totalPersonValue !== 0 && tipValue !== 0) {
        let totalTip = billValue*tipValue 
        totalTipPerson = totalTip / totalPersonValue
        grandTotalPerson = (totalTip+billValue) / totalPersonValue
        
        totalTipPersonEl.textContent = formatter.format(totalTipPerson)
        grandTotalPersonEl.textContent = formatter.format(grandTotalPerson)
        if (totalTipPerson !== 0 && grandTotalPerson !== 0) {
            resetBtn.classList.add("active")
        }
    }
}

resetBtn.addEventListener("click", function() {
    resetAll()
})

const resetAll = function () {
    for (let i=0; i < tipButtonEl.length; i++ ) {
        tipButtonEl[i].classList.remove("active")
    }
    totalBill.value = ""
    customTipEl.value = ""
    totalPerson.value = ""
    totalTipPersonEl.textContent = "$0.00"
    grandTotalPersonEl.textContent = "$0.00"

    billValue = 0
    tipValue = 0
    totalPersonValue = 0

    totalTipPerson = 0
    grandTotalPerson = 0
    resetBtn.classList.remove("active")
    deleteErrorMessage()
}

const deleteErrorMessage = function () {
    const errorDivs = document.querySelectorAll(".error-message");
    for (let i=0; i < errorDivs.length; i++) {
        errorDivs[i].remove()
    }
}