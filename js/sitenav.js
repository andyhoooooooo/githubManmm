$(function () {


  $.ajax({
    url:"http://127.0.0.1:9090/api/getsitenav",
    type:"get",
    dataType:"json",
    success:function (data) {
      console.log(data);
      var strTpl = template("tpl",data);
      $(".site-nav .link").html(strTpl);
    }
  })


  Route.scrollTop();
})