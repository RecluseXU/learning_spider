// 字典/对象 简化
// 思路：将调用字典的内容用字典本身的值来取代
// 形式:
//   var a = {'x':1};
//   var b = a['x'] + 2;
//   变为
//   var a = {'x':1};
//   var b = 1 + 2;

// 1.这里是 VariableDeclarator 节点，子节点 init 是 ObjectExpression 类型的表达式，
//   因此我们可以遍历VariableDeclarator节点，便于获取 对象名 及整个对象
// 2.遍历 ObjectExpression 节点的 properties 属性，它是一个 数组，遍历这个数组，获取key和value
// 3.判断 value 的节点类型，如果是字面量，则可以直接进行替换；
//   如果是函数表达式，则需要通过返回的表达式类型构造相应的表达式。
//   然后在作用域块内遍历 MemberExpression (PS：a["sbTga"]) 节点，
//   如果是对象名，并且当前的key值也相等，则进行节点替换。
// 4.遍历 properties 完毕后，可以试着删除整个  VariableDeclarator 节点，如果不报错就没事。
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
var a = {
    "YJJox": "object",
    "sbTga": function (b, c) {
      return b | c;
    },
    "iwvEK": "JOJO",
    "HqkiD": 'yes'
};
b = a["iwvEK"][2],
c = 'this is a ' + a["YJJox"],
d = a["HqkiD"] + 'it is';
`;
let ast = parser.parse(jscode);


const visitor = {
    VariableDeclarator(path) {
        const { id, init } = path.node;
        // 对象为空则不处理
        if (!t.isObjectExpression(init) || init.properties.length == 0) return;
        for (const property of init.properties) {  // 遍历对象key、value
            let value = property.value;
            // 如果值不是一个 字面量 就不处理
            if (!t.isLiteral(value))continue;
            
            // 遍历作用域的所有引用的记录，用值来替代引用的节点
            for(var _path of path.scope.bindings[id.name].referencePaths){
                var _node = _path.parentPath.node
                if(t.isMemberExpression(_node) && t.isLiteral(_node.property, { value: property.key.value }))
                    _path.parentPath.replaceWith(value);
            }
        }
    }
}

traverse(ast, visitor);
console.log(generator(ast)['code']);