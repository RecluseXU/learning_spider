const code = "console.log('Hello World')"


const options = {// 混淆设置
    disableConsoleOutput: true // 禁用控制台输出
}

// 实际上是把控制台方法（debug, info, error, exception, trace之类的）置空为空函数

const obfuscator = require('javascript-obfuscator'); // 导入
function my_obfuscate(code, options){
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(my_obfuscate(code, options));