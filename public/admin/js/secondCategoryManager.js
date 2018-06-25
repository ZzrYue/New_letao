$(function () {
    // 封装一个渲染页面的函数
    var currentPage = 1;
    var pageSize = 2;
    function render() {

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                "page": currentPage,
                "pageSize": pageSize
            },
            dataType: "json",
            success: function (result) {
                // console.log(result)
                var html = template("secondCategoryListTemp", result);
                $("tbody").html(html);
                // 动态生成分页
                Paginator(Math.ceil(result.total / result.size));
            }
        })
    };
    render();

    // 实现分页功能
    function Paginator(totalPages) {
        var options = {
            bootstrapMajorVersion: 3,
            totalPages: totalPages,
            onPageClicked: function (event, originalEvent, type, page) {
                // 修改当前的页码
                currentPage = page;
                // 进行页面的渲染
                render();
            }
        }
        $('#paginator').bootstrapPaginator(options);
    };

    // 动态生成模态框中的一级分类目录数据
    (function firstCateRender(){
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                "page":1,
                "pageSize":100
            },
            dataType:"json",
            success:function(result){
                // console.log(result)
               var html = "";
                // 循环遍历返回的结果，拼接字符串
                // result.rows.forEach(rows=> {
                //     html += '<li><a href="#">value.categoryName</a></li>';
                // });
                result.rows.forEach(function(value,index){
                    html += '<li><a href="#" data-id="'+value.id+'">'+value.categoryName+'</a></li>';
                });
                $(".firstCategory").html(html);
            }
        })
    })();

    // 当点击下拉框的任意一栏的时候，将值填充到firstCategoryName，使用时间委托绑定点击事件
    $(".firstCategory").on("click","a",function(){
        // 当前的值填充到显示
        $(".firstCategoryName").text($(this).text());
        // 给当前的隐藏域赋值，将当前的点击的自定义id的值传递给到当前的隐藏域的val值
        $('[name="categoryId"]').val($(this).data("id"));
        // alert($(this).data("id"));
    });


    // 点击“添加品牌”按钮，出现模态框
    $(".addBrandBtn").on("click", function () {
        $(".brandModal").modal("show")
    });

    // 上传图片插件
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // 将上传文件的路径赋给展示图片的img
            $(".secondcateImg").attr("src",data.result.picAddr);
            // 给当前隐藏域赋值，将当前的图片的路径传递到当前的隐藏域的val值
            $('[name="brandLogo"]').val(data.result.picAddr);
        }
    });

    // 单击“保存”时候，将添加的数据
    $(".brandModalBtn").on("click",function(){
        console.log($("form").serialize());
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("form").serialize()+"&hot=1",
            dataType:"json",
            beforeSend:function(){
                if($(".firstCategoryName").text()== "请选择分类" && $('[name="brandName"]') == "" ){
                    return false;
                }
            },
            success:function(result){
                console.log(result);
                if(result.success && result.success == true){
                    alert("上传成功");
                    // 将模态框隐藏
                    $(".brandModal").modal("hide");
                    // 进行页面的重新渲染
                    render();
                }
            }
        });
    })
})