// 操作AST的基本思路：
// 通过 traverse 进行代码遍历
// 使用 NodePath对象 来进行各种路径操作

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
    var a = 1+2+3;
`;

const visitor = {
    enter(path)  // 此处会遍历所有的节点，并得到对应的路径
    {
        if(path.toString().indexOf('a') > -1){  // 根据路径，得到对应的代码，如果其中包含 字符a 则输出信息
            console.log('当前路径 源码:\n', path.toString());
            console.log('当前路径 节点:\n', path.node)
            console.log('当前路径 父级节点:\n', path.parent);
            console.log('当前路径 父级路径:\n', path.parentPath)
            console.log('当前路径 类型:\n', path.type)
            // is + 节点类型全名, 能判断当前路径节点的类型是否是声明的类型
            console.log('这是一个变量声明节点:\t', path.isVariableDeclaration())
            console.log('--------------------')
        }
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);  // traverse会遍历所有的节点
