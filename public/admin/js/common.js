$(function () {
    // 单击右侧全屏
    $(".glyphicon-align-justify").on("click", function () {
        // 让左侧隐藏
        $(".lt_left").toggle();
        // 让右侧全屏 --padding-left:0px ---切换 --- 样式 toggleClass
        $(".lt_main").toggleClass("fullScreen");
    });


    // 添加退出模态框
    (function () {
        // 通过js动态创建模态框结构： 1.创建模态框  2.添加到当前页面结构中
        // 1.长字符串的使用 反引号``是ES6的新语法 ，特点就是支持多行文本
        var mymodal = `<div class="modal fade exitModel bs-example-modal-sm" id="myExitModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
                </div>
                <div class="modal-body">
                    <p style="color:red">您确定要退出后台管理系统吗？</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary exitBtn">确定</button>
                </div>
            </div>
        </div>
    </div>`;
        // 2.将其添加到页面结构中
        $("body").append(mymodal);
        // 为退出确定按钮绑定事件
        $(".exitBtn").on("click", function () {
            $.ajax({
                type: 'get',
                url: '/employee/employeeLogout',
                dataType: 'json',
                success: function (result) {
                    if (result.success == true) {
                        location.href = "login.html";
                    }
                }
            });
        });
    })();
    // 退出功能
  
    // 2.2：如何实现退出功能--调用接口
    $(".glyphicon-log-out").on("click", function () {
        // 展示模态框
        $("#myExitModal").modal("show");
    });

    

    // 分类导航项的展示和合并
    $(".lt_cate").on("click",function(){
        $(".lt_subCate").slideToggle();
        // console.log($(this))
        $(this).parent().siblings().find("a").removeClass("active");
        $(this).addClass("active");
    });


});