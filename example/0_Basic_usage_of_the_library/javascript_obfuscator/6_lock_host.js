const code = "console.log('Hello World')"


const options = {// 混淆设置
    domainLock: ['baidu.com'] // 只允许在特定域名下运行，降低被模拟风险
}


const obfuscator = require('javascript-obfuscator'); // 导入
function my_obfuscate(code, options){
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(my_obfuscate(code, options));