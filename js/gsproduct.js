$(function () {

  var shopid = 0;
  var areaid = 0;

  function renderShop(callback) {
    $.ajax({
      url: "http://127.0.0.1:9090/api/getgsshop",
      type: "get",
      dataType: "json",
      success: function (data) {
        callback && callback(data);
      }
    });
  };
  function renderArea(callback) {
    $.ajax({
      url: "http://127.0.0.1:9090/api/getgsshoparea",
      type: "get",
      dataType: "json",
      success: function (data) {
        callback && callback(data);
      }
    });
  };
  render();
  function render() {
    renderShop(function (data) {
      var strTpl = template("tpl", data);
      $("#shop > ul").html(strTpl);

    });
    renderArea(function (data) {
      var strTpl = template("tpls", data);
      $("#area > ul").html(strTpl);
    });
  }


  //商铺请求事件
  $("#shop").on("click",'li', function () {
    shopid = $(this).attr('data-shopid');
    var jdTxt = $(this).children().text();
    $('.jd').children().html(jdTxt);

    $(".popbox").eq(shopid).addClass("hide").siblings().addClass("hide");
    $(".popbox").eq(0).children().children().eq(shopid).addClass("active").siblings().removeClass("active");
    renderInterface(shopid,areaid);
  });
  $("#area").on("click",'li', function () {
    areaid = $(this).attr('data-areaid');
    var hbTxt = $(this).children().text();
    $('.hb').children().html(hbTxt);

    $(".popbox").eq(shopid).addClass("hide").siblings().addClass("hide");
    $(".popbox").eq(1).children().children().eq(areaid).addClass("active").siblings().removeClass("active");
    renderInterface(shopid,areaid);
  });

  //显示下拉信息
  $(".filter-item").on("click", function () {
    $(".popbox").eq($(this).index()).toggleClass("hide").siblings().addClass("hide");
  });

  renderInterface(shopid,areaid);
  function renderInterface(shopid,areaid) {

    $.ajax({
      url: "http://127.0.0.1:9090/api/getgsproduct",
      type: "get",
      data:{shopid : shopid,areaid : areaid},
      dataType: "json",
      success: function (data) {
        $(".container").html('');
        var strTpl = template("tplss", data);
        $(".container").html(strTpl);

      }
    });
  }



  var shopid, areaid;
  GetShopProduct(shopid, areaid);
  function GetShopProduct(shopid, areaid) {
    return data = {
      shopid: shopid || 0,
      areaid: areaid || 0
    };
  }

  Route.scrollTop();
})