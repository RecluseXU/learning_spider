// 删除仅用于返回 window 对象的函数
const {BasePlug, types, parser, generator, traverse} = require("../base_plugs/base");

const visitor = {
    
    LogicalExpression(path){
        // 语句直接写在函数体内，并不嵌套
        if(!types.isExpressionStatement(path.parent)){return}
        const {left, right, operator} = path.node;
        // 符号及左右类型检查
        if(operator !== '||' || !types.isMemberExpression(left) || !types.isAssignmentExpression(right)){return}
        // 关键词检查
        if(left.object.name !== 'window' || !types.isStringLiteral(left.property) || left.property.value !== 'atob'){return}
        if(!types.isMemberExpression(right.left) || right.left.object.name !== 'window'){return}

        path.getStatementParent().remove()
    },
}

const plug = new BasePlug(
    'Delete window.atob detact and define',
    visitor,
    '删除window["atob"]的检测定义',
)
exports.default = plug;


// function demo(){
//     var jscode = `
//     (function () {
//       window["atob"] || (window["atob"] = function (_0x2b6847) {
//         var _0x33bf6d = String(_0x2b6847)["replace"](/=+$/, "");

//         var _0x13ecf1 = "";

//         for (var _0x45fa0a = 0, _0x423957, _0x362ca3, _0x1525b2 = 0; _0x362ca3 = _0x33bf6d["charAt"](_0x1525b2++); ~_0x362ca3 && (_0x423957 = _0x45fa0a % 4 ? _0x423957 * 64 + _0x362ca3 : _0x362ca3, _0x45fa0a++ % 4) ? _0x13ecf1 += String["fromCharCode"](255 & _0x423957 >> (-2 * _0x45fa0a & 6)) : 0) {
//           _0x362ca3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="["indexOf"](_0x362ca3);
//         }

//         return _0x13ecf1;
//       });
//     })();
//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);
// }
// demo()
