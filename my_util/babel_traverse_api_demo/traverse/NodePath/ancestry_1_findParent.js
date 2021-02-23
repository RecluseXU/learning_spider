// path.findParent(callback)
// @return NodePath | None
// 逐级递归寻找父级节点，并将对应`Path`作为参数传入的判断函数进行判断  
// 当判断函数返回`true`, 则`Path.findParent(callback)`返回对应`Path`  
// 当判断函数返回`false`, 则递归继续寻找父级, 进行判断  
// 若已无父级，则返回`null`

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
function f(){
    var b = 123;
    a = b + 1;
}`;

const visitor = {
    AssignmentExpression(path)  // 此处会遍历所有的节点，并得到对应的路径
    {
        console.log('当前路径源码:\n', path.toString());
        
        // 寻找父级
        function to_parent_function_path(x){  // 进行判断是否是函数声明节点的判断函数
            if(x.isFunctionDeclaration()){return true}else{return false}
        }
        //      将判断函数传入，进行递归寻找父级path
        the_path = path.findParent(to_parent_function_path)
        console.log('to_parent_function_path 最终路径源码:\n', the_path.toString())

        //      递归后如果没有发现符合要求的父级
        function to_null(x){return false}
        the_path = path.findParent(to_null)
        console.log('to_null 最终路径:\n', the_path)
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
