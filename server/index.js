import express from "express";
import cors from "cors";
import mysql from "mysql";
const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/info", cors(), (req, res) => {
    getInfo(res);
});

app.get("/todo", cors(), (req, res) => {
    getTodo(req.query.date, res);
});

app.delete("/todo", cors(), (req, res) => {
    deleteTodo(req.body.id, res);
});

app.post("/todo", cors(), (req, res) => {
    if (req.body.data.text) {
        setTodo(req.body.data.date, req.body.data.text, req.body.data.type, req.body.data.progress, res);
    }
});

const dbconnect = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "diary",
};

app.listen(PORT);

function getInfo(callback) {
    const connection = mysql.createConnection({
        ...dbconnect,
    });
    connection.connect();
    connection.query("SELECT * FROM `info`", function(err, rows) {
        if (err) throw err;
        let data = {};
        rows.forEach((element) => {
            data[element.name] = element.text;
        });
        callback.status(200).json(data);
        connection.end();
    });
}

function getTodo(date, callback) {
    const connection = mysql.createConnection({
        ...dbconnect,
    });
    connection.connect();
    connection.query(`SELECT * FROM todo WHERE todo.date='${date}'`, function(err, rows) {
        if (err) throw err;
        callback.status(200).json(rows);
        connection.end();
    });
}

function setTodo(date, text, type, progress, callback) {
    const connection = mysql.createConnection({
        ...dbconnect,
    });

    var sql = `INSERT INTO todo (id, date, text, type, progress) VALUES (NULL, '${date}', '${text}', '${type}', '${progress}')`;
    connection.connect();
    connection.query(sql, function(err) {
        if (err) throw err;
        callback.status(200).json(true);
        connection.end();
    });
}

function deleteTodo(id, callback) {
    const connection = mysql.createConnection({
        ...dbconnect,
    });

    var sql = `DELETE FROM todo WHERE todo.id = ${id}`;
    connection.connect();
    connection.query(sql, function(err) {
        if (err) throw err;
        callback.status(200).json(true);
        connection.end();
    });
}