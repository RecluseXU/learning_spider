const {types, parser, generator, traverse} = require("./plugs/base_plugs/base");
const {pretreatCode} = require('./plugs/base_plugs/preteat');
const fs = require('fs');

// 读取文件
const BASE_FOLDER = "example/5_一般_sojson";
const EXAMPLE_FOLDER = BASE_FOLDER + "/examples";
const TEMP_FOLDER = BASE_FOLDER + "/temp";


// 清理旧文件
fs.readdirSync(TEMP_FOLDER).forEach(function (fileName) {
    fs.unlinkSync(TEMP_FOLDER + '/' + fileName);
});

// 读取样例文件
let jscode = (function(){
    // @function 随机读取一份样例代码
    // @return String 样例代码
    var examples = fs.readdirSync(EXAMPLE_FOLDER);
    if(examples.length == 0){ 
        console.error('example 目录中无样例');
        return ''
    }else{
        const randomIndex = Math.floor(Math.random() * examples.length);
        const filePath = EXAMPLE_FOLDER + '/' + examples[randomIndex];
        const code = fs.readFileSync(filePath, {encoding: "utf-8"});
        console.log('Origin Code Length:', code.length);
        return code
    }
})()


// 预处理
jscode = pretreatCode(jscode)
fs.writeFileSync(TEMP_FOLDER + '/step_0_pretreatment_code.js', jscode, {encoding: "utf-8"})
console.log('Pretreatment Code Length:', jscode.length)

// 处理函数
let step = 0;
function code_handler(plug){
    step += 1
    console.log('step' + step, plug['name'])
    console.log('\tDescription:', plug['description'])

    ast = parser.parse(jscode); 
    traverse(ast, plug['visitor']);
    jscode = generator(ast)['code'];

    console.log('\tCode Length:', jscode.length)
    fs.writeFileSync(TEMP_FOLDER+'/step_' + step + '_' + plug['name'] + '.js', jscode, {encoding: "utf-8"})
}


// 引入插件
const plugs = {
    '可计算节点合并': require('./plugs/base_plugs/dynamic/computable_node_merge.js').default,
    'Function转function': require('./plugs/base_plugs/function/Function_to_function.js').default,
    '变量初始值取代变量引用': require('./plugs/base_plugs/variable/literal_variable_init_replace_variable_reference.js').default,
    '自调用Literal实参转换': require('./plugs/base_plugs/function/IIFE/literal_argument_convert.js').default,
    '数组定义IFEE修改': require('./plugs/base_plugs/dynamic/array/reinit_array_by_ifee.js').default,
    '删除返回window的函数': require('./plugs/special/delete_return_window_func').default,
    '变量初始值取代变量引用': require('./plugs/base_plugs/variable/literal_variable_init_replace_variable_reference').default,
    '删除atob检测与无定义时定义': require('./plugs/special/delete_window_atob_define').default,
    '抽离IFEE': require('./plugs/base_plugs/function/IIFE/extract.js').default,
    'Key函数调用结果计算替换调用': require('./plugs/special/callexpression_to_return_value_focus').default,
    'Object外部赋值合并': require('./plugs/base_plugs/object/object_outside_definition_merge.js').default,
    'Object外部引用成员变量替换': require('./plugs/base_plugs/object/object_variable_element_reference_replace').default,
    'Object外部引用成员函数替换': require('./plugs/base_plugs/object/object_function_element_reference_replace').default,

    '删除未使用的变量': require('./plugs/base_plugs/variable/delete_useless_variable').default,

    '反控制流平坦化': require('./plugs/base_plugs/controlSteamFlat/anti_control_stream_flat').default,
    '无用If-Else代码块删除': require('./plugs/base_plugs/ifStatement/delete_useless_block').default,
    '删除webdriver检查代码': require('./plugs/special/delete_webdriver_detact').default,
}

// 处理插件
const visitors = [
    plugs['可计算节点合并'],
    plugs['Function转function'],
    
    plugs['变量初始值取代变量引用'],
    plugs['自调用Literal实参转换'],
    plugs['变量初始值取代变量引用'],
    plugs['数组定义IFEE修改'],
    plugs['删除返回window的函数'],
    plugs['变量初始值取代变量引用'],
    plugs['删除atob检测与无定义时定义'],
    plugs['抽离IFEE'],
    plugs['Key函数调用结果计算替换调用'],
    plugs['可计算节点合并'],
    plugs['Object外部赋值合并'],
    plugs['Object外部引用成员变量替换'],
    plugs['Object外部引用成员函数替换'],
    plugs['可计算节点合并'],
    plugs['反控制流平坦化'],

    plugs['删除未使用的变量'],
    plugs['无用If-Else代码块删除'],
    plugs['删除webdriver检查代码'],
]

for(var n in visitors)
    code_handler(visitors[n])
