$(function () {
    // 获取数据，生成动态结构
    function render() {
        $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            data: {},
            dataType: 'json',
            success: function (result) {
                console.log(result);
                var html = template("catListTemp", { "list": result });
                $("#OA_task_2").html(html);
            }
        });
    }
    render();

    // 编辑功能的实现 ：使用事件委托
    $("#OA_task_2").on("tap", ".lt_cartEditBtn", function () {
        var _this = this;
        // 如果jq可以使用$(this).data(),但是zepto并没有进行这个封装，所以这里我们使用js原生的方式
        var data = this.dataset;
        var editHtml = template("cartEditTemp",data);
        // 获取li元素
        var li = this.parentNode.parentNode;
        // 我们在编辑的时候在确认框上展示的是动态的一组html结构--我们考虑使用模板引擎的方式来实现 
        // 模板引擎的使用有两个前提
        // 1.能够创建模板
        // 2.能够获取到模板必须的数据:尺码范围productSize  | 当前商品的剩余数量productNum  | 用户当前选择的数量num  | 用户当前所选择的尺码size

        // 在生成模板内容的时候，换行符会被生成，造成span换行显示，所以我们使用正则表达式将所有的换行符替换为''
        // replace:第一个参数不仅仅可以写字符串值，而且还能匹配正则表达式，g是指全局替换
        mui.confirm(editHtml.replace(/\n/g,''), '编辑商品', ['是', '否'], function (e) {
            if (e.index == 0) {
                var pa = {
                    id:data.id,
                    size:$(".lt_size > span.active").text(),
                    num:$(".mui-input-numbox").val()
                };
                // 实现修改操作
                $.ajax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:pa,
                    dataType:'json',
                    success:function(result){
                        if(result.success && result.success == true){
                            // 当修改成功之后，我们不能直接刷新所有数据，因为这样不利于用户体验，所以我们应该动态的去修改当前数据所对应的数据行中的展示
                            // 修改li元素数据行的数据展示
                            $(li).find(".lt_editNum").text("x "+ pa.num +"双");
                            $(li).find(".lt_editSize").text("鞋码："+pa.size);
                            // 因为我们的编辑的数据是来源于编辑按钮，所以修改之后还需要动态的修改按钮中的自定义属性值
                            $(_this).attr("data-size",pa.size);
                            $(_this).attr("data-num",pa.num);
                        }
                        mui.swipeoutClose(li);
                    }
                })
                // 隐藏当前滑动按钮
            } else {
                // 隐藏当前滑动按钮：闭合滑动组件
                mui.swipeoutClose(li);
            }
        })
        // 初始化数字输入框
        mui(".mui-numbox").numbox();
        // 选择尺码
        $(".lt_size").on("tap", "span", function () {
            // 清除所有span的active样式
            $(this).siblings().removeClass("active");
            // 为当前span添加active样式
            $(this).addClass("active");
        })
    });

    
});