
// 1.object对象使用var定义的，因此遍历 VariableDeclarator 节点即可
// 2.依次判断后续节点，是否为定义在外面的key和value
// 3.收集key和value，用于构造 ObjectProperty 节点 
// 4. properties  属性是Array对象，只用push方法来增加节点
// 5.处理完成后删除后续节点。

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
var h = {};
h["aaa"] = "hello wolrd";
h["bbb"] = function (a,b){
   return a | b;
}
`;
let ast = parser.parse(jscode);


const visitor = {
    VariableDeclarator(path) {
        const { id, init } = path.node;
        if (!t.isObjectExpression(init)) return;  // 初始值要是一个对象

        let name = id.name;
        let properties = init.properties;
        let all_next_siblings = path.parentPath.getAllNextSiblings();  // 获取当前定义语句后的同级的所有语句
        
        for (let next_sibling of all_next_siblings) {
            // 判断市表达式，且属于一开始声明的对象
            if (!next_sibling.isExpressionStatement()) break;
            let expression = next_sibling.get('expression');
            if (!expression.isAssignmentExpression()) break;
            let { operator, left, right } = expression.node;
            if (operator != '=' || !t.isMemberExpression(left) || !t.isIdentifier(left.object, { name: name })) {
                break;
            }
            // 利用已有的信息，将内容重建一个新的ObjectProperty节点，塞入对象声明里
            properties.push(t.ObjectProperty(left.property, right));
            next_sibling.remove();  // 删除原本的节点
        }
    }
}

traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);