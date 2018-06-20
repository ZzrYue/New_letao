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
                // {success:true}
                console.log(result);
                // 登陆成功
                if(result.success && result.success == true){
                    // 跳转到刚才那一页
                    // 1.直接打开登陆页，没有其它的来源页》》首页
                    // http://127.0.0.1:3000/m/login.html?redirectURL=http://127.0.0.1:3000/m/productDetail.html?proId=3
                    // location.search:?redirectURL=http://127.0.0.1:3000/m/productDetail.html?proId=3
                    if(location.search.indexOf("?redirectURL") == 0){
                        // 跳转到来源页
                        location.href = location.search.replace("?redirectURL=",'');
                    }
                    // 2.没有来源页，则跳转到来源页
                    else{
                        location.href="./letao_index.html";
                    }
                }
                // 登陆失败
                else{
                    // mui提供的一个用于展示信息的函数--渐进渐出
                    mui.toast(result.message);
                }
            }
        });
    });
})