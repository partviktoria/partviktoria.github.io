const summary = document.querySelector(".summary");
const summaryNumbers = document.querySelector(".summaryNumbers");
const charts = document.querySelector(".charts");
const sumAmount = document.querySelector("#sumAmount");
const sumIncome = document.querySelector(".sumIncome");
const sumExpense = document.querySelector(".sumExpense");
const summaryIcon = document.querySelector(".fa-angle-double-right");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".submitBtn");
const incomeTable = document.querySelector("#incomeTable");
const expenseTable = document.querySelector("#expenseTable");

class Income {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
};

class Expense {
    constructor(date, description, value) {
        this.date = date;
        this.description = description;
        this.value = value;
    }
};

let incArray = [];
let expArray = [];


function getInput() {
    return {
        date: form["date"].value,
        type: form["type"].value,
        description: form["description"].value,
        value: form["value"].value,
    }
}

function addItem() {
    let input = getInput();
    let exp;
    let inc;

    if (input.date && input.description && input.value) {

        if (input.type == "+") {
            inc = new Expense(input.date, input.description, input.value);
            incArray.push(inc);
        } else if (input.type == "-") {
            exp = new Expense(input.date, input.description, input.value);
            expArray.push(exp);
        }
        updateSums();
        updateTable(input);
        createIncomeChart(incArray);
        createExpenseChart(expArray);

        form["description"].value = "";
        form["value"].value = "";
    } else {
        if (!input.date) {
            form["date"].classList.add("inputRequired");
        }
        if (!input.description) {
            form["description"].classList.add("inputRequired");
        }
        if (!input.value) {
            form["value"].classList.add("inputRequired");
        }
    }
}

form["date"].addEventListener("click", function() {
    form["date"].classList.remove("inputRequired");
});

form["description"].addEventListener("keypress", function() {
    form["description"].classList.remove("inputRequired");
});
form["value"].addEventListener("keypress", function() {
    form["value"].classList.remove("inputRequired");
});



function updateSums() {

    let totalInc = 0;
    for (let i = 0; i < incArray.length; i++) {
        totalInc += Number(incArray[i].value);
    }
    let totalExp = 0;
    for (let i = 0; i < expArray.length; i++) {
        totalExp += Number(expArray[i].value);
    }

    sumIncome.textContent = `+ ${totalInc}`;
    sumExpense.textContent = `- ${totalExp}`;
    sumAmount.textContent = totalInc - totalExp;
}


function updateTable(input) {
    let tr = document.createElement("tr");
    let tdDate = document.createElement("td");
    let tdDesc = document.createElement("td");
    let tdValue = document.createElement("td");
    let spanValue = document.createElement("span");
    let icon = document.createElement("i");
    icon.classList.add("fas", "fa-minus-circle");
    icon.addEventListener("click", function(e) {
        deleteItems(e);
    })
    tdDate.textContent = input.date;
    tdDesc.textContent = input.description;
    spanValue.textContent = `${input.value} `;
    spanValue.appendChild(icon);
    tdValue.appendChild(spanValue);
    tr.appendChild(tdDate);
    tr.appendChild(tdDesc);
    tr.appendChild(tdValue);

    if (input.type == "+") {
        icon.classList.add("incomeIcon");
        tr.classList.add("incomeRows");
        incomeTable.appendChild(tr);
    } else if (input.type == "-") {
        icon.classList.add("expenseIcon");
        tr.classList.add("expenseRows");
        expenseTable.appendChild(tr);
    }

};

function deleteItems(e) {
    let index = e.target.parentElement.parentElement.parentElement.rowIndex - 1;
    let incomeRows = document.querySelectorAll(".incomeRows");
    let expenseRows = document.querySelectorAll(".expenseRows");
    if (e.target.classList.contains("incomeIcon")) {
        incomeTable.removeChild(incomeRows[index]);
        incArray.splice(index, 1);
    } else if (e.target.classList.contains("expenseIcon")) {
        expenseTable.removeChild(expenseRows[index]);
        expArray.splice(index, 1);
    }
    updateSums();
    createIncomeChart(incArray);
    createExpenseChart(expArray);
}

let chart;

