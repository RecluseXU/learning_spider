// Babel库的主要作用于代码编译的过程
// * 将新版本的js代码转化为旧版本，以适应各种浏览器  
// * 根据非 javascript 内容生成 javascript 代码  
// * 混淆/解混淆
// ......
var js_env = "E:/Software/Programming/Environment/Nodejs/node_global/node_modules/";
const babel = require(js_env + "@babel/core");

const code = `
const sayHello = ()=>{
    console.log('Hello Babel')
}
sayHello()
`
const optionsObject = {}
const result = babel.transform(code, optionsObject);
console.log(result)