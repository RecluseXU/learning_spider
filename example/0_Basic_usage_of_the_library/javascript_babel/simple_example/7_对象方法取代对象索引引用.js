// 字典/对象 简化

// 思路：将调用字典的内容用字典本身的值来取代
// 注意：此处并没有检查 return内容得作用域问题，如果写入奇怪的return 会出问题

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
    "iwvEK": function (b, c) {
      return b << c;
    },
    "HqkiD": function (b, c) {
      return b(c)
    },
};
b = a["iwvEK"](1, 3),
c = a["sbTga"](111,222),
d = a["YJJox"],
e = a["HqkiD"](String.fromCharCode,49);
`;
let ast = parser.parse(jscode);


const visitor = {
    VariableDeclarator(path) {
        const { id, init } = path.node;
        // 特征判断，对象为空则不处理
        if (!t.isObjectExpression(init) || init.properties.length == 0) return;

        let dic_name = id.name;
        let scope = path.scope;
        
        for (const property of init.properties) {  // 遍历对象key、value
            let key = property.key.value;
            let value = property.value;

            // 如果值是一个 函数表达式
            if (t.isFunctionExpression(value)) {
                let ret_state = value.body.body[0];
                // 如果函数第一句不是 return，就跳过
                if (!t.isReturnStatement(ret_state)) continue;
                
                // 遍历 作用域
                scope.traverse(scope.block, {
                    // 使用函数一般是 x['y'](z) 这种类型
                    // 所以遍历 CallExpression, 找出与key相同的表达式
                    CallExpression(_path) {
                        let { callee, arguments } = _path.node;
                        // 调用完全一致才进行取代否则跳过
                        if (!t.isMemberExpression(callee)) return;
                        if (!t.isIdentifier(callee.object, { name: dic_name })) return;
                        if (!t.isLiteral(callee.property, { value: key })) return;
                        
                        // 用函数中唯一的return 语句 构造新的节点取代原本的内容
                        if (t.isCallExpression(ret_state.argument) && arguments.length > 0) {
                            _path.replaceWith(t.CallExpression(arguments[0], arguments.slice(1)));
                        }
                        else if (t.isBinaryExpression(ret_state.argument) && arguments.length === 2) {
                            let replace_node = t.BinaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                            _path.replaceWith(replace_node);
                        }
                        else if (t.isLogicalExpression(ret_state.argument) && arguments.length === 2) {
                            let replace_node = t.LogicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);
                            _path.replaceWith(replace_node);
                        }
                    }
                })
            }
        }
    },
}

traverse(ast, visitor);
console.log(generator(ast)['code']);