$(function () {
    // 准备参数
    var pageSize = 2;
    var currentPage = 1;
    // 封装一个渲染页面的函数
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                "page": currentPage,
                "pageSize": pageSize
            },
            dataType: "json",
            success: function (result) {
                // console.log(result);
                var html = template("userListTemp", result);
                $("tbody").html(html);
                // 动态生成分页
                Paginator(Math.ceil(result.total/result.size));
            }
        })
    }
    render();
    
    // 当点击操作栏的按钮的时候，出现模态框
    var _this;
    $("tbody").on("click", ".btn", function () {
        _this = this;
        // console.log(_this)
        $(".userManagerModal").modal("show");
    })

    // 当点击"确认"的时候，更改表格中的相关内容
    $(".userManagerModalBtn").on("click", function (e) {
        // alert(123)
        // console.log(_this)
        // console.log(_this.parentNode)
        var isDelete;
        if ($(_this).text() == "启用") {
            isDelete = 0
        } else {
            isDelete = 1
        }
        // console.log(isDelete);
        // console.log(_this.parentNode.parentNode)
        var id = _this.parentNode.parentNode.dataset.id;
        // console.log(id)
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                "id": id,
                "isDelete": isDelete
            },
            dataType: "json",
            success: function (result) {
                // console.log(result)
                // 修改当前按钮的内容
                $(_this).text(isDelete == 1 ? "启用" : "禁用");
                // 修改当前按钮的样式
                if (isDelete == 1) {
                    $(_this).removeClass("btn-danger").addClass("btn-info")
                } else {
                    $(_this).removeClass("btn-info").addClass("btn-danger")
                }
                // 同时修改状态
                $(_this).parent().siblings(".userStatus").text(isDelete == 1 ? "已禁用" : "已启用");

                $(".userManagerModal").modal("hide");
            }
        })
    })

    // 实现分页功能
    function Paginator(totalPages) {
        var  options = {
            bootstrapMajorVersion: 3,
            totalPages: totalPages,
            onPageClicked: function (event,  originalEvent,  type, page) {
                // 修改当前的页码
                currentPage = page;
                // 进行页面的渲染
                render()
            }
        }
        $('#paginator').bootstrapPaginator(options);
    }
});