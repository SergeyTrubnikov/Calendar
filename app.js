const express = require('express')
const path = require('path')
const fs = require('fs')
const AppDAO = require('./dao.js')
const Notes = require('./notes_tasks')
const thenables = require('bluebird/js/release/thenables')


const dbName = 'notes.db'
const dbPath = path.join(__dirname, dbName)

const app = express()
const PORT = '5000'

const dao = new AppDAO(dbPath)
const note_task = new Notes(dao)

