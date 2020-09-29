// Babel库的主要作用是用于将新版本的js代码转化为旧版本，以适应各种浏览器  
var js_env = "F:/Environment/Node_js/node_modules/";
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