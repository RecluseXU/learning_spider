// while-switch 是一种常见的控制流平坦化后的代码
// 原本自上而下执行的代码，通过控制的手段 在保持代码执行顺序不变的情况下 打乱了代码顺序
// 在保证逻辑的同时混淆代码，让静态分析变的困难一点

// 下面就来讲讲如何通过AST操作来去控制流，并讲讲去控制流扁平化的思路及技巧
// 首先观察代码
//   这是一个 while-switch 结构的代码
//     while是循环控制，每执行一个case语句，都会continue到switch继续执行，在 arr数组里面不断的取值进行case
//     直到arr数组遍历完毕后，没有可case的项，才执行到break跳出循环
//     代码的执行流程是通过 arr[cnt++] 来控制的，arr 是一个数组(并且数组里面的元素都是字面量)，通过遍历数组的值，来进行流程控制。

//   在还原的时
//     可以通过这个数组来获知它的执行流程
//     并将case语句块中的代码提取出来保存到另外一个数组里，然后用这个数组替换掉整个 while循环，即可达到控制流扁平化的效果。

// 这里有一个很重要很重要的点，就是你得知道它下一条执行的是哪个case语句，要不然是无法提取的，这也是去控制流的核心

// 思路:
// 1.要替换的是 while循环，所以遍历 WhileStatement 节点最好了，当然也可以遍历 SwitchStatement 节点，方法是多种多样的。
// 2.需要拿到核心 的 arr，有些控制流是通过赋值来获取下一个执行的case语句,比如某验，这种处理起来要稍微麻烦一点，但是也不难；
// 3.遍历 arr，与case的test节点比较，匹配上(相等)则抠出 该case 块语句，存放在另外一个 数组中，注意有些需要删除 continue 节点
// 4.用存放case语句块的数组替换 WhileStatement 节点即可。

// 注意，代码是没法通用的，因为有些特征检测不是这种。会判断错误，因此我教给大家的是方法和思路。

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
var arr = "3|0|1|2|4".split("|");
var cnt = 0;
while (true) {
    switch (arr[cnt++]) {
    case "0":
        console.log("This is case-block 0")
        continue;
    case "1":
        console.log("This is case-block 1");
        continue;
    case "2":
        console.log("This is case-block 2");
        continue;
    case "3":
        console.log("This is case-block 3");
        continue;
    case "4":
        console.log("This is case-block 4");
        continue;
    }
    break;
}
`;
let ast = parser.parse(jscode);


const visitor = {

    WhileStatement(path){
        const {test, body} = path.node;
        // 特征语句判断，视情况而定，也可以不判断
        if(!t.isBooleanLiteral(test) || test.value !== true) return;  // 判断判断语句是否固定为true
        //   判断长度，避免越界。判断第一句是不是switch
        if(body.body.length === 0 || !t.isSwitchStatement(body.body[0])) return;
        //   判断 WhileStatement 节点前面是否有两个节点
        let all_pre_siblings = path.getAllPrevSiblings();
        if (all_pre_siblings.length !== 2) return;

        let switch_state = body.body[0];
        let {discriminant, cases} = switch_state; // 获取discriminant及cases节点
        //   判断switch判断量是不是 引用成员 和 自增组合
        if (!t.isMemberExpression(discriminant) || !t.isUpdateExpression(discriminant.property)) return;
        // 如果出错了，可以继续增加判断，直到不出错即可

        let arr_name = discriminant.object.name;  // 获取数组名，用于查找该数组
        let arr = [];

        all_pre_siblings.forEach(pre_path =>{  // 在前面的节点中拿到顺序字符串，并分割为数组
            const {declarations} = pre_path.node;
            let {id,init} = declarations[0];
            if (arr_name == id.name){ //  如果是定义arr的节点，拿到该arr的值
                arr = init.callee.object.value.split('|');
                pre_path.remove() // 没啥用的语句可以直接删除
            }
        })
    
        let ret_body = []; // 新建一个 数组变量，用于存放 case 节点
        arr.forEach(index =>{ // 遍历数组，去case节点
            let case_body = cases[index].consequent;
            if (t.isContinueStatement(case_body[case_body.length-1])){ // 删除 continue 语句
                case_body.pop();
            }
            ret_body = ret_body.concat(case_body); // 存放于数组变量中
        })
        path.replaceInline(ret_body); //  替换
    },
}
traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);