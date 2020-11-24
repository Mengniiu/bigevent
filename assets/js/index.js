$(() => {
    load();
    $('#logout').on('click', logout)
});


function load() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 在ajax预处理函数中，自动添加headers属性
        // headers: {
        //     Authorization: localStorage.getItem('mytoken')
        // },
        success(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(res) {
    let name = res.nickname || res.username;
    $('#welcome').html('欢迎' + name);
    if (res.user_pic !== null) {
        $('.layui-nav-img').attr('src', res.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        let fn = name[0].toUpperCase();
        $('.text-avatar').html(fn).show()
    }
}

function logout() {
    layer.confirm('是否确认要退出登录?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('mytoken');
        location.href='login.html'
        layer.close(index);
    });
}