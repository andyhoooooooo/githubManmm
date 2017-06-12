/**
 * Created by Administrator on 2017/6/7.
 */
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
  var strId = decodeURI(queryObj.productid);
  $.ajax({
    url: "http://127.0.0.1:9090/api/getdiscountproduct",
    type: "get",
    data:{productid : strId },
    dataType:"json",
    success:function (data) {
      console.log(data);
      var strTpl = template("tpl",data);
      $(".container").append(strTpl);
    }
  });
  Route.scrollTop();
})