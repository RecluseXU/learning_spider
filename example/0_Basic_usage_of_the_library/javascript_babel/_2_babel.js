const recast = require("recast");
const check = recast.types.namedTypes;
const {
    expressionStatement,
    memberExpression,
    identifier: id,
    callExpression,
    stringLiteral
} = recast.types.builders;

