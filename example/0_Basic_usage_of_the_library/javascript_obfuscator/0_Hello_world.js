const code = "console.log('Hello World')"


const options = {// 混淆设置
    compact: false,  // 是否压缩为一行
    controlFlowFlattening: false,  // 控制流平坦化
    IdentifierNamesGenerator: 'mangled'  // 变量名混淆 16进制
}

const obfuscator = require('javascript-obfuscator'); // 导入
function my_obfuscate(code, options){
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(my_obfuscate(code, options));