function createIncomeChart(incArray) {

    CanvasJS.addColorSet("greenShades", [
        "#3CB043",
        "#B0FC38",
        "#3A5311",
        "#728C69",
        "#AEF359",
        "#5DBB63",
        "#98BF64",
        "#028A0F",
        "#74B72E",
        "#466D1D",
        "#03AC13",
        "#3DED97",
        "#234F1E",
        "#03C04A",
        "#99EDC3",
        "#354A21",
        "#597D35",
        "#B2D3C2",
        "#32612D",
        "#607D3B"
    ]);

    chart = new CanvasJS.Chart("incomeChartContainer", {
        animationEnabled: true,
        colorSet: "greenShades",
        title: {
            text: "Bevételek"
        },

        data: [{
            type: "pie",
            startAngle: 240,
            yValueFormatString: "##0\"\"",
            toolTipContent: "{label} {y} ({percentage}%)",
            indexLabel: "{label} {y} ({percentage}%)",
            indexLabelMaxWidth: 50,
            dataPoints: []
        }]
    });

    let sum = 0;
    for (let i = 0; i < incArray.length; i++) {
        sum += Number(incArray[i].value);
    }
    let percentage;
    chart.render();
    for (let i = 0; i < incArray.length; i++) {
        percentage = (incArray[i].value / sum) * 100;
        chart.data[0].dataPoints[i] = {};
        chart.data[0].dataPoints[i].y = incArray[i].value;
        chart.data[0].dataPoints[i].percentage = percentage.toFixed(2);
        chart.data[0].dataPoints[i].label = incArray[i].description;
    }
    chart.render();
}

function createExpenseChart(expArray) {

    CanvasJS.addColorSet("redShades", [
        "#D0312D",
        "#990F02",
        "#E3242B",
        "#60100B",
        "#541E1B",
        "#610C04",
        "#B90E0A",
        "#900603",
        "#900D09",
        "#4E0707",
        "#7E2811",
        "#A91B0D",
        "#420C09",
        "#710C04",
        "#5E1916",
        "#7A1712",
        "#680C07",
        "#BC544B",
        "#D21404",
        "#9B1003"
    ]);

    chart = new CanvasJS.Chart("expenseChartContainer", {
        animationEnabled: true,
        colorSet: "redShades",
        title: {
            text: "Kiadások"
        },
        data: [{
            type: "pie",
            startAngle: 240,
            toolTipContent: "{label} {y} ({percentage}%)",
            indexLabel: "{label} {y} ({percentage}%)",
            indexLabelMaxWidth: 50,
            dataPoints: []
        }]
    });

    let sum = 0;
    for (let i = 0; i < expArray.length; i++) {
        sum += Number(expArray[i].value);
    }
    let percentage;

    chart.render();
    for (let i = 0; i < expArray.length; i++) {
        percentage = (expArray[i].value / sum) * 100;
        chart.data[0].dataPoints[i] = {};
        chart.data[0].dataPoints[i].y = expArray[i].value;
        chart.data[0].dataPoints[i].percentage = percentage.toFixed(2);
        chart.data[0].dataPoints[i].label = expArray[i].description;
    }
    chart.render();
}

(function createEventListeners() {
    submitBtn.addEventListener("click", function() {
        addItem();
    });

    document.addEventListener("keypress", function(e) {
        if (e.keyCode === 13 || e.which === 13) {
            addItem();
        }
    });

    summaryIcon.addEventListener("click", function() {
        if (summaryIcon.classList.contains("fa-angle-double-right")) {
            summaryIcon.classList.remove("fa-angle-double-right");
            summaryIcon.classList.add("fa-angle-double-left");
            summaryIcon.setAttribute("title", "Mutasd a számokat");
            summaryNumbers.classList.add("summaryNumbersHide");
            charts.classList.add("chartsShow");
            createIncomeChart(incArray);
            createExpenseChart(expArray);
        } else if (summaryIcon.classList.contains("fa-angle-double-left")) {
            summaryIcon.classList.add("fa-angle-double-right");
            summaryIcon.classList.remove("fa-angle-double-left");
            summaryIcon.setAttribute("title", "Mutasd a diagramokat");
            summaryNumbers.classList.remove("summaryNumbersHide");
            charts.classList.remove("chartsShow");
        }
    });

})();