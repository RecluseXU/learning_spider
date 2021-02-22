var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const generator = require(js_env +"@babel/generator").default;
const t = require(js_env + "@babel/types");

exports.default = {
    'id':'针对s1_var0最后初始值合并简化',
    'description':'针对s1_var0最后初始值合并简化',
    'visitor':{
        Program(path){
            let nodes = [path.node.body.shift(), path.node.body.shift(), path.node.body.shift()]
            code = nodes.map(node => {return generator(node)['code'];}).join('\n');
            eval(code)
            let array_node = t.ArrayExpression(s1_var0.map(_str => {return t.StringLiteral(_str);}));
            path.scope.getBinding('s1_var0').referencePaths[2].replaceInline(
                array_node
            )
        }
    }
}