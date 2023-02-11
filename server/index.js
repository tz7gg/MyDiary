import express from "express";
import cors from "cors"
import mysql from 'mysql'
const PORT = 5000

const app = express()
app.use(express.json())
app.use(cors())

app.get('/info', cors(), (req, res) => {
    getInfo(res)

})

app.get('/todo', cors(), (req, res) => {
    getTodo(res)
})

app.delete('/todo', cors(), (req, res) => {
    deleteTodo(req.body.id, res)
})

app.post('/todo', cors(), (req, res) => {

    const date = req.body.data.date
    const text = req.body.data.text
    const type = req.body.data.type
    const progress = req.body.data.progress

    if (req.body.data.text) {
        setTodo(date, text, type, progress, res)
    }
})

const dbconnect = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'diary'
}

app.listen(PORT)

function getInfo(callback) {
    const connection = mysql.createConnection({
        ...dbconnect
    });
    connection.connect();
    connection.query('SELECT * FROM `info`', function(err, rows) {
        if (err) throw err;
        let data = {}
        rows.forEach((element) => {
            data[element.name] = element.text
        });
        callback.status(200).json(data)
        connection.end()
    });

}


function getTodo(callback) {
    const connection = mysql.createConnection({
        ...dbconnect
    });
    connection.connect();
    connection.query('SELECT * FROM `todo`', function(err, rows) {
        if (err) throw err;
        callback.status(200).json(rows)
        connection.end()
    });

}

function setTodo(date, text, type, progress, callback) {

    const connection = mysql.createConnection({
        ...dbconnect
    });

    var sql = `INSERT INTO todo (id, date, text, type, progress) VALUES (NULL, '${date}', '${text}', '${type}', '${progress}')`;
    connection.connect()
    connection.query(sql, function(err, result) {
        if (err) throw err;
        callback.status(200).json(true)
        connection.end()
    });
}


function deleteTodo(id, callback) {
    const connection = mysql.createConnection({
        ...dbconnect
    });

    var sql = `DELETE FROM todo WHERE todo.id = ${id}`;
    connection.connect()
    connection.query(sql, function(err, result) {
        if (err) throw err;
        callback.status(200).json(true)
        connection.end()
    });
}