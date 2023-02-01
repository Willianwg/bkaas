import express from "express";
import { Client } from "pg";
import { randomUUID } from "node:crypto";

let count = 1;

const client = new Client({
    host: 'localhost',
    user: 'database',
    password: 'database',
    database: "database",
    port: 5432,
})

client.connect(err => {
    if (err) {
        return console.error(err);
    }

    createUserTable()

})

function createUserTable() {

        const createUserTableSql =
            `CREATE TABLE users (
            ID INT NOT NULL,
            NAME VARCHAR(250) NOT NULL,
            EMAIL VARCHAR(250) NOT NULL UNIQUE
        );`;

        client.query(createUserTableSql, (err, result) => {
            if (err) {
                return console.error("err");
            }
            console.log(result);
        })
}

function createUser(name: string, email: string) {

    const id = count;
    count ++;
    const createUserSql =
        `INSERT INTO users (ID, NAME, EMAIL)
         VALUES (${id}, ${name}, ${email});`;

    client.query(createUserSql, (err, result) => {
        if (err) {
            return console.error(err);
        }
        console.log(result);
    })
}


function getAllUsers() {
    const getUsersSql = `SELECT * FROM users;`;
    client.query(getUsersSql, (err, result)=>{
        console.log(result)
    })
}

const app = express();

app.use(express.json());
app.disable('x-powered-by');

app.get("/", (req, res) => {
    return res.status(200).send("nice");
})

app.post("/create", (req, res) => {

    const send = {
        name: req.body.name,
        email: req.body.email
    }

    createUser(send.name, send.email);

    return res.json({ send });
})

app.get("/users", (req, res) => {
    getAllUsers();
})

export default app;

