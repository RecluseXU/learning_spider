const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;

let scope_mark = [],
    scope_index = 0;

const visitor = {
    VariableDeclarator(path){  // 还原var、let、const 定义的变量
        const {id, init} = path.node;
        if (!t.isArrayExpression(init)) return;  // 只处理Array

        const binding = path.scope.getBinding(id.name);
        if (!binding || binding.constantViolations.length != 0)return;  // 如果该变量的值被修改则不处理
            
        for (const refer_path of binding.referencePaths) {  // 遍历所有引用变量的路径
            if(t.isCallExpression(refer_path.parentPath.parentPath)){return}
            refer_path.replaceWith(init);  // 用变量的初始值来取代引用位置的变量名
        }
        if (binding.referencePaths.length == 0){path.remove();} // 移除变量声明
    },
}

exports.default = new BasePlug(
    'array variable init replace variable reference',
    visitor,
    '数组变量初始值取代变量引用',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
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
    let local_plug = new BasePlug(
        'VariableDeclarator Identifier rename',
        visitor,
        '重命名混淆变量名',
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()