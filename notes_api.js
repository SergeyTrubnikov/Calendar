// notes_api.js

const serverUrl = 'http://127.0.0.1:5000/api'

export function getNotes(note_date) {
    return new Promise((resolve, reject) => {
        fetch(`${serverUrl}/notes/${note_date}`)
            .then(response => response.json())
            .then(data => console.log(data))
    })
}

