// 对于判断条件已经确定的if语句，可以用指定的代码块来代替整个if

// 思路：
// 1.先将if语句块中没有 中括号的处理成 包含中括号的
// 2.判断if条件里面的值，获取应该执行的语句块
// 3.用语句块替换整个if表达式即可。

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
if (true){
    console.log('Yes_1');
}else{
   console.log('No_1');
}
if (true)
    console.log('Yes_2');
else
    console.log('No_2');
`;
let ast = parser.parse(jscode);


const visitor = {
    IfStatement(path)
    {
        let {test, consequent, alternate} = path.node;
        // 如果if 语句并没有括号，那么加个括号，统一样式
        if (!t.isBlockStatement(consequent)){
            path.node.consequent = t.BlockStatement([consequent]);
        }
        if (alternate !== null && !t.isBlockStatement(alternate)){
            path.node.alternate = t.BlockStatement([alternate]);
        }
        // 特征判断，if语句里面的test是否为字面量
        if (!t.isLiteral(test)) return;
        let value = test.value;
        consequent = path.node.consequent;
        alternate  = path.node.alternate;
        if (value){  // 替换
            path.replaceInline(consequent.body);
        }
        else{  // 替换
            alternate === null? path.remove():path.replaceInline(alternate.body);
        }
    },
}
traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);