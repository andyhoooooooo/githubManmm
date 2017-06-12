$(function () {
  var ref = location.href;
  //把获取到的地址栏的参数截取出来
  function query(url) {
    var obj = {};
    var str = url.split('?')[1]
    if (!str) {
      return {}
    }
    var arr = str.split('&');
    arr.forEach(function (value, index) {
      var arrObj = value.split("=");
      var key = arrObj[0];
      var value = arrObj[1];
      obj[key] = value;
    })
    return obj;
  }

  var queryObj = query(ref);
  var brandtitleid = queryObj.brandtitleid;
  var productId ;
  $.ajax({
    url:"http://127.0.0.1:9090/api/getbrand",
    type:"get",
    dataType:"json",
    data:{brandtitleid : brandtitleid},
    success:function (data) {
      console.log(data);
      productId = data.result[0].brandTitleId;
      var strTpl = template("tpl",data);
      $(".mbrand-list").html(strTpl);
      $.ajax({
        url:"http://127.0.0.1:9090/api/getbrandproductlist",
        type:"get",
        dataType:"json",
        data:{brandtitleid : productId,pagesize : 4},
        success:function (data) {
          var dataProductId = data.result[0].productId;
          var strTpl = template("tpls",data);
          $(".mpro-list > ul").html(strTpl);
          productList(dataProductId);
        }
      });
    }
  });

function productList(dataProductId){
  $.ajax({
    url:"http://127.0.0.1:9090/api/getproductcom",
    type:"get",
    dataType:"json",
    data:{productid  : dataProductId},
    success:function (data) {
      var strTpl = template("tplss",data);
      $(".pj-list-item").html(strTpl);
    }
  });
}

  Route.scrollTop();
})