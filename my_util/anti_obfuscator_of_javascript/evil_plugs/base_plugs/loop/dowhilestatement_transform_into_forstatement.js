/*
    将do-while 转化为for
    请确保其body部分是一个BlockStatement
*/

const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;

const visitor = {
    DoWhileStatement(path){
        if(!t.isBlockStatement(path.node.body)){
            console.error('函数体并非BlockStatement，退出')
            return;
        }
        for(node of path.node.body.body){
            path.insertBefore(node); 
        }
        path.replaceInline(t.forStatement(null, path.node.test, null, path.node.body))
    },
}

exports.default = new BasePlug(
    'WhileStatement transform into ForStatement',
    visitor,
    '将 while循环 转换为 for循环',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var i = 0;
        for(; i<10; i++) i += 1;

        do{
            i += 2;
            i -= 1;
        }while(i<1);

        if(i < 1) i += 1;
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'WhileStatement transform into ForStatement',
        visitor,
        '将while循环 转化为for循环'
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);
}
demo()