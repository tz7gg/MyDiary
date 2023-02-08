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

app.post('/todo', cors(), (req, res) => {

    const date = req.body.data.date
    const text = req.body.data.text
    const type = req.body.data.type

    if (req.body.data.text) {
        setTodo(date, text, type, res)
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
    });

}

function setTodo(date, text, type, callback) {

    const connection = mysql.createConnection({
        ...dbconnect
    });
    connection.connect(function(err) {
        if (err) throw err;
        var sql = `INSERT INTO todo (id, date, text, type, progress) VALUES (NULL, '${date}', '${text}', '${type}', '')`;
        connection.query(sql, function(err, result) {
            if (err) throw err;
            callback.status(200).json(true)
        });
    });
}