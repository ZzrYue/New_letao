// 区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
});
// 轮播图初始化
mui('.mui-slider').slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

// var obj = {};
// obj.name = "jack";
// obj["age"] = 20;


var lt = {
  // 获取通过url方式传递的参数
  // ?proName=1&aa=bb&cc=dd
  getParamter: function(str){
    // 这就是我最终需要返回的对象
    var data = {};
    // 1.去除前面的? slice(起始索引，数量)
    str = str.slice(1);
    // str = str.substring(1); //proName=1&aa=bb&cc=dd
    // 2.按&符号进行分割
    var arr = str.split("&"); // 返回数组
    // console.log(arr);
    // 遍历数组成员，按=进行二次分割
    // ["proName=1", "aa=bb", "cc=dd"]
    for(var i=0;i< arr.length;i++){
      var final = arr[i].split("="); //["proName","1"]
      // 将分割好的数据生成对象的属性和值--键值对
      // var key = final[0]; //proName
      data[final[0]] = final[1];
    }
    console.log(data);
    return data;
  }
}