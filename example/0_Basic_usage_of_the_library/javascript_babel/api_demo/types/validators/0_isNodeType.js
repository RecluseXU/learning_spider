// isNodeType(node, opts)
// @return bool

// 这并不是一个函数，这是一大堆由生成代码生成的函数，大约有290个
// 这些函数在 @babel/types/lib/validators/generated/index.js

// 函数逻辑都是类似的  
// if(没有node)return false
// if(node.type == 声明类型)return false
// else if(没有opts)return true
// else return types.shallowEqual(node, opts)

// types.shallowEqual(node, opts) 的定义在 `@babel/types/lib/utils/shallowEqual.js`

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const t = require(js_env + "@babel/types");

const jscode = 'var a=1;var b=1+1;';
let ast = parser.parse(jscode);

const visitor = {
  enter(path){
    console.log('当前节点源码：', path.toString())
    console.log('是 Identifier', t.isIdentifier(path.node))
    console.log('是 Identifier 且其属性name为a:', t.isIdentifier(path.node, {'name':'a'}))
  }
}

traverse(ast, visitor);
