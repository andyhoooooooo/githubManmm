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
  };
  var re = query(ref);
  var coupuId = re.couponId;

  $.ajax({
    url:"http://127.0.0.1:9090/api/getcouponproduct",
    type:"get",
    dataType:"json",
    data:{couponid : coupuId},
    success:function (data) {
      var strTpl = template("tpl",data);
      $(".products-list>ul").html(strTpl);
    }
  })



  Route.scrollTop();
})