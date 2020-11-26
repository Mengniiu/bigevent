$(() => {
    layui.form.verify({
        nickname: [/^[\S]{6,12}$/, '昵称必须在6-12位之间']
    });

    load();

    $('#reset').on('click', function () {
        load();
    });

    $('#submit').on('click', submit)
})

function load() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            };
            layui.form.val('userform', res.data);
        }
    })
}

function submit() {
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data:$('#userinfo').serialize(),
        success(res) {
            layui.layer.msg(res.message);
            if (res.status !== 0) return;
            window.top.load();
        }
    })
}