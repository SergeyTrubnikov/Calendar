"use strict"

const firstDayOfMonth = 1;
const oneDay = 24 * 3600 * 1000;

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]


let date = new Date();
let today = new Date();
let convertedToday = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()}`;

function minusMonth() {
    date.setMonth(date.getMonth() - 1);
    fillCalendar(date);
}

function plusMonth() {
    date.setMonth(date.getMonth() + 1);
    fillCalendar(date);
}



function getStartOfCalendar(date) {
    let startOfMonth = date.setDate(firstDayOfMonth); // Getting date object with first day of month
    let firstDayOfWeekInMonth = new Date(startOfMonth).getDay(); // Getting first day of week in month

    let initialCalendarDay; // First day of a current calendar page

    if (firstDayOfWeekInMonth != 0 && firstDayOfWeekInMonth != 1) {
        initialCalendarDay = new Date(startOfMonth - (oneDay * (firstDayOfWeekInMonth - 1)));
    } else if (firstDayOfWeekInMonth == 0) {
        initialCalendarDay = new Date(startOfMonth - (oneDay * 6));
    } else {
        initialCalendarDay = new Date(startOfMonth);
    }
    

    return initialCalendarDay;
}


function fillCell(cell, text) {
    cell.innerHTML = text;
}

function decolourAllCells(color) {
    let calendar = document.getElementById("calendar");
    for (let row of Array.from(calendar.rows).slice(2)) {
        for (let cell of row.cells) {
                cell.bgColor = color;
        }
    }

}

function isToday(dayToFill) {
    // let today = new Date();
    let convertedDay = `${dayToFill.getFullYear()} ${dayToFill.getMonth()} ${dayToFill.getDate()}`;
    // let convertedToday = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()}`;

    return convertedDay === convertedToday;
}



function fillCalendar(date) {
    decolourAllCells("white");

    let dayToFill = getStartOfCalendar(date);

    let calendar = document.getElementById("calendar");
    
    let monthAndYear = document.getElementById("monthAndYear");

    monthAndYear.innerHTML = `<b>${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

    for (let row of Array.from(calendar.rows).slice(2)) {
        for (let cell of row.cells) {
            if (isToday(dayToFill)) {
                cell.bgColor = "green";
            } 

            if (date.getMonth() != dayToFill.getMonth()) {
                cell.bgColor = "gray";
            } 

            fillCell(cell, dayToFill.getDate());
            dayToFill.setDate(dayToFill.getDate() + 1);
        }
    }
}



fillCalendar(date);



