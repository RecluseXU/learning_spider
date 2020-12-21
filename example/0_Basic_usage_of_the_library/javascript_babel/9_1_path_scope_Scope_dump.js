// NodePath.scope 能获取到一个 Scope 对象，这个对象主要储存了作用域相关的信息
// 执行 Scope.dump()，会输出到自底向上的 作用域与被绑定量的信息  
// 执行后会得到类似于这样的输出信息  
// ~~~
// # FunctionDeclaration
//  - i { constant: false, references: 0, violations: 1, kind: 'var' }
// # Program
//  - squire { constant: true, references: 0, violations: 0, kind: 'hoisted' }
//  - i { constant: true, references: 0, violations: 0, kind: 'hoisted' }
// ~~~
// 作用域 以`#`划分，此处有两个作用域 `FunctionDeclaration` 与 `Program`  
// 被绑定量 以最前方设置`-`来标识，一般显示其中的4种信息  
// * constant  
//   量 在声明后，在作用域内是否会被 更变（重定义/赋值）  
//   实际上对应对应量的`Binding`对象的`Binding.constant`属性  
// * references  
//   被引用次数  
//   实际上对应对应量的`Binding`对象的`Binding.references`属性  
// * violations  
//   量 被 重新定义/赋值 的次数  
//   实际上对应对应量的`Binding`对象的`Binding.constantViolations`的长度。这个属性被用于记录变更位置（每次变更都添加内容）  
// * kind  
//   是函数声明类型。常见的有：`hoisted`提升，`var`变量， `local`内部  
//   实际上对应对应量的`Binding`对象的`Binding.kind`属性  
// 实际上这些信息大部分 （以一个被绑定量，一个 `Binding`对象的方式）储存在 `Scope.bindings` 这个属性中  

var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;

const jscode = `
function squire(i){
    return i * i * i;
}
function i()
{
    var i = 123;
    i += 2;
    return 123;
}
`;
let ast = parser.parse(jscode);
const visitor = {
    "FunctionDeclaration"(path){
        console.log("\n\n这里是函数 ", path.node.id.name + '()')
        path.scope.dump();
    }
}

traverse(ast, visitor);
