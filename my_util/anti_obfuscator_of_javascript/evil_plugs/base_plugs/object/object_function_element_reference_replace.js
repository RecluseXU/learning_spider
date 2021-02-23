const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;


const visitor = {
    VariableDeclarator({node, scope}) {
        let {init} = node;
        if (!t.isObjectExpression(init) || init.properties.length == 0) return;
        
        // 记录可用元素函数
        let func_property = {};
        for({key, value} of init.properties){
            if(!t.isFunctionExpression(value))continue;
            let {body} = value.body;
            if(body.length !== 1)continue;
            let statement = body[0];
            if(t.isReturnStatement(statement)){statement = statement.argument;}
            func_property[key.value] = statement;
        }

        let obj_name = node.id.name;
        scope.traverse(scope.block, {
            'CallExpression':{
                // 退出时检查，以应对递归调用
                exit: function(_path){
                    let {callee, arguments} = _path.node;
                    if(!t.isMemberExpression(callee))return;
                    if(!t.isIdentifier(callee.object, {'name': obj_name}))return;
                    if(!t.isLiteral(callee.property))return;
                    let statement = func_property[callee.property.value];
                    if(!statement)return;
                    
                    let replaceNode = null;
                    if (t.isCallExpression(statement) && arguments.length > 0) {
                        replaceNode = t.CallExpression(arguments[0], arguments.slice(1));
                    }
                    else if (t.isBinaryExpression(statement)) {
                        replaceNode = t.BinaryExpression(statement.operator, arguments[0], arguments[1]);
                    }		
                    else if (t.isLogicalExpression(statement)) {
                        replaceNode = t.LogicalExpression(statement.operator, arguments[0], arguments[1]);
                    }
                    _path.replaceWith(replaceNode);
                }
            }
        })
    }
}

exports.default = new BasePlug(
    'Object outside definition merge',
    visitor,
    'Object元素简单函数语句，用参数取代句中内容后，取代引用',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var a = {
            "YJJox": "object",
            "sbTga": function (b, c) {
                return b + c;
            },
            "iwvEK": function (b, c) {
                return b / c;
            },
            "HqkiD": function (b, c) {
                return b(c)
            },
        };
        b = a["iwvEK"](1, 3),
        b = a["iwvEK"](a["sbTga"](2, 3), 4),
        c = a["sbTga"](111, 222),
        d = a["YJJox"],
        e = a["HqkiD"](String.fromCharCode, 49);
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'Object function element reference replace',
        visitor,
        'Object简单函数元素引用取代',
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()