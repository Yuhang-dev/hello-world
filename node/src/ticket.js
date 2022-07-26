module.exports = function(options){
    //options参数结构 { app, mysql }
    var app = options.app;
    var mysql = options.mysql;

    //console.log(11122, app, mysql)
    app.post('/ticket/new', (req,res)=>{
        //req请求对象，res响应对象
        //入参规则
        /*
            { title, type, severity, reasonForUrgency, expectedSolveDate, sn, assignee, copiedAuto, copiedManual, description }
        */

        //出参规则
        /*
            {
                code: 0,//业务错误码，0表示成功，非0都是错误
                message: '业务错误信息',
                data: 1 //id值
            }
        */
        var body = req.body;
        //console.log(body,998)
        var query = `insert into test_db.ticket (title, type, severity, reasonForUrgency, expectedSolveDate, sn, assignee, copiedAuto, copiedManual, description ) value ('${body.title}', '${body.type}', '${body.severity}', '${body.reasonForUrgency}', '${body.expectedSolveDate ? body.expectedSolveDate : new Date().getTime()}', '${body.sn}', '${body.assignee}', '${body.copiedAuto}', '${body.copiedManual}', '${body.description}')`;

        mysql.query(query, function (error, results, fields) {
            if (error) throw error;
            console.log('/ticket/new', results);

            res.send({
                code: 0,//业务错误码，0表示成功，非0都是错误
                message: 'success',
                data: results.insertId //id值
            });
        });
    });



    var users = [//假设有这么一个用户表
        {id: 1, name: 'Tom'},
        {id: 2, name: 'Jack'},
        {id: 3, name: 'Rick'}
    ];

    app.get('/ticket/detail', (req, res)=>{
        //req请求对象，res响应对象
        var id = req.query.id;
            
        var query = `SELECT * FROM test_db.ticket where id=${id}`;
        mysql.query(query, function (error, results, fields) {
            if (error) throw error;
            //console.log('/ticket/detail', results);
            if(results.length == 0){
                res.send({
                    code: 404,//业务错误码，0表示成功，非0都是错误, 404找不到
                    message: 'Not Found',
                });
            }
            else{
                var data = results[0];
                //将手动的copy者的id直接映射为name值
                if(data.copiedManual){
                    data.copiedManual = data.copiedManual.split(',').map(id=> users.filter(user => user.id == id)[0].name);
                }
                else{
                    data.copiedManual = [];
                }

                res.send({
                    code: 0,//业务错误码，0表示成功，非0都是错误
                    message: 'success',
                    data //id值
                });
            }
        });
    });

    //模拟用户列表接口
    app.get('/users', (req, res)=>{
        res.send({
            code: 0,//业务错误码，0表示成功，非0都是错误
            message: 'success',
            data: users //id值
        });
    });


    app.get('/tickets/list',(req,res)=>{
        //入参规则
         /*
            { currentPage, pageSize }
        */

        //出参规则
        /*
            {
                code: 0,//业务错误码，0表示成功，非0都是错误
                message: '业务错误信息',
                data: {
                    table: [{
                        id,
                        title,
                        type
                    }],
                    currentPage: 1,
                    pageSize: 1,
                    total: 10
                }
            }
        */
        var query = req.query;

        var mysqlQuery = `SELECT id,title,type FROM test_db.ticket limit ${(query.currentPage - 1)* query.pageSize}, ${query.pageSize}`;

        mysql.query('SELECT id FROM test_db.ticket', function (error, results, fields) {
            if (error) throw error;
            var total = results.length;//总数

            mysql.query(mysqlQuery, function (error, results, fields) {
                if (error) throw error;
                res.send({
                    code: 0,//业务错误码，0表示成功，非0都是错误
                    message: 'success',
                    data: {
                        table: results,
                        currentPage: query.currentPage,
                        pageSize: query.pageSize,
                        total: total
                    }
                });
            });
        });
        
    });
}