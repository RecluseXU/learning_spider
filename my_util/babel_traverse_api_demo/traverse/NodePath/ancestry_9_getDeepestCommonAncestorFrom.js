// getDeepestCommonAncestorFrom(paths, filter)
// @return NodePath | 自定义
// 获取传入的Path对应节点的 最大深度共同祖先节点的Path

// 当传入一个`filter`函数，那么返回结果会作为参数进行回调。
// 返回结果变为`filter(最大深度共同祖先节点Path:NodePath, 深度:int, 所有path的祖先信息:list);` 

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
            _is = path.getDeepestCommonAncestorFrom(paths)
            console.log('最大深度的共同祖先节点 源代码：', _is.toString());
        }
    }
}

let ast = parser.parse(jscode);
traverse(ast, visitor);
