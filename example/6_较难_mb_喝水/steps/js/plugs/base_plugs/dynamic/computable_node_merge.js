// 合并可计算节点
const {BasePlug, types, parser, generator, traverse} = require("../base");

const visiter = {
    "BinaryExpression|UnaryExpression"(path){ 
        const {confident, value} = path.evaluate();
        const new_node= types.valueToNode(value);
        if(confident && generator(new_node)['code'] != path.toString())
            path.replaceInline(types.valueToNode(value));
    },
}

const plug = new BasePlug(
    'Computable node merge',
    visiter,
    '计算可以计算的内容，生成新的节点取代原节点',
)
exports.default = plug;
