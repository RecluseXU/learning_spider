const code = "console.log('Hello World')"


const options = {// 混淆设置
    debugProtection: true // 调试保护
}
// 无限debug, 定时debug  

const obfuscator = require('javascript-obfuscator'); // 导入
function my_obfuscate(code, options){
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(my_obfuscate(code, options));