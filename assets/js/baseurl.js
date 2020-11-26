// let baseurl = 'http://ajax.frontend.itheima.net';
// ajax请求发送前触发的函数
$.ajaxPrefilter(function (res) {
    res.url = 'http://ajax.frontend.itheima.net' + res.url;
    if (res.url.indexOf('/my/') != -1) {
        res.headers = {
            Authorization: localStorage.getItem('mytoken')
        }
    }
    res.complete=function(res){
        if (res.responseJSON.status==1&&res.responseJSON.message=='身份认证失败！')
        layui.layer.msg(res.responseJSON.message,{
            icon: 1,
            time: 1500 //1.5秒关闭（如果不配置，默认是3秒）
        }, function () {
            localStorage.removeItem('mytoken');
            window.top.location.href='/login.html'
        });
    }
})