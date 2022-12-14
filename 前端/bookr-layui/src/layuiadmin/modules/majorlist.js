layui.define(['index', 'table'], function (exports) {
    var admin = layui.admin,
        table = layui.table,
        $ = layui.$,
        form = layui.form,
        setter = layui.setter,
        layer = layui.layer;

    layer.ready(function () {
        $.ajax({
            url: setter.baseURL + 'getAllSchoolList',
            type: 'post',
            headers: {
                'Authorization': sessionStorage.getItem("token"),
                'Access-Control-Allow-Origin': '*'
            },
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (res) {
                var data = res.data;
                for (i = 0; i < data.length; i++) {
                    $("#schoolName").append(new Option(data[i].name, data[i].name));
                }
                form.render();
            }
        });
        $.ajax({
            url: setter.baseURL + 'getAllMajorList',
            type: 'post',
            headers: {
                'Authorization': sessionStorage.getItem("token"),
                'Access-Control-Allow-Origin': '*'
            },
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (res) {
                var data = res.data;
                for (i = 0; i < data.length; i++) {
                    $("#name").append(new Option(data[i].name, data[i].name));
                }
                form.render();
            }
        });
    });

    form.on('select(schoolName)', function (data) {
        $.ajax({
            url: setter.baseURL + 'getMajorListBySchoolName',
            type: 'post',
            headers: {
                'Authorization': sessionStorage.getItem("token"),
                'Access-Control-Allow-Origin': '*'
            },
            data: JSON.stringify({'schoolName': data.value}),
            dataType: 'json',
            contentType: 'application/json;charset=utf-8',
            success: function (res) {
                var data = res.data;
                $("#name").find("option").remove();
                $("#name").append(new Option("", ""));
                for (i = 0; i < data.length; i++) {
                    $("#name").append(new Option(data[i].name, data[i].name));
                }
                form.render();
            }
        });
    });

    table.render({
        elem: '#test-table-toolbar',
        url: setter.baseURL + 'getMajorList',
        headers: {
            'Authorization': sessionStorage.getItem("token"),
            'Access-Control-Allow-Origin': '*'
        },
        toolbar: '#test-table-toolbar-toolbarDemo',
        title: '??????????????????',
        where: {
            name: '',
            schoolName: ''
        },
        cols: [
            [{
                type: 'checkbox',
                fixed: 'left'
            }, {
                field: 'id',
                title: 'ID',
                width: 80,
                sort: true
            }, {
                field: 'name',
                title: '????????????'
            }, {
                field: 'schoolName',
                title: '????????????'
            }, {
                title: '??????',
                fixed: 'right',
                align: 'center',
                toolbar: '#test-table-toolbar-barDemo',
                width: 150
            }]
        ],
        page: true,
        groups: 5,
        limit: 30,
        height: 'full-130',
        text: {
            none: '?????????'
        }
    });

    //?????????????????????
    table.on('tool(test-table-toolbar)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('????????????', function (index) {
                $.ajax({
                    url: setter.baseURL + 'deleteOneMajor',
                    type: 'post',
                    headers: {
                        'Authorization': sessionStorage.getItem("token"),
                        'Access-Control-Allow-Origin': '*'
                    },
                    data: JSON.stringify(data),
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (res) {
                        layer.msg(res.msg, {
                            offset: '15px',
                            icon: 1,
                            time: 1000
                        }, function () {
                            obj.del();
                            layer.close(index);
                        });
                    },
                    error: function () {
                        layer.msg("????????????");
                    }
                });
            });
        }
        if (obj.event === 'edit') {
            var tr = $(obj.tr);
            var id = obj.data.id;
            layer.open({
                type: 2,
                title: '??????????????????',
                content: 'majorform.html',
                maxmin: true,
                area: ['500px', '450px'],
                btn: ['??????', '??????'],
                success: function (layero, index) {
                    let body = layer.getChildFrame('body', index);
                    body.find("#name").val(data.name);
                    body.find("#util").val(data.schoolName);
                },
                yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index],
                        submitID = 'LAY-major-front-submit',
                        submit = layero.find('iframe').contents().find('#' +
                            submitID);

                    //????????????
                    iframeWindow.layui.form.on('submit(' + submitID + ')',
                        function (data) {

                            var field = data.field;
                            field['id'] = id;

                            //?????? Ajax ??????????????????????????????????????????
                            $.ajax({
                                url: setter.baseURL + "updateMajor",
                                type: 'post',
                                headers: {
                                    'Authorization': sessionStorage
                                        .getItem("token"),
                                    'Access-Control-Allow-Origin': '*'
                                },
                                data: JSON.stringify(field),
                                contentType: 'application/json;charset=utf-8',
                                dataType: 'json',
                                success: function (res) {
                                    layer.msg("???????????????", {
                                        offset: '15px',
                                        icon: 1,
                                        time: 1000
                                    })
                                }
                            });
                            table.reload('test-table-toolbar'); //????????????
                            layer.close(index); //????????????
                        });

                    submit.trigger('click');
                }
            });
        }
    });

    //????????????
    form.on('submit(LAY-major-front-search)', function (data) {
        var field = data.field;
        //????????????
        table.reload('test-table-toolbar', {
            where: field
        });
    });

    var active = {
        batchdel: function () {
            var checkStatus = table.checkStatus('test-table-toolbar'),
                checkData = checkStatus.data; //?????????????????????

            if (checkData.length === 0) {
                return layer.msg('???????????????');
            }

            layer.confirm('????????????', function (index) {
                //?????? Ajax ?????????
                $.ajax({
                    url: setter.baseURL + 'deleteMajors',
                    type: 'post',
                    data: JSON.stringify(checkData),
                    headers: {
                        'Authorization': sessionStorage.getItem("token"),
                        'Access-Control-Allow-Origin': '*'
                    },
                    contentType: 'application/json;charset=utf-8',
                    dataType: 'json',
                    success: function (res) {
                        table.reload('test-table-toolbar');
                        layer.msg('?????????');
                    },
                    error: function (res) {
                        layer.msg("????????????")
                        table.reload('test-table-toolbar');
                    }
                })
            });
        },
        add: function () {
            layer.open({
                type: 2,
                title: '????????????',
                content: 'majorform.html',
                maxmin: true,
                area: ['500px', '450px'],
                btn: ['??????', '??????'],
                yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index],
                        submitID = 'LAY-major-front-submit',
                        submit = layero.find('iframe').contents().find('#' +
                            submitID);

                    //????????????
                    iframeWindow.layui.form.on('submit(' + submitID + ')',
                        function (data) {
                            var field = data.field; //?????????????????????

                            $.ajax({
                                url: setter.baseURL + "addMajor",
                                type: 'post',
                                headers: {
                                    'Authorization': sessionStorage
                                        .getItem("token"),
                                    'Access-Control-Allow-Origin': '*'
                                },
                                data: JSON.stringify(field),
                                contentType: 'application/json;charset=utf-8',
                                dataType: 'json',
                                success: function (res) {
                                    layer.msg("????????????");
                                    table.reload(
                                        'test-table-toolbar'
                                    ); //????????????
                                    layer.close(index); //????????????
                                },
                                error: function (res) {
                                    layer.msg("????????????");
                                    // table.reload('book-manage'); //????????????
                                    // layer.close(index); //????????????
                                }
                            })

                        });

                    submit.trigger('click');
                }
            });
        }
    };
    $('.layui-btn.layuiadmin-btn-majorlist').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

    exports('majorlist', {})
});