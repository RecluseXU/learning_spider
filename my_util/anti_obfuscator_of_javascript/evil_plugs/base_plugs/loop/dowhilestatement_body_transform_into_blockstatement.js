// 如果控制流语句主体没有{}，那么加上
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    DoWhileStatement(path){
        let statement_body = path.node.body;
        if(types.isBlockStatement(statement_body))return;
        path.node.body = types.BlockStatement([statement_body])
    }
}

const plug = new BasePlug(
    'DoWhileStatement body transform into BlockStatement',
    visitor,
    'dowhile 语句体是单语句且无括号括起来时添加括号'
);
exports.default = plug;


function demo(){
    var jscode = `
        var i = 0;
        for(; i<10; i++) i += 1;
        do
            i += 1;
        while(i<1) 

        if(i < 1) i += 1;
    `;
    let ast = parser.parse(jscode);
    plug.handler(ast)
    console.log(generator(ast)['code']);
}
demo()