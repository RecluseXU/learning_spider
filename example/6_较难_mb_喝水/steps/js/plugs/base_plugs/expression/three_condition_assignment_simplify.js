// 把 a = m?11:22; 转成 m ? a = 11 : a = 22;
// 1.节点类型变了，由 AssignmentExpression 类型变成了ConditionalExpression 类型
// 2.ConditionalExpression 子节点的 consequent 和 alternate 都变成了 AssignmentExpression 类型

const { BasePlug, types, parser, generator, traverse } = require("../base");

const visitor = {
    ExpressionStatement(path){
        let {left, right} = path.node.expression;
        if(!types.isIdentifier(left) | !types.isConditionalExpression(right)){return;}
        let {consequent, alternate} = right
		let {node} = path;
        node.expression.right.consequent = types.AssignmentExpression('=', left, consequent)
        node.expression.right.alternate = types.AssignmentExpression('=', left, alternate)
        node.expression = path.node.expression.right
		path.replaceInline(node)
    }
}


const plug = new BasePlug(
    'Assignment Three ConditionExpression simplify',
    visitor,
    '三元表達式賦值簡化',
)
exports.default = plug;

// function demo() {
//     const jscode = `
// 		function a(){
// 			var a
//             a = m? 11:22;
//         }
// 	`;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()
