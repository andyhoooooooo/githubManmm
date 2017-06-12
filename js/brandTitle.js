$(function () {


  $.ajax({
    url:"http://127.0.0.1:9090/api/getbrandtitle",
    type:"get",
    dataType:"json",
    success:function (data) {
      var strTpl = template("tpl",data);
      $(".mbrand-list").html(strTpl);
    }
  })


  Route.scrollTop();
})