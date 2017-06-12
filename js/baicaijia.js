/**
 * Created by Administrator on 2017/6/7.
 */
$(function () {
  function renderNav(callback) {
    $.ajax({
      url:"http://127.0.0.1:9090/api/getbaicaijiatitle",
      type:"get",
      dataType:"json",
      success:function (data) {
        callback && callback(data);
      }
    })
  };
  var titleId;
  var myScroll;
  function loaded () {
    myScroll = new IScroll('#wrapper', {
      scrollX: true,   // 横向
      scrollY: false   // 纵向
    });
  }
  touchLi();
  function touchLi() {
    renderNav(function (data) {
      var strTpl = template("tpl",data);
      $(".navBar").append(strTpl);

      var liWidth = 0;
      var $lis = $(".navBar").children();
      $lis.each(function (idx,val) {
        if(idx === 0){
          $(this).addClass('active');
        }
        liWidth += $(val).innerWidth();
      })
      liWidth += $(".search").innerWidth();
      $(".navBar").width(liWidth);
      loaded();

      //点击导航li显示下方内容
      $(".navBar").on("click","li",function () {
        titleId = $(this).attr("data-titleid");
        $(this).addClass('active').siblings().removeClass('active');
        // 让其第一个显示
        myScroll.scrollToElement($(this)[0]);
        requestData();
      });


    })
  }
  requestData();

  function requestData() {
    $.ajax({
      url:"http://127.0.0.1:9090/api/getbaicaijiaproduct",
      type:"get",
      dataType:"json",
      data:{titleid : titleId || 0},
      success:function (data) {
        console.log(data);
        $(".content").html('');
        var strTpl = template("tpls",data);
        $(".content").html(strTpl);
      }
    })
  }
  Route.scrollTop();
})