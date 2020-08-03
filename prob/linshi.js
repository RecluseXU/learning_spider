auth: function (a, b, c) {
    $.accountStatus.logoutHandle = !1;
    (a == p || 0 == a.length) && b && b(EUNAUTH);


    return $.sendAjaxReq(
        "",
        method: "do",
        {login: {password: a}}, 
        function (c) {
            var d = c[ERR_CODE];
            ENONE == d ? ($.session = decodeURIComponent(c.stok),
            $.setLgPwd(a),
            $.authRltObj.authStatus = !0) : ($.authRltObj.authStatus = !1, $.parseAuthRlt(c.data));
            return b && b(d)
        }, 
        c || "undefined" === typeof c, 
        "json")



    a = "";
    b = {method: "do", login: {password: a}};
    c = function (c) {
            var d = c[ERR_CODE];
            ENONE == d ? ($.session = decodeURIComponent(c.stok),
            $.setLgPwd(a),
            $.authRltObj.authStatus = !0) : ($.authRltObj.authStatus = !1, $.parseAuthRlt(c.data));
            return b && b(d)
        };
    e = 
}



sendAjaxReq: function (a, b, c, e, f, g) {
    if (!0 == $.local)
        return c && c({
            err_code: ENONE
        });
    if ("string" !== typeof a)
        return !1;
    $.isFunction(b) && (e = e || c,
        c = b,
        b = {});
    e = e || "undefined" === typeof e;
    var h = !0;
    a = {
        url: a,
        data: b,
        type: "POST",
        async: e,
        postDataType: f,
        utf8Encode: g || "undefined" === typeof g,
        success: function (a) {
            if (c)
                try {
                    h = c(a)
                } catch (b) {
                    h = null,
                        e && (h = !1)
                }
        },
        dataType: "json"
    };
    "json" == f && (a.contentType = "application/json; charset=UTF-8");
    $.ajax(a);
    return h
},