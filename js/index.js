/**
 * Created by Administrator on 2017/6/4.
 */
$(function () {
  getData();
  getZhekou();
  function getData() {
    $.ajax({
      type:'get',
      url:'http://127.0.0.1:9090/api/getindexmenu',
      dataType:'json',
      success:function (result) {
        console.log(result);
        var tplStr = template('tpl',result);
        $('.tplUl').append(tplStr);
        $('.tplUl').children().eq(7).nextAll().hide();
        $('.tplUl').children().eq(7).on('click',function () {
        $('.tplUl').children().eq(7).nextAll().toggle();
        })
      }
    })
  }
  function getZhekou() {
    $.ajax({
      type:'get',
      url:'http://127.0.0.1:9090/api/getmoneyctrl',
      dataType:'json',
      success:function (result) {
        var tplStr = template('tplZk',result);
        $('.commodity').append(tplStr);
      }
    })
  }
  Route.scrollTop();
})