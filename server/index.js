import express from "express";
import cors from "cors"
import mysql from 'mysql'
const PORT = 5000

const app = express()
app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'diary'
});

connection.connect();

app.get('/info', cors(), (req, res) => {
    // console.log(req.body);
    getInfo(res)
})

app.listen(PORT)

function getInfo(callback) {
    connection.query('SELECT * FROM `info`', function(err, rows, fields) {
        if (err) throw err;
        let data = {}
        rows.forEach((element) => {
            data[element.name] = element.text
        });
        callback.status(200).json(data)
    });
}