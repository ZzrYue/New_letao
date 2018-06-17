/**
 * Created by Administrator on 2017/12/19.
 */
/*
* 1.加载一级分类数据
* 2.加载一级分类数据中的默认的第一个一级分类的二级分类数据
*
* 3.添加单击事件(zepto)
*   a.切换样式
*   b.加载当前被单击的一级分类的二级分类数据*/

/*1.加载一级分类数据*/
$.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    data:{},
    dataType:"json",
    success:function(result){
        var html = template("firstCategory",result);
        $(".cat_left ul").html(html);

        /*获取对应的二级分类数据--默认取第一个一级分类的二级分类数据*/
        var id = result.rows[0].id;
        getSecondCategory(id);
    }
});

/*获取二级分类数据*/
function getSecondCategory(id){
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:{"id":id},
        dataType:"json",
        success:function(result){
            console.log(result);
            var html = template("secondCategory",result);
            $(".cat_right ul").html(html);;
        }
    });
}

/*实现单击操作：
* 单击一级分类链接，动态加载二级分类数据*/
$(".cat_left").on("tap","a",function(){
    /*要获取二级分类数据，重点是获取到当前的一级分类ID*/
    var id = $(this).data("id");
    getSecondCategory(id);
    /*清除所有li的now样式*/
    var li = $(this).parent();
    $(li).siblings().removeClass("now");
    /*为当前被单击的li元素添加样式*/
    $(li).addClass("now");
});