// 引入mysql模块
const mysql = require("mysql");

// 创建连接池
const pool = mysql.createPool({
	// 数据库联接地址
    host: "",
	// 数据库用户名
    user: "",
	// 数据库密码
    password: "",
    database: "sns"
})

// 导出数据库连接池
module.exports = pool;