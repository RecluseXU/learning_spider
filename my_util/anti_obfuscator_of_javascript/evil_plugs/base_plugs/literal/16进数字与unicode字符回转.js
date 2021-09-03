const {BasePlug, types, parser, generator, traverse} = require("../base");

const visitor = {
    NumericLiteral({node}) {
        if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
            node.extra = undefined;
        }
    },
    StringLiteral({node}) {
        if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
            node.extra = undefined;
        }
    },
}

const plug = new BasePlug(
   '16进数字与unicode字符回转',
   visitor,
   '将16进数字转换回10进制',
)
exports.default = plug;
