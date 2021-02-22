var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const generator = require(js_env +"@babel/generator").default;
// 模拟环境  
const jsdom = require(js_env + "jsdom");
let { window } = new jsdom.JSDOM(`...`);
let { atob } = require(js_env + 'abab');

let aim_function_name = 's1_var1';
exports.default = {
    'id':'函数调用值取代函数调用',
    'description':'函数调用值取代函数调用',
    'visitor':{
        CallExpression(path){
            if(path.node.callee.name !== aim_function_name){return}
            all_arg_is_literal = path.node.arguments.every(argument => {return t.isLiteral(argument);})
            if(!all_arg_is_literal){return}

            // 函数内部
            let func_scope = path.scope.getBinding(aim_function_name).path.scope;
            try{
                eval(func_scope.path.toString() + '\nvar ___temp___=' + path.toString());
                path.replaceInline(t.valueToNode(___temp___));
            }catch(e){
                console.log(e);
            }
        }

    }
}