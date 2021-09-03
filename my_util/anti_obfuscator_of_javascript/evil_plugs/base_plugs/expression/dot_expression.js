// 逗号表达式转为多个语句，本质上是为了让代码能被之前的插件处理
// 完全没有必要为了这种表达式特别写多一些代码

// 1.需要处理的是 ExpressionStatement 节点
// 2.子节点expression是SequenceExpression类型
// 3.对 expressions 里面的节点分别进行处理，将其变成新的 ExpressionStatement  节点即可
// 4.处理完成后进行替换

const {BasePlug, types, parser, generator, traverse} = require("../base");


const visitor = {
     SequenceExpression(path){
		if(! types.isStatement(path.parentPath)) return;
        let new_statements = [];
        path.node.expressions.forEach(express=>{
            new_statements.push(types.ExpressionStatement(express));
        })
        path.replaceInline(new_statements);
    },
}

const plug = new BasePlug(
   '逗號表達式拆分多語句',
   visitor,
   '将多個逗號表達式拆分成多個語句',
)
exports.default = plug;

function demo(){
    const jscode = `
		var k
		k += "doN", k += "tne", e = k ? 4 : 1;
	`;
    let ast = parser.parse(jscode);
    plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()
