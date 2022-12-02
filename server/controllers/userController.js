const connection = require("../db/mysql");

// db settings

const table = "users";

function getUsers(req, res) {
    const sql = `SELECT * FROM ${table}`;
    var users = [];

    connection.query(sql, (err, results, fields) => {
        console.log(results);
        for (let i = 0; results.length > i; i++) {
            users.push({
                id: results[i].user_id,
                email: results[i].email,
                password: results[i].password,
                created_at: results[i].created_at,
                user_status: results[i].user_status,
            });
        }
        console.log(users);
        res.send(users);
    });
}

function addUsers(req, res) {
    let { email, password, user_status } = req.body;

    console.log(user_status);
    let sql = `INSERT INTO ${table} SET ?`;
    var obj = { email, password, user_status: user_status || "inactive" };

    connection.query(sql, obj, (err, results, fields) => {
        console.log(fields);
        console.log(results);
        if (err) throw err;
        else {
            res.send("Usuário cadastrado.");
        }
    });
}

function getDataFromId(req, res) {
    var user = [];
    const { id } = req.params;
    const sql = `SELECT * FROM ${table} WHERE user_id=${id}`;

    connection.query(sql, (err, results, fields) => {
        for (let i = 0; results.length > i; i++) {
            user.push({
                id: results[i].user_id,
                email: results[i].email,
                password: results[i].password,
                createdAt: results[i].createdAt,
                status: results[i].status,
            });
        }
        console.log(user);
        res.send(user);
    });
}

function deleteUser(req, res) {
    const { id } = req.params;
    const sql = `DELETE FROM ${table} WHERE user_id=${id}`;

    connection.query(sql, (err, results, field) => {
        if (err) throw err;
        else {
            res.send("Deletado com sucesso.");
        }
    });
}

function updateUser(req, res) {
    const { id } = req.params;
    let { email, password, user_status } = req.body;

    var obj = { email, password, user_status };

    const sql = `UPDATE ${table} SET ? WHERE user_id=${id}`;

    connection.query(sql, obj, (err, results, field) => {
        if (err) throw err;
        else {
            res.send("Atualizado com sucesso.");
        }
    });
}

module.exports = { getUsers, addUsers, getDataFromId, deleteUser, updateUser };
