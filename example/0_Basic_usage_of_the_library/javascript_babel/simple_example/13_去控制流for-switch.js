// 总体思路和 while-switch 类型类似
// 1.拿到初始值，在for循环里面(有些在外面)，还需要拿到test值，这个是结束循环的标志。
//   有些可能循环语句里面有return语句，也是退出循环的标志。有些没有test值的，则不用。
// 2.通过初始值拿到对应的case语句，及case语句里面更新的初始值，并与test判断
// 3.删除 continue 及 更新初始值的赋值语句
// 4.如果case语句里面包含return语句，则直接跳出循环；否则继续下一个case语句
// 5 替换整个for循环即可。

// 注意，代码是没法通用的，因为有些特征检测不是这种。会判断错误，因此我教给大家的是方法和思路。

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
function test() {
    for (var index = 0; index !=5;) {
        switch (index) {
        case 0:
            console.log("This is case-block 0")
            index = 3;
            continue;
        case 1:
            console.log("This is case-block 1");
            return;
            index = 5;
            continue;
        case 2:
            console.log("This is case-block 2");
            index = 1;
            continue;
        case 3:
            console.log("This is case-block 3");
            index = 4;
            continue;
        case 4:
            console.log("This is case-block 4");
            index = 2;
            continue;
        }
        break;
    }
}
`;
let ast = parser.parse(jscode);


const visitor = {
    ForStatement(path){  // 遍历for语句
        const {init, test, update, body} = path.node;
        // 特征判断
        if (!t.isVariableDeclaration(init) || !t.isBinaryExpression(test) || update !== null ) return;
        // 获取控制循环的变量及其初始值
        const init_name = init.declarations[0].id.name;
        let init_value = init.declarations[0].init.value;
        let {left,right,operator} = test;

        // 特征判断
        if (!t.isIdentifier(left, {name:init_name}) || operator !== "!=" || !t.isNumericLiteral(right)) return;
        let test_value = right.value;
        let switch_body = body.body[0];
        // 特征判断
        if (!t.isSwitchStatement(switch_body)) return;
        let {discriminant, cases} = switch_body;
        if (!t.isIdentifier(discriminant, {name:init_name})) return;
        let ret_body = [];
        let end_flag = false;     

        // 不断的拿到控制循环的变量值
        while (init_value !== test_value){  // 如果没有与之匹配的值，直接跳出循环
            if (end_flag === true){  // 如果遇到return语句，直接跳出循环
                break;
            }
            for (const each_case of cases){
                let {test,consequent} = each_case;
                if (init_value !== test.value){
                    continue;
                }
                if (t.isContinueStatement(consequent[consequent.length-1])){  // 如果是continue语句，直接删除
                    consequent.pop();
                }
                if (t.isExpressionStatement(consequent[consequent.length-1])){  // 如果是表达式语句，则判断是否包含控制循环的变量的赋值语句
                    let {expression} = consequent[consequent.length-1];
                    if (t.isAssignmentExpression(expression)){
                        let {left, right, operator} = expression;
                        if (t.isIdentifier(left, {name:init_name})){  // 更新控制循环的变量值，并进行删除
                            init_value = right.value;
                            consequent.pop();
                        }
                    }
                }
                if (t.isReturnStatement(consequent[consequent.length-1])){
                    end_flag = true;
                }
                ret_body = ret_body.concat(consequent);
                break;
            }
        }
        path.replaceInline(ret_body);
    },
}
traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);