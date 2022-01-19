// calendar.js

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


let today = new Date(); // Getting today date
let date; // Define global date variable
let notes; // Define global notes variable

/*Define notes object*/
// if (localStorage.getItem('notes')) {
//     notes = JSON.parse(localStorage.getItem('notes'));
// } else {
//     localStorage.setItem('notes', '{}');
//     notes = JSON.parse(localStorage.getItem('notes'));
// }

/*Define date object*/
// if (sessionStorage.getItem('localDate')) {
//     date = new Date(Date.parse(sessionStorage.getItem('localDate')));
// } else {
//     date = new Date();
// }



let convertedToday = `${today.getFullYear()} ${today.getMonth()} ${today.getDate()}`;

// Function for generating unqiue key for each current month date cell 
function genKey(date) {
    if (date.getMonth().toString().length == 1) {
        return `${date.getFullYear()}0${date.getMonth()}${date.getDate()}`;
    } else {
        return `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
    }
    
}




// ========================================= OLD localstorage way =========================================


// Function for loading notes from local storage
function loadNotesObject() {
    return JSON.parse(localStorage.getItem('notes'));
}

// Function for saving notes to local storage
function saveNotesObject(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function for checking that the note exists
function checkNote(id) {
    let notes = loadNotesObject();
    return notes[id] ? true : false;
}

// Function for saving date to session storage
function saveDate(date) {
    sessionStorage.setItem('localDate', date);
}

// =========================================================================================================


// ========================================= NEW RESTfull API way =========================================


// Function for loading notes from local storage
function loadNotesObject() {
    return JSON.parse(localStorage.getItem('notes'));
}

// Function for saving notes to local storage
function saveNotesObject(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function for checking that the note exists
function checkNote(id) {
    let notes = loadNotesObject();
    return notes[id] ? true : false;
}

// Function for saving date to session storage
function saveDate(date) {
    sessionStorage.setItem('localDate', date);
}

// =========================================================================================================

// Function for decrementing month value
function minusMonth() {
    date.setMonth(date.getMonth() - 1);
    saveDate(date);
    fillCalendar(date);
}

// Function for incrementing month value
function plusMonth() {
    date.setMonth(date.getMonth() + 1);
    fillCalendar(date);
    saveDate(date);
}

// Function for getting calendar start date
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

// Function for filling cells
function fillCell(cell, text) {
    if (checkNote(cell.id)) {
        cell.innerHTML = `${text} 
        <div class='note-circle'></div>`;
    } else {
        cell.innerHTML = text;
    }
 
}

// Function for clearing all cells to default class
function defaultAllCells() {
    let calendar = document.querySelectorAll("div[class*='Day']");
    for (let day of Array.from(calendar)) {
        day.className = "calendarDay";
        day.onclick = () => {};
    }
}

// Function for removing date selection border
function removeDateSelection() {
    let calendar = document.querySelectorAll("div[class*='Choosen']");
    for (let day of Array.from(calendar)) {
        if (day.className == "calendarChoosenToDay") {
            day.className = "calendarToDay";
        } else {
            day.className = "calendarDay";
        }
    }
}

function highlightDay() {
    removeContextMenu();
    removeDateSelection();
    if (this.className == "calendarToDay") {
        this.className = "calendarChoosenToDay";
    } else {
        this.className = "calendarChoosenDay";
    }    
}

// Function to find specified parent element
function getParentByClass(element, className) {
    let finalParent = element.closest(`.${className}`);
    return finalParent;
}

// Function for adding note
function addNote(element) {
    // let notes = loadNotesObject();
    let noteText = document.getElementById('note-text').value;
    let cellId;

    if (getParentByClass(element, 'calendarDay')) {
        cellId = getParentByClass(element, 'calendarDay').id;
    } else if (getParentByClass(element, 'calendarChoosenDay')) {
        cellId = getParentByClass(element, 'calendarChoosenDay').id;
    } else if (getParentByClass(element, 'calendarToDay')) {
        cellId = getParentByClass(element, 'calendarToDay').id;
    } else {
        cellId = getParentByClass(element, 'calendarChoosenToDay').id;
    }

    if (noteText) {
        if (notes[cellId]) {
            if (notes[cellId][noteText]) {
                alert("Such note already exists!");
            } else {
                notes[cellId][noteText] = noteText;
            }
        } else {
            notes[cellId] = {};
            notes[cellId][noteText] = noteText;
        }
        saveNotesObject(notes);
        fillCalendar(date);
    } else {
        alert("Note can't be empty!");
    }
}

// Function for clearing note's text in a form
function discardNote() {
    document.getElementById('note-text').value = "";
}


// Function to check if date is today
function isToday(dayToFill) {
    let convertedDay = `${dayToFill.getFullYear()} ${dayToFill.getMonth()} ${dayToFill.getDate()}`;

    return convertedDay === convertedToday;
}

// Function for inserting context memu by mouse right-click
function insertContextMenu(event) {
    removeContextMenu();
    removeNotesList();
    this.innerHTML += `<div id="addnote" class="note-context-menu-container">
        <div>Add note</div>
        <div><textarea id="note-text" class="note-input" placeholder="Type your note here..."></textarea></div>
        <div>
            <button class="note-save-button" onclick="addNote(this)">add</button>
            <button class="note-discard-button" onclick="discardNote()">discard</button>
        </div>
    </div>`;

    let noteWindow = document.getElementById('addnote');
    noteWindow.addEventListener('click', (event) => { event.preventDefault(), event.stopPropagation()});
    event.preventDefault()
    return false;
}

// Function for removing context menu
function removeContextMenu() {
    if (document.getElementById('addnote')) {
        document.getElementById('addnote').remove();
    };
}

// Function for checking if date contains notes
function hasNotes(notes, cellId) {
    return notes[cellId];
}

// Function for removing selected note
function removeNote(event) {
    let note = event.currentTarget;
    let noteToRemove = getParentByClass(note, "note");
    let noteText = note.nextElementSibling.textContent;
    let cellId;

    if (getParentByClass(note, 'calendarChoosenDay')) {
        cellId = getParentByClass(note, "calendarChoosenDay").id;
    } else {
        cellId = getParentByClass(note, "calendarChoosenToDay").id;
    }
    notes = loadNotesObject();
    delete notes[cellId][noteText];

    if (!Object.getOwnPropertyNames(notes[cellId]).length) {
        delete notes[cellId];
    }

    noteToRemove.remove();
    saveNotesObject(notes);

    fillCalendar(date);
}

// Function for invoking list of notes for selected date
function insertNotesList(event) {
    removeContextMenu();
    removeNotesList();
    let notes = loadNotesObject();
    let cellId = this.id;
    
    if (hasNotes(notes, cellId)) {
        let notesList = document.createElement('div');
        notesList.id = "notes-list";
        notesList.style.gridTemplateRows = `repeat(${Object.getOwnPropertyNames(notes[cellId]).length}, 20px)`;
        notesList.className = "notes-list";

        let notesMaxLength = Math.max(...(Object.getOwnPropertyNames(notes[cellId])).map(item => item.length));

        for (let note in notes[cellId]) {
            let noteSelf = document.createElement('div');

            noteSelf.className = "note";
            noteSelf.style.width = `${notesMaxLength}em`;            
            
            let noteRemove = document.createElement('div');
            noteRemove.className = "note-remove";
            noteRemove.innerHTML = "X";
            noteRemove.onclick = removeNote;

            let noteContent = document.createElement('div');
            noteContent.className = "note-content";
            noteContent.innerHTML = note;        

            noteSelf.append(noteRemove);
            noteSelf.append(noteContent);
            notesList.append(noteSelf);

        }

        this.append(notesList);
        event.preventDefault();
    }
}

// Function for removing notes list
function removeNotesList() {
    if (document.getElementById('notes-list')) {
        document.getElementById('notes-list').remove();
    };
}

// Function for filling calendar
function fillCalendar(date) {
    defaultAllCells();

    let dayToFill = getStartOfCalendar(date);

    let calendar = document.querySelectorAll("div[class*='Day']");
    
    let monthAndYear = document.getElementsByClassName("calendarMonthAndYear");

    monthAndYear[0].innerHTML = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

    for (let day of Array.from(calendar)) {
        if (isToday(dayToFill)) {
            day.className = "calendarToDay";
            day.onclick = highlightDay;
            day.id = genKey(dayToFill);
            day.addEventListener('contextmenu', insertContextMenu);
            day.addEventListener('click', insertNotesList);
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
            day.onclick = highlightDay;
            day.id = genKey(dayToFill);
            day.addEventListener('contextmenu', insertContextMenu);
            day.addEventListener('click', insertNotesList);
        }

        fillCell(day, dayToFill.getDate());
        dayToFill.setDate(dayToFill.getDate() + 1);
    }

}



fillCalendar(date);



