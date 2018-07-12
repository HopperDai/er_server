const mysql = require('mysql');
const config = require('../config');
const assert = require('assert');

let db = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
});

function filterValue(val) {
    // 可能是数字，需 toString；数据存在的 '/" 是敏感的，需转义->安全性
    return val.toString().replace(/'/g, "\\'").replace(/"/g, "\\\"");
}

/* 封装自己的数据库，配合 await */

db._query = db.query; //储存原来的 query

db.query = (sql) => {
    return new Promise((resolve, reject) => {
        db._query(sql, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/* 增
1. 方便
2. 方便换数据库
3. 校验、缓存...
*/
db.insert = (table, data) => {
    let keys = [];
    let vals = [];

    for (let key in data) {
        keys.push(key);
        vals.push(`'${filterValue(data[key])}'`);
    }

    let sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${vals.join(',')})`;
    return db.query(sql);
}

/* 删 */
db.delete = (table, where) => {
    assert(where); // 必须传where,否则会把整个表的数据都删了
    assert(typeof where == 'object');

    let arr = [];
    for (let key in where) {
        arr.push(`${key}='${filterValue(data[key])}'`);
    }
    let sql = `DELETE FROM ${table} WHERT ${arr.join(' AND ')}`;
    return db.query(sql);
}

/* 更新 */
db.update = (table, ID, data) => {
    let arr = [];
    for (let key in data) {
        arr.push(`${key}='${filterValue(data[key])}'`);
    }

    let sql = `UPDATE ${table} SET ${arr.join(',')} WHERE ID='${ID}'`;
    console.log(sql);
    return db.query(sql);
}

/* 查 */
db.select = (table, fields, where) => {
    if (!where) {
        where = '1=1';
    } else {
        let arr = [];
        for (let key in where) {
            arr.push(`${key}='${filterValue(where[key])}'`);
        }
        where = arr.join(' AND ');
    }

    let sql = `SELECT ${fields} FROM ${table} WHERE ${where}`;
    return db.query(sql);
}

module.exports = db;