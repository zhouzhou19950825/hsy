$(function () {
//当键盘键被松开时发送Ajax获取数据
    $('#text').keyup(function () {
        var keywords = $(this).val();
        if (keywords == '') {
            $('#word').hide();
            return
        }
        $.ajax({
            url: '/menuNode/menuNodeSearchBar',
            type: "GET",
            data: {
                menuNodeName: keywords
            },
            beforeSend: function () {
                $('#word').append('<div>正在加载。。。</div>');
            },
            success: function (data) {
                $('#word').empty().show();
                for (var i = 0; i < data.length; i++) {
                    $('#word').append('<div class="click_work" myId="' + data[i].id + '">' + data[i].menuNodeName + '</div>');
                }
            },
            error: function () {
                $('#word').empty().show();
                $('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
            }
        })
    })
//点击搜索数据复制给搜索框
    $(document).on('click', '.click_work', function () {
        var word = $(this).attr("myId");
        var theWord = $(this).text();
        $('#text').val(theWord);
        $('#word').hide();
        // $('#texe').trigger('click');触发搜索事件
        window.sd.location.href = "2change.html?menuNodeId=" + word;
    })
})