// 区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators:false
});
// 轮播图初始化
mui('.mui-slider').slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});