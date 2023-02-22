const customTipEl = document.getElementById("custom-tip")
const tipButtonEl = document.getElementById("tip-buttons").children

const totalTipPersonEl = document.getElementById("total-tip")
const grandTotalPersonEl = document.getElementById("total-grand")

const totalBill = document.getElementById("bill-amount")
const totalPerson = document.getElementById("people-amount")


let billValue = 0
let tipValue = 0
let totalPersonValue = 0

let totalTipPerson
let GrandTotalPerson

const calculateGrandTotalPerson =  function () {
    if (billValue !== 0 && totalPersonValue !== 0) {
        let totalTip = billValue*tipValue 
        totalTipPerson = totalTip / totalPersonValue
        GrandTotalPerson = (totalTip+billValue) / totalPersonValue

        totalTipPersonEl.textContent = totalTipPerson
        grandTotalPersonEl.textContent = GrandTotalPerson
        console.log("Total:", totalTipPerson, GrandTotalPerson)
    }
}

const getTipValue = function () {
    for (let i=0; i < tipButtonEl.length; i++ ) {
        tipButtonEl[i].addEventListener("click", function() {
            customTipEl.value = ""
            tipValue = Number(tipButtonEl[i].textContent) * 0.01
            calculateGrandTotalPerson()
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

totalBill.addEventListener("input", function() {
    billValue = Number(totalBill.value)
    calculateGrandTotalPerson()
})

getTipValue()
