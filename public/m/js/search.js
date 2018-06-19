$(function(){
    // 页面一加载就显示历史搜索记录：如果有就显示，如果没有给出提示
    function loadHistoryData(){
        // 1.获取历史搜索数据
        var hisData = getHistoryData();
        // 2.调用模板引擎生成动态结构
        var historyHTML = template("ltHistoryTemp",{"list":hisData});
        // 3.添加到页面结构中
        $(".lt_slist").html(historyHTML);
    }
    loadHistoryData();

    // 获取历史搜索记录
    function getHistoryData(){
        // 数组是存储在localStorage中的
        // 约定：约定key值   ltHistoryData
        // 1.从localStorage中获取历史数据
        var historyData = localStorage.getItem("ltHistoryData");
        // 2.将获取到的历史数据转换为数组:可能没有值，为了规避以后遍历时的错误，这里进行判断，如果没有值，则返回空数组
        var historyArr = JSON.parse(historyData || '[]');
        // 3.返回历史数据
        return historyArr;
    }

    // 单击搜索：
    // 1.实现页面的跳转：传入用户搜索关键字
    // 2.将当前搜索关键字添加到localStorage中
        // 2.1 如果输入重复值：先删除再添加
        // 2.2 如果数量超过10条，则删除最先添加的再添加当前关键字
        // 2.3 最后输入的关键字应该在最前面显示
    $(".lt_searchBtn").on("tap",function(){
        // 1.收集用户输入的关键字
        var keyWords = $(".lt_searchKey").val();
        // 2.将关键字添加到localStorage中
        // 2.1 获取历史搜索记录
        var hisData = getHistoryData();

        // 判断关键字是否重复，如果是，则先删除再添加
        for(var i=0;i<hisData.length;i++){
            if(hisData[i] == keyWords){
                hisData.splice(i,1);
                break;
            }
        }
        // 判断数量是否超出指定的限制，如果是则删除最先添加的数据-索引0对应的数据
        if(hisData.length >= 10){
            hisData.splice(0,1);
        }


        // 2.2 将当前关键字添加到数组中
        hisData.push(keyWords);
        // 2.3 将添加了新关键字的数组重新写入到localStorage中
        localStorage.setItem("ltHistoryData",JSON.stringify(hisData));
        // 2.4 刷新页面显示
        loadHistoryData();


        // 3.实现页面的跳转
        location.href="./searchList.html?proName="+keyWords;
    });

    // 清除单条搜索记录
    $(".lt_slist").on("tap",".fa-close",function(){
        // 1.获取当前 当前span所对应的索引
        var index = $(this).data("index");
        // 2.获取所有历史搜索记录
        var hisData = getHistoryData();
        // 3.删除
        hisData.splice(index,1);
        // 4.重新存储
        localStorage.setItem("ltHistoryData",JSON.stringify(hisData));
        // 5.刷新
        loadHistoryData();
    })

    // 清除所有搜索记录
    $(".fa-trash").on("tap",function(){
        localStorage.setItem("ltHistoryData","");
        loadHistoryData();
    })
});