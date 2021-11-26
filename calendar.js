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

function defaultAllCells() {
    let calendar = document.querySelectorAll("div[class*='Day']");
    for (let day of Array.from(calendar)) {
        day.className = "calendarDay";
        day.onclick = () => {};
    }

}

function isToday(dayToFill) {
    let convertedDay = `${dayToFill.getFullYear()} ${dayToFill.getMonth()} ${dayToFill.getDate()}`;

    return convertedDay === convertedToday;
}



function fillCalendar(date) {
    defaultAllCells();

    let dayToFill = getStartOfCalendar(date);

    let calendar = document.querySelectorAll("div[class*='Day']");
    
    let monthAndYear = document.getElementsByClassName("calendarMonthAndYear");

    monthAndYear[0].innerHTML = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

    for (let day of Array.from(calendar)) {
        if (isToday(dayToFill)) {
            day.className = "calendarToDay";
            day.onclick = () => {};
        } else if (dayToFill.getMonth() < date.getMonth()) {
            if (dayToFill.getTime() < date.getTime()) {
                day.className = "calendarPrevMonthDay";
                day.onclick = minusMonth;
            } else {
                day.className = "calendarNextMonthDay";
                day.onclick = plusMonth;
            }
        } else if (dayToFill.getMonth() > date.getMonth()) {
            if (dayToFill.getTime() > date.getTime()) {
                day.className = "calendarNextMonthDay";
                day.onclick = plusMonth;
            } else {
                day.className = "calendarPrevMonthDay";
                day.onclick = minusMonth;
            }
        } else {
            day.className = "calendarDay";
            day.onclick = () => {};
        }

        fillCell(day, dayToFill.getDate());
        dayToFill.setDate(dayToFill.getDate() + 1);
    }

}



fillCalendar(date);



