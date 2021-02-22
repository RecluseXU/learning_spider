// 用于简化代码

// 引入库
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const t = require(js_env + "@babel/types");
const parser = require(js_env + "@babel/parser");
const traverse = require(js_env + "@babel/traverse").default;
const generator = require(js_env +"@babel/generator").default;
const fs = require('fs');



// 读取文件
const base_folder = "example/4_一般_百度混淆代码处理";
const encode_file = base_folder + "/origin.js",
    temp_folder = base_folder + "/temp";

// 清理旧文件
fs.readdirSync(temp_folder).forEach(function (fileName) {
    fs.unlinkSync(temp_folder + '/' + fileName);
});

// 读取新文件
let jscode = fs.readFileSync(encode_file, {encoding: "utf-8"});


// 基础信息
console.log('Origin Code Length:', jscode.length)
let step = 0

// 临时变量
let __temp__ = {};

// 处理函数
function code_handler(visitor){
    step += 1
    console.log('step' + step, visitor['id'])
    console.log('\tDescription:', visitor['description'])
    ast = parser.parse(jscode); 
    traverse(ast, visitor['visitor']);
    jscode = generator(ast)['code'];
    console.log('\tCode Length:', jscode.length)
    fs.writeFileSync(temp_folder+'/step_' + step + '_' + visitor['id'] + '.js', jscode, {encoding: "utf-8"})
}


// 引入插件
const plugs = {
    '格式化代码缩进': require('./plugs/格式化代码缩进.js').default,
    '16进数字与unicode字符回转': require('./plugs/16进数字与unicode字符回转.js').default,
    '变量名重命名': require('./plugs/变量名重命名.js').default, 
    '删除未使用函数参数': require('./plugs/删除未使用函数参数.js').default,
    '变量初始值取代变量引用': require('./plugs/变量初始值取代变量引用.js').default, 
    '合并可计算节点': require('./plugs/合并可计算节点.js').default, 
    '一次性变量函数转变未自调用函数': require('./plugs/一次性变量函数转变未自调用函数.js').default,  
    '压缩字面量参数': require('./plugs/压缩字面量参数.js').default, 
    '自调用函数_地址变量参数_替换': require('./plugs/自调用函数_地址变量参数_替换.js').default,
    '简要自增简化': require('./plugs/简要自增简化.js').default,
    '无参数自调用函数去除': require('./plugs/无参数自调用函数去除.js').default,
    'Object外部赋值合并': require('./plugs/Object外部赋值合并.js').default,
    '函数调用值取代函数调用': require('./plugs/函数调用值取代函数调用.js').default,
    'Object变量传递取代':require('./plugs/Object变量传递取代.js').default,
    'Object元素变量值取代对象索引引用':require('./plugs/Object元素变量值取代对象索引引用.js').default,
    'Object简单函数元素引用取代':require('./plugs/Object简单函数元素引用取代.js').default,
    '反控制流平坦化':require('./plugs/反控制流平坦化.js').default,
    '删除未使用的变量':require('./plugs/删除未使用的变量.js').default,
}

const temp_plugs = {
    '针对s7_var0赋值的try_except简化': require('./plugs/temp/针对s7_var0赋值的try_except简化.js').default,
    '针对删除s1_var1的atob检测': require('./plugs/temp/针对删除s1_var1的atob检测.js').default,
    '针对s1_var0最后初始值合并简化': require('./plugs/temp/针对s1_var0最后初始值合并简化.js').default,
}

// 处理插件
const visitors = [
    plugs['格式化代码缩进'],
    plugs['16进数字与unicode字符回转'],
    plugs['变量名重命名'],
    plugs['删除未使用函数参数'],
    plugs['变量初始值取代变量引用'],
    plugs['合并可计算节点'],
    plugs['一次性变量函数转变未自调用函数'],
    plugs['压缩字面量参数'], 
    plugs['自调用函数_地址变量参数_替换'],
    plugs['简要自增简化'],
    plugs['无参数自调用函数去除'],
    plugs['变量初始值取代变量引用'],
    plugs['压缩字面量参数'],
    plugs['无参数自调用函数去除'],
    temp_plugs['针对s7_var0赋值的try_except简化'],
    temp_plugs['针对删除s1_var1的atob检测'],
    temp_plugs['针对s1_var0最后初始值合并简化'],
    plugs['函数调用值取代函数调用'],
    plugs['合并可计算节点'],
    plugs['Object外部赋值合并'],
    plugs['Object变量传递取代'],
    plugs['Object元素变量值取代对象索引引用'],
    plugs['Object简单函数元素引用取代'],
    plugs['反控制流平坦化'],
    plugs['删除未使用的变量'],
]

for(var n in visitors)
    code_handler(visitors[n])