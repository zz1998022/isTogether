//  引入连接池
const pool = require("../Config/dbconfig");

// 添加广场数据
module.exports.addOneArticle = (option) => {
    // 获取用户id
    let uid = option.uid;
    // 获取用户发布时间
    let publishTime = option.publishTime;
    // 获取用户文章内容
    let content = option.content;
    // 获取用户是否要发布到广场
    let findMates = option.findMates;
    // 回调函数
    let callback = option.callback;

    // 创建sql
    let sql = `insert into center(use_id, publishTime, content, findMates) values("${uid}","${publishTime}","${content}","${findMates}")`;

    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        // 执行回调
        callback(results);
    })
}

// 获取广场数据
module.exports.getArticleInCenter = (uid,callback)=>{
    let sql = `select * from center as c join users as u on c.use_id=u.use_id where findMates = '1' and c.use_id != '${uid}' order by c.publishTime desc;`;
    pool.query(sql, (error,results)=>{
        if (error) throw error;
        callback(results);
    })
}
// 获取用户自己发表的文章
module.exports.getMeArticle = (uid,callback) => {
    // 创建sql
    let sql = `select * from center where use_id = '${uid}';`;
    // 执行查询
    pool.query(sql,(error,results) => {
        if (error) throw error;
        // 执行回调函数
        callback(results);
    })
}
// 获取用户的个人数据
module.exports.getProfile = (uid,callback) => {
    // 创建sql
    let sql = `SELECT \`use_id\`,\`name\`,\`url\`,\`gender\`,\`bio\`,\`createTime\` FROM users WHERE use_id = '${uid}';`;
    // 执行sql
    pool.query(sql,(error,result) => {
        if (error) throw error;
        callback(result);
    })
}