var JAVASCRIPT_ENV = "D:/Program/Environment/Nodejs/nodejs/node_global/node_modules/";
exports.JAVASCRIPT_ENV = JAVASCRIPT_ENV;

// @babel/types
let types = require(JAVASCRIPT_ENV + "@babel/types");
types.isIIFE = function(path){
    // @function 判断是否为IIFE
    // @return bool
    if(!types.isExpressionStatement(path)){return false}
    const expression = path.get('expression');
    if(!types.isCallExpression(expression)){return false}
    const callee = expression.get('callee');
    if(!types.isFunctionExpression(callee)){return false}
    return true
}
exports.types = types

// @babel/parser
exports.parser = require(JAVASCRIPT_ENV + "@babel/parser");


// @babel/generator
exports.generator = require(JAVASCRIPT_ENV +"@babel/generator").default;

// @babel/traverse
const traverse = require(JAVASCRIPT_ENV + "@babel/traverse").default;
exports.traverse = traverse;

// @babel/template
exports.template = require(JAVASCRIPT_ENV + "@babel/template");


// BasePlug
exports.BasePlug = class BasePlug {
    handler = function (ast) {
        console.log('Using plug:',this.name)
        console.log('Plug description:',this.description)
        traverse(ast, this.visitor);
    }
    constructor(plug_name, visitor, plug_description) {
        this.name = plug_name;
        this.visitor = visitor;
        this.description = plug_description;
    }
}


