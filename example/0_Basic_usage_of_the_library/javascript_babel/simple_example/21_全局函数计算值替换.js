// JavaScript有几个的全局函数，当它的实参是字面量时，是可以直接计算出结果的，而且都是唯一的，也就是纯函数
// 根据这个可以将计算出来的结果替换全局函数的调用表达式。
// 这样的好处是让程序简单些，甚至可以做进行进一步的还原，达到简化程序的目的。
// 思路如下:
// CallExpression表达式的callee节点必须是Identifier类型。
// 函数名不能是eval，因为eval函数无返回值，无法进行替换。
// 判断global[funcname]的类型，如果是"function"，则表示它是全局函数。
// 获取实参，计算结果。
// 计算出来的结果不能是function类型，不能进行替换。
// 构造节点，进行替换即可。

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
    var a = parseInt("12345",16),b = Number("123"),c = String(true),d = unescape("hello%2CAST%21");
    eval("a = 1");
`;
let ast = parser.parse(jscode);


const visitor = {
    "CallExpression"(path){
        let {callee,arguments} = path.node;
        if (!t.isIdentifier(callee) || callee.name == "eval"){return;} 
        if (!arguments.every(arg=>t.isLiteral(arg))){return;}
        
        let func = global[callee.name];
        if (typeof func !== "function"){return;}
        
        let args = [];
        arguments.forEach((ele,index) =>{args[index] = ele.value;});
        
        let value = func.apply(null,args);
        if (typeof value == "function") return;
        path.replaceInline(t.valueToNode(value));
    },
}

traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);