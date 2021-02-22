exports.default = {
    'id':'16进数字与unicode字符回转',
    'description':'将16进数字转换回10进制',
    'visitor':{
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
}