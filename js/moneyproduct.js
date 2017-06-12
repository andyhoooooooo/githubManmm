/**
 * Created by Administrator on 2017/6/6.
 */
$(function () {
  var pId = JSON.parse(localStorage.getItem("productId"));
  localStorage.removeItem(pId);
  $.ajax({
    url:"http://127.0.0.1:9090/api/getmoneyctrlproduct",
    type:"get",
    dataType:"json",
    data:{productid : pId},
    success:function (data) {
      console.log(data);
      var strTpl = template("tpl",data);
      $(".container").append(strTpl);
    }
  });
  Route.scrollTop();
})