const code = `
    (function(){
        function a(){
            return function(){
                var a = 1+2;
                console.log(1);
                console.log(2);
                console.log(3);
            }
        }
    }
    )
`

const options = {// 混淆设置
    compact: false,
    controlFlowFlattening: true,  // 控制流平坦化
}

const obfuscator = require('javascript-obfuscator'); // 导入
function my_obfuscate(code, options){
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(my_obfuscate(code, options));