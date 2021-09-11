// Object元素简单函数语句，用参数取代句中内容后，取代引用
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    VariableDeclarator({node, scope}) {
        let {init} = node;
        if (!types.isObjectExpression(init) || init.properties.length == 0) return;
        
        // 记录可用元素函数
        let func_property = {};
        for({key, value} of init.properties){
            if(!types.isFunctionExpression(value))continue;
            let {body} = value.body;
            if(body.length !== 1)continue;
            let statement = body[0];
            if(types.isReturnStatement(statement)){statement = statement.argument;}
            func_property[key.value] = statement;
        }

        let obj_name = node.id.name;
        scope.traverse(scope.block, {
            'CallExpression':{
                // 退出时检查，以应对递归调用
                exit: function(_path){
                    let {callee, arguments} = _path.node;
                    if(!types.isMemberExpression(callee))return;
                    if(!types.isIdentifier(callee.object, {'name': obj_name}))return;
                    if(!types.isLiteral(callee.property))return;
                    let statement = func_property[callee.property.value];
                    if(!statement)return;
                    
                    let replaceNode = null;
                    if (types.isCallExpression(statement) && arguments.length > 0) {
                        replaceNode = types.CallExpression(arguments[0], arguments.slice(1));
                    }
                    else if (types.isBinaryExpression(statement)) {
                        replaceNode = types.BinaryExpression(statement.operator, arguments[0], arguments[1]);
                    }		
                    else if (types.isLogicalExpression(statement)) {
                        replaceNode = types.LogicalExpression(statement.operator, arguments[0], arguments[1]);
                    }
                    _path.replaceWith(replaceNode);
                }
            }
        })
    }
}

const plug = new BasePlug(
    'Object outside definition merge',
    visitor,
    'Object元素简单函数语句，用参数取代句中内容后，取代引用',
)
exports.default = plug;


// function demo(){
//     var jscode = `
//         var a = {
//             "YJJox": "object",
//             "sbTga": function (b, c) {
//                 return b + c;
//             },
//             "iwvEK": function (b, c) {
//                 return b / c;
//             },
//             "HqkiD": function (b, c) {
//                 return b(c)
//             },
//         };
//         b = a["iwvEK"](1, 3),
//         b = a["iwvEK"](a["sbTga"](2, 3), 4),
//         c = a["sbTga"](111, 222),
//         d = a["YJJox"],
//         e = a["HqkiD"](String.fromCharCode, 49);
//     `;
//     let ast = parser.parse(jscode);
//     plug.handler(ast)
//     console.log(generator(ast)['code']);
// }
// demo()