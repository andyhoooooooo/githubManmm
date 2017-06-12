/**
 * Created by Administrator on 2017/6/8.
 */

$(function () {
  $.ajax({
    url:"http://127.0.0.1:9090/api/getcoupon",
    type:"get",
    dataType:"json",
    success:function (data) {
      console.log(data);
      var strTpl = template("tpl",data);
      $(".coupon > ul").html(strTpl);
    }
  })



  Route.scrollTop();
})