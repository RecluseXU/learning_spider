// 逗号表达式转为多个语句，本质上是为了让代码能被之前的插件处理
// 完全没有必要为了这种表达式特别写多一些代码

// 1.需要处理的是 ExpressionStatement 节点
// 2.子节点expression是SequenceExpression类型
// 3.对 expressions 里面的节点分别进行处理，将其变成新的 ExpressionStatement  节点即可
// 4.处理完成后进行替换

const {BasePlug, types, parser, generator, traverse} = require("../base");


const visitor = {
     SequenceExpression:{
         exit: function(path){
            if(! types.isStatement(path.parentPath)) return;
            let {expressions} = path.node;
            let new_statements = [];
            if(types.isExpressionStatement(path.parentPath)){
                // 普通表達式：逐一拿出
                expressions.forEach(express=>{
                    new_statements.push(types.ExpressionStatement(express));
                })
                path.replaceInline(new_statements);
            }else if(types.isReturnStatement(path.parentPath)){
                // 返回語句：最後一個表達式的值為返回值，其他拿出
                let last_expression = expressions.pop()
                expressions.forEach(express=>{
                    new_statements.push(types.ExpressionStatement(express));
                })
                new_statements.push(types.ReturnStatement(last_expression))
                path.replaceInline(new_statements);
            }
        }
    },
}

const plug = new BasePlug(
   'SequenceExpression convert Statement',
   visitor,
   '将多個逗號表達式拆分成多個語句',
)
exports.default = plug;

// function demo(){
//     const jscode = `
// 		var a;
//         a+1, a-1, a+1;
//         (function (e) {
//             return a = 1 + 1, 2 + 1, 3+1;
//         })()
// 	`;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()
