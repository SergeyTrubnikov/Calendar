// notes_tasks.js

class Notes {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        note_date TEXT,
        note TEXT)
        `
        return this.dao.run(sql, (err) => {
            if (err) {
                throw err;
            } else {
                console.log(`Table notes created`)
            }
        })
    }

    createNote(note_date, note) {
        const sql = `INSERT INTO notes (note_date, note) VALUES (?, json(?))`
        return this.dao.run(sql, [note_date, note])
    }

    getNote(note_date, id) {
        const sql = `SELECT * FROM notes WHERE note_date = ? AND id = ?`
        return this.dao.get(sql, [note_date, id])
    }

    getNotes(note_date) {
        const sql = `SELECT * FROM notes WHERE note_date = ?`
        return this.dao.all(sql, [note_date])
    }

    deleteNote(note_date, id) {
        const sql = `DELETE FROM notes WHERE note_date = ? AND id = ?`
        return this.dao.run(sql, [note_date, id])
    }
}

module.exports = Notes;