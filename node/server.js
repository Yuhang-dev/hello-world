var express = require('express');//require是node环境中自带的全局方法，加载包, //require(包的名字)默认从项目目录node_modules找，找不到再从全局的node_modules中找
//express是nodejs的一个框架

var path = require('path');//获取nodejs的path对象，path是nodejs自带的包

var mysqlFun = require('./src/mysql');

var ticketApi = require('./src/ticket');

//console.log(mysqlFun);
var mysql = mysqlFun();//mysql链接对象

var app = express();//创建一个应用对象

console.log(__dirname);//__dirname获取当前js运行的目录
//app.use(express.static(path.join(__dirname)));//应用对象使用静态资源加载中间件，并将__dirname + '/static'路径作为静态资源加载地址
app.use(express.urlencoded({extended: true}));//解析application/x-www-form-urlencoded的数据

app.use(express.json());//解析application/json的数据


ticketApi({ app, mysql });//ticket 接口生成

app.get('/app/test', (req, res)=>{
    //req请求对象, res响应对象
    console.log(req.query);
    var query = req.query;
    if(query.id == '1'){
        res.send('1111111');
    }
    else if(query.id == '2'){
        res.send('2222222');
    }
    else{
        res.send('other');
    }
});
//query   //url问号参数
//params //url路径参数
//body   //请求提参数
app.post('/app/new', (req, res)=>{
    console.log(req.body,'post');
    res.send('1111111222222');
});

//创建一个服务，7001是端口， http协议默认端口是80，https默认端口是433
app.listen(7001, ()=>{
    console.log('启动了, 7001');
});
