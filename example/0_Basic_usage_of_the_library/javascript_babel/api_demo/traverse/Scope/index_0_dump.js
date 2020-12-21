// NodePath.scope 能获取到一个 Scope 对象，这个对象主要储存了作用域相关的信息
// 执行 Scope.dump()，会得到自底向上的 作用域与变量信息  
// 对于单个变量，其会包含4种信息
// * constant
//   变量在声明后，在作用域内是否会被使用
// * references  
//   被引用次数  
// * violations
//   被重新定义的次数
// * kind  
//   函数声明类型，hoisted 提升，var 变量， local 内部

// 对于有相同父级的节点，会得到相同的作用域与变量信息
// 比如说代码执行过后的 作用域 Program 
// ------------------------------------------------------------
// # Program
//  - squire { constant: true, references: 0, violations: 0, kind: 'hoisted' }
//  - i { constant: true, references: 0, violations: 0, kind: 'hoisted' }
// ------------------------------------------------------------

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
function squire(i){
    return i * i * i;
}
function i()
{
    var i = 123;
    i += 2;
    return 123;
}
`;
let ast = parser.parse(jscode);
const visitor = {
    "FunctionDeclaration"(path){
        console.log("\n\n这里是函数 ", path.node.id.name + '()')
        path.scope.dump();
    }
}

traverse(ast, visitor);
