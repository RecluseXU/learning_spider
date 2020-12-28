// 逗号表达式转为多个语句，本质上是为了让代码能被之前的插件处理
// 完全没有必要为了这种表达式特别写多一些代码

// 1.需要处理的是 ExpressionStatement 节点
// 2.子节点expression是SequenceExpression类型
// 3.对 expressions 里面的节点分别进行处理，将其变成新的 ExpressionStatement  节点即可
// 4.处理完成后进行替换

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
var _0x4692f3 = {};

_0x4692f3[_0x46b8('0x89e')] = function(_0x4e1e7c, _0xd66178) {
    return _0x4e1e7c(_0xd66178);
},
_0x4692f3[_0x46b8('0x142')] = function(_0x2f2063, _0x25600f) {
    return _0x2f2063 > _0x25600f;
},
_0x4692f3[_0x46b8('0x872')] = _0x46b8('0x6cc'),
_0x4692f3[_0x46b8('0x49b')] = function(_0x161ed8, _0x10c423) {
    return _0x161ed8 > _0x10c423;
};
`;
let ast = parser.parse(jscode);


const visitor = {
     ExpressionStatement(path){
        let {expression} = path.node;
        if (!t.isSequenceExpression(expression)) return;
        let body = [];
        expression.expressions.forEach(express=>
        {
            body.push(t.ExpressionStatement(express));
        })
        path.replaceInline(body);
    },
}
traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);