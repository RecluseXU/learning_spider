const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;


const visitor = {
    VariableDeclaration(path){
        let {declarations} = path.node;
        for(declaration_ind in declarations){
            let {id, init} = declarations[declaration_ind];
            if(!t.isObjectExpression(init)){continue}
            
            let {constant, referencePaths} = path.scope.getBinding(id.name);
            if(!constant || referencePaths.length !== 1){continue}
            let ref_init = referencePaths[0].parentPath.node.init;
            if(!t.isIdentifier(ref_init) || ref_init.name !== id.name){continue};
            referencePaths[0].replaceInline(init);
            path.get('declarations.'+declaration_ind).remove();
        }
    }
}

exports.default = new BasePlug(
    'Object reference vairable convert',
    visitor,
    '对象定义后不使用，仅赋值给其它变量使用。则直接将初始值赋值给目标变量',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var a = {
            'a':1, 'b':2, 'c':3
        };
        var b = {'d':4}
        var c = a;
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'Object reference vairable convert',
        visitor,
        '对象定义后不使用，仅赋值给其它变量使用。则直接将初始值赋值给目标变量',
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()