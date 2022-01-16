// dao.js

const sqlite3 = require('sqlite3')
const Promise = require('bluebird')
const { reject } = require('bluebird')

class AppDAO {
    // Constructor for database initialization
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('Connected to database')
            }
        })
    }

    // Method for inserting and modifying data
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql', sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({id: this.lastID})
                }
            })
        })
    }

    // Method for getting single note
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql', sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    // Method for getting all notes
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, results) => {
                if (err) {
                    console.log('Error running sql', sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(results)
                }
            })
        })
    }
}

module.exports = AppDAO

