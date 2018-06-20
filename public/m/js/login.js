$(function(){
    $(".mui-btn-primary").on("tap",function(){
        // 收集数据
        var name = $(".mui-input-clear").val();
        var pass = $(".mui-input-password").val();
        // 发送请求
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:name,
                password:pass
            },
            dataType:'json',
            success:function(result){
                console.log(result);
                // 登陆成功
                if(result.success == true){
                    // 跳转到刚才那一页
                }
                // 登陆失败
            }
        });
    });
})