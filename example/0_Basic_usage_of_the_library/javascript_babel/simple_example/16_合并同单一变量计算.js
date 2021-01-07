// 思路:
// 1.要将变量a的值进行合并，因此我这里遍历 VariableDeclarator 节点
// 2.获取父节点的下一个节点，进行特征判断
// 3.符合条件的表达式，将其值进行合并，并删除该表达式
// 4.遇到不符合条件的表达式就停止合并


var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
var a = "Hello";
a += "A", a+="S", a+="T!", b = "This is a test!";
`;
let ast = parser.parse(jscode);


const visitor = {
	VariableDeclarator(path){
        const {id, init} = path.node;
        if (!t.isStringLiteral(init)) return;
        let name = id.name;
        let value = init.value;
        // 获取父级的下一个语句的NodePath 也就是 a += "A", a+="S", a+="T!", b = "This is a test!";
		let next_sibling = path.parentPath.getNextSibling();

        if (!next_sibling.isExpressionStatement()) return;
        let expression = next_sibling.get('expression');

        if (expression.isSequenceExpression()){
            expressions = expression.get("expressions");
            // 遍历计算声明，计算结果直接改变初始值
            for (let each_express of expressions){
                let {operator,left,right} = each_express.node;
                if (operator === "+=" && t.isIdentifier(left,{name:name})&& t.isStringLiteral(right)){
                    init.value += right.value;
                    each_express.remove();
                }
            }
        }
    },
}

traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);