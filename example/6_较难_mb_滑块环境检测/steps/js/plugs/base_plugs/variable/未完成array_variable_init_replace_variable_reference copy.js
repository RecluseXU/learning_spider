// 数组变量初始值取代变量引用
const {BasePlug, types, parser, generator, traverse} = require("../base");


const visitor = {
    VariableDeclarator(path){  // 还原var、let、const 定义的变量
        const {id, init} = path.node;
        if (!types.isArrayExpression(init)) return;  // 只处理Array

        const binding = path.scope.getBinding(id.name);
        if (!binding || binding.constantViolations.length != 0)return;  // 如果该变量的值被修改则不处理
            
        for (const refer_path of binding.referencePaths) {  // 遍历所有引用变量的路径
            if(types.isCallExpression(refer_path.parentPath.parentPath)){return}
            refer_path.replaceWith(init);  // 用变量的初始值来取代引用位置的变量名
        }
        if (binding.referencePaths.length == 0){path.remove();} // 移除变量声明
    },
}

const plug = new BasePlug(
    'array variable init replace variable reference',
    visitor,
    '数组变量初始值取代变量引用',
)
exports.default = plug;


function demo(){
    var jscode = `
        var a = [1,2,3];
        a[2] = 6;
        
        while(True){
            a[3] = 4;
            a.push(9);
        }
        a.push(4);
    `;
    let ast = parser.parse(jscode);
    plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()