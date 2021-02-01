// 访问 object对象 有两种方法，"string"["length"] 和 "string".length
// 但是调用 path.evaluate 方法时，它只处理了 "string".length 这种方式的表达式
// 而 "string"["length"] 是无法直接进行处理的

// 我们可以把 "string"["length"]  这种方式的表达式转换为 "string".length 这种方式


var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
a = "string".length;
b = "string"["length"];
c = "string"[0];
`;
let ast = parser.parse(jscode);


const visitor = {
    "MemberExpression"(path){
		const property = path.node.property;
		if(!t.isStringLiteral(property)) return;
		path.node.property = t.identifier(property.value)
		path.node.computed = false
  },
}

traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);