const _base = require('./base');
const t = _base.t
const BasePlug = require("./base").default;

let scope_mark = [],
    scope_index = 0;

const visitor = {
    enter(path){
        if(scope_mark.indexOf(path.scope) != -1){return;}
        let scope = path.scope,
            variable_ind = 0;
        for(variable_name in scope.bindings){
            if(variable_name.indexOf('_0x') == -1){return;}
            scope.rename(variable_name, 's'+String(scope_index)+'_'+scope.bindings[variable_name]['kind']+String(variable_ind++));
        }
        scope_index++;
        scope_mark.push(scope);
    }
}

exports.default = new BasePlug(
    'Identifier rename',
    visitor,
    '重命名混淆变量名',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var _0x8984 = 'a';
        var _0x5536 = function(_0x4424){
            console.log('Well')
        }
        _0x5536(_0x8984);
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