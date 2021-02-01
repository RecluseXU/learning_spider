// 括号表达式前面都可以放入语句，最后的表达式会作为结果返回
// 混淆者可以利用这个一点，将多个括号表达式进行嵌套
// 1.因为要处理的是逗号表达式，因此我们在这里直接遍历 SequenceExpression 节点即可。
// 2.将每个expressions里面的节点提取到 Statement 节点前面，代码效果是一样的
// 3.因为可能有嵌套的逗号表达式，因此采用exit的方式进行遍历

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
function test(u){
    return function(n,r, t){
      return (t = (r = n.B(0),n).B(1),u)(r, t);
    }
}
`;
let ast = parser.parse(jscode);


const visitor = {
    SequenceExpression: {
        exit(path){
            let expressions = path.get('expressions');
            // 最后会返回括号表达式的最后一个表达式，所以这里记录，后续用来取代整个括号表达式
            let last_expression = expressions.pop(); 
            let statement = path.getStatementParent();
            if(statement){
                for(let expression of expressions){ // 遍历括号内的表达式
                    // 将语句拿出，单独建立节点，插入到本条语句在定义内的最外层语句之前（这里是return语句之前）
                    statement.insertBefore(t.ExpressionStatement(expression=expression.node));
                }
                path.replaceInline(last_expression);
            }
        }
    },
}

traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);