// 将do-while 转化为for
//   需要确保其body部分是一个BlockStatement

const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    DoWhileStatement(path){
        if(!types.isBlockStatement(path.node.body)){
            console.error('函数体并非BlockStatement，退出')
            return;
        }
        for(node of path.node.body.body){
            path.insertBefore(node); 
        }
        path.replaceInline(types.forStatement(null, path.node.test, null, path.node.body))
    },
}

const plug = new BasePlug(
    'WhileStatement transform into ForStatement',
    visitor,
    '将 while循环 转换为 for循环',
)
exports.default = plug;


function demo(){
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
    plug.handler(ast)
    console.log(generator(ast)['code']);
}
demo()