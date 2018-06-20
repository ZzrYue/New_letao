$(function () {

    // 获取用户传入的产品id号
    // lt.getParamter(location.search) == {"proId":4}
    var id = lt.getParamter(location.search).proId;


    // 初始化下拉刷新组件
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    render();
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 获取数据--封装为函数

    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetail',
            data: { "id": id },
            dataType: 'json',
            success: function (result) {
                var html = template("lr_proDetailTemp", result);
                $(".lt_proBox").html(html);

                // 重新初始化轮播图组件
                mui('.mui-slider').slider({
                    interval: 2000//自动轮播周期，若为0则不自动播放，默认为0；
                });
                // 重新初始化数字输入框
                mui(".mui-numbox").numbox();
            }
        });
    }

    // 选择尺码
    $(".lt_parent").on("tap", ".lt_size > span", function () {
        // 清除所有span的active样式
        $(this).siblings().removeClass("active");
        // 为当前span添加active样式
        $(this).addClass("active");
    })

    // 单击添加到购物车
    $(".btn-addCart").on("tap", function () {
        $.ajax({
            type: 'POST',
            url: "/cart/addCart",
            data: {
                productId: id,
                num: $(".mui-input-numbox").val(),
                size: $(".lt_size > span.active").text()
            },
            dataType: 'json',
            success: function (result) {
                // 判断是否登陆
                // 如果登陆过，就弹出提示框，底部用户是继续逛逛，还是查看购物车
                if (result.error != 400) {
                    mui.confirm('添加成功，去购物车瞅瞅？', '温馨提示', ['是', '否'], function (e) {
                        if (e.index == 0) {
                            location.href = "./cart.html";
                        }
                    })
                }
                // 如果没有登陆，就直接跳转到登陆页
                else {
                    // 跳转到登陆页，同时传入当前页面的url值，以便登陆成功之后能够回到当前页
                    location.href = "./login.html?redirectURL=" + location.href;
                }
            }
        });
    });
});