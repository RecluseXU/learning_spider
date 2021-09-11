// m? a=9:a=0; => if(m){a = 9;}else{ a = 0;}
// 1.判断特征，过滤掉一些不能转换的条件表达式，比如 嵌套的三目表达式有时候是不行的，还有m = a?b:c，这种也无法一步就转换成if语句。
// 2.构造一个 IfStatement 类型的节点
// 3.test 节点可用直接用
// 4.如果consequent  不是 ExpressionStatement 类型的节点，可以先将其转换为了ExpressionStatement 的节点，同理 alternate  也是
// 5.替换即可
const { BasePlug, types, parser, generator, traverse } = require("../base");

const visitor = {
    ConditionalExpression(path){            
        let parentPath = path.parentPath;
        if (parentPath.isAssignmentExpression() ||　parentPath.isConditionalExpression()){return;}

        let {test, consequent, alternate} = path.node;
        if (!types.isExpressionStatement(consequent)){consequent = types.ExpressionStatement(consequent);}
        if (!types.isExpressionStatement(alternate)){alternate = types.ExpressionStatement(alternate);}
        parentPath.replaceInline(
			types.IfStatement(
				test,
				types.BlockStatement([consequent]),
				types.BlockStatement([alternate]),
			)
		);
    },
}

const plug = new BasePlug(
    'Three Condition Convert Ifstatement',
    visitor,
    '三元表达式简化',
)
exports.default = plug;

// function demo() {
//     const jscode = `
// 		function a(){
//             m? a=9:a=0;
//         }
// 	`;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()