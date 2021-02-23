const _base = require('../base');
const t = _base.t
const BasePlug = require("../base").default;


const visitor = {
    VariableDeclarator(path) {
        const { id, init } = path.node;
        // 对象为空则不处理
        if (!t.isObjectExpression(init) || init.properties.length == 0) return;
        for (const property of init.properties) {  // 遍历对象key、value
            let value = property.value;
            // 如果值不是一个 字面量 就不处理
            if (!t.isLiteral(value))continue;
            
            // 遍历作用域的所有引用的记录，用值来替代引用的节点
            for(var _path of path.scope.bindings[id.name].referencePaths){
                var _node = _path.parentPath.node
                if(t.isMemberExpression(_node) && t.isLiteral(_node.property, { value: property.key.value }))
                    _path.parentPath.replaceWith(value);
            }
        }
    }
}


exports.default = new BasePlug(
    'Object variable element reference replacee',
    visitor,
    'Object元素变量值取代对象索引引用',
)


function demo(){
    const parser = _base.parser;
    const generator = _base.generator;
    var jscode = `
        var a = {
            "YJJox": "object",
            "sbTga": function (b, c) {
            return b | c;
            },
            "iwvEK": "JOJO",
            "HqkiD": 'yes'
        };
        b = a["iwvEK"][2],
        c = 'this is a ' + a["YJJox"],
        d = a["HqkiD"] + 'it is';
        e = a["sbTga"](1, 2);
    `;
    let ast = parser.parse(jscode);
    let local_plug = new BasePlug(
        'Object variable element reference replacee',
        visitor,
        '对象元素值取代对象索引引用',
    )
    local_plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()