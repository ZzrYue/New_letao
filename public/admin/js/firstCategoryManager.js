$(function(){
    // 封装一个渲染页面的函数
    var currentPage = 1;
    var pageSize = 2;
    function render(){
        
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                "page":currentPage,
                "pageSize":pageSize
            },
            dataType:"json",
            success:function(result){
                console.log(result)
                var html = template("firstCateListTemp",result);
                $("tbody").html(html);
              // 动态生成分页
              Paginator(Math.ceil(result.total/result.size));
            }
        })
    };
    render();

      // 实现分页功能
      function Paginator(totalPages) {
        var  options = {
            bootstrapMajorVersion: 3,
            totalPages: totalPages,
            onPageClicked : function (event,  originalEvent,  type, page) {
                // 修改当前的页码
                currentPage = page;
                // 进行页面的渲染
                render();
            }
        }
        $('#paginator').bootstrapPaginator(options);
    };


    //  模态框
    (function(){
        var firstCate = `<div class="modal fade firstCateModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title">添加分类</h4>
            </div>
            <div class="modal-body">
            <div class="alert alert-danger" role="alert" style="display:none"></div>
            <input type="text" class="form-control" placeholder="请输入新增类名">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary firstCateModalBtn">保存</button>
            </div>
          </div>
        </div>
      </div>`
    
      $("html body").append(firstCate);
    //   console.log(333)
    })();

    // 点击添加按钮出现模态框
    $(".addCategory").on("click",function(){
        // console.log(444)
        $(".firstCateModal").modal("show");
    })

    // 点击“按钮”的时候，获取输入框的数据，并且在页面进行填充
    $(".firstCateModalBtn").on("click",function(){
        // 获取当前输入框值
        var categoryName = $("input[type='text']").val();
        // alert(categoryName);
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:{
                "categoryName":categoryName
            },
            dataType:"json",
            beforeSend:function(){
                // 判断用户是否有输入
                if($("input[type='text']").val() == "" || $.trim($("input[type='text']").val()) == ""){
                    $(".alert-danger").css({
                        "display":"block"
                    });
                    $(".alert-danger").text("请输入新的分类")
                    return false;
                }
            },
            success:function(result){
                console.log(result)
                if(result.success && result.success == true){
                    $(".alert-danger").css({
                        "display":"none"
                    }); 
                    render();  
                    $(".firstCateModal").modal("hide");
                }
            }
        })
    })
})