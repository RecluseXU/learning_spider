// 变量初始值取代变量引用
const {BasePlug, types, parser, generator, traverse} = require("../base");

const SPECAL_NAME = ['window']

const visitor = {
    VariableDeclarator(path){
        // 初始值为 Literal, 特殊值, 数组
        const {id, init} = path.node;
        if(types.isIdentifier(init)){
            if(!init.name in SPECAL_NAME){return}
        }else if(types.isLiteral(init)){
        }else{ return }
        
        // 值不会被修改
        const binding = path.scope.getBinding(id.name);
        if (!binding || !binding.constant)return;
        // 取代
        for (let refer_path of binding.referencePaths) {
            refer_path.replaceWith(init);
        }
        path.remove();
    },

}

const plug = new BasePlug(
    'literal variable init replace variable reference',
    visitor,
    '变量初始值取代变量引用',
)
exports.default = plug;


// function demo(){
//     var jscode = `
//         var _0x8984 = 'a';
//         var _0x8556 = 1;
//         var _0x5536 = function(_0x4424){
//             console.log('Well')
//         }
//         _0x5886++;
//         _0x5536(_0x8984);
//         _0x5536(_0x5886);

//         var a = window;
//         a['atob']('aaa');

//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);
// }
// demo()
