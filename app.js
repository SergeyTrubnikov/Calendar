const express = require('express')
const path = require('path')
const fs = require('fs')
const AppDAO = require('./dao.js')
const Notes = require('./notes_tasks')


const dbName = 'notes.db'
const dbPath = path.join(__dirname, dbName)

const app = express()
const PORT = '5000'

const dao = new AppDAO(dbPath)
const note_task = new Notes(dao)

note_task.createTable(dbPath)

const note1 = {
    note_date: '20220101',
    note: 'Go to shop'
}

// note_task.createNote(note1.note_date, JSON.stringify(note1.note))
// note_task.getNotes(note1.note_date).then((notes) => console.log(notes))

app.use(express.static(path.join(__dirname)))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/notes/:note_date', (req, res) => {
    const note_date = req.params.note_date
    note_task.getNotes(note_date)
        .then((notes) => {
            if(notes) {
                console.log(notes)
                res.send(notes)
            } else {
                res.status(404).send()
            }
        })
})

app.get('/api/notes/:note_date/:id', (req, res) => {
    const note_date = req.params.note_date
    const note_id = req.params.id
    note_task.getNote(note_date, note_id)
        .then((note) => {
            if(note) {
                console.log(note)
                res.send(note)
            } else {
                res.status(404).send()
            }
        })
})

app.listen(PORT, () => {
    console.log('Server successfully started on port', PORT)
})