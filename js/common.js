/**
 * Created by Administrator on 2017/6/6.
 */
(function (window) {
  //返回顶部
  function scrollTop() {
    $('.bottomInfo > .top').on('click',function () {
      $("html,body").stop().animate({scrollTop:0},600);
    })
  }
  var Route = {
    scrollTop :scrollTop
  }
  window.Route = Route;
})(window)