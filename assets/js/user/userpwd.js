$(() => {
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须在6-12位之间'],
        samepwd: function (value) {
            if (value === $('[name=oldPwd').val()) {
                return '新旧密码不能一样'
            }
        },
        repwd: function (v) {
            if (v !== $('[name=newPwd').val()) {
                return '两次输入的密码不一样，请重新输入'
            }
        }
    });

    $('#submit').on('click', submit)
})

function submit() {
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $('#userpwd').serialize(),
        success(res) {
            if (res.status !== 0) return layui.layer.msg(res.message);
            layui.layer.msg(res.message, {
                icon: 6,
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            }, function () {
                localStorage.removeItem('mytoken');
                window.top.location.href = '/login.html';
            });
        }
    })
}