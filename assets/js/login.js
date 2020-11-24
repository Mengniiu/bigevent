$(function () {
    $('#form-reg').on('submit', reg);
    $('#form-login').on('submit', login);

    $('#link-reg').on('click', function () {
        $('.loginbox').hide();
        $('.regbox').show();
    })
    $('#link-login').on('click', function () {
        $('.loginbox').show();
        $('.regbox').hide();
    })

    // 密码规则
    layui.form.verify({
        pw: [
            /^[A-Z][\S]{6,12}$/
            , '密码必须6到12位，首字母大写，且不能出现空格'
        ],
        rpw: function (rpw) {
            let pw = $('#password').val();
            if (rpw !== pw) {
                return '两次密码输入不同，请重新输入'
            }
        }
    })
})

function reg(e) {
    e.preventDefault();
    let fd = $(this).serialize();
    $.ajax({
        method: 'POST',
        url:'/api/reguser',
        data: fd,
        success(res) {
            if (res.status != 0) return layui.layer.msg(res.message);
            layui.layer.msg('注册成功快登录呀');
            let username = $('#form-reg [name=username]').val();
            $('#form-reg')[0].reset();
            $('#link-login').click();
            $('#form-login [name=username]').val(username);
        }
    })
}
function login(e) {
    e.preventDefault();
    let fd = $(this).serialize();
    $.ajax({
        method: 'POST',
        url:'/api/login',
        data: fd,
        success(res) {
            if (res.status != 0) return layui.layer.msg(res.message);
            layui.layer.msg(res.message, {
                icon: 6,
                time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
            }, function () {
                localStorage.setItem('mytoken', res.token);
                location.href = '/index.html'
            });
        }
    })
}