$(function(){
    // 1.加载一级分类数据，同时还要加载默认的第一个一级分类的二级分类数据
    $.ajax({
        type:'get',
        url:"/category/queryTopCategory",
        dataType:'json',
        success:function(result){
            console.log(result);
            var html = template("firstCategoryTemp",result);
            $(".lt_clef ul").html(html);
            // 加载了一级分类数据之后，默认还是加载第一个一级分类的二级分类数据
            getSecondCategory(result.rows[0].id);
        }
    });

    // 2.点击左侧一级分类数据，加载二级分类数据
    // 使用事件委托的方式为动态生成的元素添加事件
    $(".lt_clef").on("tap","a",function(){
        // 1.获取id，加载二级主分类数据
        var id = $(this).data("id");
        getSecondCategory(id);
        // 2.切换样式
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");
    })

    // 3.封装加载二级分类数据的加载
    function getSecondCategory(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{"id":id},
            dataType:'json',
            success:function(result){
                console.log(result);
                var html = template("secondCategoryTemp",result);
                $(".lt_cright ul").html(html);
            }
        });
    }
});