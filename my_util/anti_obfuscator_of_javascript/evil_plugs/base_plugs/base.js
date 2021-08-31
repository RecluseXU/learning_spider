var js_env = "D:/Program/Environment/Nodejs/nodejs/node_global/node_modules/";
exports.types = require(js_env + "@babel/types");
exports.parser = require(js_env + "@babel/parser");
exports.generator = require(js_env +"@babel/generator").default;
const traverse = require(js_env + "@babel/traverse").default;
exports.traverse = traverse;

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