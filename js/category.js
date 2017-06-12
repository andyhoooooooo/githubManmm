$(function () {
  $.ajax({
    type:"get",
    url:"http://127.0.0.1:9090/api/getcategorytitle",
    dataType:"json",
    success:function (result) {
      var tlpStr = template('tpl',result);
      $('ul.bigUl').append(tlpStr);
      // 点击li显示相应的内容
      $('ul.bigUl').children().one('click',function () {
        var titleid = $(this).attr('titleid');
        var $that = $(this);
        $.ajax({
          type:"get",
          url:"http://127.0.0.1:9090/api/getcategory",
          data:{titleid:titleid},
          dataType:"json",
          success:function (result) {
            console.log(result);
            var tlpStr = template('tpls',result);
            $that.append(tlpStr);
          }
        });
      }).click(function () {
        $(this).children().toggle();
      })
    }
  });

  Route.scrollTop();
})
