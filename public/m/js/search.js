$(function(){
    // 1.页面打开加载默认的搜索历史记录
    var data = getSearchHistoryData();
    var html = template('ltHistoryTemp',{"items":data})
    $(".lt_slist").html(html);

    // 封装函数，获取所有搜索历史记录
    // 约定：key的名称：ltHistoryData
    // localStorage.setItem("ltHistoryData",'["aa","bb","cc"]')
    function getSearchHistoryData(){
        var dataStr = localStorage.getItem("ltHistoryData");
        return JSON.parse(dataStr);
    }
});