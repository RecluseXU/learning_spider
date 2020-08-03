c.extend({
    //----------------------------------------------------------------------------------5
    // 至此游戏结束参数均可获得
    securityEncode: function (a, b, c) {
        var e = "",
            f, g, h, k, l = 187,
            n = 187;
        g = a.length;
        h = b.length;
        k = c.length;
        f = g > h ? g : h;
        for (var p = 0; p < f; p++)
            n = l = 187,
            p >= g ? n = b.charCodeAt(p) : p >= h ? l = a.charCodeAt(p) : (l = a.charCodeAt(p),
                n = b.charCodeAt(p)),
            e += c.charAt((l ^ n) % k);
        return e
    },
    //----------------------------------------------------------------------------------5
    // 追寻到，此函数引用 securityEncode 函数
    orgAuthPwd: function (a) {
        return $.securityEncode("RDpbLfCPsJZ7fiv", a, "yLwVl0zKqws7LgKPRQ84Mdt708T1qQ3Ha7xv3H7NyU84p21BriUWBU43odz3iP4rBL3cD02KZciXTysVXiV8ngg6vL48rPJyAUw0HurW20xqxv9aYb4M9wK1Ae0wlro510qXeU07kV57fQMc8L6aLgMLwygtc0F10a0Dg70TOoouyFhdysuRMO51yY5ZlOZZLEal1h0t9YQW0Ko7oBwmCAHoic4HYbUyVeU3sfQ1xtXcPcf1aT303wAQhv66qzW")
    },
    //----------------------------------------------------------------------------------4
    // 以下为 setLgPwd 引用，认证函数auth也会引用
    // 追寻到，给密码赋值前需要通过 orgAuthPwd 函数

    // 赋一个空，显然不是目标
    setLoginErrHandle: function (a) {
        $.loginErrHandle = function (b) {
            //-------!-------
            $.setLgPwd("");
            //---------------
            a(b)
        }
    },
    // 赋一个空，显然不是目标
    logout: function () {
        $.action({
            system: {
                logout: "null"
            }
        }, function (a) {
            ENONE == a[ERR_CODE] && ($.session = "",
                //-------!-------
                $.setLgPwd(""),
                //---------------
                setLoadPage("Content.htm", "Con"),
                $.authRltObj.code = ESYSCLIENTNORMAL,
                showLogin(function () {
                    emptyNodes(id("Con"))
                }),
                $.accountStatus.logoutHandle = !0)
        })
    },
    // 键名为修改默认密码
    changeDefaultPwd: function (a, b) {
        //--------!----------
        var c = orgAuthPwd(a),
            e = {
                method: "do",
                set_password: {
                    password: c
                }
            };
        //-------------------
        $.accountStatus.logoutHandle = !1;
        $.sendAjaxReq("", e, function (a) {
            var e = a[ERR_CODE];
            ENONE == e && ($.authRltObj.authStatus = !0,
                //--------!----------
                $.setLgPwd(c),
                //-------------------
                $.session = decodeURIComponent(a.stok));
            b && b(e)
        }, !0, "json")
    },
    // 键名为修改密码
    changePwd: function (a, b, c) {
        a = {
            system: {
                chg_pwd: {
                    old_pwd: orgAuthPwd(a),
                    new_pwd: orgAuthPwd(b)
                }
            }
        };
        $.action(a, function (a) {
            a = a[ERR_CODE];
            //--------------------!----------------------
            ENONE == a && $.setLgPwd(orgAuthPwd(b));
            //-------------------------------------------
            "function" == typeof c && c(a)
        })
    },

    //----------------------------------------------------------------------------------3
    // js中仅此一处赋值$.pwd
    // 参数1 为所求
    // 键值似乎是 设置密码
    setLgPwd: function (a) {
        try {
            sessionLS.setItem(LGKEYSTR, a),
                sessionLS.setItem(LGKEYLEN, gCloudAccountBR.pwdLen),
                //----!----
                $.pwd = a
                //--------
        } catch (b) {}
    },

    //----------------------------------------------------------------------------------2
    // $.pwd为所求

    postDsUnAuthHandle: function (a, b, c, e) {
        if (!0 != $.accountStatus.logoutHandle && EUNAUTH == e[ERR_CODE])
            if ($.authRltObj.authStatus = !1,
                $.parseAuthRlt(e.data),
                null == $.pwd || 0 == $.pwd.length || ESYSRESET == $.authRltObj.code)
                n.setTimeout(function () {
                    $.loginErrHandle()
                }, 0);
            else
                return $.auth(
                    //----!-----
                    $.pwd,
                    //----------
                    function (e) {
                        if (ENONE == e)
                            return $.sendAjaxReq($.orgDsUrl(), a, function (a) {
                                if (EUNAUTH == a[ERR_CODE])
                                    $.authRltObj.authStatus = !1,
                                    $.parseAuthRlt(a.data),
                                    $.loginErrHandle();
                                else
                                    return $.authRltObj.authStatus = !0,
                                        b && b(a)
                            }, c, "json");
                        n.setTimeout(function () {
                            $.authRltObj.authStatus = !1;
                            $.loginErrHandle()
                        }, 0)
                    },
                    c
                )
    },
    //----------------------------------------------------------------------------------1
    // 认证函数
    // 参数1 为所求数据
    auth: function (a, b, c) {
        $.accountStatus.logoutHandle = !1;
        (a == p || 0 == a.length) && b && b(EUNAUTH);
        return $.sendAjaxReq(
            "",
            //-----!-------
            {
                method: "do",
                login: {
                    password: a
                }
            },
            //-------------
            function (c) {
                var d = c[ERR_CODE];
                ENONE == d ? ($.session = decodeURIComponent(c.stok), $.setLgPwd(a), $.authRltObj.authStatus = !0) : ($.authRltObj.authStatus = !1, $.parseAuthRlt(c.data));
                return b && b(d)
            },
            c || "undefined" === typeof c,
            "json")
    },

    //-----------------------------------------------------------------------------------0
    //  发送Ajax请求
    //  参数2 为所求数据
    sendAjaxReq: function (a, b, c, e, f, g) {
        if (!0 == $.local)
            return c && c({
                err_code: ENONE
            });
        if ("string" !== typeof a)
            return !1;
        "function" === c.type(b) && (e = e || c,
            c = b,
            b = {});
        e = e || "undefined" === typeof e;
        var h = !0;
        a = {
            url: a,
            //----!-----
            data: b,
            //----------
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
})