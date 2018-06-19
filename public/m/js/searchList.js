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

    // 获取参数
    var pa = lt.getParamter(location.search);

    // 2.页面打开时自动加载数据生成动态结构
    function render(data){
        // alert(location.search);
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
    render({
        page:1,
        pageSize:10,
        // 用户之前的搜索关键字
        proName:pa.proName
    });

    // 3.单击实现排序
    $(".lt_sorder > a").on("tap",function(){
        var data = {
            page:1,
            pageSize:10,
            // 用户之前的搜索关键字
            proName:pa.proName
        };
        // 目的只有一个：就是在之前的查询的基础之上添加一个排序参数
        // data[price|num] = 1|2;
        // 需求：
        // 1.到底以谁进行排序：在单击某个a的时候能够获取到这个a标签所代表的排序字段:为a元素添加自定义属性，这个值就是参数的键值
        // 2.到底是升序还是降序 a.拥有acitve样式 b.通过箭头的方向判断是升序还是降序：判断span的样式名称 fa-angle-down:降序  fa-angle-up:升序

        // 1.单击时，判断当前a元素是否有active样式
        // 如果有：则进行span的样式的切换：箭头方向切换
        // 如果没有：则先移除之前拥有active样式的A标签的active样式 ，同时将之前可能修改箭头方向重置为向下，最后为当前a元素添加active样式
        if($(this).hasClass("active")){ //有active样式
            // 找到当前被点击的a元素的子元素span，进行样式的切换--就是箭头方向的切换
            $(this).find("span").toggleClass("fa-angle-down fa-angle-up");
        }else{ //没有active样式
            // 找到兄弟元素中拥有active样式的a元素，找到它的子元素span,将span的样式重置箭头方向向下
            if(!$(this).siblings(".active")){
                $(this).siblings(".active").find("span")[0].className="fa fa-angle-down";
            }
            // 清除所有兄弟元素的active样式
            $(this).siblings().removeClass("active");
            // 为当前被点击的a元素添加active样式
            $(this).addClass("active");
        }

        // 获取排序字段
        var key = $(this).data("order");
        // 获取排序方式--升序还是降序
        var orderType = $(this).find("span").hasClass("fa-angle-down")?2:1;
        // 将排序参数添加到原始参数中
        data[key] = orderType;
        // 重新加载数据
        render(data);
    })
});