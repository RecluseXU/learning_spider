// Object元素变量值取代对象索引引用
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    VariableDeclarator(path) {
        const { id, init } = path.node;
        // 对象为空则不处理
        if (!types.isObjectExpression(init) || init.properties.length == 0) return;
        for (const property of init.properties) {  // 遍历对象key、value
            let value = property.value;
            // 如果值不是一个 字面量 就不处理
            if (!types.isLiteral(value))continue;
            
            // 遍历作用域的所有引用的记录，用值来替代引用的节点
            for(var _path of path.scope.bindings[id.name].referencePaths){
                var _node = _path.parentPath.node
                if(types.isMemberExpression(_node) && types.isLiteral(_node.property, { value: property.key.value }))
                    _path.parentPath.replaceWith(value);
            }
        }
    }
}

const plug = new BasePlug(
    'Object variable element reference replacee',
    visitor,
    'Object元素变量值取代对象索引引用',
)
exports.default = plug;


function demo(){
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
    plug.handler(ast)
    console.log(generator(ast)['code']);  // 使用 generator 得到修改节点后的代码
}
demo()
