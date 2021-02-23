const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;


const visitor = {
    VariableDeclarator(path){
        const {id, init} = path.node;
        if (!t.isLiteral(init)) return;

        const binding = path.scope.getBinding(id.name);
        if (!binding || !binding.constant)return;
            
        for (let refer_path of binding.referencePaths) {
            refer_path.replaceWith(init);
        }
        path.remove();
    },

}

exports.default = new BasePlug(
    'literal variable init replace variable reference',
    visitor,
    '变量初始值取代变量引用',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var _0x8984 = 'a';
        var _0x8556 = 1;
        var _0x5536 = function(_0x4424){
            console.log('Well')
        }
        _0x5886++;
        _0x5536(_0x8984);
        _0x5536(_0x5886);
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