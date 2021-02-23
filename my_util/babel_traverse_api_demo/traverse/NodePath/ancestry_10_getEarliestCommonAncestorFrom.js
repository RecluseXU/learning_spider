// getEarliestCommonAncestorFrom(paths)
// @return NodePath
// 获取`paths`中最早出现的共同祖先,一旦出现，则返回  

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

var jscode = `
function f(){
    function f3(){
        function f1(){return 1;}
        function f2(){return 2;}
        return 3;
    }
}`;


let paths = []

const visitor = {
    ReturnStatement(path){
        console.log('路径源码:\n', path.toString());
        paths.push(path)
        if (paths.length > 1){
            _is = path.getEarliestCommonAncestorFrom(paths)
            console.log('最早的共同祖先节点 源代码：', _is.toString());
        }
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
