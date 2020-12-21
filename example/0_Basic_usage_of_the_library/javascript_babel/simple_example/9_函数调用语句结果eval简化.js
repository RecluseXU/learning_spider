// 函数调用处代码的简化
// 形式：
  // function add(a, b){
  //     return a + b;
  // }
  // let c = add(1, 2);
  // 将上面的代码，转换成：
  // let c = 3;



var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env + "@babel/generator").default;

const jscode = `
function add(a, b){
  return a + b;
}
function random(a, b){
  return Math.random()
}
let c = add(1, 2);
let e = random(3, 4)
`

let ast = parser.parse(jscode);


const visitor = {
    "FunctionDeclaration"(path){
      let {id} = path.node;
      let func_code = path.toString();

      const binding = path.scope.parent.getBinding(id.name);
      if (!binding || binding.constantViolations.length > 0)return;  // 如果被修改过，放弃更改

      // 遍历引用位置
      for (const refer_path of binding.referencePaths){
        let call_express = refer_path.findParent(p=>p.isCallExpression());
        console.log(call_express.toString());
        
        let args = call_express.get('arguments');
        if(args.length === 0)continue;
        let is_all_Literal = true;
        args.forEach(arg=>{is_all_Literal = is_all_Literal && arg.isLiteral()})
        if(!is_all_Literal)continue;  // 判断条件可自己写

        // 计算结果
        try{
          let call_code = call_express.toString()
          eval(func_code);
          let value = eval(call_code) == eval(call_code)? eval(call_code):'!Unconst Function!';
          if(!value || value == '!Unconst Function!')continue;  // 如果计算结果不唯一或者没结果
          call_express.replaceWith(t.valueToNode(value));
        }catch(e){console.log(e)};

      }
    }
}
traverse(ast, visitor);
console.log('----------------------------');
console.log(generator(ast)['code']);