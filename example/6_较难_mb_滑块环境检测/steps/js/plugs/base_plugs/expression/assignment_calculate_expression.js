// Literal賦值計算語句轉化為普通的賦值與計算
// a += 1 轉變為 a = a + 1

const { BasePlug, types, parser, generator, traverse } = require("../base");


const visitor = {
    AssignmentExpression(path) {
        if (!types.isStatement(path.parentPath)) return;
        let { node } = path
        // if (!types.isLiteral(node.right) && !types.isIdentifier(node.right)) return;
        if (node.operator.length < 2) return;
        let operator = node.operator.substring(0, node.operator.length - 1)
        node.right = types.BinaryExpression(operator, node.left, node.right);
        node.operator = '=';
        path.replaceInline(node);
    },
}

const plug = new BasePlug(
    'Assignment Calculate Expression convert BinaryExpression',
    visitor,
    'Literal賦值計算語句轉化為普通的賦值與計算',
)
exports.default = plug;

// function demo() {
//     const jscode = `
// 		function a(){
//             var a = 0;
//             a += 1;
//             a *= a;
//             a <<= 1;
//             a += String.fromCharCode(a);
//         }
// 	`;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()
