module.exports = function(){

    var mysql = require('mysql');//引入mysql的包

    var pool  = mysql.createPool({
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',
        password        : 'root',
        database        : 'test_db'
    });


    return pool;
}