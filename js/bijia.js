$(function () {
 var productId = JSON.parse( localStorage.getItem("productid"));
 var strTxt = JSON.parse( localStorage.getItem("strTxt"));
  localStorage.removeItem(productId);
  localStorage.removeItem(strTxt);
  $('.categoryName').html(strTxt);
  $.ajax({
    url:"http://127.0.0.1:9090/api/getproduct",
    type:"get",
    data:{productid :productId },
    dataType:"json",
    success:function (data) {
      var strTpl = template("tpl",data);
      $('.productList').append(strTpl);
    }
  });
  $.ajax({
    url:"http://127.0.0.1:9090/api/getproductcom",
    type:"get",
    data:{productid :productId },
    dataType:"json",
    success:function (data) {
      var strTpl = template("tpls",data);
      $('.productList').append(strTpl);
    }
  });
  Route.scrollTop();

})