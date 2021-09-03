// 单语句 a++ 转化为 a = a + 1

const { BasePlug, types, parser, generator, traverse } = require("../base");


const visitor = {
    UpdateExpression(path) {
        if (!types.isStatement(path.parentPath)) return;
        let { node } = path
        path.replaceInline(
            types.AssignmentExpression(
                '=',
                types.Identifier(node.argument.name),
                types.BinaryExpression(
                    node.operator[0],
                    types.Identifier(node.argument.name),
                    types.NumericLiteral(1),
                )
            )
        )

    },
}

const plug = new BasePlug(
    'UpdateExpression Statement convert AssignmentExpression',
    visitor,
    '单自增自减语句转化为计算赋值语句',
)
exports.default = plug;

// function demo() {
//     const jscode = `
// 		function a(){
//             var a = 0;
//             a++;
//             ++a;
//             if(a++)
//                 console.log('!')
//         }
// 	`;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()
