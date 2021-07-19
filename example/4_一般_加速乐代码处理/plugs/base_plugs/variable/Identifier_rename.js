// 重命名混淆变量名, 不建议使用
const {BasePlug, types, parser, generator, traverse} = require("../base");

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

const plug = new BasePlug(
    'Identifier rename',
    visitor,
    '重命名混淆变量名',
)
exports.default = plug;


function demo(){
    var jscode = `
        var _0x8984 = 'a';
        var _0x5536 = function(_0x4424){
            console.log('Well')
        }
        _0x5536(_0x8984);
    `;
    let ast = parser.parse(jscode);
    plug.handler(ast)
    console.log(generator(ast)['code']);
}
demo()