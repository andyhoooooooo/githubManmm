/**
 * Created by Administrator on 2017/6/7.
 */
$(function () {

  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getinlanddiscount",
    dataType:"json",
    success:function (data) {
      var strTpl = template("tpl",data);
      $(".recommenUl").append(strTpl);
      $(".recommenUl > li").on("click",function () {

        window.location.href ="discount.html?productid=" + $(this).attr("pId");
        //window.open("discount.html");
      })
    }
  });
  Route.scrollTop();
})