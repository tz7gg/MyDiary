import express from "express";
import cors from "cors";
import mysql from "mysql";
import bcrypt from "bcrypt";

const PORT = process.env.PORT || 5000;
const dbconnect = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "diary",
};
const mySalt = "$2b$10$ZNH2YiTH9DvCTbz6KtjmOO";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT);

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
    const data = req.body.data;
    if (req.body.data.text) {
        setTodo(data.date, data.text, data.type, data.progress, res);
    }
});

app.post("/user", cors(), (req, res) => {
    const data = req.body.data;
    if (data.login && data.password) {
        canCreateUser(data.login, data.password, res);
    }
});

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
    connection.query(
        `SELECT * FROM todo WHERE todo.date='${date}'`,
        function(err, rows) {
            if (err) throw err;
            callback.status(200).json(rows);
            connection.end();
        }
    );
}

function setTodo(date, text, type, progress, callback) {
    const connection = mysql.createConnection({
        ...dbconnect,
    });
    const sql = `INSERT INTO todo (id, user, date, text, type, progress) VALUES (NULL, '0', '${date}', '${text}', '${type}', '${progress}')`;
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

function canCreateUser(login, password, callback) {
    const connection = mysql.createConnection({
        ...dbconnect,
    });
    connection.query(
        `SELECT login FROM user WHERE user.login='${login}'`,
        function(err, rows) {
            if (err) throw err;
            connection.end();
            if (!rows.length) {
                createUser(login, password, callback)
            } else {
                callback.status(200).json({ message: 'такой пользователь уже существует' });
            }
        }
    );
}

function createUser(login, password, callback) {
    const salt = bcrypt.genSaltSync(10);

    let passwordToSave = bcrypt.hashSync(password, salt);
    passwordToSave = bcrypt.hashSync(passwordToSave, mySalt);

    const connection = mysql.createConnection({
        ...dbconnect,
    });
    const sql = `INSERT INTO user (id, login, password, salt) VALUES (NULL, "${login}", "${passwordToSave}", "${salt}")`;
    connection.connect();
    connection.query(sql, function(err) {
        if (err) throw err;
        callback.status(200).json({ message: "Пользователь успешно создан" });
        connection.end();
    });
}