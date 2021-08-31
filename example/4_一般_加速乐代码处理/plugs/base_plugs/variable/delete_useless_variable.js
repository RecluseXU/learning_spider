// 删除定义了，却从未使用的变量
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    VariableDeclarator(path){
        const binding = path.scope.getBinding(path.node.id.name);
        if(binding && !binding.referenced && binding.constant){
            path.remove();
        }
    }
}

const plug = new BasePlug(
    'delete_useless_variable',
    visitor,
    '删除定义了，却从未使用的变量',
)
exports.default = plug;


// function demo(){
//     var jscode = `
//         var _0x8984 = 'a';
//         var _0x8556 = 1;
//         var _0x8982 = {};
//         var _0x5536 = function(_0x4424){
//             console.log('Well')
//         }
//         _0x5536(_0x8984);
//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
// }
// demo()