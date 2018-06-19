$(function(){
    // 1.下拉刷新和上拉加载初始化
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : { //down:下拉
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: false,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){
                // 调用ajax，获取数据，重新生成动态结构
                // 上面的操作做完之后，重新隐藏下拉刷新组件
                setTimeout(function(){
                    // 对于下拉刷新结束，文档有错误，正确的方法是endPulldownToRefresh()
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                }, 2000);
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          },
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:false,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){
                setTimeout(function(){
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                }, 2000);
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
    });

    // 2.页面打开时自动加载数据生成动态结构
    function render(){
        var pa = lt.getParamter(location.search);
        // alert(location.search);
        // 准备参数
        var data = {
            page:1,
            pageSize:10,
            // 用户之前的搜索关键字
            proName:pa.proName
        };
        // 发起ajax请求
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            "data":data,
            dataType:"json",
            success:function(result){
                // console.log(result);
                var html = template("lt_sTemp",result);
                $(".lt_mproduct > ul").html(html);
            }
        });
    }
    // 加载默认数据
    render();

    // 3.单击实现排序
    $(".lt_sorder > a").on("tap",function(){
        // 目的只有一个：就是在之前的查询的基础之上添加一个排序参数
    })
});