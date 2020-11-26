$(() => {
    $('#choose').on('click', choose);
    $('#file').on('change', upfile);
    $('#upload').on('click', upload);
})

// 1.1 获取裁剪区域的 DOM 元素
let $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)
function choose() {
    $('#file').click();
}
function upfile(e) {
    // 1. 拿到用户选择的文件
    let file = e.target.files;
    if (file.length === 0) {
        return layui.layer.msg('请选择照片！')
    }
    // 2. 将文件，转化为路径
    let imgURL = URL.createObjectURL(file[0])
    // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
}

function upload() {
    let dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png');
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            layui.layer.msg(res.message);
            if (res.status !== 0) {
                return ;
            }
            window.parent.load();
        }
    })
}