var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const generator = require(js_env +"@babel/generator").default;
exports.default = {
    'id':'合并可计算节点',
    'description':'计算可以计算的内容，生成新的节点取代原生',
    'visitor':{
        "BinaryExpression|UnaryExpression"(path){ 
            const {confident, value} = path.evaluate();
            const new_node= t.valueToNode(value);
            if(confident && generator(new_node)['code'] != path.toString())
                path.replaceInline(t.valueToNode(value));
        },
    }
}