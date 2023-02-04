import express from "express";

const PORT = 5000
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    // console.log(req.query);
    console.log(req.body)
    res.status(200).json('Сервер работает')
})

app.listen(PORT)